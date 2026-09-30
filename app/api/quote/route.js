import nodemailer from "nodemailer";

// Receives quote requests from the /pricing page (a preset plan or a custom
// service mix) and emails them to the team. SMTP settings come from env vars
// — see .env.example. In development, if SMTP isn't configured, the request
// is logged to the server console instead so the flow can still be tested.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 2000;

function clean(value, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = {
    type: body.type === "custom" ? "custom" : "plan",
    plan: clean(body.plan, 60),
    services: Array.isArray(body.services) ? body.services.map((s) => clean(s, 120)).filter(Boolean).slice(0, 40) : [],
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    organization: clean(body.organization, 160),
    practiceSize: clean(body.practiceSize, 60),
    specialty: clean(body.specialty, 120),
    claimVolume: clean(body.claimVolume, 60),
    currentSetup: clean(body.currentSetup, 60),
    message: clean(body.message, MAX_LEN),
    consent: body.consent === true,
  };

  const errors = {};
  if (!data.name) errors.name = "Required";
  if (!EMAIL_RE.test(data.email)) errors.email = "Valid email required";
  if (!data.phone) errors.phone = "Required";
  if (!data.organization) errors.organization = "Required";
  if (!data.consent) errors.consent = "Consent is required";
  if (data.type === "plan" && !data.plan) errors.plan = "Plan is required";
  if (data.type === "custom" && data.services.length === 0) errors.services = "Select at least one service";
  if (Object.keys(errors).length) {
    return Response.json({ error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const subject =
    data.type === "custom"
      ? `Custom plan quote request — ${data.organization}`
      : `${data.plan} plan enquiry — ${data.organization}`;

  const rows = [
    ["Request", data.type === "custom" ? "Custom plan" : `${data.plan} plan`],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Organization", data.organization],
    ["Practice size", data.practiceSize || "—"],
    ["Specialty", data.specialty || "—"],
    ...(data.type === "custom"
      ? [
          ["Claim volume", data.claimVolume || "—"],
          ["Current billing", data.currentSetup || "—"],
        ]
      : []),
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    data.services.length ? `\nSelected services:\n${data.services.map((s) => `  • ${s}`).join("\n")}` : "",
    data.message ? `\nMessage:\n${data.message}` : "",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#17232d;max-width:600px">
      <h2 style="color:#0b1f33;margin:0 0 16px">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      ${
        data.services.length
          ? `<h3 style="color:#0b8f87;margin:20px 0 8px;font-size:15px">Selected services (${data.services.length})</h3><ul style="margin:0;padding-left:18px;font-size:14px">${data.services
              .map((s) => `<li style="padding:2px 0">${escapeHtml(s)}</li>`)
              .join("")}</ul>`
          : ""
      }
      ${
        data.message
          ? `<h3 style="color:#0b8f87;margin:20px 0 8px;font-size:15px">Message</h3><p style="font-size:14px;white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>`
          : ""
      }
    </div>`;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !QUOTE_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[quote] SMTP not configured — request logged instead of emailed:\n${subject}\n${text}`);
      return Response.json({ ok: true, delivered: false });
    }
    console.error("[quote] SMTP env vars missing; cannot send quote request.");
    return Response.json({ error: "Email is temporarily unavailable. Please contact us directly." }, { status: 503 });
  }

  try {
    const port = Number(SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: QUOTE_FROM_EMAIL || SMTP_USER,
      to: QUOTE_TO_EMAIL,
      replyTo: `${data.name} <${data.email}>`,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[quote] Failed to send email:", err);
    return Response.json({ error: "We couldn't send your request. Please try again or contact us directly." }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}

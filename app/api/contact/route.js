import nodemailer from "nodemailer";

// Receives enquiries from the /contact page form and emails them to the team.
// Uses the same SMTP env vars as app/api/quote/route.js — see .env.example.
// In development, if SMTP isn't configured, the enquiry is logged to the
// server console instead so the flow can still be tested.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 3000;

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
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    organization: clean(body.organization, 160),
    practiceType: clean(body.practiceType, 80),
    practiceSize: clean(body.practiceSize, 60),
    specialty: clean(body.specialty, 120),
    service: clean(body.service, 120),
    offer: clean(body.offer, 120),
    timeline: clean(body.timeline, 60),
    preferredContact: clean(body.preferredContact, 40),
    referral: clean(body.referral, 80),
    currentChallenges: Array.isArray(body.currentChallenges)
      ? body.currentChallenges.map((c) => clean(c, 120)).filter(Boolean).slice(0, 20)
      : [],
    message: clean(body.message, MAX_LEN),
    consent: body.consent === true,
  };

  const errors = {};
  if (!data.firstName) errors.firstName = "Required";
  if (!data.lastName) errors.lastName = "Required";
  if (!EMAIL_RE.test(data.email)) errors.email = "Valid email required";
  if (!data.phone) errors.phone = "Required";
  if (!data.organization) errors.organization = "Required";
  if (!data.service) errors.service = "Please select one";
  if (!data.consent) errors.consent = "Consent is required";
  if (Object.keys(errors).length) {
    return Response.json({ error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const name = `${data.firstName} ${data.lastName}`;
  const subject = `${data.offer ? `[Offer: ${data.offer}] ` : ""}Contact enquiry — ${data.service} — ${data.organization}`;

  const rows = [
    ["Name", name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Organization", data.organization],
    ["Practice type", data.practiceType || "—"],
    ["Practice size", data.practiceSize || "—"],
    ["Specialty", data.specialty || "—"],
    ["Service", data.service],
    ["Offer claimed", data.offer || "—"],
    ["Timeline", data.timeline || "—"],
    ["Preferred contact", data.preferredContact || "—"],
    ["Heard about us", data.referral || "—"],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    data.currentChallenges.length ? `\nCurrent challenges:\n${data.currentChallenges.map((c) => `  • ${c}`).join("\n")}` : "",
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
        data.currentChallenges.length
          ? `<h3 style="color:#0b8f87;margin:20px 0 8px;font-size:15px">Current challenges</h3><ul style="margin:0;padding-left:18px;font-size:14px">${data.currentChallenges
              .map((c) => `<li style="padding:2px 0">${escapeHtml(c)}</li>`)
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
      console.log(`[contact] SMTP not configured — enquiry logged instead of emailed:\n${subject}\n${text}`);
      return Response.json({ ok: true, delivered: false });
    }
    console.error("[contact] SMTP env vars missing; cannot send enquiry.");
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
      replyTo: `${name} <${data.email}>`,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return Response.json({ error: "We couldn't send your enquiry. Please try again or contact us directly." }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}

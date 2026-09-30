// Sends a chatbot message to the site owner.
//
// NOT CONNECTED YET — this only simulates a successful send so the chat flow
// can be built and tested. To go live, replace the body with a POST to an API
// route (e.g. app/api/contact/route.js using the same nodemailer setup as
// app/api/quote/route.js):
//
//   const res = await fetch("/api/contact", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ ...data, source: "chatbot" }),
//   });
//   return { ok: res.ok };
//
// `data` = { name, email, phone?, subject, message }
export async function sendChatEmail(data) {
  await new Promise((r) => setTimeout(r, 900));
  if (process.env.NODE_ENV !== "production") {
    console.info("[chatbot] Simulated email to owner:", data);
  }
  return { ok: true, simulated: true };
}

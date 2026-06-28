const adminEmail = process.env.ADMIN_EMAIL || "nechamabrenig@gmail.com";
const fromEmail = process.env.EMAIL_FROM || "Hair by Nechama <onboarding@resend.dev>";

const json = (response, statusCode, body) => {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
};

const clean = (value) => String(value || "").trim();

const readJsonBody = async (request) => {
  if (request.body && typeof request.body === "object") return request.body;

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
};

const formatBookingDate = (date) => {
  if (!date) return "Not selected";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

const buildBookingRequestEmail = ({ booking, approvalUrl }) => {
  const date = formatBookingDate(booking.date);
  const subject = `Hair by Nechama booking - ${date} at ${clean(booking.time) || "time not selected"}`;
  const text = [
    "New booking request",
    "",
    `Date: ${date}`,
    `Time: ${clean(booking.time)}`,
    `Name: ${clean(booking.name)}`,
    `Email: ${clean(booking.email)}`,
    `Phone: ${clean(booking.phone)}`,
    `Services: ${clean(booking.service) || "Not specified"}`,
    "",
    `Approve on the website: ${clean(approvalUrl)}`,
  ].join("\n");

  return {
    to: adminEmail,
    reply_to: clean(booking.email) || undefined,
    subject,
    text,
  };
};

const buildConfirmationEmail = ({ booking }) => {
  const customerEmail = clean(booking.email);
  const date = formatBookingDate(booking.date);

  if (!customerEmail) {
    throw new Error("Customer email is missing.");
  }

  return {
    to: customerEmail,
    reply_to: adminEmail,
    subject: `Hair by Nechama booking confirmed - ${date} at ${clean(booking.time)}`,
    text: [
      `Hi ${clean(booking.name)},`,
      "",
      "Your Hair by Nechama booking is confirmed.",
      "",
      `Date: ${date}`,
      `Time: ${clean(booking.time)}`,
      `Services: ${clean(booking.service) || "Not specified"}`,
      "",
      "Thank you,",
      "Hair by Nechama",
    ].join("\n"),
  };
};

module.exports = async (request, response) => {
  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== "POST") {
    json(response, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    json(response, 503, { ok: false, error: "RESEND_API_KEY is not set in Vercel." });
    return;
  }

  try {
    const { type, booking = {}, approvalUrl = "" } = await readJsonBody(request);
    const email =
      type === "booking-request"
        ? buildBookingRequestEmail({ booking, approvalUrl })
        : type === "booking-confirmation"
          ? buildConfirmationEmail({ booking })
          : null;

    if (!email) {
      json(response, 400, { ok: false, error: "Unknown email type." });
      return;
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email.to],
        reply_to: email.reply_to,
        subject: email.subject,
        text: email.text,
      }),
    });

    const result = await resendResponse.json().catch(() => ({}));
    if (!resendResponse.ok) {
      console.error("Resend email failed", result);
      json(response, 502, { ok: false, error: "Email provider rejected the message." });
      return;
    }

    json(response, 200, { ok: true, id: result.id || null });
  } catch (error) {
    console.error("Email function failed", error);
    json(response, 500, { ok: false, error: "Email could not be sent." });
  }
};

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mohammedibrahim182152@gmail.com";
const FROM = process.env.SMTP_FROM || "Rahim Marble Company <mohammedibrahim182152@gmail.com>";

function formatDate(date: Date): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });
}

export async function sendInquiryEmail(data: {
  name: string;
  phone: string;
  email: string;
  product: string;
  message: string;
}) {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fafafa; border: 1px solid #e0c87a;">
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; text-align: center;">
        <h1 style="color: #e8b014; font-size: 24px; margin: 0;">Rahim Marble Company</h1>
        <p style="color: #ccc; margin: 5px 0 0;">New Inquiry Received</p>
      </div>
      <div style="padding: 30px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 150px;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Product:</td><td style="padding: 8px 0;">${data.product}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Message:</td><td style="padding: 8px 0;">${data.message}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Date & Time:</td><td style="padding: 8px 0;">${formatDate(new Date())}</td></tr>
        </table>
      </div>
    </div>
  `;
  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Inquiry from ${data.name} - ${data.product}`,
    html,
  });
}

export async function sendQuotationEmail(data: {
  name: string;
  phone: string;
  email: string;
  product: string;
  quantity?: string;
  budget?: string;
  message?: string;
}) {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fafafa; border: 1px solid #e0c87a;">
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; text-align: center;">
        <h1 style="color: #e8b014; font-size: 24px; margin: 0;">Rahim Marble Company</h1>
        <p style="color: #ccc; margin: 5px 0 0;">New Quotation Request</p>
      </div>
      <div style="padding: 30px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 150px;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Product:</td><td style="padding: 8px 0;">${data.product}</td></tr>
          ${data.quantity ? `<tr><td style="padding: 8px 0; color: #666;">Quantity:</td><td style="padding: 8px 0;">${data.quantity}</td></tr>` : ""}
          ${data.budget ? `<tr><td style="padding: 8px 0; color: #666;">Budget:</td><td style="padding: 8px 0;">${data.budget}</td></tr>` : ""}
          ${data.message ? `<tr><td style="padding: 8px 0; color: #666;">Message:</td><td style="padding: 8px 0;">${data.message}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #666;">Date & Time:</td><td style="padding: 8px 0;">${formatDate(new Date())}</td></tr>
        </table>
      </div>
    </div>
  `;
  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Quotation Request from ${data.name} - ${data.product}`,
    html,
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fafafa; border: 1px solid #e0c87a;">
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; text-align: center;">
        <h1 style="color: #e8b014; font-size: 24px; margin: 0;">Rahim Marble Company</h1>
        <p style="color: #ccc; margin: 5px 0 0;">New Contact Message</p>
      </div>
      <div style="padding: 30px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 150px;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #666;">Subject:</td><td style="padding: 8px 0;">${data.subject}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Message:</td><td style="padding: 8px 0;">${data.message}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Date & Time:</td><td style="padding: 8px 0;">${formatDate(new Date())}</td></tr>
        </table>
      </div>
    </div>
  `;
  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Contact: ${data.subject} from ${data.name}`,
    html,
  });
}

import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!env.smtp.configured) return null;
  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });
  return transporter;
}

/** Low-level send. No-ops (with a warning) if SMTP isn't configured. */
export async function sendEmail({ to, subject, html, replyTo }) {
  const tx = getTransporter();
  if (!tx) {
    // eslint-disable-next-line no-console
    console.warn(`\x1b[33m[email] SMTP not configured — skipped "${subject}" to ${to}\x1b[0m`);
    return { skipped: true };
  }
  return tx.sendMail({ from: `FEROZE Designs <${env.smtp.from}>`, to, subject, html, replyTo });
}

const gold = '#C9A96E';
const bg = '#0A0A0A';
const wrap = (inner) => `
  <div style="background:${bg};padding:32px 0;font-family:Arial,Helvetica,sans-serif;color:#F5F5F0">
    <div style="max-width:560px;margin:0 auto;background:#111;border:1px solid #2A2A2A;border-radius:8px;overflow:hidden">
      <div style="padding:28px 32px;border-bottom:1px solid #2A2A2A;text-align:center">
        <span style="font-family:Georgia,serif;font-size:26px;letter-spacing:6px;color:#F5F5F0">FEROZE</span>
        <div style="font-size:10px;letter-spacing:4px;color:#888880;margin-top:4px">DESIGNS &amp; HOLDINGS</div>
      </div>
      <div style="padding:32px">${inner}</div>
      <div style="padding:20px 32px;border-top:1px solid #2A2A2A;font-size:12px;color:#888880;text-align:center">
        Mumbai | Dubai &nbsp;·&nbsp; www.ferozedesigns.com<br/>
        WhatsApp: +91 83558 21370
      </div>
    </div>
  </div>`;

const row = (label, value) =>
  value
    ? `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #2A2A2A;color:#888880;font-size:13px;width:40%">${label}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2A2A2A;color:#F5F5F0;font-size:13px">${String(
          value
        ).replace(/</g, '&lt;')}</td>
      </tr>`
    : '';

/** Confirmation email to the person who submitted the inquiry. */
export async function sendInquiryConfirmation(inquiry) {
  const html = wrap(`
    <h2 style="font-family:Georgia,serif;font-weight:normal;color:${gold};margin:0 0 16px">Thank you for reaching out</h2>
    <p style="color:#F5F5F0;line-height:1.6">Dear ${String(inquiry.name).replace(/</g, '&lt;')},</p>
    <p style="color:#cfcfc8;line-height:1.6">
      We've received your inquiry and our team will get back to you within <strong>24–48 hours</strong>.
      Here's a summary of what you sent us:
    </p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      ${row('Brand interest', inquiry.brand)}
      ${row('Inquiry type', inquiry.inquiryType)}
      ${row('Project type', inquiry.projectType)}
      ${row('Product interest', inquiry.productInterest)}
      ${row('Budget', inquiry.budget)}
      ${row('Message', inquiry.message)}
    </table>
    <p style="color:#cfcfc8;line-height:1.6">
      For urgent queries, message us on WhatsApp at
      <a href="https://wa.me/918355821370" style="color:${gold}">+91 83558 21370</a>.
    </p>
    <p style="color:#888880;margin-top:24px">Warm regards,<br/>Team FEROZE</p>
  `);
  return sendEmail({
    to: inquiry.email,
    subject: 'Thank you for reaching out — Feroze Designs',
    html,
  });
}

/** Notification email to the Feroze admin inbox. */
export async function sendInquiryNotification(inquiry) {
  const adminUrl = `${env.FRONTEND_URL}/admin/inquiries`;
  const html = wrap(`
    <h2 style="font-family:Georgia,serif;font-weight:normal;color:${gold};margin:0 0 16px">New Website Inquiry</h2>
    <table style="width:100%;border-collapse:collapse;margin:8px 0">
      ${row('Name', inquiry.name)}
      ${row('Email', inquiry.email)}
      ${row('Phone', inquiry.phone)}
      ${row('Brand', inquiry.brand)}
      ${row('Inquiry type', inquiry.inquiryType)}
      ${row('Project type', inquiry.projectType)}
      ${row('Product interest', inquiry.productInterest)}
      ${row('Budget', inquiry.budget)}
      ${row('Message', inquiry.message)}
      ${row('Source', inquiry.source)}
    </table>
    <p style="margin-top:20px">
      <a href="${adminUrl}" style="background:${gold};color:${bg};text-decoration:none;padding:12px 24px;border-radius:4px;font-size:14px;display:inline-block">
        Open Admin Panel
      </a>
    </p>
  `);
  return sendEmail({
    to: env.smtp.adminEmail,
    subject: `New Inquiry — ${inquiry.inquiryType} from ${inquiry.name}`,
    html,
    replyTo: inquiry.email,
  });
}

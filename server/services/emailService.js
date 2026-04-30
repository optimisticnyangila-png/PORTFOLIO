const nodemailer = require('nodemailer');

const escapeHtml = (value) =>
    String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.sendContactEmail = async(contactData) => {
    try {
        const { name, email, subject, message } = contactData;
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `
        };

        const info = await transporter.sendMail(mailOptions);

        return {
            success: true,
            data: {
                messageId: info.messageId,
                timestamp: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Email service error:', error);
        return {
            success: false,
            error: error.message || 'Failed to send email'
        };
    }
};

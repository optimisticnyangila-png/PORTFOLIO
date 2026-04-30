const emailService = require('../services/emailService');

exports.sendContactEmail = async(req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Send email
        const result = await emailService.sendContactEmail({
            name,
            email,
            subject,
            message
        });

        if (!result.success) {
            return res.status(500).json({ error: result.error || 'Failed to send email' });
        }

        res.status(200).json({
            message: 'Email sent successfully',
            data: result.data
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to process contact form' });
    }
};
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // Usa SSL para el puerto 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendTicketNotification = async (to, subject, title, status) => {
    try {
        await transporter.sendMail({
            from: `"TokenTick Support" <${process.env.EMAIL_USER}>`,
            to,
            subject: `TokenTick: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; border-left: 5px solid #2ecc71; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #2c3e50;">Actualización de tu incidencia</h2>
                    <p>Hola,</p>
                    <p>Tu ticket titulado <strong>"${title}"</strong> ha sido actualizado.</p>
                    <p style="font-size: 1.2em;">Estado actual: <span style="color: #27ae60; font-weight: bold;">${status}</span></p>
                    <hr>
                    <p>Gracias por confiar en TokenTick.</p>
                </div>
            `,
        });
        console.log("✅ Correo enviado a:", to);
    } catch (error) {
        console.error("❌ Error de Nodemailer:", error);
    }
};

module.exports = { sendTicketNotification };
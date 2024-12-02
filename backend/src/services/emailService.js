const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: '"VoyageBagage" <noreply@voyagebagage.ma>',
    to: email,
    subject: 'Vérifiez votre compte VoyageBagage',
    html: `
      <h1>Bienvenue sur VoyageBagage !</h1>
      <p>Cliquez sur le lien ci-dessous pour vérifier votre compte :</p>
      <a href="${process.env.FRONTEND_URL}/verify-email/${verificationToken}">
        Vérifier mon compte
      </a>
    `
  };

  await transporter.sendMail(mailOptions);
};

exports.sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Réinitialisation de votre mot de passe VoyageBagage',
    html: `
      <h1>Réinitialisation de mot de passe</h1>
      <p>Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous :</p>
      <a href="${resetUrl}">Réinitialiser mon mot de passe</a>
    `,
  };

  return transporter.sendMail(mailOptions);
}; 
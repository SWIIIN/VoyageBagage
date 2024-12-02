const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendVerificationSMS = async (phoneNumber, verificationCode) => {
  try {
    await client.messages.create({
      body: `Votre code de vérification VoyageBagage est : ${verificationCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  } catch (error) {
    console.error('Erreur envoi SMS:', error);
    throw error;
  }
}; 
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_SECRET);


const googleVerify = async (token) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,  
  });
  const payload = ticket.getPayload();

  console.log(payload);

  return payload;

}

module.exports = {
    googleVerify
}
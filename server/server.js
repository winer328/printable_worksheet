const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Your Discourse SSO settings
const discourseSSOSecret = 'championchampion';

app.get('/discourse-sso-login', (req, res) => {
  const ssoPayload = req.query.sso;
  const receivedSignature = req.query.sig;
  console.log(ssoPayload);

  // Validate the signature
  const expectedSignature = generateHMACSignature(ssoPayload, discourseSSOSecret);
  if (expectedSignature !== receivedSignature) {
    return res.status(401).send('Invalid signature');
  }

  // Parse the SSO payload
  const decodedPayload = Buffer.from(ssoPayload, 'base64').toString('utf-8');
  const ssoParams = new URLSearchParams(decodedPayload);
  const email = ssoParams.get('email');
  // Parse other SSO parameters as needed

  // Authenticate the user based on the parsed SSO parameters
  // Example: find or create a user account based on the email

  // Establish the user's session
  // Example: set user session and redirect to the user's dashboard
  res.send('User authenticated and session established');
});

function generateHMACSignature(payload, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  return hmac.digest('hex');
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
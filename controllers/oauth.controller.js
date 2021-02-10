const axios = require("axios");

async function getUserToken(code) {
  let response = await axios.post(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: process.env.GITHUB_CLIENTID,
      client_secret: process.env.GITHUB_CLIENTSECRET,
      code: code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response.data.access_token;
}

async function getUserData(token) {
  let response = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
}

module.exports = { getUserToken, getUserData };

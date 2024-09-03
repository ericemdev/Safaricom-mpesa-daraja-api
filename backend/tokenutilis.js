const axios = require("axios");
const moment = require("moment");

require('dotenv').config();

async function getAccessToken() {
    const consumer_key = process.env.CONSUMER_KEY;
    const consumer_secret = process.env.CONSUMER_SECRET;
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = "Basic " + Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

    try {
        const response = await axios.get(url, { headers: { Authorization: auth } });
        return response.data.access_token;
    } catch (error) {
        throw new Error('Error getting access token');
    }
}

module.exports = { getAccessToken };


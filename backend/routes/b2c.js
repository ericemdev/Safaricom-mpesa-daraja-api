

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getAccessToken } = require('../tokenutilis');

// Business to Customer (B2C) Payment Route
router.post('/b2c', async (req, res) => {
    try {
        let phoneNumber = req.body.phone;
        const amount = req.body.amount;

        const accessToken = await getAccessToken();
        const url = 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest';
        const auth = 'Bearer ' + accessToken;

        if (phoneNumber.startsWith('0')) {
            phoneNumber = '254' + phoneNumber.slice(1);
        }

        const securityCredential = 'YOUR_SECURITY_CREDENTIAL';
        const initiatorName = 'YOUR_INITIATOR_NAME';

        const response = await axios.post(
            url,
            {
                InitiatorName: initiatorName,
                SecurityCredential: securityCredential,
                CommandID: 'BusinessPayment',
                Amount: amount,
                PartyA: 'enter your shortcode',
                PartyB: phoneNumber,
                Remarks: 'Payment',
                QueueTimeOutURL: '',
                ResultURL: '',
                Occasion: 'Payment'
            },
            {
                headers: { Authorization: auth },
            }
        );

        res.status(200).json({
            msg: 'B2C request sent successfully',
            status: true,
            data: response.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'B2C request failed', status: false, error: error.response.data });
    }
});

// B2C Callback Route
router.post('/b2c/callback', (req, res) => {
    console.log('B2C Callback received:', req.body);
    // Handle the callback, store in the database, etc.
    res.status(200).json({ msg: 'B2C callback received' });
});

module.exports = router;

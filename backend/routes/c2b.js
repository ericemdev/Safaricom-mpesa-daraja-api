const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');
const { setDoc, doc } = require('firebase/firestore');
const { getAccessToken } = require('../tokenutilis');

// customer to business (C2B) Payment Route
router.post('/api/b2c', async (req, res) => {
    try {
        const { phoneNumber, amount, accountNumber, transactionDesc } = req.body;

        // Validate phone number format
        let formattedPhoneNumber = phoneNumber;
        if (formattedPhoneNumber.startsWith('0')) {
            formattedPhoneNumber = '254' + formattedPhoneNumber.slice(1);
        }

        const accessToken = await getAccessToken();
        const url = 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest';
        const auth = 'Bearer ' + accessToken;
        const timestamp = moment().format('YYYYMMDDHHmmss');
        const password = Buffer.from(
            '174379' + // Shortcode
            'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' + // Lipa na M-Pesa Online password
            timestamp
        ).toString('base64');

        const response = await axios.post(
            url,
            {
                InitiatorName: 'your_initiator_name',
                SecurityCredential: 'your_security_credential',
                CommandID: 'BusinessPayment',
                Amount: amount,
                PartyA: '174379', // Shortcode
                PartyB: formattedPhoneNumber,
                Remarks: transactionDesc,
                QueueTimeOutURL: 'https://your-ngrok-url/api/b2c/timeout',
                ResultURL: 'https://your-ngrok-url/api/b2c/result',
                Occasion: withdrawal
            },
            {
                headers: { Authorization: auth },
            }
        );

        // Save request details to Firestore
        const transactionRef = doc(db, 'b2c_transactions', `${response.data.ConversationID}`);
        await setDoc(transactionRef, {
            phoneNumber: formattedPhoneNumber,
            amount,
            accountNumber,
            transactionDesc,
            response: response.data
        });

        res.status(200).json({
            msg: 'B2C request is successful.',
            status: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Request failed', status: false });
    }
});

// B2C Result Callback Route
router.post('/api/b2c/result', async (req, res) => {
    const {
        Body: {
            ResultCode,
            ResultDesc,
            ConversationID,
            OriginatorConversationID,
            ResultParameters
        }
    } = req.body;

    try {
        const resultRef = doc(db, 'b2c_transactions', `${ConversationID}`);
        await setDoc(resultRef, {
            ResultCode,
            ResultDesc,
            OriginatorConversationID,
            ResultParameters
        }, { merge: true });

        console.log("B2C transaction result saved to Firestore");

        res.status(200).json({ message: "B2C result received and processed" });
    } catch (error) {
        console.log("Error saving B2C result to Firestore:", error);
        res.status(500).json({ message: "Error processing B2C result" });
    }
});

// B2C Timeout Callback Route
router.post('/api/b2c/timeout', (req, res) => {
    console.log("B2C request timed out:", req.body);
    res.status(200).json({ message: "B2C timeout received" });
});

module.exports = router;

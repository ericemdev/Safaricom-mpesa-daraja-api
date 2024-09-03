const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const { db } = require('./firebase');
const { setDoc, doc } = require('firebase/firestore');
const { getAccessToken } = require('./tokenutilis');

// Sim Tool Kit (STK) Push Route
router.post('/api/stkpush', async (req, res) => {
    try {
        let phoneNumber = req.body.phone;
        const accountNumber = req.body.accountNumber;
        const amount = req.body.amount;

        if (phoneNumber.startsWith('0')) {
            phoneNumber = '254' + phoneNumber.slice(1);
        }

        const accessToken = await getAccessToken();
        const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        const auth = 'Bearer ' + accessToken;
        const timestamp = moment().format('YYYYMMDDHHmmss');
        const password = Buffer.from(
            '174379' +
            'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' +
            timestamp
        ).toString('base64');

        const response = await axios.post(
            url,
            {
                BusinessShortCode: '174379',
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phoneNumber,
                PartyB: '174379',
                PhoneNumber: phoneNumber,
                CallBackURL: 'https://mydomain.com/path',
                AccountReference: accountNumber,
                TransactionDesc: 'Mpesa Daraja API stk push test',
            },
            {
                headers: { Authorization: auth },
            }
        );

        const { CheckoutRequestID, MerchantRequestID } = response.data;
        await setDoc(doc(db, "transactions", CheckoutRequestID), {
            MerchantRequestID,
            CheckoutRequestID,
            phoneNumber,
            accountNumber,
            amount,
            timestamp,
            status: "Pending", // initial status
        });

        res.status(200).json({
            msg: 'Things are boiling nicely. check your phone and enter pin  to complete transaction  ~ericem😎🤙',
            status: true,
        });
    } catch (error) {
        console.log('Error during STK Push:', error.response?.data || error.message);
        res.status(500).json({ msg: 'Request failed', status: false });
    }
});

// Callback Route
router.post('/api/callback', async (req, res) => {
    try {
        const {
            Body: {
                stkCallback: {
                    MerchantRequestID,
                    CheckoutRequestID,
                    ResultCode,
                    ResultDesc,
                    CallbackMetadata
                }
            }
        } = req.body;

        // Checking if CallbackMetadata exists and has expected properties
        if (!CallbackMetadata || !CallbackMetadata.Item || CallbackMetadata.Item.length < 5) {
            throw new Error('Invalid CallbackMetadata structure');
        }

        const amount = CallbackMetadata.Item.find(item => item.Name === 'Amount')?.Value || 0;
        const mpesaReceiptNumber = CallbackMetadata.Item.find(item => item.Name === 'MpesaReceiptNumber')?.Value || '';
        const transactionDate = CallbackMetadata.Item.find(item => item.Name === 'TransactionDate')?.Value || '';
        const phoneNumber = CallbackMetadata.Item.find(item => item.Name === 'PhoneNumber')?.Value || '';

        const transactionRef = doc(db, "transactions", `${CheckoutRequestID}`);
        await setDoc(transactionRef, {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            amount,
            mpesaReceiptNumber,
            transactionDate,
            phoneNumber
        });
        console.log("Transaction saved to Firestore");

        fs.writeFile("stkcallback.json", JSON.stringify(req.body), "utf8", (err) => {
            if (err) {
                console.log("Error writing STK callback to file:", err);
            } else {
                console.log("STK PUSH CALLBACK STORED SUCCESSFULLY");
            }
        });

        res.status(200).json({ message: "Callback received and processed" });
    } catch (error) {
        console.log("Error processing callback:", error.message);
        res.status(500).json({ message: "Error processing callback" });
    }
});

module.exports = router;

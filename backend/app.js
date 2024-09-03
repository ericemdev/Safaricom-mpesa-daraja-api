const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require('./api');
const moment = require('moment');
const { getAccessToken } = require('./tokenutilis');
const c2bRoutes = require('./routes/c2b')
const b2cRoutes = require('./routes/b2c')


const port = 50001;
const hostname = "localhost";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/', apiRouter);
app.use('/api', c2bRoutes )
app.use('/api', b2cRoutes)
app.get("/", (req, res) => {
    res.send(" safaricom Mpesa Daraja api integration by ~ericem😎");
    console.log(moment().format("YYYYMMDDHHmmss"));
});

app.get("/access_token", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        res.send("Your access token is " + accessToken);
    } catch (error) {
        res.status(500).send("Error getting access token");
    }
});

app.get("/stkpush", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = "Bearer " + accessToken;
        const timestamp = moment().format("YYYYMMDDHHmmss");
        const password = Buffer.from(
            "174379" +
            "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
            timestamp
        ).toString("base64");

        const response = await axios.post(
            url,
            {
                BusinessShortCode: "174379",
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: "10",
                PartyA: "",
                PartyB: "174379",
                PhoneNumber: "",
                CallBackURL: "https://your-ngrok-url/callback",
                AccountReference: "ericem",
                TransactionDesc: "Mpesa Daraja API stk push test",
            },
            { headers: { Authorization: auth } }
        );

        res.send("Things are boilind nicely. check your phone and enter pin  to complete transaction  ~ericem😎🤙 ");
    } catch (error) {
        res.status(500).send("Request is successful. Please enter mpesa pin to complete the transaction ~ericem D😎🤙");
    }
});



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

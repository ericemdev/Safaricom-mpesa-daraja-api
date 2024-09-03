
# Safaricom M-Pesa Daraja API Integration

## Description

This project integrates the Safaricom M-Pesa Daraja API with a Node.js backend and a Svelte frontend. It enables functionalities such as sending STK Push requests, tracking payment status, receiving funds, and withdrawing funds. It uses firebase firestore as the defaultdatabase to store transactions

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### project structure

```
frontend/
├── public/                  
├── src/
│   ├── components/          
│   ├── pages/               
│   ├── stores/             
│   ├── firebase.js         
│   └── .env                 

backend/
├── routes/
│   ├── c2b.js               
│   ├── b2c.js               
├── api.js              
├── app.js                   
├── firebase.js              
├── .env                   
├── package.json            
firebase.json                


Getting Started

git clone https://github.com/ericemdev/safaricom-mpesa-daraja-api.git

```sh
cd safaricom-mpesa-daraja-api
cd frontend
npm install
npm run dev

```sh
cd backend
```sh
npm install

CONSUMER_KEY=YOUR_CONSUMER_KEY
CONSUMER_SECRET=YOUR_CONSUMER_SECRET
SHORTCODE=YOUR_SHORTCODE
PASSKEY=YOUR_PASSKEY

```sh
npm start


add your firebase credentials to the firebase.js file in the backend folder
read more on how to get firebase credentials here https://firebase.google.com/docs/web/setup

```

## Technologies Used
safaricom-mpesa-daraja-api is built with the following technologies:

1. Node js [Node.js](https://nodejs.org/)
2. Svelte js [Svelte](https://svelte.dev/)
3.Google Firebase  [Firebase](https://firebase.google.com/)
4. Daraja Api [Safaricom M-Pesa Daraja API](https://developer.safaricom.co.ke/)
5.  Tailwind CSS (https://tailwindcss.com/)

## Contributing


For more information on how to use the Safaricom M-Pesa Daraja API, visit the Safaricom Developer Portal.

Feel free to contact me on Twitter or email me at ericem.dev@gmail.com for any questions or contributions.



If you find this project helpful, consider tipping on Safaricom Till Number: 8414908


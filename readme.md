            
            ## Getting Started
            # Project Structure
            
            Here is the structure of the Safaricom M-Pesa Daraja API integration project:
            
            ```bash
            
            ### Description of Key Files

                        
                        frontend/
            ├── public/                  # Contains static files such as index.html
            ├── src/
            │   ├── components/          # Contains Svelte components used in the application
            │   ├── pages/               # Contains Svelte pages
            │   │   └── App.svelte       # Main Svelte component for entering phone number and sending requests
            │   ├── firebase.js          # Configures and initializes Firebase services
            │   └── .env                 # Stores environment variables for Firebase
            backend/
            ├── routes/
            │   ├── b2c.js               # Contains the code for B2C integration
            │   ├── c2b.js               # Contains the code for C2B integration
            ├── api.js                   # API route handling
            ├── app.js                   # Entry point for the Express server
            ├── firebase.js              # Firebase configuration for the backend
            ├── .env                     # Stores environment variables for M-Pesa credentials
            └── package.json             # Project dependencies and scripts
            firebase.json                # Configuration file for Firebase hosting and functions


            To get started with the project, follow these steps:
            
            ### 1. Clone the Repository
            
            ```bash
            git clone https://github.com/ericemdev/safaricom-mpesa-integration.git
            cd safaricom-mpesa-integration
            cd frontend
            npm install
            
            
            ```
            
            ### 2. Install the Dependencies
            
            ```bash
            npm install
            ```
            run the development server
            ```bash 

            npm run dev 
             the app will start running on http://localhost:5173
            
            
            ### 3. backend setup
             open a new terminal and navigate to the backend directory
            ```bash
            cd backend
            npm install
            
            create a .env file in the root directory and add the following variables
            CONSUMER_KEY=YOUR_CONSUMER_KEY # Get this from the safaricom developer portal
            CONSUMER_SECRET=YOUR_CONSUMER_SECRET # Get this from the safaricom developer portal
            SHORTCODE=YOUR_SHORTCODE # Get this from the safaricom developer
            PASSKEY=YOUR PASSKEY # Get this from the safaricom developer portal
            ```
            your .env file should look like this
            ```bash
            CONSUMER_KEY=YOUR_CONSUMER_KEY
            CONSUMER_SECRET=YOUR_CONSUMER_SECRET
            SHORTCODE=YOUR_SHORTCODE
            PASSKEY=YOUR PASSKEY
            ```

            set up your firebase project and add the firebase configuration to the backend/firebase.js file
            your firebase.js file should look like this :
             firebase.js
                // Import the functions you need from the SDKs you need
                    import { initializeApp } from 'firebase/app';
                    import { getAuth } from 'firebase/auth';
                    import { getFirestore } from 'firebase/firestore';
                    import { getStorage } from 'firebase/storage';
                    
                    // Your web app's Firebase configuration
                    const firebaseConfig = {
                    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
                    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
                    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
                    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
                    appId: import.meta.env.VITE_FIREBASE_APP_ID
                    };
                    
                    // Initialize Firebase
                    const app = initializeApp(firebaseConfig);
                    
                    // Initialize Firebase services
                    const auth = getAuth(app);
                    const db = getFirestore(app);
                    const storage = getStorage(app);
                    
                    export { app, auth, db, storage };



            ```bash
            
            ### 4. Install the Dependencies
            
            ```bash
            npm install
            ```
            run the development server
            ```bash
            npm start / node app.js
            ```
            the server will start running on http://localhost:3000
            you can now access the application on http://localhost:3000
            
            ## Built With  love  ❤️ by -ericem 😎
            
            ```bash
            svelte - The web framework used for easy frontend development
            vite - The build tool used for the frontend for faster development
            firebase - The database used for storing data
           tailwindcss - The css framework used for styling.
            
            nodejs - The backend framework used
            express - The backend framework used
            safaricom mpesa daraja api - The api used to make mpesa transactions
            ```
             for more information on how to use the api visit [safaricom developer portal](https://developer.safaricom.co.ke/)
            contact me on [twitter](https://twitter.com/ericemdev) for any questions or contributions
            ```email me at ericem.dev@gmail.com for any questions or contributions```
            
            ```tip on safaricom mpesa till number 8414908``` 


            




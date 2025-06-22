# Firebase Authentication Setup for Esmer Market

This guide will help you set up Firebase Authentication for the Esmer Market admin panel.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Give your project a name (e.g., "Esmer Market")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## 2. Add a Web App to Your Firebase Project

1. From your Firebase project dashboard, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "Esmer Market Web")
3. Check "Also set up Firebase Hosting" if you plan to use it (optional)
4. Click "Register app"
5. Copy the Firebase configuration object that appears

## 3. Set Up Authentication

1. In the Firebase console, go to "Authentication" from the left sidebar
2. Click "Get started"
3. Select "Email/Password" from the sign-in methods
4. Enable the "Email/Password" option
5. Click "Save"

## 4. Create an Admin User

1. In the Firebase Authentication section, go to the "Users" tab
2. Click "Add user"
3. Enter an email and password for the admin user (e.g., admin@esmermarket.com)
4. Click "Add user"

## 5. Configure Your Environment Variables

1. Run the provided script to create a `.env.local` file:
   ```
   node create-env.js
   ```

2. Open the `.env.local` file and replace the placeholder values with your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

3. Restart your development server:
   ```
   npm run dev
   ```

## 6. Test Authentication

1. Go to `/login` on your website
2. Enter the email and password you created in step 4
3. You should be redirected to the admin panel at `/admin`

## Troubleshooting

### Login Stuck or Not Working

1. Check your browser console for errors
2. Verify that your Firebase configuration is correct in `.env.local`
3. Make sure Email/Password authentication is enabled in Firebase
4. Confirm that the user exists in Firebase Authentication

### Firebase Auth Not Initialized Error

This usually means your environment variables are not properly set up. Check that:

1. The `.env.local` file exists in your project root
2. All required Firebase configuration values are present
3. The values match those in your Firebase project settings
4. You've restarted your development server after making changes

### Invalid Credential Error

This means the email/password combination is incorrect. Check that:

1. The user exists in Firebase Authentication
2. The password is correct
3. There are no typos in the email or password

## Security Notes

- Keep your Firebase API keys and configuration secure
- Do not commit `.env.local` to version control
- Consider adding Firebase Security Rules for additional protection 
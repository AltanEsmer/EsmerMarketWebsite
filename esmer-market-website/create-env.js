const fs = require('fs');
const path = require('path');

// Path to .env.local file
const envFilePath = path.join(__dirname, '.env.local');

// Check if file already exists
if (fs.existsSync(envFilePath)) {
  console.log('\x1b[33m%s\x1b[0m', '.env.local file already exists. Skipping creation.');
  process.exit(0);
}

// Template for .env.local file
const envTemplate = `# Firebase Configuration
# Replace these placeholder values with your actual Firebase configuration
# You can find these values in your Firebase project settings

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
`;

// Write the file
try {
  fs.writeFileSync(envFilePath, envTemplate);
  console.log('\x1b[32m%s\x1b[0m', '.env.local file created successfully!');
  console.log('\x1b[36m%s\x1b[0m', 'Please edit the file and add your actual Firebase configuration values.');
  console.log('\x1b[36m%s\x1b[0m', 'You can find these values in your Firebase project settings:');
  console.log('\x1b[36m%s\x1b[0m', '1. Go to https://console.firebase.google.com/');
  console.log('\x1b[36m%s\x1b[0m', '2. Select your project');
  console.log('\x1b[36m%s\x1b[0m', '3. Click on the gear icon (⚙️) next to "Project Overview"');
  console.log('\x1b[36m%s\x1b[0m', '4. Select "Project settings"');
  console.log('\x1b[36m%s\x1b[0m', '5. Scroll down to "Your apps" section and select your web app');
  console.log('\x1b[36m%s\x1b[0m', '6. Copy the values from the Firebase configuration object');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', 'Error creating .env.local file:', error);
} 
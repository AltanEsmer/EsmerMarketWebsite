This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Firebase Setup

This project uses Firebase for authentication, database, and messaging. Follow these steps to set up Firebase:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Add a web app to your project
3. Copy the Firebase configuration to `.env.local` (use `.env.example` as a template)
4. Enable Email/Password authentication in the Firebase Console
5. Create a Firestore database in test mode

For detailed setup instructions, see:
- [Firebase Authentication Setup](./FIREBASE_AUTH_SETUP.md)
- [Firestore Setup](./docs/firestore-setup.md)
- [FCM Setup](./docs/fcm-setup.md)

## Fixing Firebase Permissions Errors

If you encounter "Missing or insufficient permissions" errors:

1. Apply the correct Firestore security rules by following the guide in [Apply Firestore Rules](./docs/apply-firestore-rules.md)
2. Make sure you have created an admin user in Firebase Authentication
3. Add the admin user to the adminUsers collection in Firestore using the provided script:

```bash
# Install dotenv if not already installed
npm install dotenv

# Run the script with the user's UID and email
node scripts/create-admin-user.js <user-uid> <user-email>
```

4. Sign out and sign back in to refresh authentication tokens

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Authentication & Maps Integration Guide

This guide explains how to configure and manage authentication with Clerk and the embedded Google Maps integration in the Esmer Market website.

## Clerk Authentication

### Setup

1. **Environment Variables**:
   - The application uses Clerk for authentication, which requires environment variables in `.env.local`.
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
   - `CLERK_SECRET_KEY`: Your Clerk secret key

2. **Authentication URLs**:
   The following URLs are configured for authentication:
   - Sign-in: `/sign-in`
   - Sign-up: `/sign-up`
   - After sign-in redirect: `/`
   - After sign-up redirect: `/`

3. **Public Routes**:
   The application is configured to allow public access to the following routes:
   - Home page (`/`)
   - About page (`/about`)
   - Contact page (`/contact`)
   - Products page (`/products`)
   - News page (`/news`)
   - Location page (`/location`)
   - Authentication pages (`/sign-in`, `/sign-up`)
   - API routes (`/api/*`)

### Managing Authentication

The authentication is managed through components in the app's layout:
- `<UserButton />`: Displays the user profile button when signed in
- `<SignInButton />`: Displays a sign-in button when not signed in

## Embedded Google Maps Integration

### Overview
The location page uses an embedded Google Maps iframe to display the Esmer Market location. This approach does not require an API key and provides all the necessary functionality.

### Map Configuration

1. **Embedded Map URL**:
   The map is embedded using an iframe with a URL that contains the location coordinates:
   ```javascript
   const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.048541565089!2d33.91362399999999!3d35.295954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE3JzQ1LjQiTiAzM8KwNTQnNDkuMCJF!5e0!3m2!1sen!2s!4v1615680000000!5m2!1sen!2s";
   ```

2. **Get Directions URL**:
   The "Get Directions" button uses a URL that opens Google Maps directions to Esmer Market:
   ```javascript
   const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Esmer+Market+Yenikent+Bulvarı+Yeni+Boğaziçi";
   ```

### Updating the Map

To update the map settings or location:

1. **Change the embedded map URL**:
   - Modify the `mapEmbedUrl` in the `app/location/page.tsx` file to point to a different location.
   - You can generate a new embed URL by:
     1. Go to Google Maps
     2. Find your location
     3. Click "Share" and select "Embed a map"
     4. Copy the iframe src URL

2. **Update directions URL**:
   - Modify the `directionsUrl` in the `app/location/page.tsx` file:
     ```javascript
     const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=YOUR_NEW_LOCATION_NAME_AND_ADDRESS";
     ```
   - Replace `YOUR_NEW_LOCATION_NAME_AND_ADDRESS` with your location, using `+` for spaces

## Troubleshooting

### Authentication Issues
- Ensure Clerk environment variables are correctly set in `.env.local`
- Check the Clerk dashboard for any account or API issues
- Ensure middleware.ts is configured with the correct public routes

### Maps Issues
- If the map doesn't display correctly, check that the embed URL is valid
- Ensure the iframe has appropriate width and height settings
- For directions issues, verify that the destination parameter is correctly formatted 
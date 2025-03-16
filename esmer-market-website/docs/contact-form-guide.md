# Contact Form Implementation Guide

This document explains how the contact form functionality works in the Esmer Market website, including how to set it up, troubleshoot common issues, and customize it if needed.

## Overview

The contact form implementation consists of:

1. A client-side form with validation and reCAPTCHA integration
2. A server-side API endpoint that sends emails using Nodemailer
3. Environment variables for secure credential management

## Setup and Configuration

### Environment Variables

The contact form requires the following environment variables in your `.env.local` file:

```
# Email Service
EMAIL_USER=your-gmail-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_RECIPIENT=recipient-email@example.com

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### Gmail App Password

For security reasons, Gmail requires you to use an App Password instead of your regular account password:

1. Go to your Google Account settings
2. Navigate to "Security" → "2-Step Verification" → "App passwords"
3. Select "Mail" and the device you're using
4. Generate and copy the 16-character app password
5. Paste this password in the `EMAIL_PASSWORD` environment variable

### reCAPTCHA Setup

The contact form uses Google reCAPTCHA v2 for anti-spam protection:

1. Go to the [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Register a new site with reCAPTCHA v2
3. Add your domain(s) to the list of allowed domains
4. Copy the Site Key and paste it in the `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` environment variable

## How It Works

### Form Functionality

1. **Client-side Validation**: The form validates required fields (name, email, subject, message) and email format before submission.
2. **reCAPTCHA**: Users must complete the reCAPTCHA challenge to prove they are human.
3. **Success/Error Feedback**: After submission, users receive clear feedback about the status of their message.

### API Endpoint

The `/api/contact` endpoint:

1. Receives form data as JSON
2. Validates required fields and email format
3. Creates a Nodemailer transporter with Gmail credentials
4. Formats and sends the email
5. Returns success or error responses

## Customization

### Styling

The form uses orange accents as requested. You can modify these colors by:

1. Editing the Tailwind CSS classes in `app/contact/page.tsx`
2. Look for classes like `bg-orange-50`, `text-orange-500`, `border-orange-500`, etc.

### Form Fields

To add, remove, or modify form fields:

1. Update the `formData` state object with your desired fields
2. Add/modify validation rules in the `validateForm` function
3. Update the form JSX with the corresponding input elements
4. Modify the API endpoint to handle the updated fields

## Troubleshooting

### Common Issues

1. **Emails not being received**
   - Check your spam folder
   - Verify Gmail credentials in the `.env.local` file
   - Ensure Gmail's "Less secure app access" is enabled or you're using an App Password

2. **Form validation errors**
   - Check the console for JavaScript errors
   - Verify that the validation functions match your form fields

3. **reCAPTCHA not working**
   - Ensure the site key in `.env.local` is correct
   - Check that your domain is allowed in the reCAPTCHA settings

4. **"Email sending failed" errors**
   - Check server logs for specific error messages
   - Verify that the Gmail account has not hit sending limits
   - Ensure the network connection is stable

## Security Considerations

1. **Environment Variables**: Never expose your email credentials in client-side code
2. **Input Sanitization**: The implementation sanitizes user input to prevent XSS attacks
3. **Rate Limiting**: Consider adding rate limiting to prevent form abuse
4. **CORS Policy**: The API endpoint is protected by Next.js's default CORS settings

## Additional Notes

- The form uses a default reCAPTCHA test key (`6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`) for development. Replace it with your production key before deployment.
- Gmail limits: Gmail has sending limits (500 emails/day for regular accounts). For high-volume scenarios, consider using a dedicated email service like SendGrid or Mailgun. 
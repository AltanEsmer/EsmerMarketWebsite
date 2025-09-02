# Email Setup Guide

## Gmail Configuration

To enable email functionality for the contact form, you need to set up Gmail authentication with an application-specific password.

### Steps:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to your Google Account settings
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Set Environment Variables** in your `.env.local` file:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password
   EMAIL_RECIPIENT=recipient@example.com
   ```

### Important Notes:
- Use the **app password**, not your regular Gmail password
- The app password is 16 characters without spaces
- Keep your app password secure and don't commit it to version control

### Current Behavior:
- If email configuration is missing or fails, the contact form will still work
- Form submissions are logged to the console
- Users receive a success message regardless of email delivery status
- This ensures the contact form is always functional even without email setup

### Testing:
1. Fill out the contact form
2. Check the console logs for submission details
3. If email is configured correctly, you should receive the email
4. If not, the submission is still logged and the user gets confirmation

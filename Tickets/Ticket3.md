**Title:** Implement Functional Contact Form with Gmail Integration

**Description:**
The "Contact" section of the website needs to be fully functional so users can send messages directly to my Gmail account. Additionally, apply a slight orange accent to the design for better aesthetics.

**Tasks:**
- Implement a contact form that allows users to send messages.
- Integrate form submissions with my Gmail account using a secure backend service (e.g., Node.js with Nodemailer, PHP mailer, or Firebase Functions).
- Ensure proper validation for email, name, and message fields.
- Use reCAPTCHA or another anti-spam measure to prevent bot abuse.
- Display success/error messages after form submission.
- Apply a subtle orange color to the design to enhance the UI.
- Test the functionality to confirm successful email delivery.

**Recommended Methods for Implementation:**
- Use **Nodemailer** with OAuth2 for secure Gmail integration.
- If using a backend, consider **Express.js** for handling API requests.
- Implement **AJAX or Fetch API** for asynchronous form submission without page reloads.
- Store environment variables securely using **dotenv** in Node.js or server-side configurations.
- Ensure email headers are correctly set to avoid spam filtering.

**Possible Errors & Solutions:**
1. **Emails not being received** → Check spam folder, ensure SMTP configuration is correct, verify Gmail security settings.
2. **Form validation errors** → Ensure client-side and server-side validation is properly implemented.
3. **CORS issues** → Configure backend CORS policies correctly to allow form submissions.
4. **Bot spam submissions** → Implement Google reCAPTCHA or honeypot fields.
5. **Gmail authentication failure** → Use OAuth2 instead of less secure app passwords.
6. **UI styling not applying** → Ensure proper CSS specificity and avoid conflicting styles.
7. **Message delivery delays** → Use a reliable email service and check server performance.

**Acceptance Criteria:**
- Users can submit a message via the contact form.
- Emails are correctly sent and received in my Gmail inbox.
- Form fields have proper validation.
- UI has a slight orange touch without overwhelming the existing design.
- Error and success messages appear when appropriate.
- Security measures prevent spam and unauthorized email access.

**Priority:** High

**Additional Notes:**
Make sure the email integration is secure and avoids exposing sensitive credentials. Use environment variables if needed, and ensure all user input is sanitized to prevent security vulnerabilities.

const nodemailer = require('nodemailer');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const { name, email, subject, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Verify reCAPTCHA token
    if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      });

      const recaptchaData = await recaptchaResponse.json();
      
      if (!recaptchaData.success) {
        console.log('reCAPTCHA verification failed:', recaptchaData);
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
          },
          body: JSON.stringify({ error: 'reCAPTCHA verification failed. Please try again.' })
        };
      }
    } else if (process.env.RECAPTCHA_SECRET_KEY && !recaptchaToken) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ error: 'reCAPTCHA token is required' })
      };
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.EMAIL_RECIPIENT) {
      console.log('Email configuration missing, logging contact form submission:', { 
        name, 
        email, 
        subject, 
        message,
        timestamp: new Date().toISOString()
      });
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ 
          success: true, 
          message: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız!' 
        })
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `Esmer Market Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            Yeni İletişim Formu Mesajı
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Mesaj Detayları:</h3>
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Mesaj:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-radius: 8px; border-left: 4px solid #059669;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              <strong>Esmer Market</strong><br>
              Bu mesaj web sitesi iletişim formundan gönderilmiştir.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      // Handle specific Gmail authentication errors
      if (emailError.code === 'EAUTH' && (emailError.responseCode === 534 || emailError.responseCode === 535)) {
        console.log('Gmail authentication failed - app-specific password required:', { 
          name, 
          email, 
          subject, 
          message,
          timestamp: new Date().toISOString(),
          errorCode: emailError.responseCode
        });
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
          },
          body: JSON.stringify({ 
            success: true, 
            message: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız!' 
          })
        };
      }
      throw emailError; // Re-throw other email errors
    }
    
    console.log('Contact form email sent successfully:', { 
      name, 
      email, 
      subject,
      timestamp: new Date().toISOString()
    });

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız!' 
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // If email fails, still log the submission with the original form data
    let formData = {};
    try {
      const parsedBody = JSON.parse(event.body);
      formData = {
        name: parsedBody.name, 
        email: parsedBody.email, 
        subject: parsedBody.subject, 
        message: parsedBody.message
      };
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
    }
    
    console.log('Email failed, but logging contact form submission:', { 
      ...formData,
      timestamp: new Date().toISOString(),
      error: error.message || 'Unknown error'
    });
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Failed to send email, but your message has been received. We will contact you soon!',
        success: true // Still return success since we logged the message
      })
    };
  }
};

"use client";

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  // Form status state
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });
  
  // Form validation state
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    recaptcha: ''
  });
  
  // reCAPTCHA ref
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token) {
      setFormErrors(prev => ({ ...prev, recaptcha: '' }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    // reCAPTCHA validation
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please complete the reCAPTCHA verification';
      isValid = false;
    }
    
    setFormErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      setFormStatus({
        isSubmitting: true,
        isSubmitted: false,
        isError: false,
        message: 'Sending your message...'
      });
      
      // Send form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message: 'Your message has been sent successfully! We will get back to you soon.'
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        // Error
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          isError: true,
          message: data.error || 'An error occurred while sending your message. Please try again.'
        });
      }
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: 'An error occurred while sending your message. Please try again.'
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700">
              We'd love to hear from you. Send us a message or reach out through our contact information below.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-700 mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              {/* Success Message */}
              {formStatus.isSubmitted && (
                <div className="mb-6 rounded-md bg-green-50 p-4 border border-green-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">{formStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {formStatus.isError && (
                <div className="mb-6 rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{formStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name <span className="text-green-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${formErrors.firstName ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                      placeholder="Enter your first name"
                    />
                    {formErrors.firstName && (
                      <p className="text-sm text-red-600">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name <span className="text-green-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${formErrors.lastName ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                      placeholder="Enter your last name"
                    />
                    {formErrors.lastName && (
                      <p className="text-sm text-red-600">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email <span className="text-green-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${formErrors.email ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject <span className="text-green-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${formErrors.subject ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                    placeholder="Enter subject"
                  />
                  {formErrors.subject && (
                    <p className="text-sm text-red-600">{formErrors.subject}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message <span className="text-green-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${formErrors.message ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                    placeholder="Enter your message"
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-sm text-red-600">{formErrors.message}</p>
                  )}
                </div>
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Default test key
                    onChange={handleRecaptchaChange}
                  />
                  {formErrors.recaptcha && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.recaptcha}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={formStatus.isSubmitting || formStatus.isSubmitted}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:opacity-70"
                >
                  {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700">
                  You can also reach out to us using the following contact details.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Store Address</h3>
                      <address className="mt-2 not-italic text-gray-700">
                        <p>Yenikent Bulvarı, Yeni Boğaziçi</p>
                      </address>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Customer Service</h3>
                      <div className="mt-2 space-y-1 text-gray-700">
                        <p>
                          <strong>Phone:</strong> +905338214575
                        </p>
                        <p>
                          <strong>Email:</strong> info@esmermarket.com
                        </p>
                        <p>
                          <strong>Hours:</strong> Every day, 8:00 AM - 12:00 AM (Midnight)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Connect With Us</h3>
                      <div className="mt-4 flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-green-500" aria-label="Facebook">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-green-500" aria-label="Instagram">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-green-500" aria-label="Twitter">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Hours</h3>
                <table className="w-full text-gray-700">
                  <tbody>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Every Day</td>
                      <td className="py-2">8:00 AM - 12:00 AM (Midnight)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="w-full py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer delivery services?</h3>
                <p className="text-gray-700">
                  No, we don't offer delivery services yet Maybe in the future.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I order items not found in the store?</h3>
                <p className="text-gray-700">
                  If the demand is high, we can order the item from the supplier.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer catering services?</h3>
                <p className="text-gray-700">
                  It depends on the date and time. If holiday or celebration is coming, we can prepare for our customers.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-700">
                  We accept all major credit cards, debit cards, cash, and mobile payment options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
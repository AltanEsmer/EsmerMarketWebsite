"use client";

import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate_limited'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // Check for rate limiting on component mount - TEMPORARILY DISABLED
  useEffect(() => {
    // Rate limiting temporarily disabled for testing
    // const lastSubmissionTime = localStorage.getItem('lastContactSubmission');
    // if (lastSubmissionTime) {
    //   const lastSubmission = parseInt(lastSubmissionTime, 10);
    //   const currentTime = Date.now();
    //   const hourInMs = 60 * 60 * 1000; // 1 hour in milliseconds
    //   
    //   if (currentTime - lastSubmission < hourInMs) {
    //     const remainingTime = hourInMs - (currentTime - lastSubmission);
    //     setSubmitStatus('rate_limited');
    //     setTimeRemaining(Math.ceil(remainingTime / (60 * 1000))); // Convert to minutes
    //     
    //     // Set up timer to update remaining time
    //     const timer = setInterval(() => {
    //       const newLastSubmission = parseInt(localStorage.getItem('lastContactSubmission') || '0', 10);
    //       const newCurrentTime = Date.now();
    //       const newRemainingTime = hourInMs - (newCurrentTime - newLastSubmission);
    //       
    //       if (newRemainingTime <= 0) {
    //         setSubmitStatus('idle');
    //         setTimeRemaining(null);
    //         clearInterval(timer);
    //       } else {
    //         setTimeRemaining(Math.ceil(newRemainingTime / (60 * 1000)));
    //       }
    //     }, 60000); // Update every minute
    //     
    //     return () => clearInterval(timer);
    //   }
    // }
  }, []);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Check if rate limited - TEMPORARILY DISABLED
    // const lastSubmissionTime = localStorage.getItem('lastContactSubmission');
    // if (lastSubmissionTime) {
    //   const lastSubmission = parseInt(lastSubmissionTime, 10);
    //   const currentTime = Date.now();
    //   const hourInMs = 60 * 60 * 1000; // 1 hour in milliseconds
    //   
    //   if (currentTime - lastSubmission < hourInMs) {
    //     const remainingTime = hourInMs - (currentTime - lastSubmission);
    //     setSubmitStatus('rate_limited');
    //     setTimeRemaining(Math.ceil(remainingTime / (60 * 1000))); // Convert to minutes
    //     return;
    //   }
    // }

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setSubmitStatus('error');
      setErrorMessage('Lütfen reCAPTCHA doğrulamasını tamamlayın.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
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
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          // If response is not valid JSON, create a generic error
          errorData = { message: 'Server error occurred. Please try again.' };
        }
        throw new Error(errorData.message || 'Failed to send message');
      }
      
      // Parse the response
      try {
        await response.json();
      } catch {
        // If response is not valid JSON, assume success
        console.log('Response was not valid JSON, assuming success');
      }
      
      // Store submission time in localStorage - TEMPORARILY DISABLED
      // localStorage.setItem('lastContactSubmission', Date.now().toString());
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error: unknown) {
      setSubmitStatus('error');
      setErrorMessage((error as Error).message || 'An error occurred while sending your message');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-700">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.form.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('contact.form.description')}
              </p>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
                  <p className="font-medium">{t('contact.form.success.title')}</p>
                  <p className="text-sm mt-1">{t('contact.form.success.message')}</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
                  <p className="font-medium">{t('contact.form.error.title')}</p>
                  <p className="text-sm mt-1">{errorMessage || t('contact.form.error.message')}</p>
                </div>
              )}
              
              {submitStatus === 'rate_limited' && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                  <p className="font-medium">Mesaj limiti aşıldı</p>
                  <p className="text-sm mt-1">
                    Bir saat içinde sadece bir mesaj gönderebilirsiniz. Lütfen {timeRemaining} dakika sonra tekrar deneyiniz.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.fields.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitStatus === 'rate_limited'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.fields.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={submitStatus === 'rate_limited'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.fields.subject')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={submitStatus === 'rate_limited'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">{t('contact.form.fields.subject_placeholder')}</option>
                    <option value="general">{t('contact.form.fields.subject_options.general')}</option>
                    <option value="products">{t('contact.form.fields.subject_options.products')}</option>
                    <option value="wholesale">{t('contact.form.fields.subject_options.wholesale')}</option>
                    <option value="feedback">{t('contact.form.fields.subject_options.feedback')}</option>
                    <option value="other">{t('contact.form.fields.subject_options.other')}</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.fields.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={submitStatus === 'rate_limited'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-500"
                  ></textarea>
                </div>
                
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={handleRecaptchaChange}
                    theme="light"
                    size="normal"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'rate_limited' || !recaptchaToken}
                    className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      (isSubmitting || submitStatus === 'rate_limited' || !recaptchaToken) ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? t('contact.form.submitting') : submitStatus === 'rate_limited' ? 'Mesaj limiti aşıldı' : t('contact.form.submit')}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.info.title')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{t('contact.info.address.title')}</h3>
                      <p className="text-gray-600">{t('contact.info.address.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{t('contact.info.phone.title')}</h3>
                      <p className="text-gray-600">{t('contact.info.phone.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{t('contact.info.email.title')}</h3>
                      <p className="text-gray-600">{t('contact.info.email.value')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{t('contact.info.hours.title')}</h3>
                      <p className="text-gray-600">{t('contact.info.hours.value')}</p>
                      <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
                        <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                        <span className="text-xs font-medium text-gray-800">{t('contact.info.hours.currently_open')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.location.title')}</h2>
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.2991744011166!2d33.89203387677729!3d35.22227797979391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzIwLjIiTiAzM8KwNTMnMzkuMiJF!5e0!3m2!1sen!2s!4v1615680000000!5m2!1sen!2s"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title={t('contact.location.map_title')}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
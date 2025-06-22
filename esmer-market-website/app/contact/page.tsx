"use client";

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import IsOpenIndicator from '../components/IsOpenIndicator';

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
      newErrors.firstName = 'Ad alanı zorunludur';
      isValid = false;
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad alanı zorunludur';
      isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Lütfen geçerli bir e-posta adresi girin';
      isValid = false;
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Konu alanı zorunludur';
      isValid = false;
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj alanı zorunludur';
      isValid = false;
    }
    
    // reCAPTCHA validation
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Lütfen reCAPTCHA doğrulamasını tamamlayın';
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
        message: 'Mesajınız gönderiliyor...'
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
          message: 'Mesajınız başarıyla gönderildi! En kısa sürede size geri dönüş yapacağız.'
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
          message: data.error || 'Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
        });
      }
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: 'Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50 dark:bg-green-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-100 mb-6">
              Bize Ulaşın
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Sizden haber almaktan memnuniyet duyarız. Bize mesaj gönderin veya aşağıdaki iletişim bilgilerimizden bize ulaşın.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Bize Mesaj Gönderin</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Aşağıdaki formu doldurun, en kısa sürede size geri dönüş yapacağız.
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
                      Ad <span className="text-green-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${formErrors.firstName ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                      placeholder="Adınızı girin"
                    />
                    {formErrors.firstName && (
                      <p className="text-sm text-red-600">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Soyad <span className="text-green-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${formErrors.lastName ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                      placeholder="Soyadınızı girin"
                    />
                    {formErrors.lastName && (
                      <p className="text-sm text-red-600">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    E-posta <span className="text-green-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${formErrors.email ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                    placeholder="E-posta adresinizi girin"
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Telefon Numarası (İsteğe bağlı)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Telefon numaranızı girin"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Konu <span className="text-green-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${formErrors.subject ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                    placeholder="Konuyu girin"
                  />
                  {formErrors.subject && (
                    <p className="text-sm text-red-600">{formErrors.subject}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Mesaj <span className="text-green-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${formErrors.message ? 'border-red-300' : 'border-gray-300'} p-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                    placeholder="Mesajınızı girin"
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
                  {formStatus.isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">İletişim Bilgileri</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <svg className="h-6 w-6 text-green-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Adres</h3>
                      <p className="text-gray-600 dark:text-gray-400">Yenikent Bulvarı, Yeni Boğaziçi GaziMağusa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg className="h-6 w-6 text-green-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Telefon</h3>
                      <p className="text-gray-600 dark:text-gray-400">+90 533 825 7214</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg className="h-6 w-6 text-green-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">E-posta</h3>
                      <p className="text-gray-600 dark:text-gray-400">info@esmermarket.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg className="h-6 w-6 text-green-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Çalışma Saatleri</h3>
                      <p className="text-gray-600 dark:text-gray-400">Pazartesi-Pazar: 08:00 - 22:00</p>
                      <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        <IsOpenIndicator />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Konum</h2>
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 shadow-sm relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265.0600505816297!2d33.9116!3d35.1245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDA3JzI4LjIiTiAzM8KwNTQnNDEuOCJF!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Esmer Market Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="w-full py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sıkça Sorulan Sorular</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Teslimat hizmeti sunuyor musunuz?</h3>
                <p className="text-gray-700">
                  Hayır, henüz teslimat hizmeti sunmuyoruz. Belki ileride sunabiliriz.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mağazada bulunmayan ürünleri sipariş edebilir miyim?</h3>
                <p className="text-gray-700">
                  Talep yüksekse, ürünü tedarikçiden sipariş edebiliriz.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Catering hizmeti sunuyor musunuz?</h3>
                <p className="text-gray-700">
                  Tarih ve zamana bağlıdır. Eğer bayram veya kutlama yaklaşıyorsa, müşterilerimiz için hazırlık yapabiliriz.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Hangi ödeme yöntemlerini kabul ediyorsunuz?</h3>
                <p className="text-gray-700">
                  Tüm büyük kredi kartları, banka kartları, nakit ve mobil ödeme seçeneklerini kabul ediyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
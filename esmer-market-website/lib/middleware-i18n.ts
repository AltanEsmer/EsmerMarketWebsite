import { NextRequest, NextResponse } from 'next/server';

const localeCookie = 'NEXT_LOCALE';
const supportedLocales = ['en', 'tr'];
const defaultLocale = 'en';

export function getLocaleFromRequest(request: NextRequest): string {
  // Check cookie first
  const cookieLocale = request.cookies.get(localeCookie)?.value;
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    return cookieLocale;
  }
  
  // Then check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const parsedLocales = acceptLanguage.split(',')
      .map(l => l.split(';')[0].trim())
      .find(l => supportedLocales.some(sl => l.startsWith(sl)));
      
    if (parsedLocales) {
      const matchedLocale = supportedLocales.find(sl => 
        parsedLocales.startsWith(sl)
      );
      if (matchedLocale) return matchedLocale;
    }
  }
  
  // Default to English
  return defaultLocale;
}

export function setLocaleCookie(response: NextResponse, locale: string): NextResponse {
  // Set or update locale cookie
  response.cookies.set(localeCookie, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  
  return response;
} 
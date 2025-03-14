export default function LocationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              Location & Hours
            </h1>
            <p className="text-xl text-gray-700">
              Find us in your neighborhood and stop by during our business hours.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Location Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Address</h2>
                <address className="not-italic text-xl text-gray-700">
                  <p>Yenikent Bulvarı, Yeni Boğaziçi</p>
                </address>
                <div className="pt-4">
                  <p className="text-xl text-gray-700">
                    <strong>Phone:</strong> +905338214575
                  </p>
                  <p className="text-xl text-gray-700">
                    <strong>Email:</strong> info@esmermarket.com
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Hours of Operation</h2>
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <table className="w-full text-gray-700">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 pr-4 text-lg font-medium">Every Day</td>
                        <td className="py-3 text-lg">8:00 AM - 12:00 AM (Midnight)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Getting Here</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">By Car</h3>
                    <p className="text-gray-700">
                      Located on Yenikent Bulvarı in Yeni Boğaziçi. Ample parking is available for our customers.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <a 
                  href="https://maps.google.com/?q=Yenikent+Bulvarı+Yeni+Boğaziçi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  Get Directions
                </a>
              </div>
            </div>
            
            {/* Map */}
            <div className="space-y-6">
              <div className="aspect-video w-full overflow-hidden rounded-xl border bg-gray-100 shadow-md">
                {/* Google Maps integration would go here */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">Map Loading...</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Amenities</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Pharmacy nearby
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Public transportation access
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Restaurants and cafes in the area
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Holiday Notice */}
      <section className="w-full py-8 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-xl border border-amber-200 bg-white p-6 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800">Holiday Hours</h3>
                <p className="mt-1 text-amber-700">
                  Please note that our hours may vary during holidays and special events.
                  Follow our social media or contact us for the most up-to-date information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
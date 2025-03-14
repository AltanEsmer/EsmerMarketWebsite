export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-6">
              About Esmer Market
            </h1>
            <p className="text-xl text-gray-700">
              Learn about our story, values, and commitment to providing fresh, high-quality products.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Esmer Market was founded in 2019 by Eralp Esmer with a simple mission: to bring fresh, 
                  high-quality groceries to our community. What started as a small corner store has grown into 
                  a beloved neighborhood market offering a wide selection of produce, specialty foods, and everyday essentials.
                </p>
                <p>
                  Over the years, we've built strong relationships with local farmers and producers, allowing us 
                  to provide the freshest seasonal offerings while supporting our local economy.
                </p>
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl bg-gray-100 shadow-md relative">
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-base">Store Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">What drives us every day and shapes how we serve our community.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600">
                  We're committed to offering only the highest quality products. We carefully select 
                  every item that goes on our shelves.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600">
                  We believe in building strong community ties through food. We host events, workshops, 
                  and actively participate in local initiatives.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We're dedicated to sustainable practices, from reducing waste to supporting 
                  eco-friendly suppliers and promoting reusable packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="aspect-video overflow-hidden rounded-xl bg-gray-100 shadow-md relative order-2 md:order-1">
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-base">Team Image</span>
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Team</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our dedicated team of food enthusiasts is passionate about helping you find the perfect 
                  ingredients for your meals. Many of our staff members have been with us for years and have 
                  deep knowledge about the products we carry.
                </p>
                <p>
                  We pride ourselves on providing friendly, personalized service and are always happy to 
                  offer recommendations, cooking tips, or help you find exactly what you're looking for.
                </p>
              </div>
              <div className="pt-4">
                <a 
                  href="/contact" 
                  className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  Contact Our Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
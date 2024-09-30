// components/Features.js
export default function Features() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-3xl font-bold mb-4">Create Your Perfect Landing Page In Seconds</h3>
          <p className="text-gray-400 mb-8">
            Our template is perfect to create the look, act, and feel of the landing page you've always wanted. 
            With NextSiders, you no longer have to compromise.
          </p>
        </div>
        <div className="bg-gradient-to-br from-primary to-white p-8 rounded-lg shadow-lg">
          <h4 className="text-xl font-bold">Revenue by Location</h4>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li>New York: 72K</li>
            <li>San Francisco: 39K</li>
            <li>Sydney: 25K</li>
            <li>Singapore: 61K</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

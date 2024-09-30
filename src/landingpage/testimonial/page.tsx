

export const Testimonials = () => {
    return (
        <section className="bg-black text-white py-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">People Love Using NextSiders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Testimonial 1 */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <p className="mb-4">I've been using NextSiders for over a year now and their customer service is excellent! Whenever I have a question, the team is always available and willing to help. Highly recommend!</p>
                        <p className="font-bold">Melissa Smith</p>
                        <p>Marketing Manager</p>
                    </div>
                    {/* Repeat this structure for each testimonial */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <p className="mb-4">NextSiders has streamlined our workflow and increased our efficiency by 40%. The platform is user-friendly and intuitive.</p>
                        <p className="font-bold">John Doe</p>
                        <p>CEO, TechCompany</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <p className="mb-4">Switching to NextSiders was the best decision we made this year. The support team is outstanding and the product is top-notch.</p>
                        <p className="font-bold">Jane Johnson</p>
                        <p>CTO, InnovateCorp</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

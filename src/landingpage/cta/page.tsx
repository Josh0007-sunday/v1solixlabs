

export const CTA = () => {
    return (
        <section className="relative bg-black text-white py-16 px-10 text-center overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">Create Your Professional Website with Our Next.js Template!</h2>
                <p className="text-lg mb-8">
                    Get started today on creating a stunning landing page for your website with our easy-to-use template!
                    Pick the style and layout that best suits your needs and make your website stand out from the crowd.
                </p>
                <div className="space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-500 transition-colors px-8 py-4 rounded-full font-semibold">Get Started</button>
                    <button className="bg-blue-800 hover:bg-blue-700 transition-colors px-8 py-4 rounded-full font-semibold">Learn More</button>
                </div>
            </div>
            <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500 blur-3xl opacity-30 rounded-full"></div>
        </section>
    )
}

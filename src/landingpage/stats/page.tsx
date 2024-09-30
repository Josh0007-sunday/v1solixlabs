
export const Stats = () => {
    return (
        <div className="relative flex flex-col sm:flex-row justify-between items-center bg-black text-white py-16 px-10 overflow-hidden">
            <div className="relative z-10 text-center sm:mr-8 mb-4 sm:mb-0">
                <h3 className="text-5xl font-bold">24/7</h3>
                <p className="text-lg">Support</p>
            </div>
            <div className="relative z-10 text-center sm:mr-8 mb-4 sm:mb-0">
                <h3 className="text-5xl font-bold">120+</h3>
                <p className="text-lg">Customers</p>
            </div>
            <div className="relative z-10 text-center sm:mr-8 mb-4 sm:mb-0">
                <h3 className="text-5xl font-bold">90</h3>
                <p className="text-lg">Cities</p>
            </div>
            <div className="relative z-10 text-center">
                <h3 className="text-5xl font-bold">99.9%</h3>
                <p className="text-lg">Uptime</p>
            </div>

            <div className="absolute right-1/3 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-700 blur-3xl opacity-50 rounded-full"></div>
        </div>

    )
}

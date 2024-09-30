

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Solix</h3>
                    <p>Our goal is to provide the best tools and services, high-performance, scalable, and secure Protocol on solana.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Pages</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact</h3>
                    <p className="text-gray-400">Email: support@nextsiders.com</p>
                </div>
            </div>
        </footer>
    )
}

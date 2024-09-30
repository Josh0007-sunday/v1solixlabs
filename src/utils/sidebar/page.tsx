import {Link} from "react-router-dom";
import logo from "../images/logo.png";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-md">
            <div className="p-4">
                <img src={logo} alt="Logo" width={150} height={50} />
            </div>
            <nav className="mt-8">
                <ul className="space-y-2">
                    <li>
                        <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span className="mr-3">🏠</span> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/swap"  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span className="mr-3">🔃</span> Swap
                        </Link>
                    </li>
                    <li>
                        <Link to="/nfts" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span className="mr-3">🖼️</span> Nfts
                        </Link>
                    </li>
                    <li>
                        <Link to="/buymecofee" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span className="mr-3">📃</span> Buy Me Cofee
                        </Link>
                    </li>
                    <li>
                        <Link to="/vault" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span className="mr-3">🏗️</span> Savings
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
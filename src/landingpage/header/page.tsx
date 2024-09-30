// components/Header.js
import {Link} from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-black text-white">
      <h1 className="text-2xl font-bold">SOLIX</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><Link to="#features">Features</Link></li>
          <li><Link to="#faq">FAQ</Link></li>
          <li><Link to="#about">About</Link></li>
          <li><Link to="#pricing">Pricing</Link></li>
          <li><Link to="#blog">Blog</Link></li>
        </ul>
      </nav>
      <div className="space-x-4">
        <button className="py-2 px-4 bg-gray-800 rounded">Learn More</button>
        <Link to="/dashboard" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-white">LAUNCH APP</Link>
      </div>
    </header>
  );
}

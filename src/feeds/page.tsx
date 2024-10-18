import TradingViewWidget from "./component/tradingview/page";
import PriceChart from "./component/pricechart/page";
import TrendingProjects from "./component/trending/page";
import NewsFeed from "./component/newsfeed/page";
import solixlogo from "../utils/images/solix_logo.png";

const PriceFeedActivity = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <img
              className="h-12 w-auto max-w-full object-contain"
              src={solixlogo}
              alt="solixfilogo"
            />
          </div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Markets
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                News
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - 60% */}
          <div className="lg:w-3/5">
            <div className="bg-gray-800 rounded-lg p-4 mb-8">
              <h2 className="text-xl font-bold mb-4">Price Chart</h2>
              <TradingViewWidget />
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">Price Feed</h2>
              <PriceChart />
            </div>
          </div>

          {/* Right side - 40% */}
          <div className="lg:w-2/5">
            <div className="bg-gray-800 rounded-lg p-4 mb-8">
              <h2 className="text-xl font-bold mb-4">Trending Projects</h2>
              <TrendingProjects />
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">News Feed</h2>
              <NewsFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFeedActivity;

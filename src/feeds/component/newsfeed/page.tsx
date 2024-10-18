import React from "react";

const NewsFeed = () => {
  const news = [
    {
      id: 1,
      title: "Major Cryptocurrency Exchange Launches New Trading Pairs",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Blockchain Startup Raises $50 Million in Series A Funding",
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Central Bank Announces Plans for Digital Currency Pilot",
      time: "6 hours ago",
    },
    {
      id: 4,
      title: "New Decentralized Finance Protocol Gains Traction",
      time: "8 hours ago",
    },
    {
      id: 5,
      title: "Crypto Market Cap Surpasses $2 Trillion Mark",
      time: "10 hours ago",
    },
  ];

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.time}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;

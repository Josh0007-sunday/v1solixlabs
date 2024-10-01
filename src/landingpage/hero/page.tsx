
// components/Hero.js
export default function Hero() {
  return (
    <section className="relative text-center py-24 bg-black text-white overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <p className="text-sm font-medium text-accent mb-4">
          <span className="bg-blue-600 py-1 px-3 rounded-full">NEW</span> Now live on Solana Devnet!
        </p>
        <h2 className="text-5xl font-bold mb-4">Decentralised Portfolio Dashboard</h2>
        <p className="text-xl text-gray-400 mb-8">
          Monitor your Positions, Nfts, Swaps, Transactions and Wallets in one place
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            LAUNCH APP
          </button>
          <button className="bg-transparent hover:bg-blue-700 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Learn More
          </button>
        </div>
      </div>
      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 blur-3xl opacity-40 rounded-full"></div>
    </section>
  );
}
import './App.css';
import './wallet-button-override.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WalletConnectionProvider from './walletcontext/page';
import DashboardLayout from './component/dashboard/page';
import Terminal from './component/swap/page';
import NFTDisplay from './component/nfts/page';
import BuyMeCoffeeForm from './component/buymecofee/page';
import Landingpage from './landingpage/page';
import { Buffer } from "buffer";
import { useState, useEffect } from 'react';
import SendReceive from './component/sendandreceive/page';
import PriceFeedActivity from './feeds/page';
import Disconnected from './disconnected/page';
// import USDCVaultComponent from './component/vault/page';

(window as any).Buffer = Buffer;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkTheme(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
  };
  return (
    <>
      <WalletConnectionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage/>} />
            <Route path="/disconnected" element={<Disconnected isDarkTheme={isDarkTheme}/>} />
            <Route path="/dashboard" element={<DashboardLayout isDarkTheme={isDarkTheme}  toggleTheme={toggleTheme} />} />
            <Route path="/swap" element={<Terminal isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />} />
           <Route path='/nfts' element={<NFTDisplay isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />} />
            <Route path='/buymecofee' element={<BuyMeCoffeeForm  isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}/>} />
             <Route path="/send-receive" element={<SendReceive isDarkTheme={isDarkTheme}  toggleTheme={toggleTheme} />} />
             <Route path='/solix-oracle-feed' element={<PriceFeedActivity />} />
            {/* <Route path="/vault" element={<USDCVaultComponent/>} /> */}
          </Routes>
        </BrowserRouter>
      </WalletConnectionProvider>
    </>
  )
}

export default App;

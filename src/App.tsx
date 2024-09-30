import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import USDCVaultComponent from './component/vault/page';
import WalletConnectionProvider from './walletcontext/page';
import DashboardLayout from './component/dashboard/page';
import Terminal from './component/swap/page';
import NFTDisplay from './component/nfts/page';
import BuyMeCoffeeForm from './component/buymecofee/page';
import Landingpage from './landingpage/page';


function App() {


  return (
    <>
      <WalletConnectionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage/>} />
            <Route path="/dashboard" element={<DashboardLayout/>} />
            <Route path="/swap" element={<Terminal/>} />
            <Route path='/nfts' element={<NFTDisplay/>} />
            <Route path='/buymecofee' element={<BuyMeCoffeeForm/>} />
            {/* <Route path="/vault" element={<USDCVaultComponent/>} /> */}
          </Routes>
        </BrowserRouter>
      </WalletConnectionProvider>
    </>
  )
}

export default App;

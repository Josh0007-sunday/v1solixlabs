import Sidebar from '../../utils/sidebar/page';
import Header from '../../utils/header/page';
import Footer from '../../utils/footer/page';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Connect = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />


                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                                <p>please connect wallet</p>
                                <WalletMultiButton />
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />

            </div>
        </div>
    );
};

export default Connect;
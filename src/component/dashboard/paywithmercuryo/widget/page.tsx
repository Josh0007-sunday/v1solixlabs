import React, { useState, useEffect } from 'react';
import SHA512 from 'crypto-js/sha512';
import { FaExchangeAlt } from 'react-icons/fa';

interface MercuryoWidgetProps {
  widgetId: string;
  address: string;
  hideAddress?: boolean;
  secretKey: string;
  isDarkTheme: boolean;
}

const MercuryoWidget: React.FC<MercuryoWidgetProps> = ({
  widgetId,
  address,
  hideAddress = false,
  secretKey,
  isDarkTheme,
}) => {
  const [widgetUrl, setWidgetUrl] = useState<string>('');

  useEffect(() => {
    const generateSignature = (address: string, secret: string): string => {
      return SHA512(address + secret).toString();
    };

    const signature = generateSignature(address, secretKey);

    const url = new URL('https://exchange.mercuryo.io/');
    url.searchParams.append('widget_id', widgetId);
    url.searchParams.append('address', address);
    url.searchParams.append('hide_address', hideAddress.toString());
    url.searchParams.append('signature', signature);

    setWidgetUrl(url.toString());
  }, [widgetId, address, hideAddress, secretKey]);

  const openWidget = () => {
    const width = 500;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      widgetUrl,
      'Mercuryo Widget',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
  };

  return (
    <div>
      <button
        onClick={openWidget}
        className={`flex items-center justify-center px-4 py-2 text-sm font-medium ${
          isDarkTheme
            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
            : "bg-white text-gray-900 hover:bg-gray-100"
        }
                border ${isDarkTheme ? "border-gray-600" : "border-gray-300"}
                rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isDarkTheme ? "focus:ring-blue-500" : "focus:ring-blue-500"}
                transition duration-150 ease-in-out`}
      >
        <FaExchangeAlt
          className={`mr-2 ${isDarkTheme ? "text-blue-400" : "text-blue-500"}`}
        />
        Exchange Crypto
      </button>
    </div>
  );
};

export default MercuryoWidget;
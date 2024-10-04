import React, { useState, ReactNode, ReactElement } from 'react';
import Sidebar from './sidebar/page';
import Header from './header/page';
import Footer from './footer/page';

interface MainLayoutProps {
  children: ReactNode;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

interface ChildProps {
  isDarkTheme: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isDarkTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarToggle = (sidebarIsOpen: boolean) => {
    setIsOpen(sidebarIsOpen);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<ChildProps>, { isDarkTheme });
    }
    return child;
  });

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <Sidebar onToggle={handleSidebarToggle} isDarkTheme={isDarkTheme} />
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'} md:ml-16`}
      >
        <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        <main className="flex-grow overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {childrenWithProps}
          </div>
        </main>
        <Footer isDarkTheme={isDarkTheme} />
      </div>
    </div>
  );
};

export default MainLayout;
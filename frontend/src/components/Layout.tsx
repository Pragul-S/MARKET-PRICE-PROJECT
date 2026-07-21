import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p>&copy; 2024 Market-Price Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;

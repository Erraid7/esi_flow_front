// components/layout/Layout.jsx
import React from 'react';
import Head from 'next/head';

const Layout = ({ children, title = 'ESI FLOW - Technical Issue Tracking' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="ESI Flow - Track and report technical issues at ESI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {children}
      </main>
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} ESI FLOW. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
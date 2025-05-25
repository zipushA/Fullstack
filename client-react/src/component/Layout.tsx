import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import "./Footer.css"
const Layout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.jpg" alt="לוגו" className="footer-logo-img" />
            <h3>מורה בלחיצת כפתור</h3>
          </div>
          <p>© {new Date().getFullYear()} מורה בלחיצת כפתור. כל הזכויות שמורות.</p>
          <div className="footer-links">
            <a href="#">תנאי שימוש</a>
            <a href="#">מדיניות פרטיות</a>
            <a href="#">צור קשר</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="p-4 bg-blue-500 text-white flex justify-between">
      <h1 className="font-bold text-lg">SocialApp</h1>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
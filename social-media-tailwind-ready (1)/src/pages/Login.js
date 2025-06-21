import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4">
      <h2>Login</h2>
      <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 m-2" />
      <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 m-2" />
      <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2">Login</button>
    </div>
  );
}

export default Login;
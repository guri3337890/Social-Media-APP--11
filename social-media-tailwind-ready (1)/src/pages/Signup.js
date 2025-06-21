import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4">
      <h2>Signup</h2>
      <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 m-2" />
      <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 m-2" />
      <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2">Signup</button>
    </div>
  );
}

export default Signup;
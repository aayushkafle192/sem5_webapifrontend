// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/signup', {
        fullname,
        email,
        password,
      });
      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url('/assets/denim.jpg')",
          opacity: 0.05,
          zIndex: 0,
        }}
      />
      {/* Purple overlay */}
      <div className="absolute inset-0 bg-purple-700 bg-opacity-60" style={{ zIndex: 0 }}></div>

      {/* Register form box */}
      <div className="relative bg-white p-12 rounded-3xl shadow-xl w-full max-w-lg min-h-[580px] z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

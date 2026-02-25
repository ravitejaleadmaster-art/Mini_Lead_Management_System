import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', credentials);
      localStorage.setItem('token', res.data.token); // Store JWT
      navigate('/leads'); 
    } catch (err) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input 
          type="text" placeholder="Username" 
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
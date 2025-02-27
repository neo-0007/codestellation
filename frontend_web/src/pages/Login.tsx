import { useState } from 'react';

const Login = () => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex">
        <div className="w-1/2 flex justify-center items-center p-4">
          <img src="/register.jpeg" alt="Register" className="w-80 h-80 rounded-lg" />
        </div>
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to Guest</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </div>
            <p className="text-center text-gray-700">Don't have an account? <a href="/user/register" className="text-blue-500">Register</a></p>
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

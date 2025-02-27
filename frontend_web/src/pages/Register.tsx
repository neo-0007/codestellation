import { useState } from 'react';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });

  return (
    <div className="flex p-3 justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex">
        <div className="w-1/2 flex justify-center items-center p-4">
          <img src="/register.jpeg" alt="Register" className="w-80 h-80 rounded-lg" />
        </div>
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to Guest</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              />
            </div>
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
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="w-full p-2 border rounded"
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Gender</label>
              <select
                className="w-full p-2 border rounded"
                value={registerData.gender}
                onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })}
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={registerData.dob}
                onChange={(e) => setRegisterData({ ...registerData, dob: e.target.value })}
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
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
            </div>
            <p className="text-center text-gray-700">Already have an account? <a href="/user/login" className="text-blue-500">Login</a></p>
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
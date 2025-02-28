import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      if (data.success) {
        navigate('/user/login') 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex p-3 justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex">
        <div className="w-1/2 flex justify-center items-center p-4">
          <img src="/register.jpeg" alt="Register" className="w-80 h-80 rounded-lg" />
        </div>
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to Guest</h1>

            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <select
              value={registerData.gender}
              onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              value={registerData.dob}
              onChange={(e) => setRegisterData({ ...registerData, dob: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <div>
              <p>Already have an Account? <a href="/user/login" className="text-blue-500">Sign In</a></p>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" onClick={handleSubmit}>
              Sign Up
            </button>

        </div>
      </div>
    </div>
  );
};

export default Register;

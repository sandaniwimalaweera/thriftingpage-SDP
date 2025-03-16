import { useState } from "react";
import { Email, Lock } from "@mui/icons-material";
import Link from "next/link";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Section - Sign In Form */}
      <div className="md:w-1/2 w-full bg-primary flex flex-col justify-center items-center text-white p-6 md:p-10">
        <div className="bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-sm md:max-w-md lg:max-w-lg text-center text-white border border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative mb-4">
              <Email className="absolute left-3 top-3 text-white/80" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="pl-10 w-full p-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-6">
              <Lock className="absolute left-3 top-3 text-white/80" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="pl-10 w-full p-3 bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                onChange={handleChange}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-white/10 border border-white text-white py-3 rounded-full hover:bg-white/20 transition"
            >
              SIGN IN
            </button>
          </form>
          {/* Forgot Password */}
          <div className="mt-4 text-sm">
            <Link href="/auth/forgot-password" className="text-white hover:underline">
              Forgot your password?
            </Link>
          </div>
          
        </div>
        <div className="mt-6 text-sm">
            <Link href="/auth/" className="text-white font-semibold">Home</Link>
          </div>
      </div>
      {/* Right Section - Welcome Message */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-100 p-6 md:p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Welcome Back!</h2>
        <p className="text-md mt-2 text-primary">Enter your details and start your journey with us</p>
        <div className="mt-6 md:mt-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <img src="/img1.svg" alt="Illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
}

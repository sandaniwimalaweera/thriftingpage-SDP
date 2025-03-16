import { useState } from "react";
import { Person, Email, Lock, Phone } from "@mui/icons-material";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [userType, setUserType] = useState("Seller");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state
  const [modalMessage, setModalMessage] = useState("");  // Message to display in modal
  const [modalType, setModalType] = useState("");  // Type of modal (success or error)
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Define handleUserTypeChange
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", { ...formData, userType });

    // Basic field validation before submission
    if (!formData.name || !formData.email || !formData.contact || !formData.password) {
      setMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        ...formData,
        userType,
      });
      console.log("Registration successful:", response.data);
      
      // Show modal on success
      setModalMessage("Registration successful! Redirecting...");
      setModalType("success");
      setIsModalOpen(true);
      setTimeout(() => {
        router.push('/auth/login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Registration failed', error.response);
      
      // Show modal on failure
      setModalMessage("Registration failed: " + (error.response?.data?.error || 'Unknown error'));
      setModalType("error");
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Login Prompt */}
      <div className="md:w-1/2 w-full bg-primary flex flex-col justify-center items-center text-white p-10 text-center mt-0">
        <h2 className="text-3xl md:text-4xl font-bold">Welcome back!</h2>
        <p className="text-md mt-2">To keep connected with us, please login with your personal info.</p>
        <Link href="/auth/login">
          <button className="mt-6 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-primary transition">
            SIGN IN
          </button>
        </Link>
        <div className="mt-5">
          <img src="/img3.svg" alt="Illustration" className="w-140  md:w-60" />
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-100 p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Create Account</h2>

        {/* User Type Toggle (Seller / Buyer) */}
        <div className="flex bg-gray-300 rounded-full p-1 mb-6 w-full max-w-md">
          <button
            className={`w-1/2 py-2 rounded-full transition ${userType === "Seller" ? "bg-primary text-white" : "text-gray-700"}`}
            onClick={() => handleUserTypeChange("Seller")}
          >
            Seller
          </button>
          <button
            className={`w-1/2 py-2 rounded-full transition ${userType === "Buyer" ? "bg-primary text-white" : "text-gray-700"}`}
            onClick={() => handleUserTypeChange("Buyer")}
          >
            Buyer
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="relative mb-4">
            <Person className="absolute left-3 top-2 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative mb-4">
            <Email className="absolute left-3 top-2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative mb-4">
            <Phone className="absolute left-3 top-2 text-gray-500" />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative mb-6">
            <Lock className="absolute left-3 top-2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition"
          >
            SIGN UP
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Have an account? <Link href="/auth/login" className="text-primary font-semibold">Sign In</Link>
        </p>

        <Link href="/" className="text-primary font-semibold mt-6">Home</Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className={`bg-white p-6 rounded-lg text-center ${modalType === "success" ? "text-primary-500" : "text-red-500"}`}>
            <h3 className="text-xl font-semibold mb-4">{modalMessage}</h3>
            <button
              onClick={closeModal}
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

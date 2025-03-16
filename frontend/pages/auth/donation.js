import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DonationForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        item_name: "",
        description: "",
        category: "",
        type: "",
        size: "",
        quantity: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const token = localStorage.getItem("token"); // Check if token is present
      console.log("Token being sent:", token); // Debugging line
  
      if (!token) {
          alert("Please log in first");
          return;
      }
  
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
          if (key === "image" && value) {
              data.append("image", value);
          } else {
              data.append(key, value);
          }
      });
  
      try {
          const response = await axios.post("http://localhost:5000/api/donations/donate", data, {
              headers: {
                  Authorization: `Bearer ${token}`,  // Ensure token is correctly set
              },
          });
  
          console.log("Response:", response.data);
          alert(response.data.message);
          router.reload(); // Reload the page to fetch new donations
      } catch (error) {
          console.error("Full Error:", error);
          console.error("Error Response Data:", error.response?.data);
          alert(`Error making donation: ${error.response?.data?.error || error.message}`);
      }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Donation Form */}
      <div className="md:w-1/2 w-full bg-primary flex flex-col justify-center items-center text-white px-4 md:px-8 py-10">
        <div className="bg-white/10 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Donation</h2>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Item Name */}
            <div className="relative mb-4">
              <input
                type="text"
                name="item_name"
                placeholder="Item Name"
                className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg placeholder-white/60"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="relative mb-4">
              <textarea
                name="description"
                placeholder="Description"
                className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg placeholder-white/60"
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            {/* Category Select */}
            <div className="relative mb-4">
              <select name="category" className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg" onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Type Select */}
            <div className="relative mb-4">
              <select name="type" className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg" onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="frock">Frock</option>
                <option value="blouse">Blouse</option>
                <option value="skirt">Skirt</option>
                <option value="saree">Sarees</option>
                <option value="pant">Pant</option>
                <option value="shirt">Shirt</option>
                <option value="tshirt">TShirt</option>
                <option value="denim">Denim</option>
                <option value="short">Short</option>
                <option value="trouser">Trouser</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Size Select */}
            <div className="relative mb-4">
              <select name="size" className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg" onChange={handleChange} required>
                <option value="">Select Size</option>
                <option value="xsmall">X-Small</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">X-Large</option>
                <option value="xxlarge">XX-Large</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="relative mb-4">
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg placeholder-white/60"
                onChange={handleChange}
                required
              />
            </div>

            {/* File Upload */}
            <div className="relative mb-6">
              <input type="file" name="image" className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg" onChange={handleChange} required />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button type="submit" className="w-1/2 bg-white/10 text-white py-3 rounded-full hover:bg-white/20 transition">
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Welcome Message */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-100 px-6 md:px-10 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">Give back while you thrift!</h2>
        <p className="text-md mt-2 text-primary text-center">"Donate your gently used items and help make a positive impact in someone’s life."</p>

        <div className="mt-10">
          <img src="/img1.svg" alt="Illustration" className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto" />
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <button onClick={() => router.back()} className="w-[300px] bg-primary text-white py-2 rounded-full hover:bg-primary/20 transition">
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;

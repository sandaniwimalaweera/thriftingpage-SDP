import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    type: "",
    size: "",
    status: "",
    quantity: "",
    image: null,
    originalPrice: "",
    price: "",
  });

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Basic validation before submitting
    if (!formData.productName  || !formData.description ||
      !formData.category  || !formData.type || !formData.size || !formData.status || !formData.quantity ||  !formData.originalPrice ||
      !formData.price || !formData.image) {
         alert("Please fill out all required fields.");
         return;
       }
     
     

    // Create a new FormData object to handle the form submission
    const formDataObj = new FormData();
  
     // Append all form fields to the FormData object
  Object.keys(formData).forEach((key) => {
    if (key === "image") {
      formDataObj.append(key, formData[key]);  // For image, append the file
    } else {
      formDataObj.append(key, formData[key]);  // For other fields, append the value
    }
  });
   
    try {
      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        body: formDataObj,
        
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section - Form */}
      <div className="md:w-1/2 w-full bg-primary flex flex-col justify-center items-center text-white px-6 md:px-8 py-16">
        <div className="bg-white/10 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">Add Product</h2>

          <form onSubmit={handleSubmit} className="w-full">

{/* Product Name */}
<div className="relative mb-2">
    <input
      type="text"
      name="productName"
      placeholder="Product Name"
      className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60"
                value={formData.productName}  // Bind the value to formData
                onChange={handleChange}  // Use handleChange for all inputs
                required
              />
            </div>

{/* Description */}
<div className="relative mb-2">
              <textarea
                name="description"
                placeholder="Description"
                className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60"
                value={formData.description}  // Bind the value to formData
                onChange={handleChange}
                rows="3"
              />
            </div>

   {/* Original Price */}
   <div className="relative mb-2">
              <input
                type="text"
                name="originalPrice"
                placeholder="Original Price"
                className="pl-4 w-full p-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60"
                value={formData.originalPrice}  // Bind the value to formData
                onChange={handleChange}
              />
            </div>

{/* Price */}
<div className="relative mb-2">
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="pl-4 w-full p-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60"
                value={formData.price}  // Bind the value to formData
                onChange={handleChange}
              />
            </div>

 {/* Category Select */}
 <div className="relative mb-2">
              <select
                name="category"
                className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60"
                value={formData.category}  // Bind the value to formData
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
                <option value="other">Other</option>
              </select>
            </div>



 {/* Type Select */}
 <div className="relative mb-2">
              <select
                name="type"
                className="pl-4 w-full p-2 bg-white/20 text-white rounded-lg"
                value={formData.type}  // Bind the value to formData
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="frock">Frock</option>
                <option value="blouse">Blouse</option>
                <option value="skirt">Skirt</option>
                <option value="saree">Saree</option>
                <option value="pant">Pant</option>
                <option value="shirt">Shirt</option>
                <option value="tshirt">T-Shirt</option>
                <option value="denim">Denim</option>
                <option value="short">Short</option>
                <option value="trouser">Trouser</option>
                <option value="other">Other</option>
              </select>
            </div>

     {/* Size Select */}
     <div className="relative mb-2">
              <select
                name="size"
                className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60"
                value={formData.size}  // Bind the value to formData
                onChange={handleChange}
              >
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

{/* Status Select */}
<div className="relative mb-2">
              <select
                name="status"
                className="pl-4 w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60"
                value={formData.status}  // Bind the value to formData
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>


            {/* File Upload */}
            <div className="relative mb-2">
              <input
                type="file"
                name="image"
                className="pl-4 w-full p-2 bg-white/20 text-white rounded-lg"
                onChange={handleChange}
              />
            </div>

           {/* Quantity Input */}
           <div className="relative mb-2">
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="pl-4 w-full p-2 bg-white/20 text-white rounded-lg"
                value={formData.quantity}  // Bind the value to formData
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button type="submit" className="w-1/2 bg-white/10 text-white py-2 rounded-full hover:bg-white/20 transition">
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>

     {/* Right Section - Welcome Message */}
     <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-100 px-6 md:px-10 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">
          List. Sell. Earn !
        </h2>
        <p className="text-md mt-2 text-primary text-center">
          "Earn money while promoting sustainable fashion."
        </p>

        <div className="mt-10">
          <img src="/img1.svg" alt="Illustration" className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto" />
        </div>

        <div className="mt-10">
        <button type="submit" className="w-[300px] bg-primary text-white py-2 rounded-full hover:bg-primary/20 transition">
          BACK
        </button>
        </div>



      </div>
    </div>
  );
}

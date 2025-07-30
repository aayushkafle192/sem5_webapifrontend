// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useShipping } from "../../hooks/useShipping";
// import AutocompleteInput from "./AutocompleteInput";
// import "./OrderForm.css";

// export default function OrderForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const cartItems = location.state?.cartItems;

//   const { isLoading, uniqueDistricts, getCitySuggestions } = useShipping();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     district: "",
//     country: "Nepal",
//     postalCode: "",
//     notes: ""
//   });

//   const [shippingFee, setShippingFee] = useState(null);
//   const [errors, setErrors] = useState({});

//   // Load user + last shipping address from backend
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);

//       const fetchLastShipping = async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const res = await fetch(`http://localhost:5050/api/orders/last-shipping/${user._id}`, {
//             headers: {
//               Authorization: token ? `Bearer ${token}` : "",
//             }
//           });
//           const data = await res.json();

//           const shipping = data.shippingAddress || data.data || data;

//           setFormData(prev => ({
//             ...prev,
//             firstName: user.firstName || "",
//             lastName: user.lastName || "",
//             email: user.email || "",
//             phone: shipping?.phone || "",
//             address: shipping?.addressLine || shipping?.address || "",
//             city: shipping?.city || "",
//             district: shipping?.district || "",
//             country: shipping?.country || "Nepal",
//             postalCode: shipping?.postalCode || "",
//             notes: shipping?.notes || ""
//           }));
//         } catch (error) {
//           console.log("No previous shipping address found, using user defaults.");
//           setFormData(prev => ({
//             ...prev,
//             firstName: user.firstName || "",
//             lastName: user.lastName || "",
//             email: user.email || "",
//             country: "Nepal"
//           }));
//         }
//       };

//       fetchLastShipping();
//     }
//   }, []);

//   // Update shipping fee when district or city changes
//   useEffect(() => {
//     if (formData.district && formData.city) {
//       const matchedCity = getCitySuggestions(formData.district, formData.city)
//         .find(c => c.name.toLowerCase() === formData.city.toLowerCase());
//       setShippingFee(matchedCity?.fare || null);
//     } else {
//       setShippingFee(null);
//     }
//   }, [formData.district, formData.city, getCitySuggestions]);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
//     if (field === "district") {
//       setFormData(prev => ({ ...prev, city: "" }));
//       setShippingFee(null);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.address.trim()) newErrors.address = "Street address is required";
//     if (!formData.district.trim()) newErrors.district = "District is required";
//     if (!formData.city.trim()) newErrors.city = "City/Branch is required";
//     if (!formData.country.trim()) newErrors.country = "Country is required";
//     if (shippingFee === null && formData.city.trim()) newErrors.city = "Invalid city or no shipping fee found";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
//     const total = subtotal + (shippingFee || 0);

//     const orderPayload = {
//       items: cartItems.map(item => ({
//         productId: item.id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price
//       })),
//       shippingAddress: {
//         fullName: `${formData.firstName} ${formData.lastName}`,
//         phone: formData.phone,
//         country: formData.country,
//         district: formData.district,
//         city: formData.city,
//         addressLine: formData.address,
//         postalCode: formData.postalCode,
//         notes: formData.notes
//       },
//       deliveryFee: shippingFee || 0,
//       totalAmount: total,
//       paymentMethod: 'cod',
//       deliveryType: 'domestic'
//     };

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert("You must be logged in to place an order");
//         return;
//       }

//       const response = await fetch('http://localhost:5050/api/orders/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(orderPayload)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Order placed successfully! Payment will be collected on delivery.');
//         navigate('/order-success');
//       } else {
//         alert('Order placement failed: ' + (data.error || data.message));
//       }
//     } catch (error) {
//       alert('Error placing order: ' + error.message);
//     }
//   };

//   if (!cartItems) {
//     return <div className="loading-container">Loading...</div>;
//   }

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const total = subtotal + (shippingFee || 0);

//   return (
//     <div className="order-form-page">
//       <div className="form-header">
//         <button className="back-btn" onClick={() => navigate("/cart")}>← Back to Cart</button>
//         <h1 className="form-title">Shipping Information</h1>
//       </div>
//       <div className="form-container">
//         <div className="form-section">
//           <form onSubmit={handleSubmit} className="order-form" noValidate>
//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>First Name *</label>
//                 <input
//                   type="text"
//                   value={formData.firstName}
//                   onChange={e => handleInputChange("firstName", e.target.value)}
//                   className={errors.firstName ? "error" : ""}
//                 />
//                 {errors.firstName && <span className="error-message">{errors.firstName}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Last Name *</label>
//                 <input
//                   type="text"
//                   value={formData.lastName}
//                   onChange={e => handleInputChange("lastName", e.target.value)}
//                   className={errors.lastName ? "error" : ""}
//                 />
//                 {errors.lastName && <span className="error-message">{errors.lastName}</span>}
//               </div>
//             </div>

//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>Email *</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={e => handleInputChange("email", e.target.value)}
//                   className={errors.email ? "error" : ""}
//                 />
//                 {errors.email && <span className="error-message">{errors.email}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Phone *</label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={e => handleInputChange("phone", e.target.value)}
//                   className={errors.phone ? "error" : ""}
//                 />
//                 {errors.phone && <span className="error-message">{errors.phone}</span>}
//               </div>
//             </div>

//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>District *</label>
//                 <AutocompleteInput
//                   placeholder="Search for a district..."
//                   value={formData.district}
//                   onChange={(val) => handleInputChange("district", val)}
//                   suggestions={uniqueDistricts.map(d => ({ _id: d, name: d }))}
//                   onSelect={(obj) => handleInputChange("district", obj.name)}
//                   error={errors.district}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>City / Branch *</label>
//                 <AutocompleteInput
//                   placeholder={formData.district ? "Search for a city..." : "Select a district first"}
//                   value={formData.city}
//                   onChange={(val) => handleInputChange("city", val)}
//                   suggestions={getCitySuggestions(formData.district, formData.city)}
//                   onSelect={(obj) => handleInputChange("city", obj.name)}
//                   error={errors.city}
//                 />
//               </div>
//             </div>

//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>Country *</label>
//                 <AutocompleteInput
//                   placeholder="Only Nepal is available"
//                   value={formData.country}
//                   onChange={() => {}}
//                   suggestions={[{ _id: "np", name: "Nepal" }]}
//                   onSelect={(obj) => handleInputChange("country", obj.name)}
//                   error={errors.country}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Postal Code</label>
//                 <input
//                   type="text"
//                   value={formData.postalCode}
//                   onChange={(e) => handleInputChange("postalCode", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Street Address *</label>
//               <input
//                 type="text"
//                 value={formData.address}
//                 onChange={e => handleInputChange("address", e.target.value)}
//                 className={errors.address ? "error" : ""}
//               />
//               {errors.address && <span className="error-message">{errors.address}</span>}
//             </div>

//             <div className="form-group">
//               <label>Order Notes (Optional)</label>
//               <textarea
//                 rows={4}
//                 value={formData.notes}
//                 onChange={(e) => handleInputChange("notes", e.target.value)}
//               />
//             </div>

//             <button type="submit" className="continue-btn" disabled={shippingFee === null}>
//               Place Order (Cash on Delivery)
//             </button>
//           </form>
//         </div>

//         <div className="order-summary">
//           <div className="summary-card">
//             <h3 className="summary-title">Order Summary</h3>
//             <div className="order-items">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="summary-item">
//                   <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />
//                   <div className="item-details">
//                     <h4>{item.name}</h4>
//                     <p>Qty: {item.quantity}</p>
//                   </div>
//                   <div className="item-price">NPR {(item.price * item.quantity).toLocaleString()}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="summary-calculations">
//               <div className="summary-line">
//                 <span>Subtotal</span>
//                 <span>NPR {subtotal.toLocaleString()}</span>
//               </div>
//               <div className="summary-line">
//                 <span>Shipping</span>
//                 <span>{shippingFee === null ? "Select location" : `NPR ${shippingFee.toLocaleString()}`}</span>
//               </div>
//               <div className="summary-divider" />
//               <div className="summary-total">
//                 <span>Total</span>
//                 <span>NPR {total.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

























































// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useShipping } from "../../hooks/useShipping";
// import AutocompleteInput from "./AutocompleteInput";
// import "./OrderForm.css";

// export default function OrderForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const cartItems = location.state?.cartItems;

//   const { isLoading, uniqueDistricts, getCitySuggestions } = useShipping();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     district: "",
//     country: "Nepal",
//     postalCode: "",
//     notes: ""
//   });

//   const [shippingFee, setShippingFee] = useState(null);
//   const [errors, setErrors] = useState({});

//   // Load user + last shipping address from backend
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);

//       const fetchLastShipping = async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const res = await fetch(`http://localhost:5050/api/orders/last-shipping/${user._id}`, {
//             headers: {
//               Authorization: token ? `Bearer ${token}` : "",
//             }
//           });
//           const data = await res.json();

//           const shipping = data.shippingAddress || data.data || data;

//           setFormData(prev => ({
//             ...prev,
//             firstName: user.firstName || "",
//             lastName: user.lastName || "",
//             email: user.email || "",
//             phone: shipping?.phone || "",
//             address: shipping?.addressLine || shipping?.address || "",
//             city: shipping?.city || "",
//             district: shipping?.district || "",
//             country: shipping?.country || "Nepal",
//             postalCode: shipping?.postalCode || "",
//             notes: shipping?.notes || ""
//           }));
//         } catch (error) {
//           console.log("No previous shipping address found, using user defaults.");
//           setFormData(prev => ({
//             ...prev,
//             firstName: user.firstName || "",
//             lastName: user.lastName || "",
//             email: user.email || "",
//             country: "Nepal"
//           }));
//         }
//       };

//       fetchLastShipping();
//     }
//   }, []);

//   // Update shipping fee when district or city changes
//   useEffect(() => {
//     if (formData.district && formData.city) {
//       const matchedCity = getCitySuggestions(formData.district, formData.city)
//         .find(c => c.name.toLowerCase() === formData.city.toLowerCase());
//       setShippingFee(matchedCity?.fare || null);
//     } else {
//       setShippingFee(null);
//     }
//   }, [formData.district, formData.city, getCitySuggestions]);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
//     if (field === "district") {
//       setFormData(prev => ({ ...prev, city: "" }));
//       setShippingFee(null);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.address.trim()) newErrors.address = "Street address is required";
//     if (!formData.district.trim()) newErrors.district = "District is required";
//     if (!formData.city.trim()) newErrors.city = "City/Branch is required";
//     if (!formData.country.trim()) newErrors.country = "Country is required";
//     if (shippingFee === null && formData.city.trim()) newErrors.city = "Invalid city or no shipping fee found";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
//     const total = subtotal + (shippingFee || 0);

//     const orderPayload = {
//       items: cartItems.map(item => ({
//         productId: item.id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price
//       })),
//       shippingAddress: {
//         fullName: `${formData.firstName} ${formData.lastName}`,
//         phone: formData.phone,
//         country: formData.country,
//         district: formData.district,
//         city: formData.city,
//         addressLine: formData.address,
//         postalCode: formData.postalCode,
//         notes: formData.notes
//       },
//       deliveryFee: shippingFee || 0,
//       totalAmount: total,
//       paymentMethod: 'cod',
//       deliveryType: 'domestic'
//     };

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert("You must be logged in to place an order");
//         return;
//       }

//       const response = await fetch('http://localhost:5050/api/orders/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(orderPayload)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Order placed successfully! Payment will be collected on delivery.');
//         navigate('/orders'); // Redirect to your orders table page
//       } else {
//         alert('Order placement failed: ' + (data.error || data.message));
//       }
//     } catch (error) {
//       alert('Error placing order: ' + error.message);
//     }
//   };

//   if (!cartItems) {
//     return <div className="loading-container">Loading...</div>;
//   }

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const total = subtotal + (shippingFee || 0);

//   return (
//     <div className="order-form-page">
//       <div className="form-header">
//         <button className="back-btn" onClick={() => navigate("/cart")}>← Back to Cart</button>
//         <h1 className="form-title">Shipping Information</h1>
//       </div>
//       <div className="form-container">
//         <div className="form-section">
//           <form onSubmit={handleSubmit} className="order-form" noValidate>
//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>First Name *</label>
//                 <input
//                   type="text"
//                   value={formData.firstName}
//                   onChange={e => handleInputChange("firstName", e.target.value)}
//                   className={errors.firstName ? "error" : ""}
//                 />
//                 {errors.firstName && <span className="error-message">{errors.firstName}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Last Name *</label>
//                 <input
//                   type="text"
//                   value={formData.lastName}
//                   onChange={e => handleInputChange("lastName", e.target.value)}
//                   className={errors.lastName ? "error" : ""}
//                 />
//                 {errors.lastName && <span className="error-message">{errors.lastName}</span>}
//               </div>
//             </div>

//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>Email *</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={e => handleInputChange("email", e.target.value)}
//                   className={errors.email ? "error" : ""}
//                 />
//                 {errors.email && <span className="error-message">{errors.email}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Phone *</label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={e => handleInputChange("phone", e.target.value)}
//                   className={errors.phone ? "error" : ""}
//                 />
//                 {errors.phone && <span className="error-message">{errors.phone}</span>}
//               </div>
//             </div>

//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>District *</label>
//                 <AutocompleteInput
//                   placeholder="Search for a district..."
//                   value={formData.district}
//                   onChange={(val) => handleInputChange("district", val)}
//                   suggestions={uniqueDistricts.map(d => ({ _id: d, name: d }))}
//                   onSelect={(obj) => handleInputChange("district", obj.name)}
//                   error={errors.district}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>City / Branch *</label>
//                 <AutocompleteInput
//                   placeholder={formData.district ? "Search for a city..." : "Select a district first"}
//                   value={formData.city}
//                   onChange={(val) => handleInputChange("city", val)}
//                   suggestions={getCitySuggestions(formData.district, formData.city)}
//                   onSelect={(obj) => handleInputChange("city", obj.name)}
//                   error={errors.city}
//                 />
//               </div>
//             </div>

//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>Country *</label>
//                 <AutocompleteInput
//                   placeholder="Only Nepal is available"
//                   value={formData.country}
//                   onChange={() => {}}
//                   suggestions={[{ _id: "np", name: "Nepal" }]}
//                   onSelect={(obj) => handleInputChange("country", obj.name)}
//                   error={errors.country}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Postal Code</label>
//                 <input
//                   type="text"
//                   value={formData.postalCode}
//                   onChange={(e) => handleInputChange("postalCode", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Street Address *</label>
//               <input
//                 type="text"
//                 value={formData.address}
//                 onChange={e => handleInputChange("address", e.target.value)}
//                 className={errors.address ? "error" : ""}
//               />
//               {errors.address && <span className="error-message">{errors.address}</span>}
//             </div>

//             <div className="form-group">
//               <label>Order Notes (Optional)</label>
//               <textarea
//                 rows={4}
//                 value={formData.notes}
//                 onChange={(e) => handleInputChange("notes", e.target.value)}
//               />
//             </div>

//             <button type="submit" className="continue-btn" disabled={shippingFee === null}>
//               Place Order (Cash on Delivery)
//             </button>
//           </form>
//         </div>

//         <div className="order-summary">
//           <div className="summary-card">
//             <h3 className="summary-title">Order Summary</h3>
//             <div className="order-items">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="summary-item">
//                   <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />
//                   <div className="item-details">
//                     <h4>{item.name}</h4>
//                     <p>Qty: {item.quantity}</p>
//                   </div>
//                   <div className="item-price">NPR {(item.price * item.quantity).toLocaleString()}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="summary-calculations">
//               <div className="summary-line">
//                 <span>Subtotal</span>
//                 <span>NPR {subtotal.toLocaleString()}</span>
//               </div>
//               <div className="summary-line">
//                 <span>Shipping</span>
//                 <span>{shippingFee === null ? "Select location" : `NPR ${shippingFee.toLocaleString()}`}</span>
//               </div>
//               <div className="summary-divider" />
//               <div className="summary-total">
//                 <span>Total</span>
//                 <span>NPR {total.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






































































// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function OrderForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const cartItems = location.state?.cartItems;

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     city: "",
//     street: ""
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.street.trim()) newErrors.street = "Street address is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     if (!cartItems || cartItems.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
//     const total = subtotal; // No shipping fee or payment method

//     const orderPayload = {
//       firstname: formData.firstName,
//       lastname: formData.lastName,
//       phoneNo: formData.phone,
//       city: formData.city,
//       street: formData.street,
//       items: cartItems.map(item => ({
//         productId: item.id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price
//       })),
//       totalAmount: total,
//     };

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert("You must be logged in to place an order");
//         return;
//       }

//       const response = await fetch('http://localhost:5050/api/orders/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(orderPayload)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Order placed successfully! Payment will be collected on delivery.');
//         navigate('/order-success');
//       } else {
//         alert('Order placement failed: ' + (data.error || data.message));
//       }
//     } catch (error) {
//       alert('Error placing order: ' + error.message);
//     }
//   };

//   if (!cartItems) {
//     return <div className="loading-container">Loading...</div>;
//   }

//   return (
//     <div className="order-form-page">
//       <div className="form-header">
//         <button className="back-btn" onClick={() => navigate("/cart")}>← Back to Cart</button>
//         <h1 className="form-title">Shipping Information</h1>
//       </div>
//       <div className="form-container">
//         <div className="form-section">
//           <form onSubmit={handleSubmit} className="order-form" noValidate>
//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>First Name *</label>
//                 <input
//                   type="text"
//                   value={formData.firstName}
//                   onChange={e => handleInputChange("firstName", e.target.value)}
//                   className={errors.firstName ? "error" : ""}
//                 />
//                 {errors.firstName && <span className="error-message">{errors.firstName}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Last Name *</label>
//                 <input
//                   type="text"
//                   value={formData.lastName}
//                   onChange={e => handleInputChange("lastName", e.target.value)}
//                   className={errors.lastName ? "error" : ""}
//                 />
//                 {errors.lastName && <span className="error-message">{errors.lastName}</span>}
//               </div>
//             </div>

//             <div className="form-group-row">
//               <div className="form-group">
//                 <label>Phone *</label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={e => handleInputChange("phone", e.target.value)}
//                   className={errors.phone ? "error" : ""}
//                 />
//                 {errors.phone && <span className="error-message">{errors.phone}</span>}
//               </div>
//               <div className="form-group">
//                 <label>City *</label>
//                 <input
//                   type="text"
//                   value={formData.city}
//                   onChange={e => handleInputChange("city", e.target.value)}
//                   className={errors.city ? "error" : ""}
//                 />
//                 {errors.city && <span className="error-message">{errors.city}</span>}
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Street Address *</label>
//               <input
//                 type="text"
//                 value={formData.street}
//                 onChange={e => handleInputChange("street", e.target.value)}
//                 className={errors.street ? "error" : ""}
//               />
//               {errors.street && <span className="error-message">{errors.street}</span>}
//             </div>

//             <button type="submit" className="continue-btn">
//               Place Order (Cash on Delivery)
//             </button>
//           </form>
//         </div>

//         <div className="order-summary">
//           <div className="summary-card">
//             <h3 className="summary-title">Order Summary</h3>
//             <div className="order-items">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="summary-item">
//                   <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />
//                   <div className="item-details">
//                     <h4>{item.name}</h4>
//                     <p>Qty: {item.quantity}</p>
//                   </div>
//                   <div className="tem-price">NPR {(item.price * item.quantity).toLocaleString()}</div>
//                 </div
//               ))}
//             </div
//             <div classNam4="summary-calculations">
//               <div className="summary-lne">
//                 <span>Subtotal<3span>
//                 <span>NP {cartItem.reduc3((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</span>
//               </div>
//               <div className="summar-3ivide2" /
//               <div className="summary-tota2">
//                 <span>Total</span
//                 <span>NPR {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
































import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderForm.css";

export default function OrderForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    street: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.street.trim()) newErrors.street = "Street address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total = subtotal; // no shipping fee included here

    const orderPayload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      phoneNo: formData.phone,
      city: formData.city,
      street: formData.street,
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place an order");
        return;
      }

      const response = await fetch("http://localhost:5050/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully! Payment will be collected on delivery.");
        navigate("/order-success");
      } else {
        alert("Order placement failed: " + (data.error || data.message));
      }
    } catch (error) {
      alert("Error placing order: " + error.message);
    }
  };

  return (
    <div className="order-form-page">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate("/cart")}>← Back to Cart</button>
        <h1 className="form-title">Shipping Information</h1>
      </div>
      <div className="form-container">
        <div className="form-section">
          <form onSubmit={handleSubmit} className="order-form" noValidate>
            <div className="form-group-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => handleInputChange("firstName", e.target.value)}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={e => handleInputChange("city", e.target.value)}
                className={errors.city ? "error" : ""}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label>Street Address *</label>
              <input
                type="text"
                value={formData.street}
                onChange={e => handleInputChange("street", e.target.value)}
                className={errors.street ? "error" : ""}
              />
              {errors.street && <span className="error-message">{errors.street}</span>}
            </div>

            <button type="submit" className="continue-btn">
              Place Order (Cash on Delivery)
            </button>
          </form>
        </div>

        <div className="order-summary">
          <div className="summary-card">
            <h3 className="summary-title"> Summary</h3>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price">NPR {(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="summary-calculations">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>NPR {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-total">
                <span>Total</span>
                <span>NPR {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useOrder } from "../../hooks/admin/useOrder";
// import OrderTable from "../../components/admin/order/OrderTable";
// import { toast } from "react-toastify";
// import { FaTimes } from "react-icons/fa";
// import { getBackendImageUrl } from "../../utils/backend-image";

// export default function OrderManagement() {
//   const { orders, loading, error, getOrderById, updateOrder, deleteOrderById } = useOrder();

//   const [formData, setFormData] = useState({ shippingAddress: {} });
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [viewingOrder, setViewingOrder] = useState(null);
  
//   const openForm = async (orderId) => {
//     const order = await getOrderById(orderId);
//     if (!order) return;
//     setEditingId(order._id);
//     setFormData({
//       shippingAddress: order.shippingAddress,
//       paymentStatus: order.paymentStatus,
//       deliveryStatus: order.deliveryStatus,
//     });
//     setViewingOrder(order); 
//     setShowForm(true);
//   };

//   const handleView = async (id) => {
//     const order = await getOrderById(id);
//     if (order) setViewingOrder(order);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (Object.keys(formData.shippingAddress || {}).includes(name)) {
//       setFormData(prev => ({ ...prev, shippingAddress: { ...prev.shippingAddress, [name]: value } }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateOrder(editingId, formData);
//       closeModal();
//     } catch (err) { console.error("Submit error:", err); }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to permanently delete this order?")) {
//       await deleteOrderById(id);
//     }
//   };
  
//   const closeModal = () => {
//     setShowForm(false);
//     setViewingOrder(null);
//     setEditingId(null);
//   };

//   const inputStyle = { fontSize: "1rem", padding: "10px", width: "100%", backgroundColor: "#2b2b2b", color: "#fff", border: "1px solid #444", borderRadius: "4px" };
//   const selectStyle = { ...inputStyle, appearance: "none" };

//   const OrderDetailsLayout = ({ order, isEditMode = false }) => {
//     const customerFirstName = order.userId?.firstName || 'N/A';
//     const customerLastName = order.userId?.lastName || '';
    
//     return (
//       <div className="modal-grid-container">
//         <div className="order-section">
//           <h4>{customerFirstName} {customerLastName}</h4>
//           <div className="detail-grid">
//               <strong>Email:</strong><span>{order.userId?.email || 'N/A'}</span>
//           </div>
//         </div>
//         <div className="order-section">
//           <h4>Order Summary ({order.items.length} items)</h4>
//           <div className="order-items-list-view">
//             {order.items.map((item) => (
//               <div key={item.productId?._id || item.name} className="order-item-detail-view">
//                 <img src={getBackendImageUrl(item.productId?.filepath)} alt={item.name} />
//                 <div className="item-info-view">
//                   <span>{item.name}</span>
//                   <span>Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</span>
//                 </div>
//                 <span className="item-total-view">Rs. {(item.quantity * item.price).toLocaleString()}</span>
//               </div>
//             ))}
//           </div>
//           <div className="order-total-view">
//               <p><strong>Subtotal:</strong> Rs. {(order.totalAmount - order.deliveryFee).toLocaleString()}</p>
//               <p><strong>Delivery Fee:</strong> Rs. {order.deliveryFee.toLocaleString()}</p>
//               <p><strong>Total Amount:</strong> Rs. {order.totalAmount.toLocaleString()}</p>
//           </div>
//         </div>
//         <div className="order-section">
//           <h4>Payment Details</h4>
//           <div className="detail-grid">
//               <strong>Method:</strong><span>{order.paymentMethod?.toUpperCase()}</span>
//               {order.paymentBankName && <><strong>Bank:</strong><span>{order.paymentBankName}</span></>}
//               {order.paymentReferenceId && <><strong>Reference:</strong><span>{order.paymentReferenceId}</span></>}
//           </div>
//           {order.slipImageUrl && (
//             <div style={{marginTop: '1rem'}}>
//               <strong>Payment Slip:</strong>
//               <a href={getBackendImageUrl(order.slipImageUrl)} target="_blank" rel="noopener noreferrer">
//                 <img src={getBackendImageUrl(order.slipImageUrl)} alt="Slip" style={{ maxWidth: '100%', width: '200px', borderRadius: '4px', marginTop: '8px', border: '1px solid #555' }}/>
//               </a>
//             </div>
//           )}
//         </div>
//         <div className="order-section">
//           <h4>Shipping Address</h4>
//           {isEditMode ? (
//             <div className="shipping-form-grid">
//               <label className="full-width"><span>Contact Phone</span><input name="phone" value={formData.shippingAddress?.phone || ''} onChange={handleChange} style={inputStyle} /></label>
//               <label className="full-width"><span>Address Line</span><input name="addressLine" value={formData.shippingAddress?.addressLine || ''} onChange={handleChange} style={inputStyle} /></label>
//               <label><span>City</span><input name="city" value={formData.shippingAddress?.city || ''} onChange={handleChange} style={inputStyle} /></label>
//               <label><span>District</span><input name="district" value={formData.shippingAddress?.district || ''} onChange={handleChange} style={inputStyle} /></label>
//               <label><span>Country</span><input name="country" value={formData.shippingAddress?.country || ''} onChange={handleChange} style={inputStyle} /></label>
//               <label><span>Postal Code</span><input name="postalCode" value={formData.shippingAddress?.postalCode || ''} onChange={handleChange} style={inputStyle} /></label>
//             </div>
//           ) : (
//             <div className="detail-grid">
//               <strong>Contact:</strong><span>{order.shippingAddress.phone}</span>
//               <strong>Address:</strong><span>{order.shippingAddress.addressLine}</span>
//               <strong>City:</strong><span>{order.shippingAddress.city}</span>
//               <strong>District:</strong><span>{order.shippingAddress.district}</span>
//               <strong>Country:</strong><span>{order.shippingAddress.country}</span>
//               <strong>Postal Code:</strong><span>{order.shippingAddress.postalCode}</span>
//             </div>
//           )}
//         </div>
//         <div className="order-section status-section">
//           <h4>Status</h4>
//           <div className="status-controls-grid">
//             <div>
//               <label>Payment Status</label>
//               {isEditMode ? (<select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} style={selectStyle}><option value="pending">Pending</option><option value="paid">Paid</option><option value="failed">Failed</option></select>) : (<p className="status-text">{order.paymentStatus}</p>)}
//             </div>
//             <div>
//               <label>Delivery Status</label>
//               {isEditMode ? (<select name="deliveryStatus" value={formData.deliveryStatus} onChange={handleChange} style={selectStyle}><option value="pending">Pending</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select>) : (<p className="status-text">{order.deliveryStatus}</p>)}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="admin-page">
//       <h2 className="page-title">Order Management</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <OrderTable orders={orders} viewOrder={handleView} editOrder={openForm} removeOrder={handleDelete} />
//       {viewingOrder && !showForm && (
//         <div className="modal-backdrop" onClick={closeModal}><div className="modal very-wide-modal" onClick={(e) => e.stopPropagation()}><div className="modal-header"><h3>Order Details #{viewingOrder._id.slice(-6).toUpperCase()}</h3><FaTimes onClick={closeModal} style={{ cursor: "pointer" }} /></div><OrderDetailsLayout order={viewingOrder} /></div></div>
//       )}
//       {showForm && viewingOrder && (
//         <div className="modal-backdrop" onClick={closeModal}><form onSubmit={handleSubmit} className="modal very-wide-modal" onClick={(e) => e.stopPropagation()}><div className="modal-header"><h3>Edit Order #{editingId.slice(-6).toUpperCase()}</h3><FaTimes onClick={closeModal} style={{ cursor: "pointer" }} /></div><OrderDetailsLayout order={viewingOrder} isEditMode={true} /><div className="modal-actions"><button type="button" className="btn btn-cancel" onClick={closeModal}>Cancel</button><button type="submit" className="btn btn-submit">Save Changes</button></div></form></div>
//       )}
//     </div>
//   );
// }
































import React, { useState } from "react";
import { useOrder } from "../../hooks/admin/useOrder";
import OrderTable from "../../components/admin/order/OrderTable";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { getBackendImageUrl } from "../../utils/backend-image";

export default function OrderManagement() {
  const { orders, loading, error, getOrderById, deleteOrderById } = useOrder();

  const [viewingOrder, setViewingOrder] = useState(null);

  const handleView = async (id) => {
    const order = await getOrderById(id);
    if (order) setViewingOrder(order);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this order?")) {
      try {
        await deleteOrderById(id);
        toast.success("Order deleted successfully");
      } catch {
        toast.error("Failed to delete order");
      }
    }
  };

  const closeModal = () => {
    setViewingOrder(null);
  };

  // OrderDetailsLayout updated to fetch phoneNo, city, street correctly
  const OrderDetailsLayout = ({ order }) => {
    const customerFirstName = order.userId?.firstName || "N/A";
    const customerLastName = order.userId?.lastName || "";

    const phoneNo = order.phoneNo || "N/A";
    const city = order.city || "N/A";
    const street = order.street || "N/A";

    return (
      <div className="modal-grid-container" style={{ color: "#fff" }}>
        <div className="order-section">
          <h4>Customer Details</h4>
          <div className="detail-grid">
            <strong>Name:</strong>
            <span>{customerFirstName + " " + customerLastName}</span>
            <strong>Email:</strong>
            <span>{order.userId?.email || "N/A"}</span>
          </div>
        </div>

        <div className="order-section">
          <h4>Shipping Address</h4>
          <div className="detail-grid">
            <strong>Phone No:</strong>
            <span>{phoneNo}</span>
            <strong>City:</strong>
            <span>{city}</span>
            <strong>Street:</strong>
            <span>{street}</span>
          </div>
        </div>

        <div className="order-section">
          <h4>Order Items ({order.items.length} items)</h4>
          <div
            className="order-items-list-view"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {order.items.map((item, index) => {
              const product =
                typeof item.productId === "object" ? item.productId : null;
              const productIdStr = product?._id || item.productId || "N/A";
              const productName = item.name || product?.name || "N/A";
              const productImage = product?.filepath
                ? getBackendImageUrl(product.filepath)
                : "/placeholder.svg";

              return (
                <div
                  key={index}
                  className="order-item-detail-view"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={productImage}
                    alt={productName}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      marginRight: "15px",
                      borderRadius: "6px",
                      border: "1px solid #444",
                    }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div>
                      <strong>Product ID:</strong> {productIdStr}
                    </div>
                    <div>
                      <strong>Name:</strong> {productName}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {item.quantity}
                    </div>
                    <div>
                      <strong>Price per unit:</strong> Rs.{" "}
                      {item.price.toLocaleString()}
                    </div>
                    <div>
                      <strong>Item Total:</strong> Rs.{" "}
                      {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-section">
          <h4>Order Financials</h4>
          <div className="detail-grid">
            <strong>Total Amount:</strong>
            <span>Rs. {order.totalAmount.toLocaleString()}</span>
            <strong>Created At:</strong>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-page">
      <h2 className="page-title">Order Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <OrderTable
        orders={orders}
        viewOrder={handleView}
        removeOrder={handleDelete}
      />

      {/* View order details modal */}
      {viewingOrder && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal very-wide-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Order Details #{viewingOrder._id.slice(-6).toUpperCase()}</h3>
              <FaTimes onClick={closeModal} style={{ cursor: "pointer" }} />
            </div>
            <OrderDetailsLayout order={viewingOrder} />
          </div>
        </div>
      )}
    </div>
  );
}


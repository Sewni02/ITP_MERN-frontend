/*import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

function AddOrder() {
  const [customerName, setCustomerName] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [billPicture, setBillPicture] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    /*try {
      // order create without billPicture first
      const orderRes = await axios.post("http://localhost:5000/orders", {
        customerName,
        orderAmount,
      });

      const createdOrder = orderRes.data.order;

      // if bill picture is uploaded -> send PUT request to update order
      if (billPicture) {
        const formData = new FormData();
        formData.append("billPicture", billPicture);
        formData.append("billAmount", 0); // default bill amount
        if (billPicture) {
      formData.append("billPicture", billPicture);
    }

        await axios.put(
          `http://localhost:5000/orders/${createdOrder._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      alert("Order Added Successfully!");
      navigate("/orders"); // redirect to orders page
    } catch (err) {
      console.error(err);
      alert("Error while adding order!");
    }
  };*/

   
    /*const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("orderAmount", orderAmount);
    if (billPicture) formData.append("billPicture", billPicture);
   try{
    const res = await axios.post("http://localhost:5000/orders", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Order Added Successfully!");
    navigate("/orderdetails"); // redirect to orders page
  } catch (err) {
    console.error(err);
    alert("Error while adding order!");
  }
};*/

/*const formData = new FormData();
formData.append("customerName", customerName);
formData.append("orderAmount", amount);
formData.append("billPicture", billPicture); // file input walin ganna

  try {
      await axios.post("http://localhost:5000/orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Order Added!");
    } catch (err) {
      console.error("Error while adding order:", err.response?.data || err.message);
      alert("Error while adding order!");
    }
  };

  return (
    <div>
      <Nav />
      <h1>Add New Order</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <br />

        <input
          type="number"
          placeholder="Order Amount"
          value={orderAmount}
          onChange={(e) => setOrderAmount(e.target.value)}
          required
        />
        <br />

        <input
          type="file"
          onChange={(e) => setBillPicture(e.target.files[0])}
          accept="image/*"
        />
        <br />

        <button type="submit">Add Order</button>
      </form>
    </div>
  );
}

export default AddOrder;*/

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

function AddOrder() {
  const [customerName, setCustomerName] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [billAmount, setBillAmount] = useState("");




  const [billPicture, setBillPicture] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("orderAmount", orderAmount); 
    // ✅ FIX: correct variable
    formData.append("billAmount", billAmount);
    formData.append("billPicture", billPicture);

    try {
      await axios.post("http://localhost:5000/orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Order Added!");
      navigate("/orderDetails"); // optional redirect
    } catch (err) {
      console.error("Error while adding order:", err.response?.data || err.message);
      alert("Error while adding order!");
    }
  };

  return (
    <div>
      <Nav />
      <h1>Add New Order</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <br />

        <input
          type="number"
          placeholder="Order Amount"
          value={orderAmount}
          onChange={(e) => setOrderAmount(e.target.value)}
          required
        />
        <br />

        <input
    type="number"
    placeholder="Bill Amount"
    value={billAmount}
    onChange={(e) => setBillAmount(e.target.value)}
    required
  />
  <br />

        <input
          type="file"
          onChange={(e) => setBillPicture(e.target.files[0])}
          accept="image/*"
        />
        <br />

        <button type="submit">Add Order</button>
      </form>
    </div>
  );
}

export default AddOrder;



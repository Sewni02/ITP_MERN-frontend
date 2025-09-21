// OrderDetails.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:5000/orders';

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setOrders(data.orders));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'Orders Report',
    onAfterPrint: () => alert('Orders report successfully downloaded!'),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredOrders = data.orders.filter((order) =>
        Object.values(order).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setOrders(filteredOrders);
      setNoResults(filteredOrders.length === 0);
    });
  };

  const deleteHandler = async (id) => {
    await axios
      .delete(`http://localhost:5000/orders/${id}`)
      .then((res) => {
        const newOrders = orders.filter((order) => order._id !== id);
        setOrders(newOrders);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Nav />
      <h1>Order Details Display Page</h1>

      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Orders Details"
      />
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Orders Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {orders &&
            orders.map((order, i) => (
              <div key={i} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Customer Name:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Order Amount:</strong> {order.orderAmount}
                </p>
                <p>
                  <strong>Outstanding Amount:</strong> {order.outstandingAmount}
                </p>
                {/* Bill Picture එක Display කිරීම */}
                {order.billPicture && (
                  <div>
                    <strong>Bill Picture:</strong>
                    <br />
                    <img
                      src={`http://localhost:5000/${order.billPicture}`}
                      alt="Bill"
                      style={{ maxWidth: '200px', height: 'auto' }}
                    />
                  </div>
                )}
                
                <Link to={`/updateorder/${order._id}`}>
                  <button>Update</button>
                </Link>
                <button onClick={() => deleteHandler(order._id)}>Delete</button>
              </div>
            ))}
        </div>
      )}
      <Link to="/addorder">
  <button>Add New Order</button>
</Link>

      <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default OrderDetails;

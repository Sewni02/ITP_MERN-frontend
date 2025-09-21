// UpdateOrder.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

function UpdateOrder() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // State for image preview
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/orders/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setInputs(data.order);
          if (data.order.billPicture) {
            setPreview(`http://localhost:5000/${data.order.billPicture}`);
          }
        });
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append('billAmount', inputs.billAmount);
    if (file) {
      formData.append('billPicture', file);
    }

    await axios.put(`http://localhost:5000/orders/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs, file);
    sendRequest().then(() => history('/orderdetails'));
  };

  return (
    <div>
       
      <h1>UPDATE ORDER</h1>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <label>Customer Name</label>
          <br />
          <input type="text" name="customerName" value={inputs.customerName || ''} disabled />
          <br />
          <br />
          <label>Order Amount</label>
          <br />
          <input type="text" name="orderAmount" value={inputs.orderAmount || ''} disabled />
          <br />
          <br />
          <label>Outstanding Amount</label>
          <br />
          <input type="text" name="outstandingAmount" value={inputs.outstandingAmount || ''} disabled />
          <br />
          <br />
          <label>Bill Amount</label>
          <br />
          <input type="number" name="billAmount" onChange={handleChange} value={inputs.billAmount || ''} required />
          <br />
          <br />
          <label>Upload Bill Picture</label>
          <br />
          <input type="file" name="billPicture" onChange={handleFileChange} />
          <br />
          <br />
          {/* Image Preview එක Display කිරීම */ }
          {preview && (
            <div>
              <strong>Current Picture Preview:</strong>
              <br />
              <img src={preview} alt="Bill Preview" style={{ maxWidth: '200px', height: 'auto' }} />
            </div>
          )}
          <br />
          <button>Update</button>
        </form>
      )}
    </div>
  );
}

export default UpdateOrder;


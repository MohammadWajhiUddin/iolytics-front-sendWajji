import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate } from "react-router-dom";

import {    Button, } from "reactstrap";

const ViewSingleCategories = () => {
    const navigate = useNavigate();

  const Category = useSelector((state) => state.Devices.Category);

  if (!Category) {
   
    return <p>Loading category details...</p>;
  }

  return (
    <div style={pageStyle}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center', color: '#007bff' }}>Device Categories</h2>
      <div style={cardsContainerStyle}>
        <div key={Category.deviceCategoryId} style={cardStyle}>
          <h3 style={{ marginBottom: '.5rem', color: '#343a40' }}>{Category.name}</h3>
          <p style={{ marginBottom: '.5rem', fontSize: '1.1rem', color: '#6c757d' }}>
            {Category.description || 'No Description Available'}
          </p>
          <p style={{ marginBottom: '.5rem', fontSize: '.9rem', color: '#555' }}>
            <strong>Created At:</strong> {new Date(Category.createdAt).toLocaleDateString()}
          </p>
          <p style={{ marginBottom: '.5rem', fontSize: '.9rem', color: Category.isenable ? '#28a745' : '#dc3545' }}>
            <strong>Status:</strong> {Category.isenable ? 'Enabled' : 'Disabled'}
          </p>


          <div className="text-center">
                <Button
                  color="primary"
                  onClick={() => navigate(-1)}
                  style={{ borderRadius: '20px', padding: '0.5rem 2rem' }}
                >
                  Back
                </Button>
              </div>
        </div>
      </div>
    </div>
  );
};

const pageStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '2rem',
};

const cardsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '600px',
  textAlign: 'center',
  transition: 'transform 0.3s',
};

const hoverEffect = {
  transform: 'scale(1.02)',
};

export default ViewSingleCategories;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDeviceCategory } from 'Slices/DeviceSlices';
import { useNavigate } from 'react-router-dom';

const UpdateCategory = () => {
    const users = useSelector(state => state.authenticateUser.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const category = useSelector(state => state.Devices.Category);
    const [formData, setFormData] = useState({
        deviceCategoryId: '',
        name: '',
        description: '',
        updatedById: users.userId
    });

    useEffect(() => {
        if (category) {
            setFormData({
                deviceCategoryId: category.deviceCategoryId,
                name: category.name || '',
                description: category.description || '',
                updatedById: users.userId

            });
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateDeviceCategory(formData));
        if (updateDeviceCategory.fulfilled.match(resultAction)) {
            alert("Your data has been updated successfully!");
            navigate('/AddCategory'); // Redirect after successful update
        } else {
            alert("Failed to update the category. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2>Update Category</h2>
            <div style={inputGroupStyle}>
                <label>Category ID</label>
                <input
                    type="text"
                    name="deviceCategoryId"
                    value={formData.deviceCategoryId}
                    onChange={handleChange}
                    disabled
                />
            </div>
            <div style={inputGroupStyle}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div style={inputGroupStyle}>
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
        
            <button type="submit" style={buttonStyle}>Update Category</button>
        </form>
    );
};

const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const inputGroupStyle = {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
};

const buttonStyle = {
    padding: '0.75rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default UpdateCategory;

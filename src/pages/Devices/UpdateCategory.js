import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDeviceCategory } from 'Slices/DeviceSlices';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';

const UpdateCategory = () => {
    const users = useSelector(state => state.authenticateUser.user);
    const category = useSelector(state => state.Devices.Category);
    const loading = useSelector(state => state.Devices.loading); // Assume you have a loading state in your Devices slice

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    }, [category, users.userId]);

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
        } else {
            alert("Failed to update the category. Please try again.");
        }
    };

    const handleGoBack = () => {
        navigate('/ViewCategories'); // Change the path to where you want to navigate
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Update Category</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
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

                {/* Go Back and Submit Buttons with Spinner */}
                <div style={buttonGroupStyle}>
                    <Button color="secondary" onClick={handleGoBack} style={buttonStyle}>
                        Go Back
                    </Button>
                    <Button color="primary" type="submit" disabled={loading} style={buttonStyle}>
                        {loading ? (
                            <>
                                <Spinner size="sm" /> Updating...
                            </>
                        ) : (
                            'Update Category'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

const containerStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
};

const formStyle = {
    marginBottom: '1.5rem',
};

const inputGroupStyle = {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
};

const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '20px',
};

export default UpdateCategory;

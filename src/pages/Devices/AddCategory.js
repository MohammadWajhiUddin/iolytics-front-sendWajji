import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDeviceCategory, resetSuccess } from '../../Slices/DeviceSlices';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Spinner, Alert } from 'reactstrap';

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const User = useSelector((state) => state.authenticateUser.user);
  const { loading, success2, error } = useSelector((state) => state.Devices);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    createdById: User.userId,
  });

  const [showAlert, setShowAlert] = useState({ type: '', message: '', visible: false });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDeviceCategory(formData));
  };

  const handleViewCategory = () => {
    navigate('/ViewCategories');
  };

  useEffect(() => {
    if (success2) {
      setShowAlert({
        type: 'success',
        message: 'Category created successfully!',
        visible: true,
      });
      setTimeout(() => {
        setShowAlert({ ...showAlert, visible: false });
        dispatch(resetSuccess());
      }, 3000); // Hide alert after 3 seconds
    }
    if (error) {
      setShowAlert({
        type: 'danger',
        message: `Error: ${error}`,
        visible: true,
      });
      setTimeout(() => setShowAlert({ ...showAlert, visible: false }), 3000); // Hide alert after 3 seconds
    }
  }, [success2, error, dispatch]);

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      {/* Card Layout for better structure */}
      <Card>
        <CardHeader className="text-center" style={{ color: 'black' }}>
          <h3>Add New Category</h3>
        </CardHeader>
        <CardBody>
          {/* Conditionally render alert */}
          {showAlert.visible && (
            <Alert color={showAlert.type}>
              {showAlert.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '.5rem' }}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="description" style={{ display: 'block', marginBottom: '.5rem' }}>
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                rows="4"
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Go Back Button */}
              <Button
                color="secondary"
                onClick={handleViewCategory}
                style={{ padding: '.5rem 1.5rem', borderRadius: '20px' }}
              >
                Back
              </Button>

              {/* Submit Button with Loading State */}
              <Button
                color="primary"
                type="submit"
                disabled={loading}
                style={{ padding: '.5rem 1.5rem', borderRadius: '20px' }}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" /> Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddCategory;

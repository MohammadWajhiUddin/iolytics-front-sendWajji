import React , {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {createDeviceCategory,resetSuccess} from '../../Slices/DeviceSlices'
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const User = useSelector(state=>state.authenticateUser.user);
    const { loading, success, error } = useSelector(state => state.Devices);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        createdById:User.userId,
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., pass formData to a Redux action or API
        dispatch(createDeviceCategory(formData))
      };


      const handleViewCategory = () => {
      navigate('/ViewCategories')
      };
    
      useEffect(() => {
        dispatch(resetSuccess()); // Reset success and error state on component mount
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            alert('Category created successfully!');
            dispatch(resetSuccess()); // Reset success state after showing the alert
        }
        if (error) {
            alert(`Error: ${error}`);
        }
    }, [success, error, dispatch]);


      return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button 
          onClick={handleViewCategory} 
          style={{ padding: '.5rem 1rem', backgroundColor: '#6c757d', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          View Category
        </button>
        
      </div>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '.5rem' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '.5rem' }}
            required
          />
        </div>
  
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '.5rem' }}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '.5rem' }}
            required
          />
        </div>
  
        <button type="submit" style={{ padding: '.5rem 1rem', backgroundColor: '#007BFF', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      </div>
  )
}

export default AddCategory
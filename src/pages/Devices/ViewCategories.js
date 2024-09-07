import React, { useEffect } from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories, SingleCategoryDetails } from 'Slices/DeviceSlices';
import { useNavigate } from 'react-router-dom';

const ViewCategories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.authenticateUser.user);
    const categories = useSelector(state => state.Devices.Categories);

    useEffect(() => {
        if (users.userId) {
            const UserId = { UserId: users.userId };
            dispatch(getAllCategories(UserId));
        }
    }, [dispatch, users.userId]);

    const handleViewCategory = (category) => {
        dispatch(SingleCategoryDetails(category));
        navigate('/ViewSingleCategories');
    };

    const handleUpdateCategory = (category) => {
        dispatch(SingleCategoryDetails(category));
        navigate('/UpdateCategory');
    };

    const handleAddCategory = () => {
        navigate('/AddCategory');
    };

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Device Categories</h2>

            {/* Add Button */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Button
                    onClick={handleAddCategory}
                    color="primary"
                    style={{ padding: '.5rem 1rem', width: '100%' }}
                >
                    Add New Category
                </Button>
            </div>

            <Row>
                {categories && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <Col key={index} md={6} lg={4} xl={3} style={{ marginBottom: '1rem' }}>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h4">{category.name}</CardTitle>
                                    <CardText>
                                        {category.description || 'No Description Available'}
                                    </CardText>
                                    <CardText>
                                        Created At: {new Date(category.createdAt).toLocaleDateString()}
                                    </CardText>
                                    <CardText>
                                        Status: {category.isenable ? 'Enabled' : 'Disabled'}
                                    </CardText>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            onClick={() => handleViewCategory(category)}
                                            color="info"
                                            style={{ flex: 1, marginRight: '.5rem' }}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            onClick={() => handleUpdateCategory(category)}
                                            color="warning"
                                            style={{ flex: 1, marginRight: '.5rem' }}
                                        >
                                            Update Category
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No categories found</p>
                    </Col>
                )}
            </Row>
        </React.Fragment>
    );
};

export default ViewCategories;



import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, CardTitle, CardText, Row, Col, Container,
  Spinner, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TempLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [modal, setModal] = useState(false);
  const [newComment, setNewComment] = useState(''); // State for new comment
  const [selectedTempLogId, setSelectedTempLogId] = useState(null);
  const { device_id, user_id, device_name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTempLogs = async () => {
      try {
        const response = await fetch('https://tempin.qastco.co.uk:3231/api/log/gettemplog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            devicepkId: parseInt(device_id),
            userId: user_id
          }),
        });

        const data = await response.json();
        setLogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching temperature logs:', error);
        setLoading(false);
      }
    };

    fetchTempLogs();
  }, [device_id, user_id]);

  // Toggle modal
  const toggleModal = () => setModal(!modal);

  // Fetch comments for a specific log
  const fetchComments = async (tempLogId) => {
    try {
      const response = await fetch('https://tempin.qastco.co.uk:3231/api/logcomment/getAllCommentByLog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user_id, // Use the user ID from params
          devicepkId: parseInt(device_id),
          tempLogId
        }),
      });
      const data = await response.json();
      setComments(data);
      setSelectedTempLogId(tempLogId);
      toggleModal();
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle submitting a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Don't allow empty comments
    try {
      const response = await fetch('https://tempin.qastco.co.uk:3231/api/logcomment/insertComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user_id,
          devicepkId: parseInt(device_id),
          tempLogId: selectedTempLogId,
          comments: newComment
        }),
      });

      if (response.ok) {
        const newCommentData = {
          id: Date.now(), // Temporary ID
          createdBy: 'You',
          comments: newComment,
          createdAt: new Date().toISOString()
        };

        setComments([...comments, newCommentData]); // Add the new comment to the list
        setNewComment(''); // Clear the input field
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return <div className="text-center"><Spinner /> Loading...</div>;
  }

  return (
    <Container>
      <Button color="primary" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back
      </Button>
      <h2 className="text-center my-4">{device_name} Temp Log</h2>
      <Row>
        {logs.map((log) => (
          <Col xs="12" sm="6" md="4" key={log.tempLogId} className="mb-4">
            <Card className="bg-light border-primary">
              <CardBody>
                <CardTitle tag="h5" className="text-primary">{log.deviceName}</CardTitle>
                <CardText>
                  <strong>Device ID:</strong> <span className="text-info">{log.deviceId}</span><br />
                  <strong>Temperature (C):</strong> <span className="text-danger">{log.temperatureC}°C</span><br />
                  <strong>Temperature (F):</strong> <span className="text-danger">{log.temperatureF}°F</span><br />
                  <strong>Next Temp Take:</strong> {log.nextTempTake}<br />
                  <strong>Battery Level:</strong> <span className="text-warning">{log.batteryLevel}V</span><br />
                  <strong>Wi-Fi Level:</strong> <span className="text-warning">{log.wifiLevel}%</span><br />
                  <strong>Temp Alert:</strong> <span className={log.tempalert ? 'text-success' : 'text-muted'}>{log.tempalert ? 'Yes' : 'No'}</span><br />
                  <strong>Range Out Count:</strong> <span className="text-danger">{log.rangeoutCount}</span><br />
                  <strong>Battery Alert:</strong> <span className={log.batteryLevelAlert ? 'text-success' : 'text-muted'}>{log.batteryLevelAlert ? 'Yes' : 'No'}</span><br />
                  <strong>Wi-Fi Alert:</strong> <span className={log.wifiLevelAlert ? 'text-success' : 'text-muted'}>{log.wifiLevelAlert ? 'Yes' : 'No'}</span><br />
                  <strong>Created At:</strong> {new Date(log.createdAt).toLocaleString()}<br />
                </CardText>
                <Button color="info" onClick={() => fetchComments(log.tempLogId)}>
                  View Log Comments
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal to display comments and add new comments */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Comments for Log {selectedTempLogId}</ModalHeader>
        <ModalBody>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id}>
                <strong>{comment.createdBy}:</strong> {comment.comments}<br />
                <small><em>{new Date(comment.createdAt).toLocaleString()}</em></small>
                <hr />
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}

          {/* Input for new comment */}
          <Input
            type="textarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            rows="3"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default TempLogs;

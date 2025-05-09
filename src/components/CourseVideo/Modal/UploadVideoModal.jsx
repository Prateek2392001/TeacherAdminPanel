import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UploadVideoModal = ({
  show,
  handleClose,
  handleSubmit,
  videoData,
  setVideoData,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload New Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Video Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={videoData.title}
              onChange={(e) =>
                setVideoData({ ...videoData, title: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={videoData.description}
              onChange={(e) =>
                setVideoData({ ...videoData, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Video File</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) =>
                setVideoData({ ...videoData, file: e.target.files[0] })
              }
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Upload
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadVideoModal;

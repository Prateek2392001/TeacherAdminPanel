// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";

// const CourseVideo = () => {
//   const [videoData, setVideoData] = useState({
//     title: "",
//     description: "",
//     courseId: "",
//     videoFile: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVideoData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setVideoData((prev) => ({
//       ...prev,
//       videoFile: e.target.files[0],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle API call for uploading video here
//     console.log("Video Uploading...", videoData);
//   };

//   return (
//     <Container className="my-5">
//       <h2 className="text-center mb-4 fw-bold text-primary">
//         🎥 Upload Course Video
//       </h2>
//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="videoTitle">
//               <Form.Label>Video Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter video title"
//                 name="title"
//                 value={videoData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group controlId="selectCourse">
//               <Form.Label>Select Course</Form.Label>
//               <Form.Select
//                 name="courseId"
//                 value={videoData.courseId}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Course --</option>
//                 <option value="1">React for Beginners</option>
//                 <option value="2">Advanced Node.js</option>
//                 {/* Replace with dynamic course list */}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group controlId="videoDescription" className="mb-3">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             placeholder="Enter description"
//             name="description"
//             value={videoData.description}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group controlId="videoFile" className="mb-4">
//           <Form.Label>Upload Video</Form.Label>
//           <Form.Control type="file" onChange={handleFileChange} required />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Upload Video
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default CourseVideo;

import React, { useState } from "react";
import VideoTable from "./VideoTable";
import UploadVideoModal from "./modal/UploadVideoModal";
import { Button } from "react-bootstrap";

const CourseVideo = () => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleUpload = (e) => {
    e.preventDefault();
    const newVideo = {
      title: videoData.title,
      description: videoData.description,
      file: videoData.file,
      date: new Date().toLocaleDateString(),
    };
    setVideos([...videos, newVideo]);
    setShowModal(false);
    setVideoData({ title: "", description: "", file: null });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bold text-primary">📽️ Uploaded Course Videos</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Video
        </Button>
      </div>

      <VideoTable videos={videos} />
      <UploadVideoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleUpload}
        videoData={videoData}
        setVideoData={setVideoData}
      />
    </div>
  );
};

export default CourseVideo;

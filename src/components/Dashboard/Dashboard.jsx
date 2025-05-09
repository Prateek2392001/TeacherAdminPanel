import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUserGraduate, FaVideo, FaBook } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold text-primary mb-4">
        🎓 Teacher Panel Dashboard
      </h2>

      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="p-3 shadow">
            <FaUserGraduate size={40} className="text-success mb-2" />
            <h5>Total Students</h5>
            <h3 className="fw-bold">12</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow">
            <FaBook size={40} className="text-warning mb-2" />
            <h5>Total Courses</h5>
            <h3 className="fw-bold">8</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow">
            <FaVideo size={40} className="text-danger mb-2" />
            <h5>Uploaded Videos</h5>
            <h3 className="fw-bold">27</h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

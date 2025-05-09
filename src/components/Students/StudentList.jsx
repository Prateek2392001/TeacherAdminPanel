import React from "react";
import { Table, Container, Button } from "react-bootstrap";

const StudentList = () => {
  const students = [
    {
      id: 1,
      name: "John Doe",
      grade: "10th",
      email: "john@example.com",
      contact: "9876543210",
    },
    {
      id: 2,
      name: "Jane Smith",
      grade: "12th",
      email: "jane@example.com",
      contact: "8765432109",
    },
  ];

  return (
    <Container className="mt-4">
      <h2>Student List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>{student.email}</td>
              <td>{student.contact}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaTrash, FaSearch, FaEdit, FaEye, FaBookOpen } from "react-icons/fa";
import Cookies from "js-cookie";
import AddCourse from "./Modal/AddCourse";
import ViewModal from "./ViewModal/ViewModal";
import UpdateCourse from "./Modal/UpdateCourse";
import { api } from "../api";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseID, setSelectedCourseID] = useState(null);
  // const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  // const [selectedDescription, setSelectedDescription] = useState("");
  // const token = Cookies.get("InstructorToken");
  // if (!token) {
  //   setError("Unauthorized: No Token found.");
  //   setLoading(false);
  //   return;
  // }

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  // const fetchCourses = async () => {
  //   try {
  //     const response = await axios.get(`${api}/instructor/courses`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.data?.status === 1 && Array.isArray(response.data.data)) {
  //       setCourses(response.data.data);
  //     } else {
  //       setCourses([]);
  //       setError("Failed to fetch courses.");
  //     }
  //   } catch (err) {
  //     setError("Error fetching courses.");
  //     console.error("API Error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const token = Cookies.get("InstructorToken");
    if (!token) {
      setError("Unauthorized: No Token found.");
      setLoading(false);
    } else {
      fetchCourses(token);
    }
  }, []);

  const fetchCourses = async (token) => {
    try {
      const response = await axios.get(`${api}/instructor/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data?.status === 1 && Array.isArray(response.data.data)) {
        setCourses(response.data.data);
      } else {
        setCourses([]);
        setError("Failed to fetch courses.");
      }
    } catch (err) {
      setError("Error fetching courses.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (courseID) => {
    setSelectedCourseID(courseID);
    setShowViewModal(true);
  };

  const handleUpdateClick = (course) => {
    setSelectedCourse(course);
    setShowUpdateModal(true);
  };

  // const handleDeleteClick = (course) => {
  //   setSelectedCourse(course);
  //   setShowDeleteModal(true);
  // };

  // const filteredCourses = courses.filter((course) =>
  //   course.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredCourses = courses.filter((course) =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <InputGroup className="w-25" style={{ height: "38px" }}>
          <Form.Control
            type="text"
            placeholder="Search Course..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{ height: "100%" }}
          />
          <InputGroup.Text style={{ height: "100%" }}>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>

        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add Course
        </Button>
      </div>

      <div className="card p-4 shadow-lg border-0 rounded-3 bg-light">
        <h2 className="text-center text-primary mb-4"> Courses List</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="table-responsive">
          {loading ? (
            <div className="text-center my-3">
              <Spinner animation="border" />
              <p className="text-muted mt-2">Loading courses...</p>
            </div>
          ) : (
            <>
              <Table striped bordered hover className="shadow-sm rounded">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>📚 Course Name</th>
                    <th>📝 Description</th>
                    <th>🖼 Thumbnail</th>
                    <th>⏳ Duration (Minutes)</th>
                    <th>⭐ Rating</th>
                    <th>👥 Rating Count</th>
                    <th>🎥 Media</th>
                    {/* <th>👤 Created By</th> */}
                    <th>⚙️ Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center text-muted py-3">
                        No courses available
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((course, index) => (
                      <tr key={course._id} className="align-middle">
                        <td className="fw-bold">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td>{course.name}</td>
                        <td
                          style={{
                            maxWidth: "250px",
                            whiteSpace: "wrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {course.description}
                        </td>
                        {/* <td>
                          <img
                            src={course.thumbnail}
                            alt="Course Thumbnail"
                            width="100"
                            height="70"
                            className="rounded"
                          />
                        </td> */}
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt="Course Thumbnail"
                            width="100"
                            height="70"
                            className="rounded"
                          />
                        ) : (
                          <span className="text-muted">No image</span>
                        )}

                        <td>{course.courseDuration} min</td>
                        <td>{course.rating}</td>
                        <td>{course.ratingCount}</td>
                        <td>
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => handleViewClick(course._id)}
                          >
                            <FaEye /> View
                          </Button>
                        </td>
                        {/* <td>{course.createdBy || "N/A"}</td> */}
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleUpdateClick(course)}
                          >
                            <FaEdit />
                          </Button>
                          {/* <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(course)}
                          >
                            <FaTrash />
                          </Button> */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>

              {/* Pagination */}
              {filteredCourses.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AddCourse
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        refreshList={fetchCourses}
      />
      <UpdateCourse
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        selectedCourse={selectedCourse}
        refreshList={fetchCourses}
      />
      {/* <DeleteCourse
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        course={selectedCourse}
        refreshList={fetchCourses}
      /> */}
      {showViewModal && (
        <ViewModal
          show={showViewModal}
          handleClose={() => setShowViewModal(false)}
          course_ID={selectedCourseID}
        />
      )}
    </div>
  );
};

export default CoursesList;

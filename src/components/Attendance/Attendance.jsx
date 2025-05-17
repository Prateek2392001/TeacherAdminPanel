import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AttendanceForm from "./Modal/AttendanceForm";
import CreateAttendanceForm from "./Modal/CreateAttendanceForm";
import ViewAttendanceModal from "./Modal/ViewAttendanceModal";
import { api } from "../api";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const token = Cookies.get("InstructorToken");
        const response = await axios.get(
          `${api}/instructor/enrolled-students`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 1) {
          setStudents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchEnrolledStudents();
  }, []);

  const handleMarkAttendanceClick = (student) => {
    setSelectedStudent(student);
    setShowMarkModal(true);
  };

  const handleCreateAttendanceClick = (student) => {
    setSelectedStudent(student);
    setShowCreateModal(true);
  };

  const handleViewAttendanceClick = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const closeModals = () => {
    setSelectedStudent(null);
    setShowMarkModal(false);
    setShowCreateModal(false);
    setShowViewModal(false);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Enrolled Students</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Enrolled Courses</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.contact}</td>
                  <td>
                    {student.enrolledCourses
                      .map((course) => course.courseName)
                      .join(", ")}
                  </td>

                  <td className="d-flex gap-2 flex-wrap">
                    {student.attendance && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleCreateAttendanceClick(student)}
                      >
                        Create Attendance
                      </button>
                    )}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleMarkAttendanceClick(student)}
                    >
                      Mark Attendance
                    </button>

                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleViewAttendanceClick(student)}
                    >
                      View Attendance
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AttendanceForm
        show={showMarkModal}
        onClose={closeModals}
        student={selectedStudent}
      />
      <CreateAttendanceForm
        show={showCreateModal}
        onClose={closeModals}
        student={selectedStudent}
      />
      <ViewAttendanceModal
        show={showViewModal}
        onClose={closeModals}
        student={selectedStudent}
      />
    </div>
  );
};

export default Attendance;

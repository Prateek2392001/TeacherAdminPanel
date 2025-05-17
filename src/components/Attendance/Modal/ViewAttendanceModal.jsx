import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { api } from "../../api";

const ViewAttendanceModal = ({ show, onClose, student }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!student) return;
      try {
        const token = Cookies.get("InstructorToken");
        const res = await axios.get(
          `${api}/instructor/attendance/student?studentId=${student.studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === 1) {
          setRecords(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching attendance history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchAttendance();
    }
  }, [show, student]);

  if (!show || !student) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "#00000080" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Attendance History: {student.name}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <p>Loading...</p>
            ) : records.length === 0 ? (
              <p>No attendance records found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th>Class Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, idx) => (
                      <tr key={idx}>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        {/* <td>{record.courseId?.name || "N/A"}</td> */}
                        <td>
                          {record.courseId?.name || record.courseName || "N/A"}
                        </td>
                        <td>{record.status}</td>
                        {/* <td>{record.classDay || "-"}</td> */}
                        <td>
                          {record.classDay ||
                            new Date(record.date).toLocaleString("en-US", {
                              weekday: "long",
                            })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendanceModal;

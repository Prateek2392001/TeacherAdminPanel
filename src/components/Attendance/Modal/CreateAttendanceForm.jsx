import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { api } from "../../api";

const CreateAttendanceForm = ({ show, onClose, student, onCreated }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [status, setStatus] = useState("Present");
  const [showDropdown, setShowDropdown] = useState(false);
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!student || !selectedCourse) {
        setSchedule([]);
        return;
      }

      try {
        const token = Cookies.get("InstructorToken");
        const response = await axios.get(
          `${api}/instructor/attendance/student?studentId=${student.studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 1 && response.data.data?.length > 0) {
          const courseScheduleObj = response.data.data.find(
            (item) => item.courseId === selectedCourse
          );
          setSchedule(
            courseScheduleObj?.schedule && courseScheduleObj.schedule.length > 0
              ? courseScheduleObj.schedule
              : ["Monday", "Wednesday", "Friday"]
          );
        } else {
          setSchedule(["Monday", "Wednesday", "Friday"]);
        }
      } catch (err) {
        console.error("Failed to fetch schedule", err);
        setSchedule(["Monday", "Wednesday", "Friday"]);
      }
    };

    fetchSchedule();
  }, [student, selectedCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    }

    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (!schedule.includes(dayOfWeek)) {
      alert(
        `The selected date (${dayOfWeek}) is not in the selected schedule: ${schedule.join(
          ", "
        )}`
      );
      return;
    }

    try {
      const token = Cookies.get("InstructorToken");
      const res = await axios.post(
        `${api}/instructor/attendance/mark`,
        {
          studentId: student.studentId,
          courseId: selectedCourse,
          date: date,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === 1) {
        alert("Attendance created successfully!");
        if (onCreated) onCreated(res.data.data);
        onClose();
      }
    } catch (err) {
      console.error("Error creating attendance", err);
      alert(err?.response?.data?.message || "Failed to create attendance.");
    }
  };

  if (!show || !student) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "#00000080" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">
              Create Attendance for {student.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label>Student Name</label>
                <input className="form-control" readOnly value={student.name} />
              </div>

              <div className="mb-3">
                <label>Course</label>
                <select
                  className="form-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="">Select a course</option>
                  {student.enrolledCourses.map((course) => (
                    <option key={course.courseId} value={course.courseId}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <label>Schedule (Select Day)</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={schedule.join(", ")}
                  onClick={() => setShowDropdown(!showDropdown)}
                  placeholder="Click to select schedule days"
                />

                {showDropdown && (
                  <ul
                    className="list-group position-absolute w-100"
                    style={{
                      zIndex: 1000,
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {weekdays.map((day) => (
                      <li
                        key={day}
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                          if (!schedule.includes(day)) {
                            setSchedule([...schedule, day]);
                          }
                          setShowDropdown(false);
                        }}
                      >
                        {day}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-3">
                <label>Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Postponed">Postponed</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAttendanceForm;

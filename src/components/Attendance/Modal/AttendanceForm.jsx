// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const AttendanceForm = ({ show, onClose, student }) => {
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [status, setStatus] = useState("Present");
//   const [date, setDate] = useState(() => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = Cookies.get("InstructorToken");

//       const res = await axios.post(
//         "https://educationapp-2v1l.onrender.com/api/instructor/attendance/mark",
//         {
//           studentId: student.studentId,
//           courseId: selectedCourse,
//           date: date,
//           status: status,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data.status === 1) {
//         alert("Attendance marked successfully!");
//         onClose(); // Close modal
//       }
//     } catch (err) {
//       console.error("Error marking attendance", err);
//     }
//   };

//   if (!show || !student) return null;

//   return (
//     <div
//       className="modal d-block"
//       tabIndex="-1"
//       role="dialog"
//       style={{ backgroundColor: "#00000080" }}
//     >
//       <div className="modal-dialog" role="document">
//         <div className="modal-content p-3">
//           <div className="modal-header">
//             <h5 className="modal-title">Mark Attendance for {student.name}</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={onClose}
//             ></button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label>Course</label>
//                 <select
//                   className="form-select"
//                   required
//                   onChange={(e) => setSelectedCourse(e.target.value)}
//                   value={selectedCourse}
//                 >
//                   <option value="">Select a course</option>
//                   {student.enrolledCourses.map((course) => (
//                     <option key={course.courseId} value={course.courseId}>
//                       {course.courseName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label>Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label>Status</label>
//                 <select
//                   className="form-select"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   required
//                 >
//                   <option value="Present">Present</option>
//                   <option value="Absent">Absent</option>
//                   <option value="Postponed">Postponed</option>
//                 </select>
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button type="submit" className="btn btn-success">
//                 Mark
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceForm;

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AttendanceForm = ({ show, onClose, student }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("InstructorToken");

      const course = student.enrolledCourses.find(
        (c) => c.courseId === selectedCourse
      );

      const schedule = course?.schedule ?? ["Monday", "Wednesday", "Friday"];

      const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });

      if (!schedule.includes(dayOfWeek)) {
        alert(
          `The selected date (${dayOfWeek}) is not in the course schedule: ${schedule.join(
            ", "
          )}`
        );
        return;
      }

      const res = await axios.post(
        "https://educationapp-2v1l.onrender.com/api/instructor/attendance/mark",
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
        alert("Attendance marked successfully!");
        onClose();
      }
    } catch (err) {
      console.error("Error marking attendance", err);
      alert(err?.response?.data?.message || "Failed to mark attendance.");
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
            <h5 className="modal-title">Mark Attendance for {student.name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label>Course</label>
                <select
                  className="form-select"
                  required
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  value={selectedCourse}
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
              <button type="submit" className="btn btn-success">
                Mark
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

export default AttendanceForm;

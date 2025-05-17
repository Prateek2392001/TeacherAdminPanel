import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ open }) => {
  return (
    <>
      <nav
        className={`sidebar sidebar-offcanvas ${open && "active"}`}
        id="sidebar"
      >
        <ul className="nav">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              <i className="bi bi-speedometer2 mx-2 fw-bold"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to={"/studentlist"} className="nav-link">
              <i className="bi bi-book mx-2 fw-bold"></i>
              <span className="menu-title">Student List</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <Link to={"/courseslist"} className="nav-link">
              <i className="bi bi-person-badge mx-2 fw-bold"></i>
              <span className="menu-title">Courses List</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/attendance"} className="nav-link">
              <i className="bi bi-calendar-check mx-2 fw-bold"></i>
              <span className="menu-title">Student Attendance</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to={"/coursevideo"} className="nav-link">
              <i className="bi bi-person-badge mx-2 fw-bold"></i>
              <span className="menu-title">Courses Video</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;

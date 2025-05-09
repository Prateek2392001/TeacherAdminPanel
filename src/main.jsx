import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentList from "./components/Students/StudentList.jsx";
import CoursesList from "./components/Courses/CoursesList.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import CourseVideo from "./components/CourseVideo/CourseVideo.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/studentlist", element: <StudentList /> },
      { path: "/courseslist", element: <CoursesList /> },
      { path: "/coursevideo", element: <CourseVideo /> },
      // { path: "/progress-tracking", element: <StudentProgress /> },
      // { path: "/teachers", element: <TeacherTable /> },
      // { path: "/enrollments", element: <Enrollment /> },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);

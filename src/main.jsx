import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import CoursesList from "./components/Courses/CoursesList.jsx";
import App from "./App.jsx";
import "./assets/style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Attendance from "./components/Attendance/Attendance.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/courseslist", element: <CoursesList /> },
      { path: "/attendance", element: <Attendance /> },
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

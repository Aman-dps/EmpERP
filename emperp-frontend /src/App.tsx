import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import GoogleCallback from "./pages/auth/GoogleCallback";
import Unauthorized from "./pages/Unauthorized";
import AdminApproval from "./pages/AdminApproval";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// DASHBOARD
import Dashboard from "./pages/Dashboard";

// DEPARTMENTS
import DepartmentList from "./pages/departments/DepartmentList";
import DepartmentCreate from "./pages/departments/DepartmentCreate";
import DepartmentEdit from "./pages/departments/DepartmentEdit";

// EMPLOYEES
import EmployeeList from "./pages/employees/EmployeeList";
import EmployeeCreate from "./pages/employees/EmployeeCreate";
import EmployeeEdit from "./pages/employees/EmployeeEdit";
import EmployeePhotoUpload from "./pages/employees/EmployeePhotoUpload";

// SALARIES
import SalaryList from "./pages/salaries/SalaryList";
import SalaryCreate from "./pages/salaries/SalaryCreate";
import SalaryEdit from "./pages/salaries/SalaryEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<GoogleCallback />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ADMIN APPROVAL */}
        <Route
          path="/admin/approvals"
          element={
            <ProtectedRoute>
              <AdminApproval />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* DEPARTMENTS */}
        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <DepartmentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments/create"
          element={
            <ProtectedRoute>
              <DepartmentCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments/:id"
          element={
            <ProtectedRoute>
              <DepartmentEdit />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEES - ACCESSIBLE TO ALL */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/create"
          element={
            <ProtectedRoute>
              <EmployeeCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <EmployeeEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/:id/photo"
          element={
            <ProtectedRoute>
              <EmployeePhotoUpload />
            </ProtectedRoute>
          }
        />

        {/* SALARIES */}
        <Route
          path="/salaries"
          element={
            <ProtectedRoute>
              <SalaryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salaries/create"
          element={
            <ProtectedRoute>
              <SalaryCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salaries/:id"
          element={
            <ProtectedRoute>
              <SalaryEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

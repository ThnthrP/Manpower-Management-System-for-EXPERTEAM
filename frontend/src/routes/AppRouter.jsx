import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { AppContent } from "../context/AppContext";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

import AdminDashboard from "../pages/dashboard/AdminDashboard";
import PeDashboard from "../pages/dashboard/PeDashboard";

import AdminUsers from "../pages/admin/AdminUsers";

import TrainingMatrix from "../pages/training/TrainingMatrix";

const AppRouter = () => {
  const { userData } = useContext(AppContent);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const role = userData?.role?.name;

  const getDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;

      case "pe":
        return <PeDashboard />;

      default:
        return <div>No dashboard assigned</div>;
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={getDashboard()} />

          {/* Training Matrix */}
          <Route
            path="/training-matrix"
            element={
              <ProtectedRoute
                allowRoles={["admin", "hr", "manpower", "pe", "expert"]}
              >
                <TrainingMatrix />
              </ProtectedRoute>
            }
          />

          {/* User Management */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </ProtectedRoute>
  );
};

export default AppRouter;

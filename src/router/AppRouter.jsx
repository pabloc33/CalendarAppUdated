import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import CalendarPage from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks/useAuthStore";

const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = "no-authenticated";

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === "no-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;

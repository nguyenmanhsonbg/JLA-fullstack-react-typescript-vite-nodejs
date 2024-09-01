import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RoleProtectedRoute = ({ roles, children }) => {
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userEncode = localStorage.getItem("user");
    if (userEncode) {
      const userDecode = JSON.parse(userEncode);
      setRole(userDecode?.role_id?.toString());
    }
    setIsLoading(false); 
  }, []);

  if (isLoading) {
    return null; 
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/error" state={{ from: location,
          message: "Tài khoản không có quyền truy cập."}} />;
  }

  return children;
};

export default RoleProtectedRoute;

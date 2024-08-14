import AdminLayout from "@/layout/CommonLayout";
import { adminRoutes } from "@/router";
import { Navigate, Route, Routes } from "react-router-dom";

function AdminRouter() {
  const AdminRouteComponent = adminRoutes.map((item, index) => {
    const path = item.path;
    const ContentComponent = item.element;
    return (
      <Route
        key={index}
        path={path}
        element={
          <>
            <ContentComponent />
          </>
        }
      />
    );
  });
  return (
    <>
      <AdminLayout>
        <Routes>
          <Route path="" element={<Navigate to={"/admin/user-management"} />} />
          {AdminRouteComponent}
        </Routes>
      </AdminLayout>
    </>
  );
}

export default AdminRouter;

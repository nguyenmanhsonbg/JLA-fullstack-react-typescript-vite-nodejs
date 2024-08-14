import ContentManagerLayout from "@/layout/CommonLayout";
import { contentManagerRoutes } from "@/router";
import { Navigate, Route, Routes } from "react-router-dom";

function ContentManagerRouter() {
  const ContentCreatorRouteComponent = contentManagerRoutes.map((item, index) => {
    const path = item.path;
    const ContentComponent = item.element;
    return (
      <Route key={index} path={path} element={<> <ContentComponent /> </>}/>
    );
  });
  
  return (
    <>
      <ContentManagerLayout>
        <Routes>
          <Route path="" element={<Navigate to={"/contentManager/course-management"} />} />
          {ContentCreatorRouteComponent}
        </Routes>
      </ContentManagerLayout>
    </>
  );
}

export default ContentManagerRouter;

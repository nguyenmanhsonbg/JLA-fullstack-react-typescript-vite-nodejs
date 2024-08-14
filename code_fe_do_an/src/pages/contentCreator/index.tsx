import ContentCreatorLayout from "@/layout/CommonLayout";
import { contentCreatorRoutes } from "@/router";
import { Navigate, Route, Routes } from "react-router-dom";

function ContentCreatorRouter() {
  const ContentCreatorRouteComponent = contentCreatorRoutes.map((item, index) => {
    const path = item.path;
    const ContentComponent = item.element;
    return (
      <Route key={index} path={path} element={<> <ContentComponent /> </>}/>
    );
  });
  
  return (
    <>
      <ContentCreatorLayout>
        <Routes>
          <Route path="" element={<Navigate to={"/contentCreator/course-management"} />} />
          {ContentCreatorRouteComponent}
        </Routes>
      </ContentCreatorLayout>
    </>
  );
}

export default ContentCreatorRouter;

import CourseDetailPage from "@/pages/contentCreator/course-detail";
import CourseManagementPage from "@/pages/contentCreator/course-management";

export const contentManagerRoutes = [
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/:id", element: CourseDetailPage },
];

import CourseDetailPage from "@/pages/common/course-detail";
import CourseManagementPage from "@/pages/common/course-management";

export const contentManagerRoutes = [
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/:id", element: CourseDetailPage },
];

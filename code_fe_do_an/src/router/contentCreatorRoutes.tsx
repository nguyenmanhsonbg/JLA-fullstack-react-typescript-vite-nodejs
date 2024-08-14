import CourseDetailPage from "@/pages/contentCreator/course-detail";
import CourseManagementPage from "@/pages/contentCreator/course-management";
import ExamCreatePage from "@/pages/contentCreator/course-exam-create";
import ExamManagementPage from "@/pages/contentCreator/exam-management";
import ExamAssignPage from "@/pages/contentCreator/assign-exam-to-course";

export const contentCreatorRoutes = [
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/create", element: CourseDetailPage },
  { path: "course-management/:id", element: CourseDetailPage },
  { path: "exam-management/create", element: ExamCreatePage },
  { path: "exam-management/manage", element: ExamManagementPage },
  { path: "exam-management/assign", element: ExamAssignPage }
];

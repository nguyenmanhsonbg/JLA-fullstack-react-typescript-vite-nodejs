import CourseDetailPage from "@/pages/common/course-detail";
import CourseManagementPage from "@/pages/common/course-management";
import ExamCreatePage from "@/pages/contentCreator/course-exam-create";
import ExamManagementPage from "@/pages/contentCreator/exam-management";
import ExamAssignPage from "@/pages/contentCreator/assign-exam-to-course";
import ExamViewPage from "@/pages/contentCreator/course-exam-view";

export const contentCreatorRoutes = [
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/create", element: CourseDetailPage },
  { path: "course-management/:id", element: CourseDetailPage },
  { path: "exam-management/create", element: ExamCreatePage },
  { path: "exam-management/edit/:exam_id", element: ExamCreatePage },
  { path: "exam-management/view/:exam_id", element: ExamViewPage },
  { path: "exam-management/manage", element: ExamManagementPage },
  { path: "exam-management/assign", element: ExamAssignPage }
];

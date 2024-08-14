import { Flex, Spin } from "antd";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./hook/AuthContext";
import Alphabet from "./pages/alphabet/Alphabet";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import GetAuthenticationCode from "./pages/authentication/GetAuthenticationCode";
import GetNewPassword from "./pages/authentication/GetNewPassword";
import GetNewPWSuccess from "./pages/authentication/GetNewPWSuccess";
import Course from "./pages/course/Course";
import Grammar from "./pages/course/Grammar";
import GrammarDetail from "./pages/course/GrammarDetail";
import Kanji from "./pages/course/Kanji";
import LearningByWeek from "./pages/course/LearningByWeek";
import Video from "./pages/course/Video";
import Vocabulary from "./pages/course/Vocabulary";
import WeeklyExam from "./pages/course/WeeklyExam";
import WeeklyExamReviewing from "./pages/course/WeeklyExamReviewing";
import WeeklyExamHistory from "./pages/course/WeeklyExamHistory";
import Home from "./pages/home/Home";
import UserProfile from "./pages/userProfie/UserProfile";
import Security from "./pages/home/Security";
import Policy from "./pages/home/Policy";
import AboutDNLS from "./pages/about/AboutDNLS";
import AboutTextbook from "./pages/about/AboutTextbook";
import DetailTextbook from "./pages/about/DetailTextbook";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ErrorPage from "./components/ui/errorPage";
import React from 'react';
const contentStyle = {
  padding: 50,
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

const AdminRoutes = lazy(() => import("@/pages/admin/"));
const ContentCreatorRoutes = lazy(() => import("@/pages/contentCreator/"));
const ContentManagerRoutes = lazy(() => import("@/pages/contentManager/"));

const SpinnerComponent = (
  <Flex
    gap="small"
    vertical
    style={{
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin tip="Loading" size="large">
      {content}
    </Spin>
  </Flex>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={SpinnerComponent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/getAuthenticationCode" element={<GetAuthenticationCode />}/>
            <Route path="/getNewPassword" element={<ProtectedRoute><GetNewPassword /></ProtectedRoute>} />
            <Route path="/getNewPWSuccess" element={<GetNewPWSuccess />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/aboutDNLS" element={<AboutDNLS />} />
            <Route path="/aboutDekiru" element={<AboutTextbook />} />
            <Route path="/detailTextbook" element={<DetailTextbook />} />
            <Route path="/alphabet" element={<Alphabet />} />
            <Route path="/course" element={<Course />} />
            <Route path="/security" element={<Security />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/learningByWeek/:id" element={<LearningByWeek />} />
            <Route path="/:id/:week_id/:day_id/vocabulary" element={<Vocabulary />}/>
            <Route path="/:id/:week_id/:day_id/kanji" element={<Kanji />} />
            <Route path="/:id/:week_id/:day_id/grammar" element={<Grammar />} />
            <Route path="/:id/:week_id/:day_id/video" element={<Video />} />
            <Route path="/:id/:week_id/:day_id/grammar/detail/:grammar_id" element={<GrammarDetail />}/>
            <Route path="/:id/:week_id/:weekly_exam_id/weeklyExam" element={<WeeklyExam />} />
            <Route path="/weeklyExam/:id/:week_id/:examHistoryId/reviewing" element={<WeeklyExamReviewing />} />
            <Route path="/:id/:week_id/:weekly_exam_id/examsHistory" element={<WeeklyExamHistory />} /> 
            
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/contentCreator/*" element={<ContentCreatorRoutes />} />
            <Route path="/contentManager/*" element={<ContentManagerRoutes />} />
            <Route path="/error" element={<ErrorPage />}/>
            <Route path="*" element={<ErrorPage />}/>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

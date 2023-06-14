import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import OnlinCourse from "./pages/OnlineCourse";
import AddCourse from "./pages/AddCourse"
import CourseQuestion from "./pages/course/CourseQuestionWrite"
import CourseQuestionList from "./pages/course/CourseQuestionList";
import CourseQuestionRead from "./pages/course/CourseQuestionRead";
import CourseRecord from "./pages/CourseRecord";
import CourseNotificationList from "./pages/course/CourseNotificationList";
import CourseNotificationRead from "./pages/course/CourseNotificationRead";
import CourseArchiveList from "./pages/course/CourseArchiveList";
import CourseWrite from "./pages/course/CourseWrite";
const Router = () => (
  <Routes>
    <Route path="/" element={<Home />}> </Route>
    <Route path="/onlineCourse" element={<OnlinCourse />}> </Route>
    <Route path="/addCourse" element={<AddCourse />}> </Route>
    <Route path="/courseQuestion/write" element={<CourseQuestion />}> </Route>
    <Route path="/courseQuestion" element={<CourseQuestionList />}> </Route>
    <Route path="/courseQuestion/read" element={<CourseQuestionRead />}> </Route>
    <Route path="/courseRecord" element={<CourseRecord />}> </Route>
    <Route path="/courseNotification" element={<CourseNotificationList />}> </Route>
    <Route path="/courseNotification/read" element={<CourseNotificationRead />}> </Route>
    <Route path="/courseArchive" element={<CourseArchiveList />}> </Route>
    <Route path="/courseWrite" element={<CourseWrite />}> </Route>

  </Routes>
)

export default Router;
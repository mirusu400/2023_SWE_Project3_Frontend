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
import CourseQuestionWrite from "./pages/course/CourseQuestionWrite"
import CourseQuestionList from "./pages/course/CourseQuestionList";
import CourseRecord from "./pages/CourseRecord";
import CourseNotificationList from "./pages/course/CourseNotificationList";
import CourseNotificationWrite from "./pages/course/CourseNotificationWrite";
import CourseArchiveList from "./pages/course/CourseArchiveList";
import CourseArchiveWrite from "./pages/course/CourseArchiveWrite";
import CourseWrite from "./pages/course/CourseWrite";
import LectureWrite from "./pages/lecture/LectureWrite";
import CourseHomeworkWrite from "./pages/course/CourseHomeworkWrite";
import CourseHomeworkList from "./pages/course/CourseHomeworkList";
import CourseBoardRead from "./pages/course/CourseBoardRead";
import CourseBoardEdit from "./pages/course/CourseBoardEdit";

const Router = ({
  userData,
  selectedCourseId,
  setSelectedCourseId,
}) => (
  <Routes>
    <Route path="/" element={<Home />}> </Route>
    <Route path="/onlineCourse" 
      element={<OnlinCourse selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId} />}
    > </Route>
    <Route path="/addCourse" element={<AddCourse />}> </Route>
    <Route path="/courseQuestion/write" 
      element={<CourseQuestionWrite userData={userData} selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    > </Route>
    <Route path="/courseQuestion"
      element={ <CourseQuestionList selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    ></Route>
    <Route path="/courseRecord" element={<CourseRecord userData={userData}/>}> </Route>
    <Route path="/courseNotification" 
      element={<CourseNotificationList selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    > </Route>
    <Route path="/courseNotification/write"
      element={<CourseNotificationWrite userData={userData} selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    ></Route>
    <Route path="/courseArchive" 
      element={<CourseArchiveList selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    > </Route>
    <Route path="/courseArchive/write" 
      element={<CourseArchiveWrite userData={userData} selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId} />}
    >
    </Route>
    
    <Route path="/courseWrite"
      element={<CourseWrite selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    ></Route>
    <Route path="/courseRead"
      element={<CourseBoardRead />}
    ></Route>
    <Route path="/onlineCourse/write"
      element={<LectureWrite userData={userData} selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    > </Route>
    
    <Route path="/courseEdit"
      element={<CourseBoardEdit/>}
    ></Route>

    <Route path="/courseHomework"
      element={<CourseHomeworkList selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    ></Route>
    <Route path="/courseHomework/write"
      element={<CourseHomeworkWrite userData={userData} selectedCourseId={selectedCourseId} setSelectedCourseId={setSelectedCourseId}/>}
    > </Route>


  </Routes>
)

export default Router;
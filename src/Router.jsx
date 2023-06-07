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
import OnlineLecture from "./pages/OnlineLecture";
import AddLecture from "./pages/AddLecture"
import LectureQuestion from "./pages/LectureQuestionWrite"
import LectureQuestionList from "./pages/LectureQuestionList";
import LectureQuestionRead from "./pages/LectureQuestionRead";
import LectureRecord from "./pages/LectureRecord";
const Router = () => (
  <Routes>
    <Route path="/" element={<Home />}> </Route>
    <Route path="/onlineLecture" element={<OnlineLecture />}> </Route>
    <Route path="/addLecture" element={<AddLecture />}> </Route>
    <Route path="/lectureQuestion/write" element={<LectureQuestion />}> </Route>
    <Route path="/lectureQuestion" element={<LectureQuestionList />}> </Route>
    <Route path="/lectureQuestion/read" element={<LectureQuestionRead />}> </Route>
    <Route path="/lectureRecord" element={<LectureRecord />}> </Route>
  </Routes>
)

export default Router;
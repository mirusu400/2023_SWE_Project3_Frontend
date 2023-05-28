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


const Router = () => (
  <Routes>
    <Route path="/" element={<Home />}> </Route>
    <Route path="/onlineLecture" element={<OnlineLecture />}> </Route>
  </Routes>
)

export default Router;
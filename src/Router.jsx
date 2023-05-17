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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      {/* <Route path="/home" component={Home} /> */}
    </Route>
  )
);

const Router = () => (
  <RouterProvider router={router}>
  </RouterProvider>
)

export default Router;
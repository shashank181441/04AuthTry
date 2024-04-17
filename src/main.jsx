import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Profile from "./components/pages/Profile.jsx";
import Followers from "./components/pages/Followers.jsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AllPosts from "./components/pages/AllPosts.jsx";
import Following from "./components/pages/Following.jsx";
import Notification from "./components/pages/Notification.jsx";
import Photos from "./components/pages/Photos.jsx";
import ImageViewer from "./components/smallComps/ImageViewer.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/:username",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/photos/:username",
        element: (
          <AuthLayout authentication>
            <Photos />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: `/profile/:username`,
        element: (
          <AuthLayout authentication>
            {" "}
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/followers",
        element: (
          <AuthLayout authentication>
            <Followers />
          </AuthLayout>
        ),
      },
      {
        path: "/following",
        element: (
          <AuthLayout authentication>
            <Following />
          </AuthLayout>
        ),
      },
      {
        path: "/notifications",
        element: (
          <AuthLayout authentication>
            <Notification />
          </AuthLayout>
        ),
      },
      {
        path: "/imageViewer",
        element: (
          <AuthLayout authentication>
            <ImageViewer />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

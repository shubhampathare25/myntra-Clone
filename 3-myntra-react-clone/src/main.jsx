import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Bag from "./routes/Bag.jsx";
import Home from "./routes/Home.jsx";
import { Provider } from "react-redux";
import myntraStore from "./store/index.js";
import Wishlist from "./routes/Wishlist.jsx";

import Men from "./Pages/Men.jsx";
import Women from "./Pages/Women.jsx";
import Kids from "./Pages/Kids.jsx";
import HomeLiving from "./Pages/Home&Living.jsx";
import Beauty from "./Pages/Beauty.jsx";
import Login from "./Pages/UserLogin.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/bag",
        element: <Bag />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/men",
        element: <Men />,
      },
      {
        path: "/women",
        element: <Women />,
      },
      {
        path: "/kids",
        element: <Kids />,
      },
      {
        path: "/home-living",
        element: <HomeLiving />,
      },
      {
        path: "/Beauty",
        element: <Beauty />,
      },
      {
        path: "/studio",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
    ],
  },
]);

ReactDOM.createRoot(getElementByIdOrThrow("root")).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

function getElementByIdOrThrow(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error("Root element not found");
  return el;
}

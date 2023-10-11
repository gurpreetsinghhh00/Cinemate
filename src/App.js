import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AppLayout from "./Components/AppLayout";
import store from "./Utils/store";
import {
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Components/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Details from "./pages/Details";
import Error from "./Components/Error";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import AuthLayout from "./Components/AuthLayout";

const App = () => {
  return (
    <Provider store={store}>
      <ScrollRestoration />
      <AppLayout />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "movies",
        element: (
          <AuthLayout authentication={true}>
            <Movies />
          </AuthLayout>
        ),
      },
      {
        path: "tv-shows",
        element: (
          <AuthLayout authentication={true}>
            <TvShows />
          </AuthLayout>
        ),
      },
      {
        path: "details/:type/:id",
        element: (
          <AuthLayout authentication={true}>
            <Details />
          </AuthLayout>
        ),
      },
      {
        path: "search",
        element: (
          <AuthLayout authentication={true}>
            <SearchResults />
          </AuthLayout>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Layout from "./Components/Layout";
import store from "./Utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Details from "./pages/Details";

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/tv-shows",
        element: <TvShows />,
      },
      {
        path: "/details/:type/:id",
        element: <Details />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

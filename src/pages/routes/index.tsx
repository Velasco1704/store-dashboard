import { Orders } from "@pages/Orders";
import { NotFound } from "@pages/NotFound";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";

export const routes = [
  {
    path: "/login",
    element: <Login />,
    protected: false,
  },
  {
    path: "/",
    element: <Home />,
    protected: true,
  },
  {
    path: "/orders",
    element: <Orders />,
    protected: true,
  },
  {
    path: "/*",
    element: <NotFound />,
    protected: false,
  },
];

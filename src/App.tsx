import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFound } from "@pages/NotFound";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

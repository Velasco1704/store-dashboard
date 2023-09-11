import { RootState } from "@app/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.user.token);
  return token ? children : <Navigate to="/login" />;
};

import { Outlet, useNavigate } from "react-router-dom";
import { useStateStore } from "../store/stateStore";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function ProtectedRoute() {
  const currentUser = useStateStore((state) => state.currentUser);
  const setCurrentUser = useStateStore.getState().setCurrentUser;
  const setIsLoading = useStateStore.getState().setIsLoading;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      setIsLoading(true);
      axios
        .get(`${BACKEND_URL}/status`, { withCredentials: true })
        .then((res) => {
          const newUser = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            image: res.data.image,
          };
          setCurrentUser(newUser);
        })
        .catch((err) => {
          console.log("Error fetching login details:", err);
          if (err.response?.status === 401) {
            navigate("/", { replace: true });
          }
        });
      setIsLoading(false);
    }
  }, [currentUser, navigate]);

  return <Outlet />;
}

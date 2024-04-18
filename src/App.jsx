import apiClient, { loginUser, logoutUser } from "./api";
import { useState, useEffect } from "react";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./api";
import Register from "./components/Register";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        console.log("dispatch appjsx", userData);
        console.log(location);
        if (userData) {
          // Extract serializable data from headers and config
          const { data } = userData;
          dispatch(login({ userData: data }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [location]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="bg-lime-50">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;

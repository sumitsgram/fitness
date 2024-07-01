import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const history = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Optionally, notify the backend about the logout
        await axios.post(
          "http://localhost:5000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Remove the token from local storage
        localStorage.removeItem("token");

        // Redirect to the login page or home page
        history.push("/login");
      } catch (err) {
        console.error("Logout error", err);
        // Handle error if needed, for example, showing a notification
      }
    };

    handleLogout();
  }, [history]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;

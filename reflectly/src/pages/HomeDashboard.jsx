import { MenuIcon } from "../components/MenuIcon";
import axios from "axios";
import { useEffect, useState } from "react";

export function HomeDashboard() {
  const [name, setName] = useState("Guest");
  useEffect(() => {
    async function getName() {
      try {
        const response = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        console.log(response.data.name);
        setName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    }
    getName();
  }, []);

  return (
    <div className="home-dashboard-page">
      <MenuIcon />
      <div className="welcome-header">{name}</div>
    </div>
  );
}

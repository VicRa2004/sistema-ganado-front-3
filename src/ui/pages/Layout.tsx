import { Outlet } from "react-router";
import { Navigation } from "../components/navigation";

export const Layout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

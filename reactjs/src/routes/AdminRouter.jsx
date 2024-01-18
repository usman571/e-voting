import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

import routes from ".";

const UserRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <>
              {route.hideSidebar ? null : (
                <aside className="w-[20%] ">
                  <Sidebar />
                </aside>
              )}
              <section
                className={`${route.hideSidebar ? "w-full" : "w-[79%]"}`}
              >
                <route.element candidates={route.candidates} />
              </section>
            </>
          }
        />
      ))}
    </Routes>
  );
};

export default UserRouter;

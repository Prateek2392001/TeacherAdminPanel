import React, { useState } from "react";

import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div class="container-scroller">
        <Header handleOpen={(data) => setOpen(data)} open={open} />
        <div class="container-fluid page-body-wrapper">
          <Sidebar open={open} />
          <div class="main-panel">
            <div class="content-wrapper">
              <div className="row">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUs from "./Aboutus";
import Protected from "../Components/Protected";
import UserTable from "./UserTable.js";
import UserCards from "./UserCards.js";
import Likes from "./Likes.js";
import AddItems from "./AddItems.js";
import ItemTable from "./ItemTable.js";
import Sitemap from "./Sitemap.js";

function Router() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isBusiness = localStorage.getItem("isBusiness") === "true";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/AddItems"
          element={
            <Protected isBusiness={isBusiness}>
              <AddItems />
            </Protected>
          }
        />
        <Route
          path="/UsersTable"
          element={
            <Protected isAdmin={isAdmin}>
              <UserTable />
            </Protected>
          }
        />
        <Route
          path="/ItemTable"
          element={
            <Protected isAdmin={isAdmin}>
              <ItemTable />
            </Protected>
          }
        />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/MyCards" element={<UserCards></UserCards>} />
        <Route path="/MyLikes" element={<Likes></Likes>} />
        <Route path="SiteMap" element={<Sitemap></Sitemap>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

{
  /*
		    2. דף txt להסבר על המערכת
        5.my cards toltals 
  */
}

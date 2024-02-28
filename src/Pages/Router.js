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
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

{
  /*Misiion
        2. דף txt להסבר על המערכת
         3. דף אודות על התממשקות האתר 
         4. ניקוי קטעי קוד מיותרים
         5. סדר בקוד  
         6. מחיקת ConoleLog
         7. Upload to git
         8. prev item in card item next\back
         10. Add Edit & delte -, on add items  for all ittems  
         11. Error fetching user data: usersservice 62 
         12. arrange div of card on fetch items, my cards.favortie 1
         13my cards- view table\items 
               */
}

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
 		    1. ADDITEMS  - Reduce code line by helper function   
		    3. my cards- view table\item
        4.  Error fetching user data: usersservice 62 
        5. arrange div of card on fetch items, my cards.favortie 1
		    6. דף txt להסבר על המערכת
        7. דף אודות על התממשקות האתר 
        8. ביטול אפשרות ללחוצ על לייק שמתמש לא מחובר 
        9. add ites fetch items ufter update and edd and delete
        9.b add item update is not update    
        10. sutitle dark\light 
        11. register alert on psswword....  
        12.fetch item weburl https:\\localhost 
        13. Map google items . 

  */
}

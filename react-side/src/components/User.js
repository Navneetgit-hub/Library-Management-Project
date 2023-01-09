import React from "react";


import UserNav from "./UserNav";
import BookList from "./BookList";
import Search from "./Search";

import "./User.css";

const User = () => {

    
  return (
    <div>
      <UserNav/>
      <Search/>
      <BookList/>
    </div>
  );
};

export default User;

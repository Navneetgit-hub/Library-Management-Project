import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Book.css";
import AdminNav from "./AdminNav";
import Highcharts, { Pointer } from "highcharts";
import Search from "./Search";

function AdminBookList() {
  const [books, getBooks] = useState([]);
  const url = "http://localhost:5000/get-books";

  const fetchBooks = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => getBooks(data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <AdminNav />
      <Search/>
      <div id="book-list">
        {books &&
          books.length > 0 &&
          books.map((obj, index) => (
            <div id="book">
              <div>
              <Link to={`/bookdetails/${obj.bname}`}>
                <img className="profile-pic" src={obj.bimage} height="200px" width="150px"/>
                <br />
              </Link>
              </div>
              <div id="btext">
                <label><b>Book: </b></label>&nbsp;<span>{obj.bname}</span>
                <br />
                <label><b>Author: </b></label>&nbsp;<span>{obj.author}</span>
                <br />
                <label><b>Category: </b></label>&nbsp;<span>{obj.category}</span>
                <br />
                <label><b>Available: </b></label>&nbsp;<span>{obj.quantity}</span>
                <br />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default AdminBookList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Book.css";
import AdminNav from "./AdminNav";
import Highcharts, { Pointer } from "highcharts";

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
      <div id="book-list">
        {books &&
          books.length > 0 &&
          books.map((obj, index) => (
            <div id="book">
              <Link to={`/bookdetails/${obj.bname}`}>
                <img className="profile-pic" src={obj.bimage} />
                <br />
              </Link>
              <div id="btext">
                <label>Book: </label>&nbsp;<span>{obj.bname}</span>
                <br />
                <label>Author: </label>&nbsp;<span>{obj.author}</span>
                <br />
                <label>Category: </label>&nbsp;<span>{obj.category}</span>
                <br />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default AdminBookList;

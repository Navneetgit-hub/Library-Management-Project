import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
import Table from "react-bootstrap/Table";
import axios from "axios";
function UserIssue() {
  const [book, Setbook] = useState([]);
  const url = "http://localhost:5000/issuedBooks";
  const url2 = "http://localhost:5000/return";
  const fetchBooks = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => Setbook(data));
  };
  const returnBook = (id, bid) =>{
      let rid = id;
      let bookid = bid;
      axios.post(url2, {
        req: rid, 
        bookid: bookid
      }).then((res)=>{
      })
  }
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
      <UserNav />
      <h1>Books Issued</h1>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Book Details</th>
              <th>Request Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Return</th>
            </tr>
          </thead>
          {book &&
            book.length > 0 &&
            book.map((obj, index) => (
              <tbody>
                <tr key={obj.bid}>
                  <td>
                    {console.log(book)}
                    <img
                      width="100px"
                      height="100px"
                      className="profile-pic"
                      src={obj.bimage}
                    />
                    <br />
                    <b>{obj.bname}</b>
                    <br />
                    Author: {obj.author}
                    <br />
                    Category: {obj.category}
                    <br />
                  </td>
                  <td>{obj.requestdate.split("T")[0]}</td>
                  <td>{obj.returndate.split("T")[0]}</td>
                  <td>{obj.status}</td>
                  <td><button onClick={()=>returnBook(obj.rid, obj.bid)} className="btn btn-primary">Return</button></td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    </div>
  );
}
export default UserIssue;
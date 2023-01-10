import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
import Table from "react-bootstrap/Table";

function UserRequested() {
  const [book, Setbook] = useState([]);
  const url = "http://localhost:5000/requestedBooks";

  const fetchBooks = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => Setbook(data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
      <UserNav />
      <h1>Pending requests</h1>
      <div>
        {book &&
          book.length > 0 &&
          book.map((obj, index) => (
            <Table striped>
              <thead>
                <tr>
                  <th>Book Details</th>

                  <th>Request Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr key={obj.bid}>
                  <td>
                    {console.log(obj)}
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
                    Available: {obj.quantity}
                    <br />
                  </td>

                  <td>{obj.requestdate.split("T")[0]}</td>
                  <td>{obj.returndate.split("T")[0]}</td>
                  <td>{obj.status}</td>
                </tr>
              </tbody>
            </Table>
          ))}
      </div>
    </div>
  );
}

export default UserRequested;

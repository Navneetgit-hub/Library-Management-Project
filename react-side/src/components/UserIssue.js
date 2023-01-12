import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function UserIssue() {
  const navigate = useNavigate();
  const [book, Setbook] = useState([]);
  const url = "http://localhost:5000/issuedBooks";
  const url2 = "http://localhost:5000/return";
  const fetchBooks = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => Setbook(data));
  };

  const showToastMessage = () => {
    toast.success("Book returned successfully.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const returnBook = (id, bid) => {
    console.log("inside function");
    let rid = id;
    let bookid = bid;
    axios
      .post(url2, {
        req: rid,
        bookid: bookid,
      })
      .then((res) => {
        console.log("inside then");
        console.log("res", res.data);
        if (res.data.returned == "True") {
          console.log("inside if");
          showToastMessage();
          window.location.reload();
        }
      });
  };
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
              <th>Book Name</th>
              <th>Author</th>
              <th>Category</th>
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
                  </td>
                  <td>{obj.author}</td>
                  <td>{obj.category}</td>
                  <td>{obj.requestdate.split("T")[0]}</td>
                  <td>{obj.returndate.split("T")[0]}</td>
                  <td>{obj.status}</td>
                  <td>
                    <button
                      onClick={() => returnBook(obj.rid, obj.bid)}
                      className="btn btn-primary"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    </div>
  );
}
export default UserIssue;

import React from "react";
import AdminNav from "./AdminNav";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


function Admin() {
  const [Request, setRequest] = useState([]);
  const url = "http://localhost:5000/issueBooks";
  const url1 = "http://localhost:5000/accept";

  const fetchRequest = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setRequest(data));
  };

  const showToastMessage = () => {
    toast.success("Borrow request accepted.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessage1 = () => {
    toast.success("Borrow request rejected.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const accept = (id, rid) => {
    console.log(id, rid);
    axios
      .put(url1, {
        bid: id,
        reqid: rid,
      })
      .then((res) => {
        if(res.data.accepted == "True"){
          showToastMessage();
        }
      });
  };
  
 const url2 = "http://localhost:5000/rejected"
  const rejected = (id, rid) => {
    console.log(id, rid);
    axios
      .put(url2, {
        bid: id,
        reqid: rid,
      })
      .then((res) => {
        if(res.data.rejected=="True"){
          showToastMessage1()
        }
      });
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  return (
    <div>
      <AdminNav />
      <div>
        <h1>Issue requests</h1>
        <div>
          <Table striped>
            <thead>
              <tr>
                <th>Book Details</th>
                <th>User Name</th>
                <th>Request Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {Request &&
              Request.length > 0 &&
              Request.map((obj, index) => (
                <tbody>
                  <tr key={obj.bid}>
                    <td>
                      {console.log(Request)}
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
                    <td>
                      {obj.firstname}&nbsp;{obj.lastname}
                      <br />
                      Email: {obj.email}
                    </td>
                    <td>{obj.requestdate.split("T")[0]}</td>
                    <td>{obj.returndate.split("T")[0]}</td>
                    <td>{obj.status}</td>
                    <td>
                      <button
                        onClick={() => accept(obj.bid, obj.rid)}
                        className="btn btn-success"
                      >
                        Accept
                      </button>
                      <br />
                      <br />
                      <button onClick ={() => rejected(obj.bid,obj.rid)} className="btn btn-danger">Reject</button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
export default Admin;

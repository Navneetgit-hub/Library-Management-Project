import React from "react";
import AdminNav from "./AdminNav";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";

export const UserDetails = () => {
  const [Request, setRequest] = useState([]);
  const url = "http://localhost:5000/users";

  const fetchRequest = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setRequest(data));
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div>
      <AdminNav />
      <h1>User Details</h1>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Branch</th>
            </tr>
          </thead>
          {Request &&
            Request.length > 0 &&
            Request.map((obj, index) => (
              <tbody>
                <tr>
                  <td>
                    <b>{obj.firstname}</b>
                  </td>
                  <td>
                    <b>{obj.lastname}</b>
                  </td>
                  <td>{obj.email}</td>
                  <td>
                    <Moment format="DD/MM/YYYY">{obj.dob}</Moment>
                  </td>
                  <td>{obj.gender}</td>
                  <td>{obj.course}</td>
                  <td>{obj.branch}</td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    </div>
  );
};

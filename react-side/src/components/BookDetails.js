import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AdminNav from './AdminNav';
import axios from 'axios';
import './Book.css';
import Table from "react-bootstrap/Table";
function BookDetails() {
    const location = useParams();
    const bookname = location.book;
    var returnstatus;
    const [Bookdetails, setBookdetails] = useState([]);
    const url1 = "http://localhost:5000/book-details";
    const [books, getBooks] = useState([])
    const url = "http://localhost:5000/borrow";
    axios.post(url1, {
        name: bookname,
    }).then(res => {
        setBookdetails(res.data)
        console.log(res.data)
    })
    useEffect(() => {
        axios.post(url, {
            bname: bookname
        }).then(res => {
            getBooks(res.data)
        })
    }, [])
    return (
        <div>
            <AdminNav />
            <div id="book-details">
                <div>
                    <h1>
                        {bookname}
                    </h1><br />
                    <div id="book">
                        {books &&
                            books.length > 0 &&
                            books.map((obj, index) => (
                                <>
                                    <img className="profile-pic" src={obj.bimage} height= "200px" width="150px" /><br /><br />
                                    <div id="book-text">
                                        <label>Book: </label>&nbsp;<span>{obj.bname}</span><br />
                                       <label>Author: </label>&nbsp;<span>{obj.author}</span><br />
                                       <label>Category: </label>&nbsp;<span>{obj.category}</span><br />
                                    </div>
                                </>
                            ))}
                    </div>
                </div>
                <div>
                    <h1>
                        Borrowed by
                    </h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Request Date</th>
                                <th>Return Date</th>
                                <th>Returned</th>
                            </tr>
                        </thead>
                        {Bookdetails &&
                            Bookdetails.length > 0 &&
                            Bookdetails.map((obj, index) => (
                                <tbody>
                                    {console.log(obj)}
                                    <tr key={obj.bid}>
                                        <td>
                                            {obj.firstname}&nbsp;{obj.lastname}
                                            <br />
                                            Email: {obj.email}
                                        </td>
                                        <td>{obj.requestdate.split("T")[0]}</td>
                                        <td>{obj.returndate.split("T")[0]}</td>
                                        {(obj.status==='Returned')?(<td>Returned</td>):(<td>Not Yet Returned</td>)}
                                    </tr>
                                </tbody>
                            ))}
                    </Table>
                </div>
            </div>
        </div>
    )
}
export default BookDetails
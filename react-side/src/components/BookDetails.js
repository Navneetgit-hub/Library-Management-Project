import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AdminNav from './AdminNav';
import axios from 'axios';
import './Book.css';
import Table from "react-bootstrap/Table";
import './Book.css';


function BookDetails() {
    const location = useParams();
    const bookname = location.book;
    const [Bookdetails, setBookdetails] = useState([]);
    const url1 = "http://localhost:5000/book-details";
    const [books, getBooks] = useState([])
    const url = "http://localhost:5000/borrow";

    axios.post(url1, {
        name: bookname,
    }).then(res => {
        setBookdetails(res.data)
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
                    <div>
                        {books &&
                            books.length > 0 &&
                            books.map((obj, index) => (
                                <>
                                    <img className="profile-pic" src={obj.bimage} /><br /><br />
                                    <div id="book-text">
                                        <label><b>Author Name:&nbsp;&nbsp;</b> {obj.author}</label><br />
                                        <label><b>Category:&nbsp;&nbsp; </b> {obj.Category}</label><br />
                                        <label><b>Available: &nbsp;&nbsp;</b> {obj.quantity}</label><br />
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
                                <th>Retured</th>
                            </tr>
                        </thead>
                        {Bookdetails &&
                            Bookdetails.length > 0 &&
                            Bookdetails.map((obj, index) => (
                                <tbody>
                                    <tr key={obj.bid}>
                                        <td>
                                            {obj.firstname}&nbsp;{obj.lastname}
                                            <br />
                                            Email: {obj.email}
                                        </td>
                                        <td>{obj.requestdate.split("T")[0]}</td>
                                        <td>{obj.returndate.split("T")[0]}</td>
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
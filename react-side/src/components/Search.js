import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import './Book.css';

function Search() {
  const [Category, setCategory] = useState([]);
  const [searchValue, setsearchValue] = useState()
  var [searchedBook, setsearchedBook] = useState([]);

  const url = "http://localhost:5000/search";
  const url1 = "http://localhost:5000/getCategory";

  const fetchCategory = () => {
    return fetch(url1)
      .then((response) => response.json())
      .then((data) => setCategory(data));
  };

  const handleSearch = (e) => {
    console.log("text", e.target.value);
    axios.post(url, {
      text: e.target.value
    }).then(res => {
      setsearchedBook(res.data)
      console.log(res.data)
    })
  }

  const handleChange = (e) => {
    setsearchValue(e.target.value)
  }
  const submit = () => {
    console.log(searchValue)

    axios.post(url, {
      search: searchValue
    }).then((res) => {

    });
  }

  useEffect(() => {
    fetchCategory()
  })
  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search books"
          className="me-2"
          aria-label="Search"
          onChange={(e) => handleSearch(e)}
        />
        <Button variant="outline-primary" size="lg" className="btn" onClick={submit}>
          Search
        </Button>
      </Form>
      <div id="book-list">
        {searchedBook &&
          searchedBook.length > 0 &&
          searchedBook.map((obj, index) => (
            <div id="book">
              <Link to={`/borrow/${obj.bname}`}><img className="profile-pic" src={obj.bimage} height="200px" width="150px"/><br /></Link>
              <div id="btext">  
                <label>Book: </label>&nbsp;<span>{obj.bname}</span><br />
                <label>Author: </label>&nbsp;<span>{obj.author}</span><br />
                <label>Category: </label>&nbsp;<span>{obj.category}</span><br />
              </div>
            </div>
          ))}
      </div><br/>
    </div>
  );
}

export default Search;

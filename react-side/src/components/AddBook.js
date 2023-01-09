import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import './Book.css'

function AddBook() {
  const [Category, setCategory] = useState([]);
  const [category1, setCategory1] = useState();
  const [Bookphoto, setBookphoto] = useState();
  const [Book, setBook] = useState({
    bname: "",
    author: "",
    category: "",
    price: "",
    quantity: ""
  });
  const url = "http://localhost:5000/add-books";
  const url1 = "http://localhost:5000/getCategory";
  const url2 = "http://localhost:5000/storeCategory";

  const fetchCategory = () => {
    return fetch(url1)
      .then((response) => response.json())
      .then((data) => setCategory(data));
  };
  function handleCategory(e) {
    setCategory1(e.target.value);
  }

  function handle(e) {
    const newData = { ...Book };
    newData[e.target.id] = e.target.value;
    setBook(newData);
    console.log(newData)
  }

  function submitCategory(e) {
    axios.post(url2, {
      category: category1
    }).then((res) => {

    })
  }

  function submit(e) {
    console.log("function called");
    axios
      .post(url, {
        bname: Book.bname,
        author: Book.author,
        category: Book.category,
        price: Book.price,
        quantity: Book.quantity,
        bookphoto: Bookphoto
      }
      )
      .then((res) => {

      });
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const image = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    setBookphoto(base64);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <AdminNav />
      <div id="category-book">
        <div id="category-div">
          <h1>Add Category</h1>
          <div id="add-div">

            <form onSubmit={(e) => submitCategory(e)}>
              <input
                onChange={(e) => {
                  handleCategory(e);
                }} type="text" id="category" placeholder="Add Category" required
              /><br /><br />
              <button type='submit' className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
        <div id="add-book-div">
          <h1>Add Book</h1>
          <div id="add-book">
            <form onSubmit={(e) => submit(e)}>
              <input
                onChange={(e) => {
                  handle(e);
                }}
                type="text"
                id="bname"
                placeholder="Enter Book Name"
                required
              />
              <br />
              <br />
              <input
                onChange={(e) => {
                  handle(e);
                }}
                type="text"
                id="author"
                placeholder="Enter Author Name"
                required
              />
              <br />
              <br />
              <select onChange={(e) => {
                handle(e);
              }} id="category">
                {Category &&
                  Category.length > 0 &&
                  Category.map((obj, index) => (
                    <option value={obj.categoryname}>{obj.categoryname}</option>
                  ))}
              </select>
              <br />
              <br />
              <input
                onChange={(e) => {
                  handle(e);
                }}
                type="text"
                id="price"
                placeholder="Enter Price"
                required
              />
              <br />
              <br />
              <input
                onChange={(e) => {
                  handle(e);
                }}
                type="text"
                id="quantity"
                placeholder="Enter Quantity"
                required
              />
              <br />
              <br />
              <input onChange={(e) => image(e)} id="image" type="file"></input>
              <br />
              <br />
              <button id="add-btn" className="btn btn-primary" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBook;

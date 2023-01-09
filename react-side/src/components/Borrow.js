import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { ToastContainer, toast } from "react-toastify";
import "./Book.css";

function Borrow() {
  const location = useParams();
  const bookname = location.book;
  const [date, setDate] = useState();
  const [books, getBooks] = useState([]);
  const url = "http://localhost:5000/borrow";
  const url1 = "http://localhost:5000/request";
  const handle = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };
  const showToastMessage = () => {
    toast.success("Book Borrowed Successfully.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessage1 = () => {
    toast.success("Book already Borrowed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessage2 = () => {
    toast.success("Please Select the Borrow date.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const submit = () => {
    console.log("Inside submit");
    console.log(date);
    if (date !== undefined) {
      books &&
        books.length > 0 &&
        books.map((obj, index) =>
          axios
            .post(url1, {
              bid: obj.bid,
              borrowDate: date,
            })
            .then((res) => {
              console.log("Inside then");
              console.log(res.data.borrowed)
              if (res.data.borrowed == "True") {
                console.log("Inside if");
                showToastMessage();
              } else {
                console.log("Inside else");
                showToastMessage1();
              }
            })
        );
    }else{
      showToastMessage2();
    }
  };

  useEffect(() => {
    axios
      .post(url, {
        bname: bookname,
      })
      .then((res) => {
        getBooks(res.data);
      });
  }, []);
  return (
    <div>
      <div id="borrow-book-list">
        {books &&
          books.length > 0 &&
          books.map((obj, index) => (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{obj.bname}</Card.Title>
                <Card.Text>
                  <img className="profile-pic" src={obj.bimage} />
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <b>Author:</b> &nbsp;{obj.author}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Category:</b> &nbsp;{obj.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Price:</b> &nbsp;<span>&#8377;</span>
                  {obj.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Select Borrow Date:</b> &nbsp;
                  <input
                    onChange={(e) => handle(e)}
                    type="date"
                    required
                  ></input>
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <button className="btn btn-primary" onClick={submit}>
                  Borrow
                </button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default Borrow;

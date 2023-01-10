const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
var { Client } = require("pg");
const crypto = require("crypto");
const { response } = require("express");
const { reset } = require("nodemon");
var key = "abcdefghijklmnopqrstuvwx";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Nitin@2229",
  database: "Navneet",
});

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});

pool.connect();

//sign up
app.post("/signup", (req, res) => {
  console.log("api called");
  const user = req.body;
  // console.log(user);
  const password = user.password;
  var encrypt = crypto.createCipheriv("des-ede3", key, "");
  var theCipher = encrypt.update(password, "utf8", "base64");
  theCipher += encrypt.final("base64");
  console.log(theCipher);
  try {
    let selectQuery = `select count(email) from signup where email='${user.email}'`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 0) {
          let insertQuery = `insert into signup(firstname, lastname, email, password, dob, gender, branch, course)
                                values('${user.fname}', '${user.lname}', '${user.email}', '${theCipher}', '${user.dob}', '${user.gender}', '${user.branch}', '${user.course}') `;
          pool.query(insertQuery, (err, result1) => {
            if (!err) {
              res.send("Insertion was successful");
            } else {
              console.log(err.message);
            }
          });
        } else {
          console.log("inside else");
          res.send({
            exists: "True",
          });
        }
      } else {
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//login
app.post("/login", (req, res) => {
  const user = req.body;
  const email = user.email;
  console.log(email);
  const password = user.password;
  try {
    let searchQuery = `Select count(email) from signup where email = '${email}'`;
    pool.query(searchQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 1) {
          let passQuery = `Select id,password, role from signup where email = '${email}'`;
          pool.query(passQuery, (err, result1) => {
            console.log(result1.rows);
            let passdb = result1.rows[0].password;
            var decrypt = crypto.createDecipheriv("des-ede3", key, "");
            var s = decrypt.update(passdb, "base64", "utf8");
            var decryptedData = s + decrypt.final("utf8");
            if (decryptedData == password) {
              let insertQuery = `insert into login(id, email) values('${result1.rows[0].id}','${user.email}')`;
              pool.query(insertQuery, (err, result) => {
                if (!err) {
                  console.log("insertion successfull logins");
                } else {
                  console.log(err.message);
                }
              });
              res.send({
                sucess: "True",
                password: result1.rows[0].password,
                role: result1.rows[0].role,
              });
            } else {
              res.send({
                sucess: "False",
              });
            }
          });
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// API for adding Category by the admin.
app.post("/storeCategory", (req, res) => {
  const category = req.body.category;
  try {
    let insertCategory = `Insert into category(categoryname) values('${category}')`;
    pool.query(insertCategory, (err, result) => {
      if (!err) {
        res.send("Insertion Successfull");
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

// API for fetching Category from DB in admin side while adding books.
app.get("/getCategory", (req, res) => {
  try {
    let selectCategory = `Select * from category`;
    pool.query(selectCategory, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

// api to add books bt the admin
app.post("/add-books", (req, res) => {
  const user = req.body;
  console.log("body :",user)
  const bname = user.bname;
  const category = user.category;
  const author = user.author;
  const price = user.price;
  const quantity = user.quantity;
  const bimage = user.bookphoto;

  try { 
    console.log("inside try");
    let insertQuery = `insert into books(bname,category,author,price,quantity,bimage, intQuantity) values('${bname}','${category}','${author}','${price}','${quantity}','${bimage}','${quantity}')`;
    pool.query(insertQuery, (err, result) => {
      if (!err) {
        console.log("insertion was successful in books table");
        res.send("insertion successful in books");
        console.log("inside if");
      } else {
        console.log(err.message);
        res.send("not inserted in books");
      }
    });
  } catch (error) {
    console.log(error);
    console.log("inside catch");
  }
});

// api to get all books.
app.get("/get-books", (req, res) => {
  let selectBooks = `Select * from books`;
  pool.query(selectBooks, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
});

// api to fetch specific book details
app.post("/borrow", (req, res) => {
  const bookname = req.body.bname;
  let selectBook = `Select * from books where bname = '${bookname}'`;
  pool.query(selectBook, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
});

// api to store borrow requests of the user in DB.
app.post("/request", (req, res) => {
  console.log(req.body);
  const user = req.body;
  const bid = user.bid;
  const requestDate = user.borrowDate;

  var date = new Date(requestDate);
  date.setDate(date.getDate() + 7);
  var date1 = JSON.stringify(date);
  date1 = date1.split("T")[0];
  date1 = date1.split('"')[1];
  var emails = [];

  try {
    let getUser = `SELECT id FROM login ORDER BY logtime DESC LIMIT 1`;
    pool.query(getUser, (err, result) => {
      if (!err) {
        var mail = result.rows[0].id;
        emails.push(mail);
        let selectQuery = `select count(bid) from request where userid = '${emails[0]}' and bid = '${bid}' and status in ('Accepted','pending')`;
        pool.query(selectQuery, (err, result2) => {
          if (!err) {
            console.log(result2);
            if (result2.rows[0].count == 0) {
              let insertQuery = `insert into request (bid,userid,requestdate,returndate) values('${bid}','${emails[0]}',to_date('${requestDate}','YYYY-MM-DD'),to_date('${date1}','YYYY-MM-DD'))`;
              pool.query(insertQuery, (err, result1) => {
                if (!err) {
                  res.send({
                    borrowed: "True"
                  });
                  console.log("inserted into request table");
                } else {
                  console.log("inserting error: ", err.message);
                }
              });
            } else {
              res.send({
                borrowed: "False"
              });
              console.log(
                "book id and user id already exits or request of that book already exits"
              );
            }
          } else {
            console.log("error from select query of count(bid)");
          }
        });
      } else {
        console.log("login error: ", err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// api to fetch user borrow requests
app.get("/issueBooks", (req, res) => {
  try {
    var array = [];
    let selectRequests = `SELECT
    rq.requestdate,
    rq.returndate,
    rq.status,
    rq.rid,
    b.bid,
    b.bimage,
    b.bname,
    b.author,
    b.category,
    b.quantity,
    s.firstname,
    s.lastname,
    s.email
    FROM
    books b
    INNER JOIN request rq ON b.bid = rq.bid
    INNER JOIN signup s ON rq.userid = s.id
    where rq.status ='pending';`;
    pool.query(selectRequests, async (err, result) => {
      if (!err) {
        let n = result;
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// api to accept user borrow requests by the admin in request table and update status.
app.put("/accept", (req, res) => {
  const bookid = req.body.bid;
  const rid = req.body.reqid;
  try {
    let updateQuantity = `Update books set quantity=quantity-1 where bid='${bookid}'`;
    pool.query(updateQuantity, (err, result) => {
      if (!err) {
        // res.send("Quantity updated sucessfully")
      } else {
        console.log(err.message);
      }
    });
    let updatestatus = `Update request set status='Accepted' where rid='${rid}'`;
    pool.query(updatestatus, (err, result) => {
      if (!err) {
        res.send({
          accepted: "True"
        });
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// api to get details of requested books by the user.
app.get("/requestedBooks", (req, res) => {
  var emails = [];
  try {
    let getUser = `SELECT id FROM login ORDER BY logtime DESC LIMIT 1`;
    pool.query(getUser, (err, result) => {
      if (!err) {
        var mail = result.rows[0].id;
        emails.push(mail);
        var array = [];
        let selectRequests = `SELECT
              rq.requestdate,
              rq.returndate,
              rq.status,
              rq.rid,
              b.bid,
              b.bimage,
              b.bname,
              b.author,
              b.category,
              b.quantity,
              s.firstname,
              s.lastname,
              s.email
              FROM
              books b
              INNER JOIN request rq ON b.bid = rq.bid
              INNER JOIN signup s ON rq.userid = s.id
              where rq.status ='pending' and rq.userid='${emails[0]}';`;
        pool.query(selectRequests, async (err, result) => {
          if (!err) {
            let n = result;
            res.send(result.rows);
          } else {
            console.log(err.message);
          }
        });
      } else {
        console.log("login error: ", err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//api to get details of issued books by the user.
app.get("/issuedBooks", (req, res) => {
  var emails = [];
  try {
    let getUser = `SELECT id FROM login ORDER BY logtime DESC LIMIT 1`;
    pool.query(getUser, (err, result) => {
      if (!err) {
        var mail = result.rows[0].id;
        emails.push(mail);
        var array = [];
        let selectRequests = `SELECT
              rq.requestdate,
              rq.returndate,
              rq.status,
              rq.rid,
              b.bid,
              b.bimage,
              b.bname,
              b.author,
              b.category,
              s.firstname,
              s.lastname,
              s.email
              FROM  
              books b
              INNER JOIN request rq ON b.bid = rq.bid
              INNER JOIN signup s ON rq.userid = s.id
              where rq.status ='Accepted' and rq.userid='${emails[0]}';`;

        pool.query(selectRequests, async (err, result) => {
          if (!err) {
            let n = result;

            res.send(result.rows);
          } else {
            console.log(err.message);
          }
        });
      } else {
        console.log("login error: ", err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});


// api to reject user borrow requests by the admin in request table and update status.
app.put("/rejected", (req, res) => {
  const bookid = req.body.bid;
  const rid = req.body.reqid;
  try {
    let updatestatus = `Update request set status= 'Rejected' where rid='${rid}'`;
    pool.query(updatestatus, (err, result) => {
      if (!err) {
        res.send({
          rejected: "True"
        });
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});


//sign up table user details admin side to display
app.get('/users',(req,res)=>{

   try{
    let getQuery = `select * from signup`
    pool.query(getQuery,(err,result) =>{
      if(!err){
        res.send(result.rows);
      }else{
        console.log(err);
      }
    })
   }catch(error){
    console.log(error);
   }
})

// API to search books by its name or author name.
app.post("/search", (req, res)=>{
  var expression = req.body.text;
  if(expression!=""){
    expression = "%"+expression+"%";
    let searchBooks =  `select * from books where bname like '${expression}' or author like '${expression}';`
    pool.query(searchBooks,(err,result) =>{
      if(!err){
        res.send(result.rows);
      }else{
        console.log(err);
      }
    })
  }else{
    res.send({
      result:"False"
    })
  }
})

// API to get book details and show it on Admin Side.
app.post("/book-details", (req, res)=>{
  let bookname = req.body.name;
  // console.log(bookname)
  let searchbook = `select bid from books where bname='${bookname}'`;
  pool.query(searchbook, (err, result)=>{
    if(!err){
      let bookid = result.rows[0].bid;
      let selectdetails = `SELECT
      rq.requestdate,
      rq.returndate,
      rq.status,
      rq.rid,
      b.bid,
      b.bname,
      b.author,
      b.category,
      b.quantity,
      s.firstname,
      s.lastname,
      s.email,
      b.bimage
      FROM
      books b
      INNER JOIN request rq ON b.bid = rq.bid
      INNER JOIN signup s ON rq.userid = s.id
      where b.bid='${bookid}' and status='Accepted';`
      pool.query(selectdetails, (err, result1)=>{
        if(!err){
          res.send(result1.rows)
        }else{
          console.log(err.message)
        }
      })
    }else{

    }
  })
})

// API to get no of Issue counts per book.
app.get("/issue-count", (req, res)=>{
  let selectCount = `Select b.bname,count(rq.bid) from request as rq inner join books as b on b.bid=rq.bid group by b.bname, b.bid`;
  pool.query(selectCount, (err, result1)=>{
    if(!err){
      res.send(result1.rows)
    }else{
      console.log(err.message)
    }
  })
})
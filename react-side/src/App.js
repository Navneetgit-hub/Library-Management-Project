import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import User from './components/User';
import Borrow from './components/Borrow';
import Login from './components/Login';
import Signin from './components/Signin';
import UserRequested from './components/UserRequested';
import UserIssue from './components/UserIssue';
import { UserDetails } from './components/UserDetails';
import AdminBookList from './components/AdminBookList';
import BookDetails from './components/BookDetails';
import { ToastContainer, toast } from "react-toastify";
import Charts from './components/Charts';

function App() {
  return (
    <div>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/signup" element={<Signin/>} />
          <Route exact path="/addBook" element={<AddBook/>} />
          <Route exact path="/bookList" element={<BookList/>} />
          <Route exact path="/user" element={<User/>} />
          <Route exact path="/admin" element={<Admin/>} />
          <Route exact path="/borrow/:book" element={<Borrow/>} />
          <Route exact path="/userRequested" element={<UserRequested/>} />
          <Route exact path="/userIssued" element={<UserIssue/>} />
          <Route exact path="/userdetails" element={<UserDetails/>} />
          <Route exact path="/adminbooklist" element={<AdminBookList/>} />
          <Route exact path="/bookdetails/:book" element={<BookDetails/>} />
          <Route exact path="/charts" element={<Charts/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

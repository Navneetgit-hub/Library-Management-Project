// import React, { useState } from "react";
// import axios from "axios";
// import './AddCategory.css';

// function AddCategory() {

//     const [category1, setCategory1] = useState()
//     const url = "http://localhost:5000/storeCategory"
//     function handleCategory(e) {
//         setCategory1(e.target.value);
//     }

//     function submitCategory(e) {
//         axios.post(url, {
//             category: category
//         }).then((res) => {

//         })
//     }

//     return (
//         <div id="category-div">
//             <h1>Add Category</h1>
//             <div id="add-div">
                
//                 <form onSubmit={(e) => submitCategory(e)}>
//                     <input
//                         onChange={(e) => {
//                             handleCategory(e);
//                         }} type="text" id="category" placeholder="Add Category" required
//                     /><br /><br />
//                     <button type='submit' className="btn btn-primary">Add</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddCategory;

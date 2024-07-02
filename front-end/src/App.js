import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axiosClient from "./axios.service";

function App() {
  const [list, setList] = useState([]);

  // const inputRef = useRef(null);

  useEffect(() => {
    getListUser();
    document.querySelector(".form-info").addEventListener("submit", (event) => {
      event.preventDefault();

      const data = event.target;

      console.log(data);

      const formData = new FormData(data);

      console.log(formData);

      axiosClient.post("/add-user", formData).then((r) => {
        console.log(r);
        getListUser();
      });
    });
  }, []);

  function getListUser() {
    axiosClient.get("/home").then((r) => {
      console.log(r);
      setList(r);
    });
  }

  // function addressHandle() {
  //   console.log(inputRef.current.value);
  //   axiosClient
  //     .post("/add-user", { name: inputRef.current.value })
  //     .then((r) => {
  //       console.log(r);
  //     });
  // }

  function deleteUser(userId) {
    axiosClient.delete(`/delete-user/${userId}`).then((r) => {
      console.log(r);
      if (r) {
        getListUser();
      }
    });
  }

  const showList = list.map((item) => {
    return (
      <li key={item._id}>
        <p>{item.userName}</p>
        <p>{item.age}</p>
        <p>{item.address}</p>
        <button
          onClick={() => {
            deleteUser(item._id);
          }}
        >
          Delete
        </button>
      </li>
    );
  });

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col">
            <form
              action="http://localhost:5000/add-user"
              method="POST"
              className="form-info"
            >
              <div className="form-group">
                <label htmlFor="yourName">Your Name</label>
                <input
                  className="form-control input-name"
                  type="text"
                  name="userName"
                />
                <label htmlFor="address">Your Address</label>
                <input
                  className="form-control input-name"
                  type="text"
                  name="address"
                />
                <label htmlFor="age">Your Age</label>
                <input
                  className="form-control input-name"
                  type="number"
                  name="age"
                />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>

            {/* <br />
            <div className="form-group">
              <label htmlFor="yourName">Your address</label>
              <input
                className="form-control"
                type="text"
                name="yourAddress"
                
                ref={inputRef}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={addressHandle}
              >
                Submit
              </button>
            </div> */}
          </div>
          <div className="col">
            <ul>{showList}</ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axiosClient from "./axios.service";

function App() {
  const [list, setList] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => {
    getListUser();
    // document.querySelector(".form-info").addEventListener("submit", (event) => {
    //   event.preventDefault();

    //   const data = event.target;

    //   console.log(data);

    //   const formData = new FormData(data);

    //   console.log(formData);

    //   axiosClient.post("/add-user", formData).then((r) => {
    //     console.log(r);
    //     getListUser();
    //   });
    // });
  }, []);

  function getListUser() {
    axiosClient.get("/home").then((r) => {
      console.log(r);
      setList(r);
    });
  }

  function submitHandle() {
    const data = {
      userName: nameRef.current.value,
      age: ageRef.current.value,
      address: addressRef.current.value,
    };

    axiosClient.post("/add-user", data).then((r) => {
      console.log(r);
      getListUser();
    });
  }

  function updateHandle() {
    currentUser.userName = nameRef.current.value;
    currentUser.age = ageRef.current.value;
    currentUser.address = addressRef.current.value;

    axiosClient.put("/update-user", currentUser).then((r) => {
      console.log(r);
      getListUser();
    });
  }

  function deleteUser(userId) {
    axiosClient.delete(`/delete-user/${userId}`).then((r) => {
      console.log(r);
      if (r) {
        getListUser();
      }
    });
  }
  function editUser(user) {
    nameRef.current.value = user.userName;
    ageRef.current.value = user.age;
    addressRef.current.value = user.address;
    setCurrentUser(user);
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
        <button
          onClick={() => {
            editUser(item);
          }}
        >
          Edit
        </button>
      </li>
    );
  });

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* <form
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
            </form> */}

            <div className="form-group">
              <label htmlFor="yourName">Your Name</label>
              <input
                className="form-control input-name"
                type="text"
                name="userName"
                ref={nameRef}
              />
              <label htmlFor="address">Your Address</label>
              <input
                className="form-control input-name"
                type="text"
                name="address"
                ref={addressRef}
              />
              <label htmlFor="age">Your Age</label>
              <input
                className="form-control input-name"
                type="number"
                name="age"
                ref={ageRef}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitHandle}
              >
                Submit
              </button>
              <button className="btn btn-info ml-2" onClick={updateHandle}>
                Update
              </button>
            </div>
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

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axiosClient from "./axios.service";
import axios from "axios";
import openSocket from "socket.io-client";

function App() {
  const [listUser, setListUser] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const addressRef = useRef(null);

  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);
  const productImage = useRef(null);

  useEffect(() => {
    getListUser();
    //getListProduct();
    // document
    //   .querySelector(".form-product")
    //   .addEventListener("submit", (event) => {
    //     event.preventDefault();

    //     const data = event.target;

    //     console.log(data);

    //     const formData = new FormData(data);

    //     console.log(formData);

    //     axiosClient.post("/add-product", formData).then((r) => {
    //       console.log(r);
    //       getListUser();
    //       getListProduct();
    //     });
    //   });

    // const socket = openSocket("http://localhost:5000");

    // socket.on("posts", (data) => {
    //   console.log(data);
    // });
  }, []);

  function login() {
    axiosClient.post("/login", currentUser).then((r) => {
      console.log(r);
    });
  }

  function getListUser() {
    axiosClient.get("/home").then((r) => {
      console.log(r);
      setListUser(r);
    });
  }

  function getListProduct() {
    axiosClient.get("/get-products").then((r) => {
      console.log(r);
      setListProduct(r);
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

  function addProductHandle() {
    console.log(productImage.current.files[0]);
    const formData = new FormData();
    formData.append("image", productImage.current.files[0]);
    formData.append("name", productNameRef.current.value);
    formData.append("price", productPriceRef.current.value);

    axios
      .post("http://localhost:5000/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => {
        console.log(r);
        getListUser();
        getListProduct();
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

  function buyHandle(product) {
    if (!currentUser) {
      alert("please select 1 user");
      return;
    }
    console.log(product);
    axiosClient.post(`/buy-product/${currentUser._id}`, product).then((r) => {
      window.location.reload();
    });
  }

  const showListUser = listUser.map((item) => {
    return (
      <li key={item._id}>
        <p>{item.userName}</p>
        <p>{item.age}</p>
        <p>{item.address}</p>
        {item.cart.length > 0
          ? item.cart.map((product, index) => {
              return (
                <p
                  key={index}
                >{`Product name : ${product.productId.name}, Price : ${product.productId.price}, Quantity: ${product.quantity}`}</p>
              );
            })
          : ""}

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

  const showListProduct = listProduct.map((item) => {
    return (
      <li key={item._id}>
        <p>{item.name}</p>
        <p>{item.price}</p>
        <button
          onClick={() => {
            buyHandle(item);
          }}
        >
          Buy
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
            <div>
              <button
                onClick={() => {
                  login();
                }}
              >
                Get Session
              </button>
            </div>
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
            <br />
            <h1>Add Product</h1>
            {/* Product */}
            {/* <form action="/dsfdsfs" method="POST" className="form-product"> */}
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                className="form-control input-name"
                type="text"
                name="name"
                ref={productNameRef}
              />
              <label htmlFor="price">Price</label>
              <input
                className="form-control input-name"
                type="number"
                name="price"
                ref={productPriceRef}
              />

              <label htmlFor="image">Image</label>
              <input
                className="form-control input-name"
                type="file"
                name="image"
                accept="image/*"
                ref={productImage}
              />

              <button
                type="submit"
                className="btn btn-primary"
                onClick={addProductHandle}
              >
                Submit
              </button>
            </div>
            {/* </form> */}
          </div>
          <div className="col">
            <h1>List User</h1>
            <ul>{showListUser}</ul>
            <h1>List Product</h1>
            <ul>{showListProduct}</ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

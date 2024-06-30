import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axiosClient from "./axios.service";

function App() {
  const [data, setData] = useState();

  const inputRef = useRef(null);

  useEffect(() => {
    // first
    // return () => {
    //   second
    // }
  }, []);

  function addressHandle() {
    console.log(inputRef.current.value);
    axiosClient
      .post("/add-user", { name: inputRef.current.value })
      .then((r) => {
        console.log(r);
      });
  }

  return (
    <React.Fragment>
      <div className="container">
        <form action="http://localhost:5000/add-user" method="POST">
          <div className="form-group">
            <label htmlFor="yourName">Your Name</label>
            <input
              className="form-control"
              type="text"
              name="yourName"
              id="input-name"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        <br />
        <div className="form-group">
          <label htmlFor="yourName">Your address</label>
          <input
            className="form-control"
            type="text"
            name="yourAddress"
            id="input-name"
            ref={inputRef}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={addressHandle}
          >
            Submit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

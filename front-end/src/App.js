import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    // first
    // return () => {
    //   second
    // }
  }, []);

  return (
    <React.Fragment>
      <div className="container d-flex justify-content-center align-items-center">
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
      </div>
    </React.Fragment>
  );
}

export default App;

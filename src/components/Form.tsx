import React from "react";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserList } from "../slices/appSlice";

function Form() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [validation, setValidation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log("e.target.value =", e.target.name, e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function checkValidation() {
    if (state.firstName === "") {
      setValidation({ ...validation, firstName: "Please Enter first name" });
    } else if (state.lastName === "") {
      setValidation({ ...validation, lastName: "Please Enter lastName" });
    } else if (state.email === "") {
      setValidation({ ...validation, email: "Please Enter Email" });
    } else if (state.phoneNumber === "") {
      setValidation({ ...validation, phoneNumber: "Please Enter phoneNumber" });
    } else {
      return true;
    }
  }

  async function createUser(body: any) {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("   ", data.data.data);

    dispatch(updateUserList(data.data.data));
    setState({ firstName: "", lastName: "", email: "", phoneNumber: "" });
    setValidation({ firstName: "", lastName: "", email: "", phoneNumber: "" });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (checkValidation()) {
      createUser(state);
    }
    console.log("handleSubmit =", state);
  }

  return (
    <div className="form-container">
      <div className="card-form">
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
          <div className="main-input">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="common-input-field"
              placeholder="Enter your first name"
              value={state.firstName}
              onChange={handleChange}
            />
            {validation.firstName}
          </div>
          <div className="main-input">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="common-input-field"
              value={state.lastName}
              placeholder="Enter your last name"
              onChange={handleChange}
            />
            {validation.lastName}
          </div>

          <div className="main-input">
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              className="common-input-field"
              value={state.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {validation.email}
          </div>

          <div className="main-input">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              className="common-input-field"
              value={state.phoneNumber}
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
            {validation.phoneNumber}
          </div>

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default Form;

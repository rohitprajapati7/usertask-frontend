import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserList } from "../slices/appSlice";

function UserList() {
  const dispatch = useDispatch();
  const isUserList = useSelector((store: any) => store.app.userList);
  console.log("isUserList =>", isUserList);
  const [user, setUserList] = useState([]);
  async function fetchUserList() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      dispatch(updateUserList(data));
    }
    console.log("this is my data =>", data);
  }

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className="userlist-container">
      <div className="card-form">
        <h1>Users</h1>
        {isUserList.length > 0 &&
          isUserList.map((item: any, index: number) => (
            <div className="userList" key={index}>
              <div className="fName">
                <span>j</span>
              </div>
              <div className="list-data">
                <h3>{`${item.firstName} ${item.lastName}`}</h3>
                <span className="user-email">{item.email}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserList;

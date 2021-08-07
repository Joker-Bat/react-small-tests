import React, { useState, useEffect } from "react";
import classes from "./UserPagination.module.scss";

const UserPagination = () => {
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const fetchUser = async pageNo => {
    const URL = `https://reqres.in/api/users?page=${pageNo}`;
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        setTotalPages(res.total_pages);
        setUserList(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUser(pageNo);
  }, [pageNo]);

  return (
    <div className={classes.Container}>
      <div className={classes.UserList}>
        {userList.map(user => {
          return (
            <div key={user.id} className={classes.User}>
              <img src={user.avatar} alt={user.first_name} />
              <p>{user.first_name + " " + user.last_name}</p>
            </div>
          );
        })}
      </div>
      <div className={classes.Buttons}>
        <button onClick={() => setPageNo(prev => (prev > 1 ? prev - 1 : prev))}>
          Prev
        </button>
        <button
          onClick={() =>
            setPageNo(prev => (prev < totalPages ? prev + 1 : prev))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserPagination;

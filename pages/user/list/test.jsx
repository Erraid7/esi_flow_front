// components/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((res) => {
        setUsers(res.data); // Store users in state
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

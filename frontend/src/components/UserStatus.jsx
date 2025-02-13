import React from "react";

const UserStatus = ({ users }) => {
  return (
    <div className="status">
      {Object.values(users).map((user, index) => (
        <p key={index}>
          {user.name} - {user.lastSeen}
        </p>
      ))}
    </div>
  );
};

export default UserStatus;

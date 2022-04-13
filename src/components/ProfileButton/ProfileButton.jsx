import React from "react";
import { Link } from "react-router-dom";
import "./ProfileButton.css";

const ProfileButton = ({ closePopup }) => {
  return (
    <Link onClick={closePopup} to="/profile" className="profile-btn hover-link">
      Аккаунт
      <button className="profile-btn__button" />
    </Link>
  );
};

export default ProfileButton;

import React from "react";
import classes from "./Logo.css";
import Burgerlogo from "../../assets/Images/burger-logo.png";

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={Burgerlogo} alt="BurgerLogo" />
  </div>
);

export default Logo;

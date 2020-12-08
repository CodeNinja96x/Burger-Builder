import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Logo from "../../Logo/Logo";
import BackDrop from "../../UI/BackDrop/BackDrop";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";

const sideDrawer = (props) => {
    let attachedClasses= [classes.SideDrawer, classes.close]
    if(props.open)
    {
        attachedClasses=[classes.SideDrawer, classes.Open]
    }
  //..below the show prop is not needed to be written as show= true
  //only because it is written as show it will set up as true if not written
  //as show or only <BackDrop > would be considered as show=false 
  return (
    <Auxiliary>
      <BackDrop  show={props.open} cancleOrder ={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;

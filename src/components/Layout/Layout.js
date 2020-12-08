import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer : false
  }
  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }
  sideDrawerToggleHandler = () => {
    this.setState((prevState)=>{
      return {showSideDrawer:!prevState.showSideDrawer};
    })
    }
  
  render() {
    return (
      <Aux>
        <Toolbar drawerToggerClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} 
         closed= {this.sideDrawerCloseHandler}/>
        <div> BackDrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;

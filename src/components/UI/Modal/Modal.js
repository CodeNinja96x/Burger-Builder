import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Classes from "./Modal.css";
import Backdrop from "../BackDrop/BackDrop";
class Modal extends Component{
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.show !== this.props.show;
  }
  componentWillUpdate () {
    console.log('[model updates order summery]');
  }
  render(){
    return (
      <Aux>
        <Backdrop show={this.props.show} cancleOrder={this.props.cancleOrder} />
        <div 
          className={Classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          <div>{this.props.children}</div>
        </div>
      </Aux>
    );
    
  }
} 
export default Modal;

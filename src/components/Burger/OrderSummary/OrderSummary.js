import React, { Component } from "react"
import Aux from "../../../hoc/Auxiliary"
import Button from '../../UI/Button/Button'
class  OrderSummary extends Component {
  render(){
    const ingredientsList = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}{" "}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A Delicious Burger with the following ingredients :</p>
        <ul>{ingredientsList}</ul>
    <p><strong>Final Price : {this.props.finalPrice}</strong></p>
        <p>continue to Checkout ?</p>
        <Button btnType='Danger' reacted={this.props.cancled}>Cancel</Button>
        <Button btnType='Success' reacted={this.props.contined}>Continue</Button>
      </Aux>
    );
  }
};

export default OrderSummary;

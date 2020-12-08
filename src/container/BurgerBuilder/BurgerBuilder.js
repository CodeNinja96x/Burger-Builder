import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import axios from "../../axios-order";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  // constructor (props){
  //     super(props);
  //     this.state={}
  // }

  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchasable: false,
    isOrdered: false,
  };

  updatePurchasState = (ingredients) => {
    //const ingredients = {...this.state.ingredients}

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return (sum = sum + el);
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };
  isOrderedHandler = () => {
    this.setState({ isOrdered: true });
  };

  cancleOrderHandler = () => {
    this.setState({ isOrdered: false });
  };
  confirmOrderHandler = () => {
    // /orders.json is impoertat to give .json extenstion
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Prafful Patil",
        address: {
          street: "test street",
          zipCode: "41113",
          country: "india",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngridents = { ...this.state.ingredients };
    updatedIngridents[type] = newCount;
    const finalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngridents, totalPrice: finalPrice });
    this.updatePurchasState(updatedIngridents);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }

    const newCount = oldCount - 1;
    const updatedIngridents = { ...this.state.ingredients };
    updatedIngridents[type] = newCount;
    const finalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngridents, totalPrice: finalPrice });
    this.updatePurchasState(updatedIngridents);
  };
  render() {
    let tobeDisabled = { ...this.state.ingredients };

    for (let type in tobeDisabled) {
      tobeDisabled[type] = tobeDisabled[type] <= 0;
    }

    return (
      <Aux>
        {console.log(this.state.isOrdered)}
        <Modal
          show={this.state.isOrdered}
          cancleOrder={this.cancleOrderHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancled={this.cancleOrderHandler}
            contined={this.confirmOrderHandler}
            finalPrice={this.state.totalPrice.toFixed(2)}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          tobeDisabled={tobeDisabled}
          isOrdered={this.isOrderedHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;

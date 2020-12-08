import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const Burger = (props) => {
  //[,] ...Array(2) will give you array made up of 2 empty spaces
  //Object.keys(objectName) will convert object into an array of its keys
  let IngredientTransformed = Object.keys(props.ingredients)
    .map((idKey) => {
      return [...Array(props.ingredients[idKey])].map((_, i) => {
        return <BurgerIngredient key={idKey + i} type={idKey} />;
      });
    })
    .reduce((array, el) => {
      return array.concat(el);
    }, []);
 // console.log(IngredientTransformed);
  if (IngredientTransformed.length === 0) {
    IngredientTransformed = <p>Please start Adding ingredients! </p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {IngredientTransformed}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;

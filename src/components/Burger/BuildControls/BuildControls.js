import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { lable: "Salad", type: "salad" },
  { lable: "Bacon", type: "bacon" },
  { lable: "Cheese", type: "cheese" },
  { lable: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Toatal Cost : <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.lable}
            lable={ctrl.lable}
            add={() => props.addIngredient(ctrl.type)}
            remove={() => props.removeIngredient(ctrl.type)}
            isDisplayed={props.tobeDisabled[ctrl.type]}
          />
        );
      })}
      
      <button disabled={!props.purchasable} onClick={props.isOrdered} className={classes.OrderButton}>
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;

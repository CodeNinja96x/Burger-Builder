import React from 'react'
import classes from './BuildControl.css'

const BuildControl = (props) => {
return (
<div className={classes.BuildControl}> 
<div className={classes.Label}>{props.lable}</div>
    <button className={classes.Less} disabled={props.isDisabled} onClick ={props.remove}>Less</button>
    <button className={classes.More} onClick= {props.add}>More</button>
</div>)
}

export default BuildControl
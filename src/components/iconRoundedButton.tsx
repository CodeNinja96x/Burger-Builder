import React from 'react';
import  './iconRoundedButton.scss';
import {  Button  } from 'react-bootstrap';
import { isUndefined, isNull } from 'util';

const IconRoundedButton = (props) => {

    return (<Button variant="link" className={props.label ? 'rounded d-flex flex-row align-items-center pt-0 pb-0' : 'rounded'} title={props.title} aria-label={props.ariaLabel ? props.ariaLabel : 'Icon Action'}  onClick={props.onClick}>
             <div className={`rounded-icon rounded-circle d-flex align-items-center justify-content-center ${props.className || ""}`}>
                {props.children}               
              </div> 

              <div className={'rounded-icon-label d-flex align-items-center justify-content-center'}>
                { !isNull(props.label) && !isUndefined(props.label) ? <div className="rounded-icon-label-text ml-2">{props.label}</div> : null}
              </div> 
             
            </Button>  )
}
export default IconRoundedButton;

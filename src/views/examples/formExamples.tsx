import React, { PureComponent } from 'react';
import './formExamples.scss';
import { Row, Col, Button } from 'react-bootstrap';

import FormBuilder, {
    IFormBuilderAPI,
    IFormBuilderFormGroup,
   // IFormBuilderFormControlLight,
  //  IFormBuilderCondition,
    CONDITION_ACTION,
   // IFormBuilderFormControl,
    FORM_BUILDER_FIELD_TYPE,
    IFormBuilderState
} from '../forms/formBuilder';


import {
  //  getDefaultLayout,
   // processValidations,
   // processQuestionConditions,
  //  getAllControls,
  //  testConditionalRules,
    parseControls,
    renderControls
} from '../forms/helpers';

interface IFormExamplesProps {

}
interface IFormExamplesState {
    formBuilderData?: IFormBuilderFormGroup
}

class FormExamples extends PureComponent<IFormExamplesProps, IFormExamplesState> {

    // The api allows us to forced refresh the form's internal state and validations.
    formBuilderAPI: IFormBuilderAPI;

    constructor(props) {
        super(props);
        this.state = {
            formBuilderData: null
        };
    }

    componentDidMount() {
        //Form field definitions. The FormBuilder requires an IFormBuilderFormGroup object.
        const formData: IFormBuilderFormGroup = {
            key: null,
            name: null,
            controls: [
                {
                    name: "Please enter some text. .. Or don't. It's optional.",
                    key: "fb5a5fb51b0214105d55404fe54bcb73",
                    type: FORM_BUILDER_FIELD_TYPE.INPUT_TEXT,
                    required: false,
                    validators: null,
                    conditions: [
                        {
                            "rules": [

                            ],
                            "action": ""
                        }
                    ],
                    disabled: false,
                    readOnly: false,
                    options: [

                    ],
                    matrixQuestions: [

                    ],
                    hasOptionConditions: false,
                    hide: false
                },
                {
                    name: "Select at least one of the following:",
                    key: "c6cfd7a21b2e5410c8ed113d9c4bcb25",
                    type: FORM_BUILDER_FIELD_TYPE.CHECKBOX,
                    required: true,
                    validators: null,
                    conditions: [
                        {
                            "rules": [

                            ],
                            "action": ""
                        }
                    ],
                    disabled: false,
                    readOnly: false,
                    options:[
                        {
                           "value":"ff6628921bee1010c8ed113d9c4bcba6",
                           "label":"Checkbox 1",
                           
                        },
                        {
                           "value":"f6a6ac921bee1010c8ed113d9c4bcbcb",
                           "label":"Checkbox 2",
                           
                        },
                        {
                           "value":"1d9d66051bb61050b38a10ad9c4bcb7f",
                           "label":"Checkbox 3"
                        }
                          
                              
                           ],
                    matrixQuestions: [ ],
                    hasOptionConditions: false,
                    hide: false
                },
                {
                    name: "Please select a value from the dropdown",
                    key: "c8abc84e1beed450c8ed113d9c4bcb3a",
                    type: FORM_BUILDER_FIELD_TYPE.SELECT,
                    required: true,
                    validators: null,
                    conditions: [
                        {
                            "rules": [

                            ],
                            "action": ""
                        }
                    ],
                    disabled: false,
                    readOnly: false,
                    options:[
                      
                        {
                            "value":"802ae8d61bee1010c8ed113d9c4bcbec",
                            "label":"None",
                           
                         },
                         {
                            "value":"082ae8d61bee1010c8ed113d9c4bcbec",
                            "label":"1 - 5",
                       
                         },
                         {
                            "value":"882ae8d61bee1010c8ed113d9c4bcbec",
                            "label":"6 - 10",
                            
                         },
                         {
                            "value":"0c2ae8d61bee1010c8ed113d9c4bcbec",
                            "label":"11 - 15",
                           
                         },
                         {
                            "value":"8c2ae8d61bee1010c8ed113d9c4bcbec",
                            "label":"16 or more",
                            
                         }
                              
                     ],
                    matrixQuestions: [ ],
                    hasOptionConditions: false,
                    hide: false
                },
                {
                    name: "How helpful is this example?",
                    key: "f54c0d611b8650105d55404fe54bcb0f",
                    type: FORM_BUILDER_FIELD_TYPE.RADIO,
                    required: true,
                    validators: null,
                    conditions: [
                        {
                            "rules": [

                            ],
                            "action": ""
                        }
                    ],
                    disabled: false,
                    readOnly: false,
                    options:[
                        {
                            "value":"da44e89e1bae1010c8ed113d9c4bcb09",
                            "label":"Very Helpful",
                         
                         },
                         {
                            "value":"5244e89e1bae1010c8ed113d9c4bcb0a",
                            "label":"Somewhat Helpful",
                         
                         },
                         {
                            "value":"d644e89e1bae1010c8ed113d9c4bcb0a",
                            "label":"A Little Helpful",
                        
                         },
                         {
                            "value":"5a4424de1bae1010c8ed113d9c4bcb90",
                            "label":"Not Helpful At All",
                      
                         },
                         {
                            "value":"de4424de1bae1010c8ed113d9c4bcb90",
                            "label":"Did Not Use/Not Applicable",
                            
                         }
                         
                              
                     ],
                    matrixQuestions: [ ],
                    hasOptionConditions: false,
                    hide: false
                },
                {
                    name: "Why did you choose 'Did Not Use/Not Applicable'",
                    key: "37f6367b1b6ad810c8ed113d9c4bcb5f",
                    type: FORM_BUILDER_FIELD_TYPE.TEXT_AREA,
                    required: true,
                    validators: null,
                    conditions: [
                        {
                            "rules": [
                                {
                                    "otherKey":"f54c0d611b8650105d55404fe54bcb0f",
                                    "otherValue":"de4424de1bae1010c8ed113d9c4bcb90"
                                 }
                            ],
                            "action": CONDITION_ACTION.SHOW
                        }
                    ],
                    disabled: false,
                    readOnly: false,
                    options: [

                    ],
                    matrixQuestions: [

                    ],
                    hasOptionConditions: false,
                    hide: false
                },
            ]
        }

        this.setState({ ...this.state, formBuilderData: formData });

    }



    onFormSubmit(formState: IFormBuilderState) {
         const isValidated = formState.validated;
         const controls = formState.controlGroups[0].controls;
         if( isValidated ) {

             //example request payload
             const requestPayload = controls.map(c =>  ({id: c.key, value: c.value}))
             console.log('form submission', requestPayload);
         }

    }

    render() {
        return (
            <>

                {/* Returns the form's children as a function to capture the form's api */}

                {
                    !this.state.formBuilderData ? <p>Loading...</p> :

                        <FormBuilder formData={[this.state.formBuilderData]} title="Form Demo" onFormSumbit={this.onFormSubmit.bind(this)}>

                            {(api: IFormBuilderAPI) => {
                                this.formBuilderAPI = api;

                                // Form fields/controls organized by groups
                                const formGroups: Array<IFormBuilderFormGroup> = api.state.controlGroups;
                                if (!formGroups.length) {
                                    return null;
                                }

                                // Preparing data for the form to render.
                                const groupData:IFormBuilderFormGroup = { ...formGroups[0] };                   
                                const allControls = parseControls(groupData.controls);

                                const leftColumnControls = [allControls[0], allControls[1] ];
                                const rightColumnControls = [ allControls[2], allControls[3], allControls[4]];
                                
                                const canSubmit = () => {
                                    return api.state.validated;
                                }
                                return <>
                                    <Row><Col><b>Form Example with A Conditional Rule. Select 'Did Not Use/Not Applicable' to reveal a conditional question.</b></Col></Row>

                                    <Row>
                                        <Col xs={12} sm={6}> {renderControls(leftColumnControls, groupData, api.onFieldChange)}</Col>
                                    
                                        <Col xs={12} sm={6}>{renderControls(rightColumnControls, groupData, api.onFieldChange)}</Col>
                                    </Row>

                                    <Row>
                                        <Col className="pt-4">

                                            {canSubmit() ? <Button type="submit"  >Submit</Button> : <Button type="submit" disabled >Submit</Button>}
                                        </Col>
                                    </Row>


                                </>
                            }
                            }

                        </FormBuilder>
                }

            </>

        );
    }

}



export default FormExamples;

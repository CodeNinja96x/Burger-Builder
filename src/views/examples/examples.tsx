import React, { useEffect } from 'react';
import './examples.scss';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import FormExamples from './formExamples'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import TablesExamples from './tableExample';

 
 
import FormikExample from './formikExample';
 

export interface IExamplesProps {

}

export interface IExamplesState {

}

function Examples() {
    let { path, url } = useRouteMatch();

    useEffect(() => {
        // component did mount

    }, []);

    return (
        <Container fluid>

            <Navbar  className="mt-3">

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Select an example" id="basic-nav-dropdown">

                            <NavDropdown.Item href={`/#examples/formExamples`}>Form Builder with Conditional Fields</NavDropdown.Item>
                            <NavDropdown.Item href={`/#examples/reactTable`}>React Table</NavDropdown.Item>
                            <NavDropdown.Item href={`/#examples/chartExample`}>Pie Chart</NavDropdown.Item>
                            <NavDropdown.Item href={`/#examples/scrollExample`}>Sroll</NavDropdown.Item>
                            <NavDropdown.Item href={`/#examples/crossFilterExample`}>Cross Filter</NavDropdown.Item>
                            <NavDropdown.Item href={`/#examples/formikExample`}>Formik</NavDropdown.Item>
                            <NavDropdown.Item href={`/#examples/globalContextExample`}>Global Context Provider</NavDropdown.Item>
                            {/*Add more Examples here*/}

                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>


            {/*module sub routes */}
            <div className="m-2">
                {
                    <Switch>

                        <Route path={`${path}/formExamples`}>
                            <FormExamples></FormExamples>
                        </Route>
                        <Route path={`${path}/reactTable`}>
                            <TablesExamples></TablesExamples>
                        </Route>
                  
                       
                        <Route  path={`${path}/formikExample`}>
                            <FormikExample></FormikExample>
                        </Route>
                  
                    </Switch>
                }
            </div>

        </Container>
    );

}

export default Examples;

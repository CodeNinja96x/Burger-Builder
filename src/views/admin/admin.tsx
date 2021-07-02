import React, { PureComponent } from 'react';
import   './admin.scss';
import { Container  } from 'react-bootstrap';
 
export interface IAdmindProps {

}

export interface IAdmindState {

}

class Admin extends PureComponent<IAdmindProps, IAdmindState> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
            <Container className="p-4" fluid>
              <h4>Admin</h4>
              
            </Container>
 
        </>)
    }
}

export default Admin;

import React, { PureComponent } from 'react';
import './dashboard.scss';
import { Container  } from 'react-bootstrap';

export interface IDasboardProps {

}

export interface IDasboardState {
 
}

class Dashboard extends PureComponent<IDasboardProps, IDasboardState > {
  
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
            <Container className="p-4 " fluid>
              <h4>Dashboard</h4>
              
            </Container>
 
        </>)
    }

}


export default Dashboard;

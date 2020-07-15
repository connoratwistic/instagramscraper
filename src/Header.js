import React from 'react';


import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

const Header = (props) => {

    return(
    <Row>
        <Col>
            <h1>Please Enter an Instagram User</h1>
            <FormControl type="text" onChange={props.userToCheck} />
            <Button className="btn-success" onClick={props.makeUrl}>Submit</Button>
        </Col>
    </Row>
    );
    
} 

export default Header;
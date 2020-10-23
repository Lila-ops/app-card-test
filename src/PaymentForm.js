import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

export default class PaymentForm extends React.Component {
  state = {
    title: 'Add Card',
    creditCardItems: [],
    id: '',
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };
 
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }

  onAddItem = () => {
    const details = {
        id: this.state.number + Math.random(),
        cvc: this.state.cvc,
        expiry: this.state.expiry,
        focused: this.state.focus,
        name: this.state.name,
        number: this.state.number
    }

    this.setState(state => {
      const list = state.creditCardItems.concat(details);
        
      return {
        creditCardItems: list,
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        title: 'Add Card'
      };
    });
  };

  onEditItem = (item) => {

      this.setState({
            cvc: item.cvc,
            expiry: item.expiry,
            focus: '',
            name: item.name,
            number: item.number,
            title: 'Edit Card'
        });
  }

  render() {
      let items = (
          this.state.creditCardItems.map(item => {
            return <ListGroup.Item key={item.id} onClick={() => this.onEditItem(item)}>
                    <Cards
                        id={item.id}
                        cvc={this.state.cvc}
                        expiry={item.expiry}
                        focused={this.state.focus}
                        name={item.name}
                        number={item.number}
                        onClick={(event) => this.onEditItem()}
                    />
            </ListGroup.Item>
      }));

    return (
      <div id="PaymentForm" className="pt-5">
        <Cards
          id={this.state.id}
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <Container className="w-50 p-3">
            <Row>
                <Col>
                    <h2 style={{textAlign: "center"}}>{this.state.title}</h2>
                    <Form onSubmit={this.onAddItem}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name"
                                placeholder="Name"  
                                value={this.state.name}               
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus} />
                        </Form.Group>

                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Card Number"
                                name="number"
                                value={this.state.number}
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus} />
                        </Form.Group>
                    
                        <Form.Group controlId="dob">
                            <Form.Label>Expires On</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="expiry" 
                                placeholder="Expire Date"
                                value={this.state.expiry}
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus} />
                        </Form.Group>
                        <Button onClick={this.onAddItem}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 style={{textAlign: "center"}}>My Cards</h2>
                    <ListGroup className="pt-5">
                        {items}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
}
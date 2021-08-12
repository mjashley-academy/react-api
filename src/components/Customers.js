import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import CustomerDetails from './CustomerDetails';
import axios from 'axios';

class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1,
      customerList: ''
    };
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get('assets/samplejson/customerlist.json').then(response => {
      this.setState({customerList: response},()=>{
        console.log("state updated!");
      });
    })
  };

  render() {
    if (!this.state.customerList){
      return <p>Loading data</p>;
    }

    return (
      <div className="addmargin">
        <div className="col-md-3">
          {
            this.state.customerList && this.state.customerList.data.map(customer => <Card key={customer.name} className="centeralign">
              <Card.Header>
                <Card.Title componentClass="h2">{customer.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
                <Button onClick={() => this.setState({selectedCustomer: customer.id})}>

                  Click to View Details

                </Button>

              </Card.Body>
            </Card>)
          }
        </div>
        <div className="col-md-6">
          <CustomerDetails val={this.state.selectedCustomer} />
        </div>
      </div>
    );
  }

}
export default Customers;

import React from 'react';
import axios from 'axios'; // Assuming you have axios or another HTTP client library installed

class EmployeeStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: false,
      isLoading: true
    };
  }

  componentDidMount() {
    // Fetch employee data from the server
    axios.get('/api/employees/{employeeId}') // Replace {employeeId} with the actual ID of the employee
      .then(response => {
        const { EnLigne } = response.data; // Assuming the server response contains the employee data
        this.setState({
          isOnline: EnLigne,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isOnline, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const dotColor = isOnline ? 'green' : 'red';
    const dotStyle = {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: dotColor
    };

    return <div style={dotStyle}></div>;
  }
}

export default EmployeeStatus;

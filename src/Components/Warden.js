import React, { Component } from 'react';
import MessbillDetail from './MessbillDetail';

class Warden extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mess_expenditure_open:false
        }
    }
    isMessExpenditureOpen = () => {
        this.setState({mess_expenditure_open:!this.state.mess_expenditure_open})
    }
    render() {
        const {users,today_open_cards }=this.props
        return (
            <div style={{
                // backgroundColor: 'white',
                // width: '100%',
                // height: '100%'
              }}>
            <button onClick={this.isMessExpenditureOpen}>MESS EXPENDITURE </button>
                {this.state.mess_expenditure_open?
                    <MessbillDetail messbills={this.props.messbills} />:''
                }
               <h1>No. of open Mess Cards: {today_open_cards}</h1>
                <h1>Students List</h1>
            {/* TODO:Make things looks like more stylish and good */}
                    <table>
                         <thead>
                            <tr>
                                <th>MESS ID</th>
                                <th>RNO</th>
                                <th>NAME</th>
                                <th>HOSTEL NAME</th>
                                <th>STUDY</th>
                                <th>ADDRESS</th>
                                <th>NO.OF OPEN DAYS</th>
                                <th>NO.OF CLOSE DAYS</th>
                                <th>TOTAL FEE</th>
                                <th>FEE PAID</th>
                                <th>FEE DUE</th> 
                            </tr>
                        </thead>
                         <tbody>
                        {
                             users.map((user) => {
                                 return (
                                <tr key={`${user.id}`}>
                                    <td>{`${user.id}`}</td>
                                    <td>{`${user.username}`}</td>
                                    <td>{`${user.name}`}</td>
                                    <td>{`${user.hostel_name}`}</td>
                                    <td>{`${user.study}`}</td>
                                    <td>{`${user.address}`}</td>
                                    <td>{`${user.no_of_open_days}`}</td>
                                    <td>{`${user.no_of_closed_days}`}</td>
                                    <td>{`${user.totalfee.toFixed(2)}`}</td>
                                    <td>{`${user.fee_paid}`}</td>
                                    <td>{`${user.totalfee.toFixed(2)-user.fee_paid}`}</td>
                                </tr>
                            )   
                        })
                    }
                    </tbody>
                </table>
                 
            </div>
        );
    }
}

export default Warden;



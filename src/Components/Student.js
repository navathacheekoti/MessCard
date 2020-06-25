import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MessbillDetail from './MessbillDetail';
import './Student.css';

import 'react-day-picker/lib/style.css';

class Student extends Component {

    constructor(props) {
        super(props);
        this.chooseDates = this.chooseDates.bind(this);
        this.state = {
            selectedDays: [],
            date: new Date(),
            calendar_open: false,
            fee_details_open:false,
            leaveDays: [],
            mess_expenditure_open: false,
            mess_fee_daily_history_open:false
            
        };
    }
    isMessFeeDailyHistory = () => {
        this.setState({mess_fee_daily_history_open:!this.state.mess_fee_daily_history_open})
    }
    isMessExpenditureOpen = () => {
        this.setState({mess_expenditure_open:!this.state.mess_expenditure_open})
    }
    isCalendarOpen = () => {
        this.setState({ calendar_open:!this.state.calendar_open });
    }
    isStudentFeeDetailOpen = () => {
        this.setState({ fee_details_open:!this.state.fee_details_open });
    }
    updateLeaves = () => {
        fetch("http://localhost:3000/student", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ leave_dates: this.state.selectedDays, user: this.props.user })
            })
                .then(res => res.json())
                .then(response => {
                    alert("leave dates conformed are" + response);
                    console.log(response)
                })
                .catch(err => console.log(err))
    }
    checkNoOfLeaves = () => {
        if (this.state.selectedDays.length < 1) {
            alert("Select atleast 1 Leave Day")
        }
        // else if (this.state.selectedDays > 19) {
        //     alert("You selected more than 20 days please select less than 20 days")
        // }
        else {
            this.updateLeaves()
        }
    }
    submitLeaves = () => {
        this.setState({ calendar: false });
        this.checkNoOfLeaves()
    }
      chooseDates(day, { selected }) {
          const { selectedDays } = this.state;
        if (selected) {
          const selectedIndex = selectedDays.findIndex(selectedDay =>
            DateUtils.isSameDay(selectedDay, day)
          );
          selectedDays.splice(selectedIndex, 1);
        } else {
          selectedDays.push(day);
          }
          this.setState({ selectedDays });
          console.log(this.state.selectedDays)
      }
    render() {
        const {user}=this.props
        return (
            <div  style={{
                background: 'transparent',
                // width: '100%',
                // height: '100%'
              }}>
                {/* TODO: below that display 3 buttons 1-Leave Card 2-Mess Fee Details 3-Daily expenditure for mess  */}
             <h1>{`Welcome ${user.name} ${user.username}`}</h1>
                {/* <h3>Leave mess card starting Here:</h3> */}
                <button onClick={this.isCalendarOpen}>Add Leave</button>
                <br />
                {this.state.calendar_open ?
                    <div>
                    <DayPicker
                        disabledDays={{
                            before:  new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                        }
                        }
                        minDate={this.state.date}
                        // canChangeMonth={false}
                        selectedDays={this.state.selectedDays}
                        onDayClick={this.chooseDates}
                        value={this.state.date}

                    // onDayChange={day => console.log("h" + day)}
                        />
                        <br/>
                        <button onClick={this.submitLeaves}>Submit</button>
                    </div>
                    : ''}
                
                
                <button onClick={this.isStudentFeeDetailOpen}> Mess FEE deatils</button>
                {this.state.fee_details_open ?
                    <div>
                        <h2>{`No. of Mess Card Open days:${user.open_days}`}</h2>
                        <h2>{`No. of Mess Card Close days:${user.closed_days}`}</h2>
                        <h2>{`Mess Fee Total:${user.mess_fee.toFixed(2)}`}</h2>
                        <h2>{`Mess Fee Paid:${user.fee_paid}`}</h2>
                        <h1>{`Mess Fee Due:${user.mess_fee.toFixed(2) - user.fee_paid}`}</h1>
                    </div> : ''
                }
                        <button onClick={this.isMessFeeDailyHistory}>Daily Bill</button>
                {   this.state.mess_fee_daily_history_open?
                    <table>
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user.mess_fee_daily.map((bill) => {
                                        return (
                                            <tr key={`${bill._id}`}>
                                                <td>{`${bill.date}`}</td>
                                                <td>{`${bill.amount.toFixed(2)}`}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>:
                    ''
                }
                <button onClick={this.isMessExpenditureOpen}>MESS EXPENDITURE </button>
                {this.state.mess_expenditure_open?
                    <MessbillDetail messbills={this.props.messbills} />:''
                } 
            </div>
        );
    }
}

export default Student;


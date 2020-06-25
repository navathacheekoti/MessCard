import React, { Component } from 'react';
import MessbillDetail from './MessbillDetail';


class Secretary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open_form: false,
            bill: 0,
            date: '',
            bill_success: false,
            open_cards: this.props.today_open_cards,
            mess_expenditure_open:false
        }
       
    }
    isMessExpenditureOpen = () => {
        this.setState({mess_expenditure_open:!this.state.mess_expenditure_open})
    }
    openForm = () => {
        this.setState({open_form:!this.state.open_form})
    }
    onDateUpload = event => {
        this.setState({ date: event.target.value });
    };
    onAmountUpload = event => {
        this.setState({ bill: event.target.value});
    };
    onOpenCardsUpload = event => {
        this.setState({open_cards:event.target.value})
    }
    onSubmitMessBill = () => {
        if (this.state.bill > 0 && this.state.date && this.state.open_cards) {
            fetch("http://localhost:3000/mess_bill_upload", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bill: this.state.bill,
                    date: this.state.date,
                    open_cards: this.state.open_cards,
                    bill_per_card:this.state.bill/this.state.open_cards
                })
            })
                .then(res => res.json())
                .then(response => {
                    console.log('res' + response);
                    alert('uploaded bill successfully');
                    this.setState({bill_success:true})
                   
                })
            // console.log(this.state.date, this.state.bill)
            
        }  
        else {
           alert("Enter bill again") 
        }
        this.setState({ bill: 0, date: '' });
        setInterval(() => {
            this.setState({bill_success:false})
        },24*60*60*1000)
    }
  
    render() {
        return (
            <div>
                {this.state.bill_success ?<h1>Successfully Uploaded Expenditure</h1>:''}
                <h1>No. of open Mess Cards: {this.props.today_open_cards}</h1>
            <button onClick={this.openForm}>
                Upload Expenditure Form
                </button>
                <br />
                <br/>
                {
                    this.state.open_form ?
                        <div className="shadow-5 center">
                            <label htmlFor="">Date:</label>
                            <input type="date" onChange={this.onDateUpload} value={ this.state.date }/>
                            <label htmlFor="">Amount:</label>
                            <input type="text"  onChange={this.onAmountUpload} value={ this.state.bill }/>
                            
                            <label htmlFor="">No.Of OpenCards:</label>
                            <input type="text"  onChange={this.onOpenCardsUpload} value={ this.state.open_cards } />
                            <button onClick={this.onSubmitMessBill}>+AddTodayBill</button>
                            {/* TODO: add button to add image */}
                     </div>
                        
                        : ''
                }
                <br />
                <br/>
                <button onClick={this.isMessExpenditureOpen}>MESS EXPENDITURE </button>
                {this.state.mess_expenditure_open?
                    <MessbillDetail messbills={this.props.messbills} />:''
                } 

            </div>
        );
    }
}

export default Secretary;

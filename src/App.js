import React, { Component } from 'react';
import Student from './Components/Student';
import Warden from './Components/Warden';
import Secretary from './Components/Secretary';
import SearchBox from './Components/SearchBox';
import Navigation from './Components/Navigation';
import Signin from './Components/Signin';
import { withRouter } from 'react-router-dom';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import "./App.css";



class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            route: 'route',
            isSignedIn: false,
            leaveDates:[],
            user: {
                id: '',
                name: '',
                rno: '',
                hostel_name: '',
                study: '',
                state:'',
                open_days: 0,
                closed_days: 0,
                mess_fee: 0,
                fee_paid: 0,
                mess_fee_daily:[]
                
            },
            today_bill:0,
            users: [],
            searchField: '',
            today_open_cards: 0,
            mess_bills: [],
            open_cards:[]
        }

    }
    
    loadOpenCards = () => {
        fetch("http://localhost:3000/load_open_cards", {
                            method: "get",
                            headers: { "Content-Type": "application/json" },
                        })
            .then(res => res.json())
            .then(res => {
                this.setState({open_cards:res})
                // console.log(this.state.today_open_cards)
            })
    }
    componentDidMount() {
        this.loadTodayCount()
        this.loadMessBills()
        this.loadOpenCards()
        return(fetch("http://localhost:3000/warden", {
                            method: "get",
                            headers: { "Content-Type": "application/json" },
                        })
            .then(res => res.json())
            .then(res=>this.setState({users:res}))
        )
    }
    loadTodayCount = () => {
        fetch("http://localhost:3000/today_open_cards", {
                            method: "get",
                            headers: { "Content-Type": "application/json" },
                        })
            .then(res => res.json())
            .then(res => {
                this.update_count(res)
                // console.log(this.state.today_open_cards)
            })
    }
    update_count=(res)=>{
        this.setState({ today_open_cards: res.today_open_cards })
        console.log(this.state.today_open_cards)
        
    }
    update_mess_bill = (res) => {
        this.setState({ mess_bills: res })
        // console.log(this.state.mess_bills)
    }
    loadMessBills = () => {
        fetch("http://localhost:3000/mess_bill", {
                            method: "get",
                            headers: { "Content-Type": "application/json" },
                        })
            .then(res => res.json())
            .then(res => {
                this.update_mess_bill(res)
                // console.log(this.state.today_open_cards)
            })
    }
    loadUser = (data) => {
        this.setState({user: {
          id: data.id,
          name: data.name,
            username: data.username,
            hostel_name:data.hostel_name,
          open_days: data.no_of_open_days,
          closed_days: data.no_of_closed_days,
          fee_paid:data.fee_paid,
            mess_fee: data.totalfee,
            study: data.study,
            mess_fee_daily:data.mess_fee_daily
        }})
      }
    
    onRouteChange = (route) => {
        if (route === 'warden') {
            this.setState({route: 'warden',isSignedIn:true})
          } else if (route === 'student') {
            this.setState({route: 'student',isSignedIn:true})
          }
           else if (route === 'secretary') {
            this.setState({route: 'secretary',isSignedIn:true})
        }
        else if (route === 'signout') {
            this.setState({isSignedIn:false})
            
        }
          this.setState({route: route});

    }
    inputChange = (event) => {
        this.setState({ searchField: event.target.value });
    }
    render() {
        const { route,user,users,searchField,isSignedIn,leaveDates,today_open_cards,open_cards,mess_bills}=this.state
        const filterusers = users.filter((user) => (
            user.name.toLowerCase().includes(searchField.toLocaleLowerCase())
        ))
        // this.loadTodayCount()
        // setInterval(this.loadTodayCount, 1000*60);
        return (
            <div className='App'>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
               {    route==='student'? < Redirect to='/student'></Redirect> :
                        route === 'warden' ? < Redirect to='/warden'></Redirect> :
                            route==='secretary'?< Redirect to='/secretary'></Redirect>: 
                                < Redirect to='/'></ Redirect>
                }
                    
                    <Switch>
                        <Route exact path="/"><Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/></Route>
                        
                            <Route path ='/student' >
                                <Student user={user} leaveDates={leaveDates} today_open_cards={today_open_cards} messbills={mess_bills}/>   
                            </Route>
                            
                            <Route path='/warden' >
                                <SearchBox inputChange={()=>this.inputChange}/>
                                <Warden users={filterusers} onSearch={searchField} today_open_cards={today_open_cards} messbills={mess_bills} />
                                
                            </Route>
                    
                            <Route path ='/secretary' >
                                <Secretary today_open_cards={today_open_cards} open_cards={open_cards} messbills={mess_bills}/>
                            </Route>
                    
                    </Switch>
                
            </div>
        )
    }
}

export default withRouter(App);
import React, { Component } from 'react';
import styles from '../css/login.module.css';
import {loginUser}  from '../API/apiCalls.js'

class LoginScreen extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            role: 'a', 
            guest: 'true'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
    
    }

    async handleSubmit(event){
        event.preventDefault();

        if (event.target.id === "enterGuest"){
            this.props.history.push({
                pathname: '/UserDashboard',
                state: {username: "guest", guest: true} // your data array of objects
            })
        }else{
            const response = await loginUser(this.state.username, this.state.password);
            if (response != null){
                // console.log("response in logScreen = ", response);
                // console.log("response.id = ", response.id);
                // console.log("response.role = ", response.role)

                if (response.status === "NOT_FOUND"){
                    window.confirm("Not a valid login. Please try again.");
                }
                else{
                    this.props.history.push({
                        pathname: '/UserDashboard',
                        state: {username: this.state.username, guest: false} // your data array of objects
                    })
                }
            }else{
                console.log("response is undefined");
            }
        }
    }
    
    render(){
        return (
            <div className = {styles.loginBody}>
                <div className = {styles.shade}>

                    <div className = {styles.loginHeader}>
                        <p className = {styles.ftfHeader}>EARN</p>
                        {/* <h3 className = {styles.ftfSubHeader}>A FOOD TRUCK FINDING APP</h3> */}

                    </div>
                    <div className = {styles.footerImageDiv}>
                        <img src={require('../assets/justTruckWhite.png').default} className={styles.truckImg} alt="TRUCK IMAGE"/>
                    </div>
                    <div className = {styles.centerContent}>
                        <form className = {styles.loginForm} onSubmit={this.handleSubmit}>
                            <div className={styles.loginWrapper}>
                                <div className = {styles.usernameField}>
                                    <label htmlFor="username" className = {styles.usernameLabel}>username</label>
                                    <input type="text" className={styles.username} name="username"  value = {this.state.username}
                                        onChange={this.handleChange} required autoComplete = "off" maxLength = "254"></input>
                                </div>
                                <div className = {styles.passwordField}>
                                    <label htmlFor="pass" className = {styles.passwordLabel}>password</label>
                                    <input type="password" className={styles.password} name="password" value = {this.state.password} 
                                        onChange={this.handleChange} required autoComplete = "off" maxLength = "254"></input>
                                </div>
                            </div>
                            <div className = {styles.loginBtnClass}>
                                <input type = "submit" value = "LOGIN" className= {styles.loginBtnId}></input>
                            </div>
                        </form>
                        <a href="/createAccount" className = {styles.createAcntATagId}>
                            <button className = {styles.createAcntId} type = "button" action="/createAccount"> CREATE ACCOUNT </button>
                        </a>
                        <button className = {styles.enterAsGuestBtn} id = "enterGuest" type = "button" onClick = {this.handleSubmit}> ENTER AS GUEST </button>
                    </div>
                </div>
                

                <footer className={styles.footerClass}>
                    <p>Ethan Robinson, Austin Blanchard, Richard Hutcheson, Noah Lambaria</p>
                </footer> 
            </div>
        );
    }
}
export default LoginScreen;
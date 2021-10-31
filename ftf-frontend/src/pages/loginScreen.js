import React, { Component } from 'react';
import styles from '../css/login.module.css';
import {loginUser}  from '../API/apiCalls.js'

class LoginScreen extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            role: 'a'    
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
    // handleSubmit(event){
    //     window.confirm("username = " + this.state.username + ', password = ' + this.state.password +  ', roll = ' + this.state.role);
    //     event.preventDefault();

    //     loginUser(this.state.username, this.state.password);
    //     this.props.history.push({
    //         pathname: '/UserDashboard',
    //           state: {user: this.state.username} // your data array of objects
    //       })
    // }
    async handleSubmit(event){
        // window.confirm("username = " + this.state.username + ', password = ' + this.state.password +  ', roll = ' + this.state.role);
        event.preventDefault();

        // let response;
        // response = await fetch('http://localhost:8080/user', {
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //         userID: 1,
        //         username: this.state.username,
        //         password: this.state.password,
        //         role: "a"
        //     })
        // }).catch(error =>{
        //     window.confirm("Problem encountered with fetch operation: " + error.message);
        // });
        // let responseJSON = await response.json();
        let response = await loginUser(this.state.username, this.state.password);
        console.log("response in logScreen = ", response);
        
        // this.props.history.push({
        //     pathname: '/UserDashboard',
        //       state: {user: this.state.username} // your data array of objects
        //   })
    }
    
    render(){
        return (
            <div className = {styles.loginBody}>

                <div className = {styles.loginHeader}>
                    <h1 className = {styles.ftfHeader}>FOOD TRUCK FINDER</h1>
                </div>

                <form className = {styles.loginForm} onSubmit={this.handleSubmit}>
                    <div className={styles.loginWrapper}>
                        <div className = {styles.usernameField}>
                            <label htmlFor="username" className = {styles.usernameLabel}>username:</label>
                            <input type="text" className={styles.username} name="username"  value = {this.state.username} onChange={this.handleChange} required></input>
                        </div>
                        <div className = {styles.passwordField}>
                            <label htmlFor="pass" className = {styles.passwordLabel}>password:</label>
                            <input type="password" className={styles.password} name="password" value = {this.state.password} onChange={this.handleChange} required></input>
                        </div>
                    </div>
                    <div className = {styles.loginBtnClass}>
                        <input type = "submit" value = "LOGIN" className= {styles.loginBtnId}></input>
                    </div>
                </form>
                <a href="/createAccount" className = {styles.createAcntATagId}>
                    <button className = {styles.createAcntId} type = "button" action="/createAccount"> CREATE ACCOUNT </button>
                </a>

                <footer className={styles.footerClass}>
                    <p>Ethan Robinson, Austin Blanchard, Richard Hutcheson, Noah Lambaria</p>
                </footer> 
            </div>
        );
    }
}
export default LoginScreen;
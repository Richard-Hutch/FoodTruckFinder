import React, { Component } from 'react';
import styles from "../css/createAcnt.module.css"
import {saveUser} from "../API/apiCalls.js"

class CreateAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            address: '',
            city: '',
            state: ''    
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === "state"){
            value = value.toUpperCase();
        }
        this.setState({
            [name]:value
        });
        console.log("name = " + name + " value = " + value);
    }
    async handleSubmit(event){
        event.preventDefault();
        let userData = {
            userid: -1,
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            state: this.state.state,
            city: this.state.city,
            maxPricePref: -1,
            minPricePref: -1,
            ratingPref: -1,
            role: "a",
        }

        const response = await saveUser(userData).catch(error=>{
            console.log(error.message);
        });
        if (response.status === 'CONFLICT'){
            alert("Could Not Create Account. Likely, username is already taken!");
        }
        else if (response != null){
            console.log("response in create account = ", response);
            
            this.props.history.push({
                pathname: '/UserDashboard',
                state: {user: this.state.username, name: this.state.name}
            })
        }else{
            console.log("response is undefined");
        }
    }
    render(){
        return (
            
        <div className={styles.bodyContainer}>

            <h1 className={styles.header}>CREATE ACCOUNT</h1>

            <div className={styles.innerContainer}>
                <form className={styles.formClass} onSubmit={this.handleSubmit} action="/">
                        <div className={styles.groupClass}>
                            <label htmlFor="username" id = {styles.username}>Username:</label>
                            <input type="text" className={styles.inputClass} id={styles.usernameInput} name="username" onChange={this.handleChange} required 
                                maxLength = "30" autoComplete = "off"></input>
                        </div>
                        <div className={styles.groupClass}>
                            <label htmlFor="password" id = {styles.password}>Password:</label>
                            <input type="text" className={styles.inputClass} id={styles.passwordInput} name="password"  onChange={this.handleChange} required
                                 maxLength = "30" autoComplete = "off"></input>
                            
                        </div>
                        <div className={styles.groupClass}>
                            <label htmlFor="name" id = {styles.name}>Name:</label>
                            <input type="text" className={styles.inputClass} id={styles.nameInput} name="name" onChange={this.handleChange} required maxLength = "254"></input>
                        </div>
                        
                        <div className={styles.groupClass}>
                            <label htmlFor="email" id = {styles.email}>Email:</label>
                            <input type="text" className={styles.inputClass} id={styles.emailInput} name="email"  onChange={this.handleChange} required maxLength = "254"></input>
                        </div>
                        
                        <div className={styles.addressClass}>
                            <label htmlFor="address" id = {styles.address}>Address:</label>
                            <input type="text" className={styles.inputClass} id={styles.addressInput} name="address" onChange={this.handleChange} required maxLength = "254"></input>
                
                            <label htmlFor="city" id = {styles.city}>   City:</label>
                            <input type="text" className={styles.inputClass} id={styles.cityInput} name="city" onChange={this.handleChange} required maxLength = "254"></input>

                            <label htmlFor="state" id = {styles.state}>  State:</label>
                            <input type="text"  className={styles.inputClass} id={styles.stateInput} name="state" onChange={this.handleChange} required 
                                maxLength = "2" minlength = "2" placeholder="(ex: 'TX')" pattern = "[A-Za-z][A-Za-z]"></input>
                        </div>
                        
                        <input type = "submit" value = "CREATE" id= {styles.createBtn}></input>
                </form>  
                <a id = {styles.backLink} href="/">                
                    <button id = {styles.backBtn} type = "button" action="/"> BACK </button>
                </a>
            </div>

        </div>
        );
    }
}
export default CreateAccount;
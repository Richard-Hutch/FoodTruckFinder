import React, { Component } from 'react';
import styles from "../css/editFoodTruck.module.css"
import {getTruckByName, editTruck, deleteTruck, addRoute, getRoutes} from "../API/apiCalls.js"

class EditTruck extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            truckID: '',
            truckName: '',
            truckDesc: '',
            minPrice: '',
            maxPrice: '',
            foodType: '',
            truckOwner: '',
            menuURL: 'url here',
            viewOnly: true,
            submitText: "EDIT",
            truckOwnerDetails: {},
            monday: '',
            sunday: '',
            saturday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            schedules: [<div key="-1"></div>],
            routes: [],
            pendingRoutes: [],
            keyCount: 0,
            stopCount: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.state.truckName = urlParams.get("truck");
    }

    async componentDidMount(){
        
        let response = await getTruckByName(this.state.truckName).catch(error =>{
            console.log(error.message);
        });
        this.setState({truckID: response.truckID, truckDesc: response.description, 
            minPrice: response.minRange, maxPrice: response.maxRange,
            foodType: response.foodType, truckOwner: response.owner.username, truckOwnerDetails: response.owner, menuURL: response.menuURL});
        //get routes from truck
        response = await getRoutes(this.state.truckName).catch(error=>{console.log(error.message);});
        if (response != null){
            let arr = this.state.routes;
            for (let i = 0; i < response.length; i++){
                let x =                 
                <div className = {styles.newRouteDiv} key = {this.state.keyCount}>
                    <input type = "text" id = {"address"+this.state.keyCount} className = {styles.routeAddress} required disabled = {this.state.viewOnly} value = {response[i].address}/>
                    <input type = "text" id = {"city"+this.state.keyCount} className = {styles.routeCity} required disabled = {this.state.viewOnly} value = {response[i].city}/>
                    <input type = "text" id = {"state"+this.state.keyCount} className = {styles.routeState} required disabled = {this.state.viewOnly} value = {response[i].state}/>
                </div>;
                arr.push(x);
                this.setState({keyCount: this.state.keyCount += 1});
            }
            this.setState({pendingRoutes: arr, stopCount: this.state.keyCount});
        }

    }

    async handleSubmit(event){
        event.preventDefault();

        if (event.target.id === "backBtn"){
            this.props.history.goBack();
        }
        
        else if (event.target.id === "formID"){
            //user is editing
            if (this.state.submitText === "EDIT"){
                this.setState({submitText: "SAVE", viewOnly: false});
            }
            //user is saving
            else{
                // let na =  document.getElementById("truckNameField").value != '' ?  document.getElementById("truckNameField").value : this.state.truckName;
                // let ft =  document.getElementById("foodTypeField").value != '' ?  document.getElementById("foodTypeField").value : this.state.foodType;
                // let td =  document.getElementById(styles.descID).value != '' ?  document.getElementById(styles.descID).value : this.state.truckDesc;
                // let mu =  document.getElementById("menuField").value != '' ?  document.getElementById("menuField").value : this.state.menuURL;
                // let mi =  document.getElementById("minPriceField").value != '' ?  document.getElementById("minPriceField").value : this.state.minPrice;
                // let ma =  document.getElementById("maxPriceField").value != '' ?  document.getElementById("maxPriceField").value : this.state.maxPrice;
                
                // this.setState({
                //     submitText: "EDIT", viewOnly: true,
                //     truckName: na,
                //     foodType: ft,
                //     truckDesc: td,
                //     menuURL: mu,
                //     minPrice: mi,
                //     maxPrice: ma,
                // }, ()=>{this.saveTruck();});
                // this.setState({
                //     truckName: document.getElementById("truckNameField").value,
                //     foodType: document.getElementById("foodTypeField").value.toUpperCase(),
                //     truckDesc: document.getElementById(styles.descID).value,
                //     menuURL: document.getElementById("menuField").value,
                //     monday: document.getElementById("monday").value,
                //     tuesday: document.getElementById("tuesday").value,
                //     wednesday: document.getElementById("wednesday").value,
                //     thursday: document.getElementById("thursday").value,
                //     friday: document.getElementById("friday").value,
                //     saturday: document.getElementById("saturday").value,
                //     sunday: document.getElementById("sunday").value,
                // });
                this.setState({submitText: "EDIT", viewOnly: true});
                document.querySelectorAll('.field').forEach(x=>{
                    if (x.value !== ''){
                        if (x.name === 'foodType'){
                            x.value = x.value.toUpperCase();
                        }
                        console.log(x.name, " = ", x.value);
                        this.setState({[x.name]: x.value}, this.saveTruck);
                    }
                });
                //THERE ARE ROUTES TO ADD
                if (this.state.pendingRoutes.length > 0){
                    this.saveTruck();
                }
            }
        }
        else if (event.target.id === "addRouteBtn"){
            let newRoute=
                <div className = {styles.newRouteDiv} key = {this.state.keyCount}>
                    <input type = "text" id = {"address"+this.state.keyCount} className = {styles.routeAddress} required disabled = {this.state.viewOnly}/>
                    <input type = "text" id = {"city"+this.state.keyCount} className = {styles.routeCity} required disabled = {this.state.viewOnly}/>
                    <input type = "text" id = {"state"+this.state.keyCount} className = {styles.routeState}
                    maxLength = "2" minLength = "2" placeholder="(ex: 'TX')" pattern = "[A-Za-z][A-Za-z]" required disabled = {this.state.viewOnly}/>
                </div>;
            let arr = [];
            arr.push(newRoute);
            this.setState({keyCount: this.state.keyCount += 1, pendingRoutes: arr});
        }
        else if (event.target.id === 'delTruck'){
            if (window.confirm("Are you sure you want to delete this truck?")){
                await deleteTruck(this.state.truckName);
                window.confirm("Truck Deleted");
                this.props.history.goBack();
            }else{
            }
        }
    }

    async saveTruck(){
        //ALSO HANDLE CREATING SCHEDULES HERE AND ADDING ROUTES
        for (let i = 0; i < this.state.pendingRoutes.length; i++){
            let address = document.getElementById("address"+i).value;
            let city = document.getElementById("city"+i).value;
            let state = document.getElementById("state"+i).value;
            let r = await addRoute(this.state.truckName, address, city, state).catch(error =>{console.log(error.message);});
            console.log(r);
        }
        //update routes and clear pending routes
        let arr = this.state.routes;
        for (let i = 0; i < this.state.pendingRoutes.length; ++i){
            arr.push(this.state.pendingRoutes[i]);
        }
        this.setState({routes: arr, pendingRoutes: []});
        

        let truckData = {
            truckID: this.state.truckID,
            truckName: this.state.truckName,
            owner: this.state.truckOwnerDetails,
            description: this.state.truckDesc,
            foodType: this.state.foodType,
            menuURL: this.state.menuURL,
            minRange: this.state.minPrice,
            maxRange: this.state.maxPrice,
        }
            // monday: this.state.monday,
            // tuesday: this.state.tuesday,
            // wednesday: this.state.wednesday,
            // thursday: this.state.thursday,
            // friday: this.state.friday,
            // saturday: this.state.saturday,
            // sunday: this.state.sunday,
        console.log("truck data = ", truckData );
        let x = await editTruck(truckData).catch(error=>{console.log(error.message);});
        console.log(x);
        
    }
    resetFields(){
        this.setState({submitText: 'EDIT'});
        this.setState({viewOnly: true});
        //clear input fields
        document.querySelectorAll('.field').forEach(function (x){
            x.value = '';
        });
    }
    render(){
        return (

        <div className={styles.bodyContainer}>
            <h1>Edit Truck</h1>
            <form onSubmit={this.handleSubmit} id = "formID" className = {styles.formClass}>
                
                <label htmlFor="truckNameField">Truck Name:</label><br/>
                <input type="text" id="truckNameField" name = "truckName" className="field field2" placeholder={this.state.truckName} disabled = {this.state.viewOnly}/><br/>
                <label htmlFor="foodTypeField">Food Type:</label><br/>
                <input type="text" id="foodTypeField" name = "foodType" className="field field2" placeholder={this.state.foodType} disabled = {this.state.viewOnly}/><br/>
                <label htmlFor="descID">Truck Description:</label><br/>
                <textarea placeholder={this.state.truckDesc} name = "truckDesc" className="field field2" disabled = {this.state.viewOnly} id = {styles.descID}></textarea><br/>
                
                <label htmlFor="minPriceField">Min Price: </label><br/>
                <input min="0" type="number" id="minPriceField" name = "minPrice" className="field field2" placeholder={this.state.minPrice} disabled = {this.state.viewOnly}/><br/>
                <label htmlFor="maxPriceField">Max Price: </label><br/>
                <input type="number" id="maxPriceField" name = "maxPrice" className="field field2" placeholder={this.state.maxPrice} disabled = {this.state.viewOnly}/><br/>

                <label htmlFor="menuField">MENU</label><br/>
                {this.state.menuURL == null && 
                    <input type="text" id="menuField" name = "menuURL" className="field field2" placeholder="url here" disabled = {this.state.viewOnly}/>
                }
                {this.state.menuURL != null && 
                    <input type="text" id="menuField" name = "menuURL" className="field field2" placeholder={this.state.menuURL} disabled = {this.state.viewOnly}/>
                }
                <br/>
                {/* <div className={styles.scheduleDiv}>
                    <p className = {styles.scheduleTitle}><b>Truck Schedule</b></p>
                    <div className = {styles.customBorder}></div>
                    <div className={styles.weekDiv}>
                        <p>MON</p>
                        <p>TUES</p>
                        <p>WED</p>
                        <p>THURS</p>
                        <p>FRI</p>
                        <p>SAT</p>
                        <p>SUN</p>
                        <input type = "text" placeholder = "xx:xxAM-xx:xxAM" id = "monday" disabled = {this.state.viewOnly} required/>
                        <input type = "text" placeholder = "xx:xxAM-xx:xxAM" id = "tuesday"  disabled = {this.state.viewOnly}required/>
                        <input type = "text" placeholder = "xx:xxAM-xx:xxAM" id = "wednesday" disabled = {this.state.viewOnly} required/>
                        <input type = "text" placeholder = "xx:xxAM-xx:xxAM" id = "thursday" disabled = {this.state.viewOnly} required/>
                        <input type = "text" placeholder = "xx:xxAM-xx:xxAM" id = "friday" disabled = {this.state.viewOnly} required/>
                        <input type = "text" placeholder = "xx:xxAM-xx:xxAM" id = "saturday" disabled = {this.state.viewOnly}required/>
                        <input type = "text" placeholder = "xx:xxAM-xx:xxAM" id = "sunday" disabled = {this.state.viewOnly}required/>
                    </div>
                </div> */}
                <div className = {styles.routeDiv}>
                    <p className = {styles.routeTitle}><b>Truck Route</b></p>
                    <div className = {styles.customBorder}></div>
                    <div className={styles.addressDiv}>
                        <p>ADDRESS</p>
                        <p>CITY</p>
                        <p>STATE</p>
                    </div>
                    <div className = {styles.routeContent}>
                        {/* <div className = {styles.newRouteDiv}>
                            <input type = "text" className = {styles.routeAddress} required disabled = {this.state.viewOnly}/>
                            <input type = "text" className = {styles.routeCity} required disabled = {this.state.viewOnly}/>
                            <input type = "text" className = {styles.routeState} required disabled = {this.state.viewOnly}/>
                        </div>
                        <div className = {styles.newRouteDiv}>
                            <input type = "text" className = {styles.routeAddress} required disabled = {this.state.viewOnly}/>
                            <input type = "text" className = {styles.routeCity} required disabled = {this.state.viewOnly}/>
                            <input type = "text" className = {styles.routeState} required disabled = {this.state.viewOnly}/>
                        </div> */}
                        {this.state.routes}
                        {this.state.pendingRoutes}
                    </div>
                    <button id = "addRouteBtn" onClick = {this.handleSubmit} className = {styles.addRouteBtn} disabled = {this.state.viewOnly}>ADD ROUTE</button>
                </div>
                <button id = "editBtn" className = {styles.editBtn} type= "submit" value={this.state.submitText}>{this.state.submitText}</button>
            </form>
            <button id = "delTruck" className = {styles.delTruck} onClick = {this.handleSubmit}>DELETE TRUCK</button>
            <button id = "backBtn"  className = {styles.backBtn} onClick={this.handleSubmit}>BACK</button>
            {/* <a href="https://ibb.co/qptvrQ9"><img src="https://i.ibb.co/FzSFDTJ/test-menu.jpg" alt="test-menu" border="0"/></a> */}
        </div>
        );
    }
}
export default EditTruck;
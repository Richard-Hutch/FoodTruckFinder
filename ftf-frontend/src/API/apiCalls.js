import { makeRequest } from "./requestTemplate";

export async function loginUser(un, pw){
    let url = `login/${un}/${pw}`;
    return await makeRequest("GET", url, '');
}
export async function saveUser(userData){
    let url = `saveuser`;
    return await makeRequest("POST", url, userData);
}
export async function createAccount(userData){
    let url = `saveuser`;
    return await makeRequest("POST", url, userData);
}
export async function getUser(username){
    let url = `findUser/${username}`;
    return await makeRequest("GET", url, '');
}
export async function editUser(userData){
    let url = `editAccount`;
    return await makeRequest("PATCH", url, userData);
}
export async function getTruckByName(name){
    let url = `truckDetails/name/${name}`;
    return await makeRequest("GET", url, '');
}

export async function getAllTrucks(){
    let url = `truckDetails/all`;
    return await makeRequest("GET", url, '');
}

export async function editTruck(userData){
    let url = `editTruck`;
    return await makeRequest("PATCH", url, userData);
}

export async function deleteTruck(truckName){
    let url = `deleteTruck/${truckName}`;
    return await makeRequest("DELETE", url, '');
}

export async function addTruck(truckDataMap){
    
    let userData = JSON.stringify({
        truckID: truckDataMap.get('truckID'),
        truckName: truckDataMap.get('truckName'),
        description: truckDataMap.get('description'),
        minRange: truckDataMap.get('minRange'),
        maxRange: truckDataMap.get('maxRange'),
        foodType: truckDataMap.get('foodType'),
        owner: truckDataMap.get('owner'),
    });
    let url = `createTruck`;
    return await makeRequest("POST", url, userData);
}

export async function insertUserFoodRec(username){
    let url = `createUserRec/${username}`;
    return await makeRequest("POST", url, '');
}

export async function updateFoodTypeRec(username, foodType){
    let url = `updateRecommendation/${username}/${foodType}`;
    return await makeRequest("PATCH", url, '');
}

export async function getRecommendedTrucks(username){
    let url = `getRecommendedTrucks/${username}`;
    return await makeRequest("GET", url, '');
}
export async function getReviews(truckName){
    let url = `/reviews/truck/name/${truckName}`;
    return await makeRequest("GET", url, '');
}
export async function getRatings(truckName){
    let url = `/reviews/truck/name/${truckName}`;
    return await makeRequest("GET", url, '');
}

export async function postReview(review){
    let url = `postReview/${review.username}/${review.truckName}/${review.rating}/${review.description}/`;
    return await makeRequest("POST", url, '');
}

export async function getSubscriptions(username){
    let url = `${username}/subscriptions`;
    return await makeRequest("GET", url, '');
} 
export async function subscribeToTruck(truckName, username){
    let url = `subscribe/${truckName}/${username}`;
    return await makeRequest('POST', url, '');
}
export async function unsubscribeToTruck(truckName, username){
    let url = `unsubscribe/${truckName}/${username}`;
    console.log('url = ', url);
    return await makeRequest('DELETE', url, '');
}

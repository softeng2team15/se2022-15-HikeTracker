import Hike from "./hike";

const APIURL = new URL('http://localhost:3001/api/');

const APIBASE='http://localhost:3001/api/';

const register=async(username,password, name, surname, phone)=>{
    const res=await fetch(APIBASE+'register',{
        method:'POST',
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({username:username, password:password, first_name: name, last_name: surname, phone: phone}),
        credentials:"include"
    });
    const usr=await res.json();
    //console.log(usr);
    if(res.ok) return usr;
    else throw usr;
}

const login=async(username,password)=>{
    const res=await fetch(APIBASE+'login',{
        method:'POST',
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({username:username,password:password}),
        credentials:"include"
    });
    const emp=await res.json();
    if(res.ok) return emp;
    else throw emp;
}

/*const getHikes=async ()=>{
    const res=await fetch(APIBASE+'hikes');
    const hikes=await res.json();
    if(res.ok)  return hikes.map(h=>new Hike);
    else throw res.status;
}*/



const logout=async()=>{
    const res=await fetch(APIBASE+'logout',{
        method:"DELETE",
        headers:{
            "Content-type": "application/json"
        },
        credentials:"include"
    });
    if(res.ok) return;
    else{
        const ret=await res.json();
        throw ret;
    }
}

async function getParkings() {
    const response = await fetch(APIBASE+'parkings');
    const pks = await response.json();
    if(response.ok) return pks;
    else throw pks;
};

async function addParking(pk) {
  const response = await fetch(APIBASE+'parking',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(pk)
  });
  if(response.ok) return;
  else throw pk;
};

async function insertHut(name, country, numberOfGuests, numberOfBedrooms, coordinate) {
    return new Promise((resolve, reject) => {
        const thisURL = "huts";
        fetch(new URL(thisURL, APIURL), {
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({name, country, numberOfGuests, numberOfBedrooms, coordinate}),
        })
            .then((response) => {
                if (response.ok) {
                    resolve(response.json())
                } else {
                    response.json()
                        .then((message) => { reject(message); })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. " }));
    });
}

async function getHikesList() {
    return new Promise((resolve, reject) => {
        fetch(new URL("hikes", APIURL))
            .then((response) => {
                if (response.ok) {
                    response.json().then(ret=>{
                        const arr=[];ret.forEach(h=>arr.push(new Hike(h.IDHike,h.Name,h.Author,h.Length,h.Ascent,h.Difficulty,h.ExpectedTime,h.StartPoint,h.EndPoint,h.ReferencePoints,h.Description,[[0,0]],[0,0])));
                        resolve(arr);
                    });
                } else {
                    //console.log("Error in gethikeslist");
                    response.json()
                        .then((message) => { reject(message); })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. " }));
    });
}

async function getHikesListWithFilters(lengthMin, lengthMax, expectedTimeMin, expectedTimeMax, ascentMin, ascentMax, difficulty, area) {
    return new Promise((resolve, reject) => {
        const thisURL = "hikes";
        fetch(new URL(thisURL, APIURL), {
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({lengthMin : lengthMin, lengthMax : lengthMax, expectedTimeMin : expectedTimeMin, 
                expectedTimeMax : expectedTimeMax, ascentMin : ascentMin, ascentMax : ascentMax, difficulty : difficulty,area: area}),
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then(ret=>{
                        const arr=[];ret.forEach(h=>arr.push(new Hike(h.id,h.name,h.author,h.length,h.ascent,h.difficulty,h.expectedTime,h.startPoint,h.endPoint,h.referencePoints,h.description)));
                        console.log("RETURNING NEW ARR",arr);
                        resolve(arr);
                    });
                } else {
                    response.json()
                        .then((msg) => { reject({status:response.status,message:msg}) })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ status:503, error: "Cannot communicate with the server. " }));
    });
}

const getHikersHikesList= async (lengthMin, lengthMax, expectedTimeMin, expectedTimeMax, ascentMin, ascentMax, difficulty, area)=>{
    console.log("IN GET **HIKERS** HIKES LIST WITH,",lengthMin,lengthMax,expectedTimeMin,expectedTimeMax,ascentMin,ascentMax,difficulty,area)
    const res=await fetch('http://localhost:3001/api/user/hikes',{
        credentials:"include",
        method:"POST",
        headers:{
                "Content-type": "application/json"
        },
        body: JSON.stringify({lengthMin : lengthMin, lengthMax : lengthMax, expectedTimeMin : expectedTimeMin, 
                expectedTimeMax : expectedTimeMax, ascentMin : ascentMin, ascentMax : ascentMax, difficulty : difficulty,area: area})
    });
    const ret=await res.json();
    if(res.ok){
        console.log("RETURNED VALUE IS",ret);
        const arr=[];ret.forEach(h=>arr.push(new Hike(h.id,h.name,h.author,h.length,h.ascent,h.difficulty,h.expectedTime,h.startPoint,h.endPoint,h.referencePoints,h.description,h.coordinates,h.center,h.bounds)));
        console.log("Returning",arr);
        return arr;
    }
    else throw {status:res.status,message:ret};
}

const addHike= async (file,name,desc,difficulty)=>{
    const data=new FormData();
    data.append('file',file);
    data.append('name',name);
    data.append('description',desc);
    data.append('difficulty',difficulty);
    //console.log("Adding a new hike with formdata",data);
    const res=await fetch('http://localhost:3001/api/newHike',{
        method:'POST',
        credentials:"include",
        body: data
    });
    //console.log("Finished the new hike query with res.status",res.status);
    if(res.ok) return;
    else{
        const ret=await res.json();
        throw ret;
    }
}

const getHikeMap=async id=>{
    console.log("IN GETHIKEMAP FOR ",id)
    const res=await fetch(APIBASE+'hikes/'+id+'/map',{
        credentials:"include"
    });
    const ret=await res.json();
    console.log("RECEIVED",ret);
    if(res.ok) return ret;
    else throw ret;
}

const isLogged=async ()=>{
    const res=await fetch(APIBASE+'logged',{
        credentials:"include"
    });
    const usr=await res.json();
    if(res.ok) return usr;
    else throw res.status;
}

const api={login, logout, register, getParkings, addParking,insertHut,getHikesList,getHikersHikesList,addHike,getHikesListWithFilters,getHikeMap,isLogged};
export default api;
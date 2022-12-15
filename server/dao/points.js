const db = require('./dao');

getParkingsList = async () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM HIKES'
    db.all(sql, [], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        const hikes = row.map((p) => ({ IDPoint: p.IDPoint, Name: p.Name, Coordinates: [p.Latitude,p.Longitude], GeographicalArea: getGeoArea(p) }))
        resolve(hikes);
    });
});

const linkPointToHike=(hikeId,pointId)=>new Promise((resolve,reject)=>{
    const sql="INSERT INTO LINKEDPOINTS(IDPoint,IDHike) VALUES(?,?)";
    db.run(sql,[pointId,hikeId],err=>{
        if(err){
            console.log("Err in link point to hike",err);
            reject({status:503,message:err});
        }
        resolve();
    })
})

const unlinkPointFromHike=(hikeId,pointId)=>new Promise((resolve,reject)=>{
    const sql="DELETE FROM LINKEDPOINTS WHERE IDPoint=? AND IDHike=?";
    db.run(sql,[pointId,hikeId],err=>{
        if(err){
            console.log("Err in UNLINK point to hike",err);
            reject({status:503,message:err});
        }
        resolve();
    })
})

function insertPoint(name, latitude, longitude, altitude, GeographicalArea, TypeOfPoint, description) {
    return new Promise((res, rej) => {
        console.log("In insert point with name",name,"lat",latitude,"long",longitude,"geoarea",GeographicalArea,"type",TypeOfPoint)
        if (!name || !latitude || !longitude || !GeographicalArea || !TypeOfPoint) {
            rej("All of the 'name, coordinates, GeographicalArea, TypeOfPoint' are required.");
            return;
        }

        let query = `INSERT INTO POINTS (name, Latitude, Longitude, Altitude, Province, Region, Country, TypeOfPoint, Description) VALUES(?,?,?,?,?,?,?,?,?);`;

        db.run(query, [name, latitude, longitude, altitude, GeographicalArea.province, GeographicalArea.region, GeographicalArea.country, TypeOfPoint, description], function (err) {
            if (err) {
                rej(err);
                return;
            }
            res(this.lastID);
        });
    });
}

const getPointById = (id) => new Promise((resolve, reject) => {
    let sql = "SELECT * FROM POINTS WHERE IDPoint = ?";
    db.get(sql, [id], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(row);
    })
});
const getGeoArea= p=>{
    //console.log("IN geo get area with",p);
    let ret=p.Province;
    if(p.Province!=="" && (p.Region!=="" || p.Country!=="")) ret+=", ";
    ret+=p.Region;
    if(p.Region!=="" && p.Country!=="") ret+=", ";
    ret+=p.Country;
    return ret;
}
const getPointsInBounds= async (minLat,maxLat,minLon,maxLon,startLat,startLon,endLat,endLon) =>new Promise((resolve, reject) => {
    let sql = "SELECT * FROM POINTS WHERE Latitude>=? AND Latitude<=? AND Longitude>=? AND Longitude<=? AND NOT((Latitude=? AND Longitude=?) OR (Latitude=? AND Longitude=?))";
    db.all(sql, [minLat,maxLat,minLon,maxLon,startLat,startLon,endLat,endLon], (err, rows) => {
        if (err)    reject({status:503,message:"Internal error"});
        resolve(rows.map(p=>({id: p.IDPoint, name: p.Name, coordinates: [p.Latitude,p.Longitude], geographicalArea: getGeoArea(p), typeOfPoint: p.TypeOfPoint})));
    })
});

const linkableStartPoints= async (startLat,startLon,startId,hikeName) =>new Promise((resolve, reject) => {
    //console.log("Name of hike",hikeName);
    const sql = "SELECT * FROM POINTS WHERE (TypeOfPoint='hut' OR TypeOfPoint='parking' OR Description=? OR Description=?) AND 2 * 6371 * sqrt(pow(sin((radians(?) - radians(Latitude)) / 2), 2)+ cos(radians(Latitude))* cos(radians(?))* pow(sin((radians(?) - radians(Longitude)) / 2), 2))<=5 AND NOT IDPoint=?";
    db.all(sql, ["Default starting point of hike "+hikeName,"Default starting and arrival point of hike "+hikeName,startLat,startLat,startLon,startId], (err, rows) => {
        if (err)    reject({status:503,message:"Internal error"});
        //console.log("GET START POINTS",rows);
        resolve(rows.map(p=>({id: p.IDPoint, name: p.Name, coordinates: [p.Latitude,p.Longitude], geographicalArea: getGeoArea(p), typeOfPoint: p.TypeOfPoint})));
    })
});

const linkableEndPoints= async (endLat,endLon,endId,hikeName) =>new Promise((resolve, reject) => {
    //console.log("Name of hike",hikeName);
    const sql = "SELECT * FROM POINTS WHERE (TypeOfPoint='hut' OR TypeOfPoint='parking' OR Description=? OR Description=?) AND 2 * 6371 * sqrt(pow(sin((radians(?) - radians(Latitude)) / 2), 2)+ cos(radians(Latitude))* cos(radians(?))* pow(sin((radians(?) - radians(Longitude)) / 2), 2))<=5 AND NOT IDPoint=?";
    db.all(sql, ["Default arrival point of hike "+hikeName,"Default starting and arrival point of hike "+hikeName,endLat,endLat,endLon,endId], (err, rows) => {
        if (err)    reject({status:503,message:"Internal error"});
        //console.log("GET END POINTS",rows);
        resolve(rows.map(p=>({id: p.IDPoint, name: p.Name, coordinates: [p.Latitude,p.Longitude], geographicalArea: getGeoArea(p), typeOfPoint: p.TypeOfPoint})));
    })
});

const linkableHuts= async id =>new Promise((resolve, reject) => {
    const sql = "SELECT * FROM POINTS WHERE TypeOfPoint='hut' AND EXISTS(SELECT HIKESCOORDINATES.indexCoor FROM HIKESCOORDINATES WHERE HIKESCOORDINATES.hikeId=? AND 2 * 6371 * sqrt(pow(sin((radians(HIKESCOORDINATES.latitude) - radians(POINTS.Latitude)) / 2), 2)+ cos(radians(POINTS.Latitude))* cos(radians(HIKESCOORDINATES.latitude))* pow(sin((radians(HIKESCOORDINATES.longitude) - radians(POINTS.Longitude)) / 2), 2))<=5)";
    db.all(sql, [id], (err, rows) => {
        if (err){
            console.log("Error in linkable huts",err);
            reject({status:503,message:"Internal error"});
        }
        resolve(rows.map(p=>({id: p.IDPoint, name: p.Name, coordinates: [p.Latitude,p.Longitude], geographicalArea: getGeoArea(p), typeOfPoint: p.TypeOfPoint})));
    })
});


const insertImageForPoint=async (pointId,image)=>new Promise((resolve,reject)=>{
    const sql="INSERT INTO POINTSIMAGES(pointId,path,name) VALUES(?,?,?)";
    db.run(sql,[pointId,image.filename,image.originalname],err=>{
        if(err){
            console.log("ERROR IN INSERT NEW IMAGE",err," FOR POINT",pointId,"WITH IMAGE",image);
            reject({status:503,message:err});
        }
        else resolve();
    })
})

const getImages=async pointId=>new Promise((resolve,reject)=>{
    const sql="SELECT path,name FROM POINTSIMAGES WHERE pointId=?";
    db.all(sql,[pointId],(err,rows)=>{
        if(err){
            console.log("ERROR IN GET NEW IMAGES",err,pointId);
            reject({status:503,message:err});
        }
        else resolve(rows);
    })
})

const points = { getParkingsList, insertPoint, getPointById, getPointsInBounds, linkableHuts, linkableStartPoints, linkableEndPoints , linkPointToHike, unlinkPointFromHike, insertImageForPoint, getImages, getGeoArea}
module.exports = points;
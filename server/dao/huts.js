const db = require('./dao');
const { insertPoint, getGeoArea } = require('./points');



getHutsList = async () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM POINTS P, HUTS H WHERE P.IDPoint = H.IDPoint'
    db.all(sql, [], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        const huts = row.map((h) => ({ IDPoint: h.IDPoint, Name: h.Name, Coordinates: [h.Latitude,h.Longitude], GeographicalArea: getGeoArea(h), Country: h.Country, NumberOfBeds: h.NumberOfBeds, Phone: h.Phone, Email: h.Email, website: h.website  }))
        resolve(huts);
    });
});

getHutsListWithFilters = async (name, numberOfBeds) => new Promise((resolve, reject) => {
    let thisName = name==null? '%' : "%" + name + "%";
    //let thisCoordinate = coordinate==null? '%' : coordinate;
    let thisCountry = country==null? '%' : country;
    let thisNumberOfBedrooms = numberOfBedrooms==null? '%' : numberOfBedrooms;
    let thisProvince = geographicalArea==null? '%' : geographicalArea;
    let thisRegion= geographicalArea==null? '%' : geographicalArea;
    
    //console.log(thisName + " " + thisCoordinate + " " + thisCountry + " " + thisNumberOfGuests + " " + thisNumberOfBedrooms + " ")
    
    const sql = 'SELECT * FROM POINTS P, HUTS H WHERE P.IDPoint = H.IDPoint AND UPPER(P.Name) LIKE UPPER(?) AND UPPER(Country) LIKE UPPER(?) AND UPPER(TypeOfPoint) = UPPER(?) AND NumberOfBeds LIKE ? AND UPPER(Province) LIKE UPPER(?) AND UPPER(Region) LIKE UPPER(?)'

    db.all(sql, [thisName, thisCountry, "hut", thisNumberOfBedrooms, thisGeographicalArea], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        const huts = row.map((h) => ({ IDPoint: h.IDPoint, Name: h.Name, Description: h.Description, Coordinates: [h.Latitude,h.Longitude], GeographicalArea: getGeoArea(h), Country: h.Country, NumberOfBeds: h.NumberOfBedrooms, Phone: h.Phone, Email: h.Email, Website: h.Website    }))
        console.log("Returning huts",huts);
        resolve(huts);
    });
});

function insertHut(name, country, numberOfGuests, numberOfBedrooms, coordinate) {
    return new Promise((res, rej) => {

        if (!name || !description || !numberOfBeds || !coordinate || !phone || !email) {
            rej("All of the 'name, description, altitude, country, numberOfBeds, referencePointID, phone, email' are required");
            return;
        }
        //TODO: INSERT DESCRIPTION AND ALTITUDE
        insertPoint(name, coordinate[0],coordinate[1], altitude, geopos, "hut", "").then(pointId => {


            let query = `INSERT INTO HUTS (Country ,NumberOfGuests,NumberOfBedrooms,IDPoint) VALUES(?,?,?,?);`;
            
            db.run(query, [country, numberOfGuests, numberOfBedrooms, pointId], function (err) {
                if (err) {
                    rej({status:503,message:err});
                    return;
                }
                res(this.lastID);
            });
        }).catch(err => rej({status:500,message:'Error on inserting hut: \r\n' + err}));
    });
}

module.exports = { getHutsList, insertHut, getHutsListWithFilters };
const db = require('./dao');
const { insertPoint } = require('./points');



getHutsList = async () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM POINTS P, HUTS H WHERE P.IDPoint = H.IDPoint'
    db.all(sql, [], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        const huts = row.map((h) => ({ IDPoint: h.IDPoint, Name: h.Name, Coordinates: [h.Latitude,h.Longitude], NumberOfBeds: h.NumberOfBeds, Phone: h.Phone, Email: h.Email, website: h.website  }))
        resolve(huts);
    });
});

getHutsListWithFilters = async (name, numberOfBeds) => new Promise((resolve, reject) => {
    let thisName = name==null? '%' : "%" + name + "%";
    //let thisCoordinate = coordinate==null? '%' : coordinate;
    // let thisNumberOfGuests = numberOfGuests==null? '%' : numberOfGuests;
    let thisNumberOfBeds = numberOfBeds==null? '%' : numberOfBeds;
    // let thisGeographicalArea = geographicalArea==null? '%' : geographicalArea;
    
    //console.log(thisName + " " + thisCoordinate + " " + thisCountry + " " + thisNumberOfGuests + " " + thisNumberOfBedrooms + " ")
    
    const sql = 'SELECT * FROM POINTS P, HUTS H WHERE P.IDPoint = H.IDPoint AND UPPER(P.Name) LIKE UPPER(?) AND UPPER(TypeOfPoint) = UPPER(?) AND NumberOfBeds LIKE ? '

    db.all(sql, [thisName, "hut", thisNumberOfBeds], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        const huts = row.map((h) => ({ IDPoint: h.IDPoint, Name: h.Name, Description: h.Description, NumberOfBeds: h.NumberOfBeds, Coordinates: [h.Latitude,h.Longitude], Phone: h.Phone, Email: h.Email, Website: h.Website  }))
        console.log("Returning huts",huts);
        resolve(huts);
    });
});

function insertHut(name, description, numberOfBeds, coordinate, phone, email, website) {
    return new Promise((res, rej) => {

        if (!name || !description || !numberOfBeds || !coordinate || !phone || !email) {
            rej("All of the 'name, description, altitude, country, numberOfBeds, referencePointID, phone, email' are required");
            return;
        }
        //TODO: INSERT DESCRIPTION AND ALTITUDE
        insertPoint(name, coordinate[0], coordinate[1], "Piedmont", "hut").then(pointId => {

            let query = `INSERT INTO HUTS (Description, NumberOfBeds, Phone, Email, Website, IDPoint) VALUES(?,?,?,?,?,?);`;
             
            db.run(query, [description, numberOfBeds, phone, email, website, pointId], function (err) {
                if (err) {
                    rej(err);
                    return;
                }
                res(this.lastID);
            });
        }).catch(err => rej(err));
    });
}

module.exports = { getHutsList, insertHut, getHutsListWithFilters };
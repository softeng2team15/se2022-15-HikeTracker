const db = require('./dao');
const { insertPoint, getGeoArea } = require('./points');
const points = require('../services/points');


exports.getParkingsList = async () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM PARKINGS AS P JOIN POINTS AS M ON P.IDPoint = M.IDPoint'
    db.all(sql, [], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        const pks = row.map((p) => ({ IDPoint: p.IDPoint, Name: p.Name, Description: p.Description, SlotsTot: p.SlotsTot, SlotsFull: p.SlotsFull, TypeOfPoint: p.TypeOfPoint, Coordinates: [p.Latitude,p.Longitude], GeographicalArea: getGeoArea(p) }))
        resolve(pks);
    });
});

exports.addParking = async (pk) => {
    try {
        const geodata=await points.getGeoAndLatitude(pk.coordinates[0],pk.coordinates[1]);
        return new Promise((resolve, reject) => {


            const sql = 'INSERT INTO PARKINGS(IDPoint,SlotsTot,SlotsFull) VALUES(?,?,?)';
    
            insertPoint(pk.name, pk.coordinates[0],pk.coordinates[1], geodata.altitude, geodata.geopos, 'parking',pk.desc).then(pointId => {
                db.run(sql, [pointId, pk.slots, 0], function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(this.lastID);
                });
            }).catch(reject);
        });
    } catch (error) {
        throw error;
    }
};
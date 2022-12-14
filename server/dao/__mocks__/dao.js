const fs = require("fs");
const sqlite = require("sqlite3");
const initQueries = async () => {
	const dataArr = dataSql.toString().split(");");
	db.serialize(() => {
		db.run("PRAGMA foreign_keys=ON;");
		db.run("BEGIN TRANSACTION;");
		dataArr.forEach(query => {
			if (query) {
				query += ");";
				db.run(query, err => {
					//console.log("Query",query,"  err? ",err)
					if (err)	throw err;
				});
			}
		});
		db.run("COMMIT;");
	});
};
let restart;
if (fs.existsSync(__dirname + "/hiketrackerdbtesting.sqlite")) restart = true;
else restart = false;
const dataSql = fs.readFileSync(__dirname + "/initQueries.sql").toString();
const db = new sqlite.Database(__dirname + "/hiketrackerdbtesting.sqlite", e => {
	if (e)	throw { status: 500, message: {status:500,message:"Failed to create the database"} };
	else {
		db.loadExtension(__dirname+'/math',err=>{
			if (err){
				console.log("Err trying to load extension",err);
				throw { status: 500, message: {status:500,message:"Failed to load an extension to the database"} };
			}
			else{
				//console.log("Success!!");
				if (!restart)	initQueries().then().catch(e=>{console.log("Error",e);throw {status:503,message: {status:503,message:"Failed to init queries"}}});
			}
		});
	}
});


module.exports = db;
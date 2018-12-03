
const express = require('express'),
router = express.Router();

const mysql = require('mysql2'); 
const fs = require('fs');

const request = require("request");
const fetch = require('node-fetch');


//=====  LOCAL CONNECTION NO POOL  =========
 /*  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  dateStrings: true,
  password: "Black@Red911"
}); 

  con.connect(function(err) {
  if (err) {console.log('Error creating the connection: ' + err);}
  else {
	console.log("Connected!");
  }
});    */ 


//=====  CLOUD CONNECTION NO POOL =========
var config =
{
    host: 'fodata.mysql.database.azure.com',
    user: 'fodata@fodata',
    password: 'Black@Red911',
    database: 'fodata',
    port: 3306,
    ssl: true
};   

 const con = new mysql.createConnection(config); 
//=========================================


//-------------- 1.  Import Data.

 router.post('/newdatasource', (req, resp) => {
	
	var db = 'fodata';
	var tbl = 'routes';
	
	var input = req.body;	
	console.log('New data request: ' + JSON.stringify(input)); 
	
	var pcode_start = 'EC2A4JE'
	var pcode_end = 'MK111HX'
	
	// delete the original post code pairing 
	var query_del = "DELETE FROM " + db + "." + tbl + " WHERE pcode_start = " + pcode_start + " AND pcode_end = " + pcode_end;
	

	var appId = 'cad1e4b6';
	var apiKey = 'e4930602757eb3f3d4911eeb92b6b9cd';
	
	const options = { 
		url: 'https://transportapi.com/v3/uk/car/journey/from/postcode:EC2A4JE/to/postcode:mk111hx.json?app_id=' + appId + '&app_key=' + apiKey ,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Accept-Charset': 'utf-8'
		}
	};

	request(options, function(err, res, body) {  
		
		var arrBody = JSON.parse(body);		
		var arrRoutes = arrBody.routes[0].instructions		
		var arrHeader = ['pcode_start','pcode_end'];
		
		for (key in arrRoutes[0]) {											
			arrHeader.push(key);
		}
		
		arrRoutes = convertToArray(arrHeader, arrRoutes, pcode_start, pcode_end );
		
		var sqlIns = "INSERT INTO " + db + "." + tbl + "(" + arrHeader + ")  VALUES ?";
						
		con.query(sqlIns, [arrRoutes], function (err, results) {							
			if(err){console.log('Error inserting data: ' + err);}
			else {console.log('Data inserted');}
		});
		
		resp.writeHead(200, {"Content-Type": "text/plain"});
		resp.end(JSON.stringify(arrBody.routes[0].instructions));
		
		//console.log(JSON.stringify(arrRoutes));
	});



							
	
});


function convertToArray(arrHeader, jsonArr, pcode_start, pcode_end) {

  var objArray = [];

	for (var i = 0; i < jsonArr.length; i++) {
  
		var objArrayTmp = [];
		for (var k = 0; k < arrHeader.length; k++) {
			
			var header = arrHeader[k];
			if(k == 0){
				objArrayTmp.push(pcode_start);
			}
			else if(k == 1){
				objArrayTmp.push(pcode_end);
			}
			else{
				objArrayTmp.push(jsonArr[i][header]);
			}			

		}
		objArray.push(objArrayTmp);	
  }
   return objArray;   
} 
 
function convertToJSON(array) {
  var objArray = [];
  for (var i = 1; i < array.length; i++) {
    objArray[i - 1] = {};
    for (var k = 0; k < array[0].length && k < array[i].length; k++) {
      var key = array[0][k];
      objArray[i - 1][key] = array[i][k]
    }
  }

  return objArray;
}


module.exports = router;

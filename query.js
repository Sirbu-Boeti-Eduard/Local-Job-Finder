const fs = require('fs');
const mysql = require('mysql');
const dotenv = require('dotenv');

//Database credentials
dotenv.config({path: '.env'});

const db = mysql.createConnection({
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PORT
})

//Database connect
db.connect((error) => {
    if(error) {
        console.log("Failed connection " + error);
    }
    else{ 
        console.log("Successful connection");
    }
})

const query = 'SELECT * FROM job';

db.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error querying database: ' + error.stack);
    return;
  }
  
  const jsonResults = JSON.stringify(results);

  fs.writeFile('public/JSON/locations/all.json', jsonResults, (err) => {
    if (err) throw err;
    console.log('Results saved to results.json');
  });
});

const query1 = 'SELECT DISTINCT jobName FROM job';

db.query(query1, (error, results, fields) => {
  if (error) {
    console.error('Error querying database: ' + error.stack);
    return;
  }
  const search = results.map(data => data.jobName);
  const jsonResults = JSON.stringify(search);

  fs.writeFile('public/JSON/search/jobList.json', jsonResults, (err) => {
    if (err) throw err;
    console.log('Results saved to results.json');
  });
  
});

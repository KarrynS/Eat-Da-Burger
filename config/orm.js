//Import mySQL connection
const { query } = require("./connection.js");
var connection = require("./connection.js");

// Helper Function for SQL
const printQuestionMarks = (num) => {
     const arr = [];
   
     for (let i = 0; i < num; i++) {
       arr.push('?');
     }
   
     return arr.toString();
   };

const objToSql = (ob) => {
const arr = [];

// Loop through the keys and push the key/value as a string int arr
for (const key in ob) {
     let value = ob[key];
     // Check to skip hidden properties
     if (Object.hasOwnProperty.call(ob, key)) {
     // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
     if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = `'${value}'`;
     }
     // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
     // e.g. {sleepy: true} => ["sleepy=true"]
     arr.push(`${key}=${value}`);
     }
}

// Translate array of strings to a single comma-separated string
return arr.toString();
};

//ORM
const orm = {
     selectAll(tableInput, cb) {
          let queryString = `SELECT * FROM ${tableInput}`;
          connection.query(queryString, (err,result) => {
               if(err) {
                    throw err;
               }
               cb(result);
          })
     },
     insertOne(table, cols, vals, cb) {
          let queryString = `INSERT INTO ${table}`;
          
          queryString += ' (';
          queryString += cols.toString();
          queryString += ') ';
          queryString += 'VALUES (';
          queryString += printQuestionMarks(vals.length);
          queryString += ') ';

          console.log("InsertOne(): ", queryString);
          
          connection.query(queryString, vals, (err, result) => {
               if(err) {
                    throw err;
               }
               cb(result); 
          })
     },
     updateOne(table, objColVals, condition, cb) {
          let queryString = `UPDATE ${table}`;
      
          queryString += ' SET ';
          queryString += objToSql(objColVals);
          queryString += ' WHERE ';
          queryString += condition;
      
          console.log("UpdateOne(): ", queryString);

          connection.query(queryString, (err,result) => {
               if(err) {
                    throw err;
               }
               cb(result);  
          })
     }
}

module.exports = orm;




/*

//ORM
const orm = {
     selectAll(tableInput, cb) {
          let queryString = `SELECT * FROM ??`;
          connection.query(queryString, (err,result) => {
               if(err) {
                    throw err;
               }
               cb(result);
          })
     },
     insertOne(table, cols, vals, cb) {
          let queryString = `INSERT INTO ?? VALUES ??`;
          connection.query(queryString, vals, (err, result) => {
               if(err) {
                    throw err;
               }
               cb(result); 
          })
     },
     updateOne(table, condition, cb) {
          let queryString = `DELETE FROM ?? WHERE ??`
          connection.query(queryString, condition, (err,result) => {
               if(err) {
                    throw err;
               }
               cb(result);  
          })
     }
}


*/
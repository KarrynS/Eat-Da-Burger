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

for (const key in ob) {
     let value = ob[key];
     if (Object.hasOwnProperty.call(ob, key)) {
     if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = `'${value}'`;
     }
     arr.push(`${key}=${value}`);
     }
}
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
          //console.log("InsertOne(): ", queryString);
     
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
          //console.log("UpdateOne(): ", queryString);
          connection.query(queryString, (err,result) => {
               if(err) {
                    throw err;
               }
               cb(result);  
          });
     },
}

module.exports = orm;

const orm = require("../config/orm.js");

const burger = {
    all(cb){
        orm.selectAll('burgers', (res) => cb(res));
    },
    create(cb) {
        orm.insertOne('burgers', cols, vals, (res) => cb(res));
    },
    update(cb){
        orm.updateOne('burgers', vals, (res) => cb(res));
    }
};

//TO DO: 
/*
* Also inside `burger.js`, create the code that will call the ORM functions using burger specific input for the ORM.
*/

module.exports = burger;
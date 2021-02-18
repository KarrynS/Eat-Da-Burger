const orm = require("../config/orm.js");

const burger = {
    all(cb){
        orm.selectAll('burgers', (res) => cb(res));
    },
    create(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, (res) => cb(res));
    },
    update(vals, condition, cb){
        orm.updateOne('burgers', vals, condition, (res) => cb(res));
    }
};

module.exports = burger;
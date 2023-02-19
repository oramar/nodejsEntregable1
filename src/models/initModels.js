const Repair = require('../models/repair.models')
const User = require('../models/user.models')
exports.initModel = ()=>{
    User.hasMany(Repair)
    Repair.belongsTo(User)
}

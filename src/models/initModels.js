const Repair = require('../models/repair.models')
const User = require('../models/user.models')
const initModel = ()=>{
    User.hasMany(Repair)
    Repair.belongsTo(User)
}
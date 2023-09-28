const fullName = (value) => {
    const value1 = value.dataValues.UserProfile.dataValues.firstName
    const value2 = value.dataValues.UserProfile.dataValues.lastName
    return `${value1} ${value2}`
}



module.exports = {fullName}
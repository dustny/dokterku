const fullName = (value) => {
    const value1 = value.UserProfile.dataValues.firstName
    const value2 = value.UserProfile.dataValues.lastName
    return `${value1} ${value2}`
}


module.exports = {fullName}
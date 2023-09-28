const fullName = (value) => {
    const value1 = value.UserProfile.firstName
    const value2 = value.UserProfile
    return `${value1} ${value2}`
}

const dataUser = (value) =>{
    return value.dataValues.UserProfile
}

module.exports = {fullName, dataUser}
const formatIDR = (value) => {
    return value.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
}

const fullName = (value) => {
    const value1 = value.dataValues.UserProfile.dataValues.firstName
    const value2 = value.dataValues.UserProfile.dataValues.lastName
    return `${value1} ${value2}`
}


module.exports = {formatIDR,fullName}
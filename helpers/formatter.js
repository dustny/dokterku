const getAge = (value) => {
    return new Date().getFullYear() - new Date(value).getFullYear()
}

const formatIDR = (value) => {
    return value.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
}

const fullName = (value) => {
    const value1 = value.UserProfile.firstName
    const value2 = value.UserProfile.lastName
    return `${value1} ${value2}`
}

module.exports = {getAge,formatIDR,fullName}
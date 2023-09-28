const getAge = (value) => {
    return new Date().getFullYear() - new Date(value).getFullYear()
}

const formatIDR = (value) => {
    return value.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
}

module.exports = {getAge,formatIDR}
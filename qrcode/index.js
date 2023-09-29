const qr = require('qrcode')

// qr.toString('https://www.cdc.gov/dengue/images/symptoms/DengueSymptomsUpdated.jpg?_=45121', {type:"terminal"}, function(err,code){
//     if(err) console.log("error");
//     console.log(code)
// }
// )

qr.toDataURL('https://venngage-wordpress.s3.amazonaws.com/uploads/2021/05/Patient-Education-NJH-Living-With-Diabetes.jpeg', function(err,code){
    if(err) console.log("error");
    console.log(code)
}
)
const moment = require("moment");

function convertDate(date){
    return moment(date).locale('pt').format("HH:mm:ss [de] DD/MM/YYYY")
}   

module.exports = convertDate;
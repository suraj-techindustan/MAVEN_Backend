// let moment = require('moment');

const cron = require("node-cron");

let isdead ={status:false,message:""}

module.exports = function counter(){

    cron.schedule("*/10 * * * * *", ()=>{
        // console.log("otp expire in 10 sec")
        return isdead = {status:true,message:"Otp Will expire in 10 s"}
    });

}







// module.exports = function counter(){
//     return moment().format('mm') 
    
// }

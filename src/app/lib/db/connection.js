import mongoose from "mongoose"
let {USERNAME,PASSWORD}=process.env
 
// if specila char then must encodeURIComponent(USERNAME)
const USERNAME1 = encodeURIComponent(USERNAME);
const PASSWORD1 = encodeURIComponent(PASSWORD);
// pass word without special char only use $

let connection=mongoose.connect(`mongodb+srv://${USERNAME1}:${PASSWORD1}@cluster0.tmodhfn.mongodb.net/DeliveryApp?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    console.log('db connect');
     
}).catch((e)=>{
    console.log('db not connect',e.message)
});
export default  connection;
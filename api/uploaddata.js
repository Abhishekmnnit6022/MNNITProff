const {connectProffdetails}=require("../api/dbConfig");
const ProffModel = require("../api/models/proffModel");
const proffData = require("../csvjson.json");

const uploadProffDetails = async () => {
    try {
        const connection = await connectProffdetails;
        console.log("connection successfull");
        const proff  = ProffModel.getModel();
        if (!proff) {
            throw new Error("Proff model is not initialized");
        }
        await proff.insertMany(proffData);
        console.log("Proff data uploaded successfully");

        
    } catch (error) {
        console.log("Error in uploading Proffs dettails : ", error);
        
    }
    finally{
        process.exit(0);    
    }
}
console.log("uploading Proff data...");
uploadProffDetails();


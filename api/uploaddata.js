const { connectProffdetails } = require("../api/dbConfig");
const ProffModel = require("../api/models/proffModel");
const proffData = require("../csvjson.json");

const uploadProffDetails = async () => {
    try {
        const connection = await connectProffdetails;
        console.log("Connection successful");

        const Proff = ProffModel.getModel();
        if (!Proff) {
            throw new Error("Proff model is not initialized");
        }



        // Example: Updating based on unique "Email" field assuming it's unique
        for (const proff of proffData) {
            await Proff.updateOne({ Email: proff.Email }, proff, { upsert: true });
        }

        console.log("Proff data updated successfully");

    } catch (error) {
        console.error("Error in uploading Proffs details:", error);

    } finally {
        process.exit(0); 
    }
};

console.log("Uploading Proff data...");
uploadProffDetails();

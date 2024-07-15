const { connectProffdetails } = require('./dbConfig');
const proffModel = require('./models/proffModel');

const addPasswordField = async () => {
  try {
    // Wait for the database connection
    const connection = await connectProffdetails;
    
    // Get the Student model
    const Proff = proffModel.getModel();
    
    // Check if Student model is available
    if (!Proff) {
      throw new Error("Student model is not initialized");
    }

    // Update all documents to add the password field
    const result = await Proff.updateMany(
      { password: { $exists: true } }, // Find documents where password doesn't exist
      { $set: { password: null } } // Set password to null for these documents
    );

    console.log(`Updated ${result.modifiedCount} documents`);
  } catch (err) {
    console.error("Error adding password field:", err);
  } finally {
    process.exit(0);
  }
};

addPasswordField();
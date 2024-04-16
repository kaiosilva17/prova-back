const mongoose = require('mongoose')

async function main() {
    
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@cluster0.emasswd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("kaio");
    } catch (error) {
        console.log("erro" + error);
    }
    
  
}



module.exports = main
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://suryakommanapalli:Ph7W2xv7qmDuOAKv@moviesdb.kscgqcp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let database;

async function connectToDatabase() {
  try {
    if (!database) {
      await client.connect();
      database = client.db("ReelBook");
    }
    return database;
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

async function closeDatabaseConnection() {
  try {
    if (client.isConnected()) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
}

module.exports = { connectToDatabase, closeDatabaseConnection };

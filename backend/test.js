const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://backend01:YOUR_PASSWORD@backendclustor01.2pdjmbo.mongodb.net/?retryWrites=true&w=majority&appName=backendClustor01";

async function main() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ MongoDB Connected Successfully");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

main();

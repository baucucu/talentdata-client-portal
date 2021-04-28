const { MongoClient } = require("mongodb");
// Replace the following with values for your environment.
const username = encodeURIComponent("baucucu");
const password = encodeURIComponent("Habarnam1");
const clusterUrl = "cluster0.4lwlk.mongodb.net";
const authMechanism = "DEFAULT";
// Replace the following with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client
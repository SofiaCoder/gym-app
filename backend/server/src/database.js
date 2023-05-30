const { MongoClient } = require('mongodb');
require('dotenv').config();

let client;

async function main() {
  const url = process.env.DB_URL;

  if (! client) {
    client = await MongoClient.connect(url);
  }

  const database = client.db('gym-app');

  const usersCollection = database.collection('users');
  const exerciseCollection = database.collection('exercises');

  return { usersCollection, exerciseCollection, client };
}

module.exports = main;
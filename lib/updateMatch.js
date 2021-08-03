import { MongoClient, ObjectId } from "mongodb";
import createMatchCard from "./createMatchCard";
const encuser = encodeURIComponent(process.env.DB_USER);
const encpw = encodeURIComponent(process.env.DB_PASS);
const authMechanism = 'DEFAULT';
const url = `mongodb://${encuser}:${encpw}@${process.env.DB_HOST}:27017/?authMechanism=${authMechanism}`;

export default function updateMatch(data, res) {
  let id = data._id;
  MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    const db = client.db(process.env.DB_NAME);
    const o_id = new ObjectId(data._id);
    delete data._id;
    data.fecha = new Date(data.fecha);
    db.collection(process.env.DB_COLLECTION).replaceOne({'_id': o_id}, data, (err, r) => {
      if (err) {
        res.end("Error");
        console.error(err);
        client.close();
      } else {
        res.end("Success!");
        client.close();
        createMatchCard(id);
      }
    });
  });
}
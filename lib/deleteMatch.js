import { MongoClient, ObjectId } from "mongodb";
const encuser = encodeURIComponent(process.env.DB_USER);
const encpw = encodeURIComponent(process.env.DB_PASS);
const authMechanism = 'DEFAULT';
const url = `mongodb://${encuser}:${encpw}@${process.env.DB_HOST}:27017/?authMechanism=${authMechanism}`;
import fs from 'fs';

export default function deleteMatch(data, res) {
  MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    const db = client.db(process.env.DB_NAME);
    const o_id = new ObjectId(data._id);
    db.collection(process.env.DB_COLLECTION).deleteOne({'_id': o_id}, (err, r) => {
      if (err) {
        res.end("Error");
        console.error(err);
        client.close();
      } else {
        res.end("Success!");
        client.close();
        let dir = `./.cache/matchcards/${process.env.DB_COLLECTION}/${data._id}.png`;
        if (fs.existsSync(dir)) {
          fs.unlinkSync(dir);
        }
      }
    });
  });
}
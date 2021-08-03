import { MongoClient, ObjectId } from 'mongodb';
const encuser = encodeURIComponent(process.env.DB_USER);
const encpw = encodeURIComponent(process.env.DB_PASS);
const authMechanism = 'DEFAULT';
const url = `mongodb://${encuser}:${encpw}@${process.env.DB_HOST}:27017/?authMechanism=${authMechanism}`;
import createDocument from './createDocument';
import createMatchCard from './createMatchCard';

export default function pushToDB(files, torneo, vod, res) {
    if (vod == "") {
        vod = null;
    }

    let documents = []

    if (Array.isArray(files)) {
        files.forEach((item) => {
            documents.push(createDocument(item, torneo, vod, res));
        });
    } else {
        documents.push(createDocument(files, torneo, vod, res));
    }

    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        const db = client.db(process.env.DB_NAME);
        db.collection(process.env.DB_COLLECTION).insertMany(documents, (err, r) => {
            if (err) {
                res.json({
                    status: 'error',
                    error: err
                });
                console.error(err);
                client.close();
            } else {
                res.json({
                    status: 'success'
                });
                client.close();
                if (documents.length === 1) {
                    createMatchCard(r.insertedIds['0'].toString());
                }
            }
        });
    });
}
import { IncomingForm } from "formidable";
import pushToDB from "../../lib/PushToDB";

export default function handler(req, res) {
  if (req.method === 'POST') {
    let form = IncomingForm({ keepExtensions: true, multiples: true });
    form.parse(req, (err, fields, files) => {
      if (fields.pw === process.env.KEY) {
        try {
          pushToDB(files.upload, fields.torneo, fields.vod, res);
        } catch (e) {
          console.error(e);
          res.end(e.toString());
        }
      } else {
        res.end("Wrong Key");
      }
    });
  } else {
    res.end('Wrong method');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
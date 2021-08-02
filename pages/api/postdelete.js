import deleteMatch from "../../lib/deleteMatch";

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.password === process.env.KEY) {
      try {
        deleteMatch(req.body.data, res);
      } catch (e) {
        console.error(e);
        res.end(e.toString());
      }
    } else {
      res.end("wrong pw");
    }
  }
}
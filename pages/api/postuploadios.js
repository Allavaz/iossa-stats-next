import pushToDBios from "../../lib/pushToDBios";

export default function handler(req, res) {
  if (req.method === 'POST') {
    let torneo = `${req.body.access_token}`;
    let vod = "";
    console.dir(`Received JSON from ${req.ip} with Token ID: ${torneo}`);
    if (req.ip == process.env.IOS_SERVER_IP) {
      try {
        pushToDBios(req.body, torneo, vod, res);
        res.end(" -> JSON subido con exito");
      } catch (e) {
        console.error(e);
        res.end(e.toString());
      }
    } else {
      res.end(" -> Wrong IP");
    }
  } else {
    res.end('Wrong method');
  }
}
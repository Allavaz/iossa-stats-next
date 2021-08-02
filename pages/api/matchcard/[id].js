import puppeteer from "puppeteer";
import MatchCardTemplate from "../../../lib/matchCardTemplate";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let template = await MatchCardTemplate(req.query.id);
    await page.setViewport({
      width: 670,
      height: 480
    })
    await page.setContent(template,
      {waitUntil: 'networkidle0'}
    );
    await page.addStyleTag({path: './styles/matchCardStyle.css'});
    const container = await page.$('.container');
    const boundingBox = await container.boundingBox();
    let image = await page.screenshot({
      clip: {
        x: 0,
        y: 0,
        width: 670,
        height: Math.round(boundingBox.height)
      }
    });
    res.setHeader('Content-Type', 'image/png');
    res.send(image);
    await browser.close();
  }
}
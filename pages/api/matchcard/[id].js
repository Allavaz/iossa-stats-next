import puppeteer from "puppeteer";
import MatchCardTemplate from "../../../lib/matchCardTemplate";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let {template, height} = await MatchCardTemplate(req.query.id);
    await page.setViewport({
      width: 670,
      height: height
    })
    await page.setContent(template,
      {waitUntil: 'networkidle0'}
    );
    await page.addStyleTag({path: './styles/matchCardStyle.css'});
    let image = await page.screenshot();
    res.setHeader('Content-Type', 'image/png');
    res.send(image);
    await browser.close();
  }
}
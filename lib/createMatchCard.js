import puppeteer from "puppeteer";
import MatchCardTemplate from "./matchCardTemplate";
import fs from "fs";

export default async function createMatchCard(id) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let template = await MatchCardTemplate(id);
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
  let dir = `./.cache/matchcards/${process.env.DB_COLLECTION}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }
  let image = await page.screenshot({
    path: `./.cache/matchcards/${process.env.DB_COLLECTION}/${id}.png`,
    clip: {
      x: 0,
      y: 0,
      width: 670,
      height: Math.round(boundingBox.height)
    }
  });
  await browser.close();
  return image;
}
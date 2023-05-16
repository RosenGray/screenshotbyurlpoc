import express, { Request, Response, NextFunction } from "express";
import puppeteer from "puppeteer";
import {chromium} from 'playwright';
const router = express.Router(); // Capital R

// GET http://localhost:3001/api/products
router.get("/screenshot", async (request: Request, response: Response, next: NextFunction) => {
    const url = request.query.url as string;
    console.log('url',url)
    if (!url) {
        return response.status(400).send("Missing URL parameter");
    }
    try {


        const browser = await chromium.launch();
        const context = await browser.newContext();

        // Set the token in local storage
        // await context.addInitScript(token => {
        //     localStorage.setItem('jwtToken', token);
        // }, token);

        const page = await context.newPage();
        await page.goto(url, {waitUntil: 'load'});
        const screenshot = await page.screenshot({fullPage: true});
        await browser.close();

        response.setHeader('Content-Type', 'image/png');

        console.log(screenshot)
        response.send(screenshot);


    }
    catch (err: any) {
        next(err);
    }
});



export default router;

/**

 const browser = await puppeteer.launch({
            headless:'new'
        });
 const page = await browser.newPage();


 await page.goto(url, {waitUntil: 'networkidle0'});
 const screenshot = await page.screenshot({fullPage: true,path:'./src/image.png'});
 await browser.close();

 response.setHeader('Content-Type', 'image/png');
 console.log(screenshot)

 response.send(screenshot);




 */
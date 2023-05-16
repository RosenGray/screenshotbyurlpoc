"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playwright_1 = require("playwright");
const router = express_1.default.Router(); // Capital R
// GET http://localhost:3001/api/products
router.get("/screenshot", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const url = request.query.url;
    console.log('url', url);
    if (!url) {
        return response.status(400).send("Missing URL parameter");
    }
    try {
        const browser = yield playwright_1.chromium.launch();
        const context = yield browser.newContext();
        // Set the token in local storage
        // await context.addInitScript(token => {
        //     localStorage.setItem('jwtToken', token);
        // }, token);
        const page = yield context.newPage();
        yield page.goto(url, { waitUntil: 'load' });
        const screenshot = yield page.screenshot({ fullPage: true });
        yield browser.close();
        response.setHeader('Content-Type', 'image/png');
        console.log(screenshot);
        response.send(screenshot);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
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

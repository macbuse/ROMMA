const puppeteer = require('puppeteer');
const fs = require('fs');


//This isn't mine I probably got autoscroll here
//https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

(async () => {
    
  console.log("starting pup");
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://romma.fr/carte.php?dept=0&param=temperature&mobile=0&carteinterne=0');
    
  //scroll through everything - this is more superstition than science
  await autoScroll(page);
    
    

  const myclassname = await page.evaluate(() => document.querySelector("#carte > div:nth-child(213)").innerHTML);
  console.log(myclassname);
  //
  var list = await page.evaluate(() => document.getElementsByClassName("alt0"));
  console.log(list)
  for (let item of list) {
    console.log(item.id);
}

  browser.close();
})();

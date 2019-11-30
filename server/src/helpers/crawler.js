const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const hiddenUserAgent = require('puppeteer-extra-plugin-anonymize-ua');

puppeteer.use(stealth);
puppeteer.use(hiddenUserAgent({ makeWindows: true }));

const getUserPage = username => {
  const rootDomain = `https://rateyourmusic.com/~`;
  const URL = `${rootDomain}${username}`;
  return URL;
};

const getPage = async (URL, page) => {
  try {
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 0 });

    const parsePage = await page.evaluate(() => {
      const tables = document.querySelectorAll('table.mbgen');

      let table;
      for (let i = 0; i < tables.length; i++) {
        if (tables[i].clientHeight === 328) {
          table = tables[i];
          break;
        }
      }
      if (!table) {
        return { error: 'no upcoming releases section on the user page' };
      }

      const box = table.querySelector('tbody > tr:nth-child(2) > td > div');

      const items = box.getElementsByTagName('*');
      const itemsAmount = items.length;

      const getData = {
        text: i => {
          return items[i].innerText;
        },
        type: i => {
          return items[i].className;
        },
        link: i => {
          return items[i].href;
        },
        date: i => {
          return items[i].textContent;
        }
      };

      const data = [];
      for (let i = 0; i < itemsAmount; i++) {
        if (items[i].tagName === 'A') {
          data.push({
            text: getData.text(i),
            type: getData.type(i),
            link: getData.link(i)
          });
        } else if (items[i].tagName === 'B') {
          data.push({
            date: getData.date(i),
            type: 'date'
          });
        }
      }

      return data;
    });

    return parsePage;
  } catch (error) {
    console.error('Error: ', error);
  }
};

let browser;

const rym = async username => {
  const URL = getUserPage(username);

  try {
    if (!browser) {
      browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--window-size=1920,1080'
        ],
        defaultViewport: { width: 1920, height: 1080 },
        headless: true
      });
    }

    const page = await browser.newPage();

    page.setViewport({ width: 1920, height: 937 });

    page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'document') {
        request.continue();
      } else {
        request.abort();
      }
    });

    const result = await getPage(URL, page);

    await page.close();
    return result;
  } catch (error) {
    console.error('Error: ', error);
  }
};

module.exports = rym;

var Scraper = require('./scrape/scraper');
var db = require('./scrape/db');
var urls = require('./scrape/urlGenerator');

var scraper = new Scraper();
scraper.scrape(urls, db);
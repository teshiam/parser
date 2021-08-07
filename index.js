const express = require('express')
const app = express()
const cheerio = require('cheerio')
const RSS = require('rss');
const request = require('request');
const resolveRelative = require('resolve-relative-url');
let Parser = require('rss-parser');
let parser = new Parser();


app.get('/', (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl

    console.log('Running');
    
    (async () => {
        let feed = await parser.parseURL('https://www.tradingview.com/feed/?stream=crypto');
        let feedItems = []

        var xmlinfo = '<?xml version="1.0" encoding="UTF-8"?>'
        var rssinfo = '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><title>TradingView Ideas</title><link>https://www.tradingview.com</link><description>Latest market outlook from popular traders on TradingView.</description><atom:link rel="self" href="https://www.tradingview.com/feed/"></atom:link><language>en</language><lastBuildDate>Sat, 07 Aug 2021 04:32:58 -0500</lastBuildDate>'
        var end = '</channel></rss>'

        feed.items.forEach(item => {
            var feedItem = '<item><title>'+item.title+'</title> <description>'+item['content:encoded'].replace("<![CDATA[", "").replace("]]", "")+'</description><link>'+item.link+'</link> <guid isPermaLink="false">'+item.guid+'</guid><pubDate>'+item.pubDate+'</pubDate><content:encoded>'+item['content:encoded'].replace("<![CDATA[", "").replace("]]", "")+'</content:encoded></item>'
            feedItems.push(feedItem);
        })

        var xml = xmlinfo + rssinfo + channel
        for (var item in feedItems) {
            xml += feedItems[item];
        }
        xml += end
        res.set('Content-Type', 'application/rss+xml');
        res.send(xml);    
    })();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Started at :' + PORT)
})

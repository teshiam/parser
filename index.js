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

        var xmlinfo = '<?xml version="1.0" encoding="utf-8"?> <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"> <channel xmlns:content="http://purl.org/rss/1.0/modules/content/"><title>TradingView Ideas</title><link>https://www.tradingview.com</link> <description>Latest market outlook from popular traders on TradingView.</description> <atom:link rel="self" href="https://www.tradingview.com/feed/"></atom:link> <language>en</language> <lastBuildDate>Sun, 08 Aug 2021 08:50:18 -0500</lastBuildDate>'
        var end = '</channel></rss>'

        feed.items.forEach(item => {
            var feedItem = '<item><title>'+item.title+'</title><link>'+item.link+'</link> <description>'+item['content:encoded'].replace("<![CDATA[", "").replace("]]", "")+item.description+'</description> <pubDate>'+item.pubDate+'</pubDate> <guid>'+item.guid+'</guid> <content:encoded>'+item['content:encoded']+'</content:encoded> </item>'
            feedItems.push(feedItem);
        })

        var xml = xmlinfo
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

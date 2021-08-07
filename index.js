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
    
    (async () => {/*
        let feed = await parser.parseURL('https://www.tradingview.com/feed/?stream=crypto');
        let feedItems = []

        var xmlinfo = '<?xml version="1.0" encoding="UTF-8"?>'
        var rssinfo = '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><title>TradingView Ideas</title><link>https://www.tradingview.com</link><description>Latest market outlook from popular traders on TradingView.</description><atom:link rel="self" href="https://www.tradingview.com/feed/"></atom:link><language>en</language><lastBuildDate>Sat, 07 Aug 2021 04:32:58 -0500</lastBuildDate>'
        var channel = '<channel>'
        var end = '</channel></rss>'

        feed.items.forEach(item => {
            var feedItem = '<item><title>'+item.title+'</title> <description>'+item['content:encoded'].replace("<![CDATA[", "").replace("]]", "")+'</description><link>'+item.link+'</link> <guid isPermaLink="false">'+item.guid+'</guid><pubDate>'+item.pubDate+'</pubDate></item>'
            feedItems.push(feedItem);
        })

        var xml = xmlinfo + rssinfo + channel
        for (var item in feedItems) {
            xml += feedItems[item];
        }
        xml += end*/
        res.set('Content-Type', 'application/rss+xml');
        res.send('<?xml version="1.0" encoding="utf-8"?> <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel xmlns:content="http://purl.org/rss/1.0/modules/content/"><title>TradingView Ideas</title><link>https://www.tradingview.com</link><description>Latest market outlook from popular traders on TradingView.</description><atom:link rel="self" href="https://www.tradingview.com/feed/"></atom:link><language>en</language><lastBuildDate>Sat, 07 Aug 2021 04:55:47 -0500</lastBuildDate><item><title>Not an easy path for a good project</title><link>https://www.tradingview.com/chart/ALGOUSDT/LnewQYZT-Not-an-easy-path-for-a-good-project/</link><description><div class="avatar"> <a href="https://www.tradingview.com/u/V12bull/" title="User Profile"> <img src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220,0,20,20%22%20width=%2296%22%20height=%2296%22%3E%3Crect%20height=%2220%22%20width=%2220%22%20fill=%22hsl%28336,25%25,50%25%29%22/%3E%3Ctext%20fill=%22white%22%20x=%2210%22%20y=%2214.8%22%20font-size=%2214%22%20font-family=%22Trebuchet%20MS,Arial,sans-serif%22%20text-anchor=%22middle%22%3EV%3C/text%3E%3C/svg%3E" width="32" height="32"/> </a></div><div class="chart-name"><h1>Not an easy path for a good project</h1></div><div class="chart-symbol"> <a href="https://www.tradingview.com/symbols/ALGOUSDT/">Algorand / TetherUS</a>	<span class="symbol-descr">BINANCE:ALGOUSDT</span></div><div class="chart-author"> <a href="https://www.tradingview.com/u/V12bull/" title="User Profile">V12bull</a></div><a href="https://www.tradingview.com/chart/ALGOUSDT/LnewQYZT-Not-an-easy-path-for-a-good-project/"> <img src="https://s3.tradingview.com/l/LnewQYZT_mid.png"/> </a><p>Algorand is another favourite project of mine which has gone through ups and downs since the bull run started. A local resistance around 90c, which could be overcome if the whole market remains <a href="https://www.tradingview.com/ideas/bullish/"><span class="tv-chart-view__tag-page-link">bullish</span></a> . <a href="https://www.tradingview.com/ideas/bullishdivergence/"><span class="tv-chart-view__tag-page-link">bullish divergence</span></a> shown in the <a href="https://www.tradingview.com/ideas/macd/"><span class="tv-chart-view__tag-page-link">MACD</span></a> and <a href="https://www.tradingview.com/ideas/relativestrengthindex/"><span class="tv-chart-view__tag-page-link">RSI</span></a> improving. The 1 dollar area is where the supply area is. Aim for 1 dollar for now, even though secretly I wish it will reach 10 dollars (not this time)</p>Algorand is another favourite project of mine which has gone through ups and downs since the bull run started. A local resistance around 90c, which could be overcome if the whole market remains bullish. bullish divergence shown in the MACD and RSI improving. The 1 dollar area is where the supply area is. Aim for 1 dollar for now, even though secretly I wish it will reach 10 dollars (not this time)</description><pubDate>Sat, 07 Aug 2021 04:55:47 -0500</pubDate><guid>https://www.tradingview.com/chart/ALGOUSDT/LnewQYZT-Not-an-easy-path-for-a-good-project/</guid><content:encoded><div class="avatar"> <a href="https://www.tradingview.com/u/V12bull/" title="User Profile"> <img src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220,0,20,20%22%20width=%2296%22%20height=%2296%22%3E%3Crect%20height=%2220%22%20width=%2220%22%20fill=%22hsl%28336,25%25,50%25%29%22/%3E%3Ctext%20fill=%22white%22%20x=%2210%22%20y=%2214.8%22%20font-size=%2214%22%20font-family=%22Trebuchet%20MS,Arial,sans-serif%22%20text-anchor=%22middle%22%3EV%3C/text%3E%3C/svg%3E" width="32" height="32"/> </a></div><div class="chart-name"><h1>Not an easy path for a good project</h1></div><div class="chart-symbol"> <a href="https://www.tradingview.com/symbols/ALGOUSDT/">Algorand / TetherUS</a>	<span class="symbol-descr">BINANCE:ALGOUSDT</span></div><div class="chart-author"> <a href="https://www.tradingview.com/u/V12bull/" title="User Profile">V12bull</a></div><a href="https://www.tradingview.com/chart/ALGOUSDT/LnewQYZT-Not-an-easy-path-for-a-good-project/"> <img src="https://s3.tradingview.com/l/LnewQYZT_mid.png"/> </a><p>Algorand is another favourite project of mine which has gone through ups and downs since the bull run started. A local resistance around 90c, which could be overcome if the whole market remains <a href="https://www.tradingview.com/ideas/bullish/"><span class="tv-chart-view__tag-page-link">bullish</span></a> . <a href="https://www.tradingview.com/ideas/bullishdivergence/"><span class="tv-chart-view__tag-page-link">bullish divergence</span></a> shown in the <a href="https://www.tradingview.com/ideas/macd/"><span class="tv-chart-view__tag-page-link">MACD</span></a> and <a href="https://www.tradingview.com/ideas/relativestrengthindex/"><span class="tv-chart-view__tag-page-link">RSI</span></a> improving. The 1 dollar area is where the supply area is. Aim for 1 dollar for now, even though secretly I wish it will reach 10 dollars (not this time)</p></content:encoded></item></channel></rss>');
    })();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Started at :' + PORT)
})

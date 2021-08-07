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
        var rssinfo = '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">'
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
        xml += end
        res.set('Content-Type', 'application/rss+xml');
        res.send(xml);

        /*
        feed.items.forEach(item => {
            //console.log(item['content:encoded']);//.replace("<![CDATA[", "").replace("]]", ""));
            var item = '<item><title>'+item.title+'</title> <description>'+item['content:encoded'].replace("<![CDATA[", "").replace("]]", "")+'</description><link>'+item.link+'</link> <guid isPermaLink="false">'+item.guid+'</guid><pubDate>'+item.pubDate+'</pubDate></item>'
            feedItem = {
                title:  item.title,
                description: item['content:encoded'].replace("<![CDATA[", "").replace("]]", ""),
                url: item.link, // link to the item
                guid: item.guid, // optional - defaults to url
                date: item.pubDate, // any format that js Date can parse.
            };
            
            feedItems.push(feedItem);
        }); */
              
        /*
        // Sort items by date
        feedItems = feedItems.sort((a,b) => {
            return b.date - a.date
        })*/
        /*
        // Add to feed
        const ourFeed = new RSS({
            title: 'TradingView Ideas',
            feed_url: fullUrl,
            site_url: fullUrl
        });
        feedItems.forEach(item => ourFeed.item(item))

        // Output
        console.log('Done');
        res.set('Content-Type', 'application/rss+xml');
        var xml = ourFeed.xml({indent: true});
        console.log(xml.replace("/<!\[CDATA\[(.*?)\]\]>/g", " "));
        res.send(xml.replace("/<!\[CDATA\[(.*?)\]\]>/g", " "));*/
    })();

    /*
    request('https://www.tradingview.com/feed/?stream=crypto', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $('.js-feed-item .js-widget-idea').each(function(i, element) {
                const title = $(this).find('.tv-widget-idea__title-name').text().trim()
                const url = resolveRelative($(this).find('.tv-widget-idea__title').attr('href'), response.request.uri.href)
                const author = $(this).find('.tv-user-link__name').text().trim()
                const date = parseInt($(this).find('.tv-widget-idea__time').attr('data-timestamp'), 10) * 1000
                const image = $(this).find('.tv-widget-idea__cover-link img').attr('src')
                const description = $(this).find('.tv-widget-idea__description-text').text().trim()
                        + '<br /><img src="' + image + '" />'

                const feedItem = {
                    title: title,
                    description: description,
                    url: url,
                    author: author,
                    date: date
                }

                feedItems.push(feedItem)
            })
        }

        // Sort items by date
        feedItems = feedItems.sort((a,b) => {
            return b.date - a.date
        })

        // Add to feed
        const feed = new RSS({
            title: 'TradingView Ideas',
            feed_url: fullUrl,
            site_url: fullUrl
        });
        feedItems.forEach(item => feed.item(item))

        // Output
        console.log('Done')
        res.set('Content-Type', 'application/rss+xml');
        res.send(feed.xml({indent: true}))
    });
    */
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Started at :' + PORT)
})

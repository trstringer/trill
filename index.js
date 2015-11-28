var Twitter = require('twitter');
var tweetify = require('tweetify');

function sendTweets(client, tweets, callback, index) {
    if (index === undefined) {
        index = 0;
    }
    
    if (tweets[index] !== undefined) {
        client.post('statuses/update', {status: tweets[index]}, function (err, tweet, res) {
            if (err) {
                callback(err);
            }
            else {
                index++;
                sendTweets(client, tweets, callback, index);
            }
        });
    }
    else {
        callback();
    }
}

function tweetTweet(auth, tweet, callback) {
    if (!auth.consumer_key || !auth.consumer_secret || !auth.access_token_key || !auth.access_token_secret) {
        callback({ name: 'TweetAuthError', message: 'Incomplete auth information supplied' });
    }
    
    var brokenTweetMessages = tweetify(tweet);
    
    var client = new Twitter(auth);
    
    sendTweets(client, brokenTweetMessages, callback);
}

module.exports = tweetTweet;
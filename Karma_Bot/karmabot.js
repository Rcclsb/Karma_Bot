var positiveKey = encodeURIComponent("++");
var negativeKey = encodeURIComponent("--");
var karmaGetKey = encodeURIComponent("karma value ");
var slackBotCall = "Karmabot ";
var redis = require("redis");
var client = redis.createClient(6379, '52.25.18.14', {parser: "javascript", max_attempts: 5});
var currentKarmaValue = "null0";
var messageText;
var returnText = "defaultReturnText";
var botPrePayload = {};
var botPayload;
var moduleExportsRes;
client.on("error", function (err) {console.log("REDIS CLIENT ERROR--> " + err);});


module.exports = function (req, res, next) {
    messageText = req.body.text.replace("  ", "++");
    username = "<@" + req.body.user_id + ">";
    console.log(username);
    messageText = messageText.substring(slackBotCall.length, messageText.length);
    username = encodeURIComponent(username);
    returnText = "defaultReturnText";
    botPrePayload = {};
    moduleExportsRes = res;
    if (processKarmaMessage(messageText) !== "null") {
        processKarmaMessage(messageText);
        console.log("In Karma Message...");
        setTimeout(function () {
            console.log("Past Karma Message Path...");
            deliverPayload();
        }, 300);
    } else if (processIsVoteMessage(messageText) !== "null") {
        processVoteMessage(messageText);
        console.log("In Vote Message...");
        setTimeout(function () {
            karmaVote(messageText.substring(0, messageText.length - 2));
            console.log("Past Vote Message Path One...");
            setTimeout(function () {
                console.log("Past Vote Message Path Two...");
                deliverPayload();
            }, 300);
        }, 250);
    } else {
        returnText = "\"" + messageText + "\" is not a valid command.";
        botPrePayload = {text: returnText};
        deliverPayload();
    }
};

function deliverPayload() {
    botPayload = botPrePayload;
    console.log("Sending Payload... ");
    console.log("Payload Check (returnText): " + returnText);
    // avoid infinite loop
    if (messageText !== returnText) {
        console.log("Payload Out.");
        console.log("");
        return moduleExportsRes.status(200).json(botPayload);
    } else {
        console.log("Payload Denied.");
        console.log("");
        return moduleExportsRes.status(200).end();
    }
}
function karma(item) {
    currentKarmaValue = "null0";
    var value = "nullv";
    client.EXISTS(item, function (err, res) {
        console.log("Main>Karma>client.EXISTS>res = " + res);
        if (parseInt(res) === 1 && item !== username) {
            client.GET(item, function (err, res) {
                value = String.toString(res);
                currentKarmaValue = res;
                console.log("client.GET-res of " + item + ": " + res);
                console.log("Preparing Payload...");
                returnText = decodeURIComponent(item) + "'s karma is " + currentKarmaValue;
                botPrePayload = {text: returnText};
            });
            console.log("cKV: " + value);
        } else {
            console.log("Preparing Payload...");
            returnText = "Sorry! " + decodeURIComponent(item) + " could not be found." ;
            botPrePayload = {text: returnText};
        }
    });
}

function karmaVote(item) {
    currentKarmaValue = "null0";
    var value = "nullv";
    client.EXISTS(item, function (err, res) {
        console.log("Main>Karma>client.EXISTS>res = " + res);
        if (parseInt(res) === 1 && item !== username) {
            client.GET(item, function (err, res) {
                value = String.toString(res);
                currentKarmaValue = res;
                console.log("client.GET-res of " + item + ": " + res);
                console.log("Preparing Payload...");
                returnText = "Thanks! " + decodeURIComponent(item) + "'s karma is now " + currentKarmaValue;
                botPrePayload = {text: returnText};
            });
            console.log("cKV: " + value);
        } else if (parseInt(res) === 1) {
            console.log("Preparing Payload...");
            returnText = "Sorry! You cannot vote for yourself." ;
            botPrePayload = {text: returnText};
        } else {
            console.log("Preparing Payload...");
            returnText = "Sorry! " + decodeURIComponent(item) + " could not be found." ;
            botPrePayload = {text: returnText};
        }
    });
}

function processVoteMessage(msg) {
    var message = encodeURIComponent(msg);
    console.log("Item to vote: " + message.substring(0, message.search(positiveKey)));
    console.log("Current User ID: " + username);
    if (message.search(positiveKey) > -1 && message.substring(0, message.search(positiveKey)).search("%20") === -1 && message.substring(0, message.search(positiveKey)) !== username) {
        vote(message.substring(0, message.search(positiveKey)), 1);
    } else if (message.search(negativeKey) > -1 && message.substring(0, message.search(negativeKey)).search("%20") === -1 && message.substring(0, message.search(negativeKey)) !== username) {
        vote(message.substring(0, message.search(negativeKey)), -1);
    }
}

function processIsVoteMessage(msg) {
    var message = encodeURIComponent(msg);
    if (message.search(positiveKey) > -1 && message.substring(0, message.search(positiveKey)).search("%20") === -1) {
        return "++";
    } else if (message.search(negativeKey) > -1 && message.substring(0, message.search(negativeKey)).search("%20") === -1) {
        return "--";
    } else {
        return "null";
    }
}

function processKarmaMessage(msg) {
    var message = encodeURIComponent(msg);
    if (message.search(karmaGetKey) > -1) {
        return karma(message.substring(message.search(karmaGetKey) + karmaGetKey.length, message.length));
    } else {
        return "null";
    }
}

function vote(item, ballot) {
    addValue(item, ballot);
}

function addValue(item, value) {
    client.EXISTS(item, function (err, res) {
        if (res === 1) {
            console.log("Adding Path");
            client.GET(item, function (err, res) {
                client.SET(item, parseInt(res) + value);
            });
        } else {
            console.log("Initiating Path");
            console.log("Creating: " + item + "...");
            //client.SET(item, value, redis.print);
            client.SET(item, "0", redis.print);
        }
    });
}

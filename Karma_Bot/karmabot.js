var positiveKey = encodeURIComponent("++");
var negativeKey = encodeURIComponent("--");
var karmaGetKey = encodeURIComponent("karma value ");
var slackBotCall = "Karmabot%20";
var redis = require("redis");
var client = redis.createClient(6379, '52.25.18.14',{parser: "javascript", max_attempts:5, auth_pass:"-+25y.MV"});
var currentKarmaValue = "null0";
var messageText;
var returnText = "defaultReturnText";
var botPrePayload = {};
var botPayload;
var moduleExportsRes;
client.on("error", function (err) {console.log("REDIS CLIENT ERROR--> " + err);});


module.exports = function (req, res, next) {
	messageText = req.body.text.replace("  ", "++").substr(0, slackBotCall.length);
	returnText = "defaultReturnText";
	botPrePayload = {};
	moduleExportsRes=res;
	if(processKarmaMessage(messageText)!="null"){
		processKarmaMessage(messageText);
		setTimeout(function(){ deliverPayload();}, 250);
	} else if (processIsVoteMessage(messageText)!="null"){
		returnText = "Thanks for your vote!";
		botPrePayload = {text : returnText};
		processVoteMessage(messageText);
		deliverPayload();
		//setTimeout(function(){ deliverPayload();}, 250);
	} else {
		botPrePayload = {};
		deliverPayload();
		//setTimeout(function(){ deliverPayload();}, 250);
	}
	

	// Curl Tester: curl -X POST --data "text=@xephos!up" http://localhost:3000/karma
}

function deliverPayload(){
	botPayload = botPrePayload;
	// avoid infinite loop
	if (messageText !== returnText) {
	  return moduleExportsRes.status(200).json(botPayload);
	} else {
	  return moduleExportsRes.status(200).end();
	}	
}
function karma(item){
	currentKarmaValue = "null0";
	var value = "nullv"
	if(client.EXISTS(item)==1){
		client.GET(item, function(err,res){
			value=String.toString(res); 
			currentKarmaValue = res; 
			console.log("client.GET-res of " + item + ": "+ res);
			console.log("Delivering Payload...");
			returnText = "karma: " + currentKarmaValue; 
			botPrePayload = {text : returnText};
		});
		console.log("cKV: "+ value);
		if(value!="nullv"){
			return value;
		}
	} else {
		return "Item not found!";
	}
}


function processVoteMessage(msg){
	var message = encodeURIComponent(msg);
	if(message.search(positiveKey)>-1 && message.substring(0,message.search(positiveKey)).search(" ") == -1){
		vote(message.substring(0,message.search(positiveKey)), 1);
	} else if(message.search(negativeKey)>-1 && message.substring(0,message.search(negativeKey)).search(" ") == -1){
		vote(message.substring(0,message.search(negativeKey)), -1);
	} 
}

function processIsVoteMessage(msg){
	var message = encodeURIComponent(msg);
	if(message.search(positiveKey)>-1 && message.substring(0,message.search(positiveKey)).search("%20") == -1){
		return "++";
	} else if(message.search(negativeKey)>-1 && message.substring(0,message.search(negativeKey)).search("%20") == -1){
		return "--";
	} else {
		return "null";
	}
}

 
function processKarmaMessage(msg){
	var message = encodeURIComponent(msg);
	if(message.search(karmaGetKey)>-1){
		return karma(message.substring(message.search(karmaGetKey)+karmaGetKey.length,message.length));
	} else {
		return "null";
	}
}

function vote(item, ballot){
	addValue(item, ballot);
}

function addValue(item, value){
	client.EXISTS(item, function(err, res){
		if(res == 1){
			console.log("Adding Path");
			client.GET(item, function(err, res){	
				client.SET(item, parseInt(res)+value);
			});
		} else {
			console.log("Initiating Path");
			console.log("Creating: " + item + "...");
			//client.SET(item, value, redis.print);
			client.SET(item, "0", redis.print);
		}
	});	
}

module.exports = function (req, res, next) {
	var messageText = req.body.text;
	var returnText = "null";
	if(processKarmaMessage(messageText)!="null"){
		returnText = "karma: " + processKarmaMessage(messageText);
	} else {
		returnText = "Thanks for your vote!";
	}	
	var botPayload = {
	  text : returnText
	};
	processVoteMessage(messageText);
	// avoid infinite loop
	if (messageText !== returnText) {
	  return res.status(200).json(botPayload);
	} else {
	  return res.status(200).end();
	}
	// Curl Tester: curl -X POST --data "text=@xephos++" http://localhost:3000/karma
}
//These variables will eventually be removed]
var items = ["%40xephos"]; // Strings
var values = [0]; //Numbers
var positiveKey = encodeURIComponent("++");
var negativeKey = encodeURIComponent("--");
var karmaGetKey = "karma";
var karmaStartKey = encodeURIComponent("_");

function karma(item){
	if(items.indexOf(item)>-1){
		return values[items.indexOf(item)];
	} else {
		return "Item not found!";
	}
}

function processVoteMessage(msg){
	var msg = encodeURIComponent(msg);
	if(msg.search(positiveKey)>-1 && msg.substring(0,msg.search(positiveKey)).search(" ") == -1){
		vote(msg.substring(0,msg.search(positiveKey)), 1);
	} else if(msg.search(negativeKey)>-1 && msg.substring(0,msg.search(negativeKey)).search(" ") == -1){
		vote(msg.substring(0,msg.search(negativeKey)), -1);
	} 
}

function processKarmaMessage(msg){
	var msg = encodeURIComponent(msg);
	if(msg.search(karmaGetKey)>-1){
		return karma(msg.substring(msg.search(karmaStartKey)+1,msg.length));
	} else {
		return "null";
	}
}

function vote(item, ballot){
	addValue(item, ballot);
}

function addValue(item, value){
	//This is will be replaced by the code for the database.
	if(items.indexOf(item)>-1){
		values[items.indexOf(item)]+=value;
	} else {
		items.push(item);
		values.push(values);
	}
}
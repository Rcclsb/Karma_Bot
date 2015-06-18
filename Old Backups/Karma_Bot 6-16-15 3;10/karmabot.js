module.exports = function (req, res, next) {
	var userName = req.body.user_name;
	var botPayload = {
	  text : 'Hello, ' + userName + '!'
	};
	 
	// avoid infinite loop
	if (userName !== 'slackbot') {
	  return res.status(200).json(botPayload);
	} else {
	  return res.status(200).end();
	}
}
//These variables will eventually be removed]
var items = []; // Strings
var values = []; //Numbers

function karma(item){
	return values[items.indexOf(item)}];
}

function vote(item, ballot){
	addValue(item, ballot);
}

function addValue(item, value){
	//This is will be replaced by the code for the database.
	if(items.indexOf(item)>-1){
		values[items.indexOf(item)]+=1;
	} else {
		items.push(item);
		values.push(values);
	}
}
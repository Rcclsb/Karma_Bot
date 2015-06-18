module.exports = function (req, res, next) {
	var redis = require("redis");
	var client = redis.createClient(6379, '52.25.18.14',{parser: "javascript", max_attempts:5, auth_pass:"-+25y.MV"});
	client.on("error", function (err) {console.log("PROBLEMS --> " + err);});
	client.set("Roberto-key", "Roberto-val", redis.print);
	client.quit();
}
function testServer(){
	client.set("Roberto-key", "Roberto-val", redis.print);
}
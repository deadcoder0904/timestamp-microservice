var express = require("express");
var open = require("open");
var app = express();
var port = process.env.PORT || 3000;

app.get('/',function(req,res) {
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + "/public"));

app.get('/timestamp/:param',function(req,res) {
	var param = req.params.param;
	var formattedDate;
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	if(+param && typeof (+param) == 'number')
		{
			var date = new Date(param * 1000);
			var unformattedDate = ('0' + date.getDate()).slice(-2) + '/' 
						+ ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
			var arr = unformattedDate.split('/');
			formattedDate = months[(+arr[1]) - 1] + ' ' + arr[0] + ', ' + arr[2];
			res.json({
				"unix": param, 
				"natural": formattedDate
			});
		}
	else{
		formattedDate = (new Date(param)).getTime() / 1000;
		res.json({
				"unix": formattedDate, 
				"natural": param
			});
	}	

});

app.listen(port,function() {
	var url = "http://localhost:"+port;
	console.log("MAGIC HAPPENING @ " + url);
	open(url);
});

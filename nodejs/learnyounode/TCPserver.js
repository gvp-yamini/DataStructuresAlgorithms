//YYYY-MM-DD hh:mm
var net = require('net');
var server = net.createServer(function (socket){
	var data="";
	var date = new Date();
	console.log(date);
	var month = date.getMonth();
	month = month + 1;
	if(checkforsingledigit(month))
	{
		month = '0'+month;
	}
	var day = date.getDate();
	if(checkforsingledigit(day))
	{
		day = '0'+day;
	}
	var hours = date.getHours();
	if(checkforsingledigit(hours))
	{
		hours = '0'+hours;
	}
	var minutes = date.getMinutes();
	if(checkforsingledigit(minutes))
	{
		minutes = '0'+minutes;
	}
	   data = date.getFullYear() + '-'+month+'-'+day+ ' '+hours+':'+minutes;
	socket.write(data);
	socket.end();
});

server.listen(process.argv[2]);
function checkforsingledigit(num)
{
	if(num<10)
		return 1;
	else
		return 0;
}
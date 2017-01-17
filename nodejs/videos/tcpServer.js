var net = require('net');

function callback(socket){
	console.log('server is listening..');
	socket.on('end',function(){
		console.log('server disconnected...');
	});
	
	socket.on('data',function(data){
		console.log("data successfully read from tcp client"+data);
		data.write("Server Reply: "+ data);
	});
}

var tcpServer = net.createServer(callback);

tcpServer.listen(8111,function(){console.log('server started listening...')});
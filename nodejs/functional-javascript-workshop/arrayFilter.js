function getShortMessages(messages) {
  // SOLUTION GOES HERE
  function callbackToFilter(obj){
	  if('message' in obj)
	  {
		  if(obj.message.length<50){
			  return true;
		  }else{
			  return false;
		  }
	  }else{
		  return false;
	  }		  
  }
  var filteredMessages = messages.filter(callbackToFilter);
  var len = filteredMessages.length;
  var buff=[];
  for(var i=0;i<len;i++){
	  buff.push(filteredMessages[i]["message"]);
  }
  return buff;
}

module.exports = getShortMessages

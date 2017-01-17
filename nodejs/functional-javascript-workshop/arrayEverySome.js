function checkUsersValid(goodUsers) {
  return function allUsersValid(submittedUsers) {
    return submittedUsers.every(function (value){
		return goodUsers.some(function (value1){
			return value.id == value1.id;
		})
			
		
	})
  };
}

module.exports = checkUsersValid
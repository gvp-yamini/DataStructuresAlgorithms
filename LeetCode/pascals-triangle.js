/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    var c=1;
    var result = [];
    if(numRows==0){
        return result;
    }
    for(var i=1;i<=numRows;i++){
        c=1;
        var subresult=[];
        for(var j=1;j<=i;j++){
          subresult.push(c);
          c = c*(i-j)/j;
        }
        result.push(subresult);
    }
    return result
};
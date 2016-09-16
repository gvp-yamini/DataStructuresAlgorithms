/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
        var hastArr1=[];
        var hastArr2=[];
        var bulls=0,cows=0;
     if(secret.length<1 || guess.length<1 || secret===null || guess===null){
            return "";
        }
        for(var i=0;i<10;i++){
           hastArr1.push(0);
           hastArr2.push(0);
        }
        var result = "";
        for(var i=0;i<secret.length;i++){
            if(secret[i]==guess[i]){
                bulls++;
            }else{
             hastArr1[secret[i]]++;
             hastArr2[guess[i]]++;
            }
        }
      for(var i=0;i<10;i++){
          if(hastArr1[i]!=0 && hastArr2[i]!=0){
              if(hastArr2[i]<=hastArr1[i]){
               cows = cows + hastArr2[i];   
              }else{
               cows = cows + hastArr1[i];
              }
          }
              
      }
      result = bulls + "A" + cows + "B";
      return result;
};
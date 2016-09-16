var intToRoman = function(num) {
        var roman = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    var Ints = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    var stringroman = "",times;
    for(var i=0;i<roman.length;i++){
            while(num>=Ints[i]){
            num = num - Ints[i];
            stringroman = stringroman + roman[i];
            }
        }
return stringroman;
};
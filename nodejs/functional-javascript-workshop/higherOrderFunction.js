 function repeat(operation, num) {
   if(num)
   {
	   repeat(operation,--num);
   }
   else
   {
	   return;
   }
 }

 // Do not remove the line below
 module.exports = repeat
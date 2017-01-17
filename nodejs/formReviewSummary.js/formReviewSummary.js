#!/usr/bin/env node
var t1 = require('fs');
var fname = process.argv[2];

/***
 * Usage From your forms/mobile direcotry :"~/bin/formReviewSummary.js frmContactList"
 * l:0dp r:0dp w:100% t:0dp b:0dp h:100% -- Means left, right, width, top, bottom height
 * fn:ClanPro-Book fs:110 fc:424242ff - Means font Name, font size, font color
 ***/

/*  !!!PLEASE CHANGE ROOT DIRECTORY BELOW!!! */

var rootDir = "/Users/d_drive/work/code/KonyCRMCooper/";
var skinDir = rootDir + "themes/defaultTheme/";
var formRootDir = rootDir + "forms/mobile/";
var segDir = rootDir + "templates/mobile/segments/";

/******* Not used but can come useful in future *****
function dumpObj4( obj, prefix, match)
{
   for (property in obj) {
      if (property == match) {
         console.log(prefix + ":" + property + ":" + obj[match]);
      }
      var temp = obj[property]; 
      if (typeof(temp) == "object")
      {
          dumpObj4(temp, prefix + ":" + property, match);
      }
   }

}
*****************************************************/

function getFrameDimension(dimensionObj)
{
   var lstr=rstr=wstr=tstr=bstr=hstr=str = "";
   // get left, right width
   for (property in dimensionObj) {
      if (property == "left")
      {
         lstr = "l:" + dimensionObj[property] + " ";
      }
      else if (property == "right")
      {
         rstr = "r:" + dimensionObj[property] + " ";
      }
      else if (property == "width")
      {
         wstr = "w:" + dimensionObj[property] + " ";
      }
      else if (property == "top")
      {
         tstr = "t:" + dimensionObj[property] + " ";
      }
      else if (property == "bottom")
      {
         bstr = "b:" + dimensionObj[property] + " ";
      }
      else if (property == "height")
      {
         hstr = "h:" + dimensionObj[property] + " ";
      }

   }
   str = lstr + rstr + wstr + tstr + bstr + hstr;
   return str;
}

function getSkinInfo(skinObj)
{
   var fontName = "UNK"; // Unknown 

   if (skinObj.font_name == "") {
      if (skinObj["iphone"] != undefined) {
         fontName = skinObj["iphone"].font_name;
      }
   }

   if (fontName == "UNK") {
      return "";
   }

   var str = "fn:" + fontName + " fs:" + skinObj.font_size + " fc:" + skinObj.font_color; 
   return str;
}

function getFrameAndSkin(obj)
{
   var frameDimension = obj.frame;
   var str = "";

   //console.log(frameDimension);
   str = getFrameDimension(frameDimension);

   var skinName = "";
   skinName = obj["skin"];

   if (skinName == undefined) {
    return str;
   }

   var skinFileName = skinDir + skinName + ".json";

   //console.log(skinFileName);
   var skinStr = t1.readFileSync(skinFileName, "utf8");

   var skinObj = JSON.parse(skinStr);
   
   var skinInfo = getSkinInfo(skinObj);

   if (skinInfo != "") {
      str = str + " " + skinName + ": "+ getSkinInfo(skinObj);
   }
   
   return str;
}


function prefixStrFunc(str)
{
   var len = str.length;
   var charToUse = len/2;

   if (charToUse == 0) {
     return "";
   }

   if (charToUse > 9) {
      charToUse = 9;
   }

   var prefix = "";

   for (i = 0; i < len; i++) {
      prefix = prefix + charToUse;
   }

   return prefix;

}

function printAllFrameAndSkin(prefixStr, theDir, fname)
{
   fileName = theDir + fname + ".json";
   //console.log(fileName);
   var str = t1.readFileSync(fileName, "utf8");
   var obj = JSON.parse(str);
   var info = getFrameAndSkin(obj);
   console.log(prefixStrFunc(prefixStr) + fname +": "+ info);

   if (obj["sectionHeaderTemplateId"] != undefined) {
      var secName = obj["sectionHeaderTemplateId"];
      console.log("**sectionHeader Begin **");
      printAllFrameAndSkin(prefixStr + "##", segDir + secName + ".sm/", secName);
      console.log("**sectionHeader End **");
   }

   if (obj["rowTemplateId"] != undefined) {
      var secName = obj["rowTemplateId"];
      console.log("**RowTemplate Begin **");
      printAllFrameAndSkin(prefixStr + "##", segDir + secName + ".sm/", secName);
      console.log("**RowTemplate End **");
   }

   var childs = obj["children"];
   for (var i in childs) {
      //console.log (childs[i]);
      printAllFrameAndSkin(prefixStr + "##", theDir, childs[i]);
   }

}

formDir = formRootDir + fname + ".sm/";
console.log(fname);
printAllFrameAndSkin("", formDir, fname);





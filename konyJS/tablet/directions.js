//Type your code here
var directionCodes = "roundabout:directions_roundabout_right.png,takeExit:directions_take_exit.png,mergeOnto:directions_merge.png,uTurn:directions_uturn.png,slightRight:directions_stay_right.png,slightLeft:directions_stay_left.png,left:directions_turn_left.png,right:directions_turn_right.png,head:directions_straight.png~|~roundabout:directions_roundabout_right.png,takeExit:directions_take_exit.png,mergeOnto:directions_merge.png,uTurn:directions_uturn.png,slightRight:directions_stay_right.png,slightLeft:directions_stay_left.png,left:directions_turn_left.png,right:directions_turn_right.png,head:directions_straight.png~|~roundabout:directions_roundabout_right.png,takeExit:directions_take_exit.png,mergeOnto:directions_merge.png,uTurn:directions_uturn.png,slightRight:directions_stay_right.png,slightLeft:directions_stay_left.png,left:directions_turn_left.png,right:directions_turn_right.png,head:directions_straight.png~|~roundabout:directions_roundabout_right.png,takeExit:directions_take_exit.png,mergeOnto:directions_merge.png,uTurn:directions_uturn.png,slightRight:directions_stay_right.png,slightLeft:directions_stay_left.png,left:directions_turn_left.png,right:directions_turn_right.png,head:directions_straight.png~|~roundabout:directions_roundabout_right.png,takeExit:directions_take_exit.png,mergeOnto:directions_merge.png,uTurn:directions_uturn.png,slightRight:directions_stay_right.png,slightLeft:directions_stay_left.png,left:directions_turn_left.png,right:directions_turn_right.png,head:directions_straight.png~|~roundabout:directions_roundabout_right.png,takeExit:directions_take_exit.png,mergeOnto:directions_merge.png,uTurn:directions_uturn.png,slightRight:directions_stay_right.png,slightLeft:directions_stay_left.png,left:directions_turn_left.png,right:directions_turn_right.png,head:directions_straight.png";
function displaySearchRoutes(routes){
 // setDirectionStepsData(Searchroutes);
  var routeColors = ["0000FFFF","FF00FFFF","FF0000FF","FFFF00FF","0x000000FF"];

        for(var i=0;i<routes.length;i++)
        {
            drawRoute("route"+i, routes[i].polylinePoints, routeColors[i]);
        }
        
}

function drawRoute(routeid,polyPoints,color)
{
    var steps = polyPoints;
    kony.print("################The polyline points");
    kony.print("drawRoute"+ steps);
     kony.print("drawRoute"+ steps.length);
    ei = steps.length-1;
    kony.print("ei"+ ei);
  // include id:1,id:2

    var startLoc = {
        lat:steps[0].lat,
        lon:steps[0].lon,
        image:{source:"current_location.png",anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };

    var endLoc = {
        
        lat:steps[ei].lat,
        lon:steps[ei].lon,
        image:{source:getLocationImage(gblDirectionsData.type),anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };

    polylineData = {
        id : routeid,
        locations : steps,
        startLocation : startLoc,
        endLocation : endLoc,
        polylineConfig : {lineWidth : 5, lineColor: color}
    };
       locationinDir= startLoc;
    
    frmLocatorKA.locatorMap.addPolyline(polylineData);   
    frmLocatorKA.locatorMap.locationData=[];
    kony.application.dismissLoadingScreen();
}
function setDirectionStepsData(resultTable){
  kony.print("resultTable"+ " "+ JSON.stringify(resultTable));
  if(resultTable && resultTable[0]){
	    		var stepsTable = resultTable[0]["legs"][0]["steps"]; //main
                kony.print("stepsTable"+ " "+ JSON.stringify(stepsTable));
	    		var newDirectionsList = [];
			    var distanceValue = "";
			    var durationValue = "";
			    var longInstructionVA = "";
			  
				var totalDuration = resultTable[0]["legs"][0]["duration"];//main
                kony.print("duration"+ " "+ JSON.stringify(duration));
				var totalDistance = 0;
				var eachStep;
		
		
                var defaultRoutes =kony.i18n.getLocalizedString("i18n.common.Map.defaultDirectionListVA.ValueVA");
                  var defaultRoutesArray = defaultRoutes.split(",");
					var defaultTable = [];
					var len = 0;
					for(var j=0;j<defaultRoutesArray.length;j++){ // gets the respective maneuver image
                       kony.print("defaultRoutesArray"+ defaultRoutesArray[j]);
							var entry = defaultRoutesArray[j];
							defaultTable.push({"key" :entry.split(":")[0],value : entry.split(":")[1]});
							len=defaultTable.length;
									
					}
                   kony.print("len"+ len);
				for (var i=0; ((stepsTable) != null) && i< stepsTable.length; i++ ){
					 eachStep = stepsTable[i];
					 var imgDirectionVA = "";
					longInstructionVA = eachStep["instruction"];	
						longInstructionVA = longInstructionVA ? longInstructionVA.replace(/(<([^>]+)>)/ig, ""): "";		
						longInstructionVA = longInstructionVA ? longInstructionVA.replace(/&nbsp;/gi,' '): "";
							var lowerLongInstructionVA = longInstructionVA ? longInstructionVA.toLowerCase() : "" ;
							var value;
							
							var directionImage = "";
							var record;
							for(var k=0; k<len; k++){
								record = defaultTable[k];
                              kony.print("record"+ JSON.stringify(record));
								value = getDirectionImage(record["key"],lowerLongInstructionVA);
                              kony.print("getDirectionImage"+ value);
								if(value != -1){
									directionImage = defaultTable[k]["value"];
									k = len +1;
								}
							}
							if(directionImage != ""){
								imgDirectionVA = directionImage;
							}else{
								imgDirectionVA = "";
							}
						 
						 var distanceValue = toConvertMiles(eachStep["distance"]);
						 totalDistance = totalDistance + eachStep["distance"];
                  
						 kony.table.insert(newDirectionsList, {
							lblMilesKA : distanceValue,
							lblAddress1KA : longInstructionVA,
							imgDirKA : imgDirectionVA
						 });
					}
					var totalDurationFinal = toConvertMins(totalDuration);
					var totalDistanceFinal = toConvertMiles(totalDistance);
    				frmLocatorKA.distance.text =totalDistanceFinal;
					frmLocatorKA.lbldistance.text = totalDistanceFinal +" / "+ totalDurationFinal;
                    frmLocatorKA.segdirectionView.setData(newDirectionsList);
    		}  
}

function getDirectionImage(key,value){
  var keyOccurredAt = -1;
			value = value ? value.replace(/(<([^>]+)>)/ig, "") : "";
			if(value != ""){
			
				var keyi18nValue = kony.i18n.getLocalizedString("i18n.common.Map."+key+".ValueVA");//see
				var splitFlag = false;
				if(keyi18nValue && keyi18nValue.indexOf(',') != -1){
					var keyArray = keyi18nValue.split(",");
					splitFlag = true;
				}
				if(splitFlag){
					for (var k=0; ((keyArray) != null) && k< keyArray.length; k++ ){
						var keyValue = keyArray[k];
						keyValue = keyValue.toLowerCase();
						if((value.indexOf(keyValue))!= -1){
							keyOccurredAt = value.indexOf(keyValue);
							return keyOccurredAt;
						}
					}
				}else{
					if(keyi18nValue && (value.indexOf(keyi18nValue))!= -1){
						keyi18nValue = keyi18nValue.toLowerCase();
						keyOccurredAt = value.indexOf(keyi18nValue);
					}
				}
			}
			return keyOccurredAt;
}
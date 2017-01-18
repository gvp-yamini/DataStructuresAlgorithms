rowreset = false;
coords = [];
swipedIndices = {};
currIndices = {};
var animationObj;
function initialise_segment_pan_defaultValues(seg1){
  	if (kony.os.deviceInfo().name.toLowerCase() == "android"){
  		setPanGestures(seg1);
    }else{
       if(seg1 == frmMessagesKA.segMessagesInboxKA){
      seg1.editStyle = constants.SEGUI_EDITING_STYLE_SWIPE;
      seg1.metaInfo =   {
 			editMode: constants.SEGUI_EDIT_MODE_DELETE,
 			editModeCustomConfig : [ {title:i18n_msgReply, backgroundColor:"3545a200", callback: reply_callback}, 
                                    {title:i18n_msgDelete, backgroundColor:"ff000000", callback: delete_callback}
                                   ] 
      };
     }
     else if(seg1 == frmMessagesKA.segMessagesDraftKA){
         seg1.editStyle = constants.SEGUI_EDITING_STYLE_SWIPE;
         seg1.metaInfo =   {
 			editMode: constants.SEGUI_EDIT_MODE_DELETE,
 			editModeCustomConfig : [  
                                    {title:i18n_msgDelete, backgroundColor:"ff000000", callback: delete_callback}
                                   ] 
      };
       }
     
    }
}
var i18n_msgReply;
var i18n_msgDelete;
function setPanGestures(segId) {
    segTemp = segId.rowTemplate;
    try {      
        segTemp.addGestureRecognizer(constants.GESTURE_TYPE_PAN, {
            fingers: 1,
            continuousEvents: true
        }, panGestureHandler); 
    } catch (err) {
        alert("error while regestering the gestures" + err);
    }
}
function delete_callback(seguiWidget, section, row)
{
  
  deleteMessageSwipe(row);
}
function send_callback(seguiWidget, section, row)
{
 getSentMessaageContainer();
}
function reply_callback(seguiWidget, section, row)
{
 
  navigateToMsgDetailKA("Inbox","segMessagesInboxKA",row,msgRecordSwipe);
  
}

function panGestureHandler(commonWidget, gestureInfo, context) {
       var secIndex = context["sectionIndex"];
       var rowIndex = context["rowIndex"];
       var panRowList = [{ sectionIndex: secIndex, rowIndex: rowIndex }];
       var segInfo = context["widgetInfo"];
       var segName = context["widgetInfo"]["id"];
       currIndices["secIndex"] = context["sectionIndex"];
       currIndices["rowIndex"] = context["rowIndex"];
       var diff = 0;
       var leftVal1 = 0;
       var diffConst,animConst;
       leftVal1 = (parseInt(gestureInfo.translationX));
        kony.print("leftVal1" + leftVal1);
        coords.push(leftVal1);
       
        if (gestureInfo.gestureState == 3) {
            kony.print("coords" + JSON.stringify(coords));
            diff = ((coords.length == 1) ? coords[0] : coords[coords.length - 1] - coords[0]);
            if(segName == "segMessagesInboxKA" || segName == "segMessagesDraftKA" ){
              diffConst = -260;
              animConst = "-26%";
            }
            else{
              diffConst = -150;
              animConst = "-13%";
            }
            if (diff > diffConst ) {
                animationObj = getTransAnimDefinition("0%");
                coords = [];
                segInfo.animateRows({
                    rows: [{
                        sectionIndex: context["sectionIndex"],
                        rowIndex: context["rowIndex"]
                    }],
                    widgets: ["flxSegMsgSwipeKA"],
                    animation: animationObj
                });
            } else {
				if( swipedIndices["rowIndex"] == context["rowIndex"]&& swipedIndices["secIndex"] == context["sectionIndex"]){
				 swipedIndices={};
				}
				else{
                swipedIndices["rowIndex"] = context["rowIndex"];
                swipedIndices["secIndex"] = context["sectionIndex"];
				}
                animationObj = getTransAnimDefinition(animConst);
                segInfo.animateRows({
                    rows: [{
                        sectionIndex: context["sectionIndex"],
                        rowIndex: context["rowIndex"]
                    }],
                    widgets: ["flxSegMsgSwipeKA"],
                    animation: animationObj
                });
				
            }

        } else if (gestureInfo.gestureState == 2) {

            animationObj = getTransAnimDefinition(leftVal1 + "px");
            segInfo.animateRows({
                rows: [{
                    sectionIndex: context["sectionIndex"],
                    rowIndex: context["rowIndex"]
                }],
                widgets: ["flxSegMsgSwipeKA"],
                animation: animationObj
            });

        }
    }

function getTransAnimDefinition(leftVal) {
    var transAnimDef1 = {
        "100": {
            "left": leftVal
        }
    };
    var transAnimDefObject = kony.ui.createAnimation(transAnimDef1);

    return {
        definition: transAnimDefObject,
        config: {
            "duration": 1,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        }
    };

}

function getEndStateTransAnimDefinition(step0left, step100left){
  var animConf1 = {
  	"0": {
           "left": step0left+"px",
           "stepConfig": {
               "timingFunction": kony.anim.LINEAR
           }
       },
       "100": {
           "left": step100left+"%",
           "stepConfig": {
               "timingFunction": kony.anim.LINEAR
           }
       }
    };
  	kony.print(" final ************************ [0, left]= " + animConf1["0"]["left"] + " -- [ 100, left]" + animConf1["100"]["left"]);
    var animObj1 = kony.ui.createAnimation(animConf1)
    return animObj1;
}

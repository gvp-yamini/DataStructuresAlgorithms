// show success form based on user's flow
function showSuccess(){
	var currentForm = kony.application.getCurrentForm().id;
	var previousForm = kony.application.getPreviousForm().id;

	if(currentForm == 'frmAddNewPayeeKA'){
		if (previousForm == 'frmManagePayeeKA'){
			frmAddPayeeSuccessKA.show();
		} else if(previousForm == 'frmNewBillKA'){
			frmAddPayeeSuccessBillPayKA.show();
		}   
	} else if(currentForm == 'frmEditPayeeKA'){
		if (previousForm == 'frmPayeeDetailsKA'){
			frmEditPayeeSuccessKA.show();
		} else if(previousForm == 'frmNewBillKA'){
			frmEditPayeeSuccessBillPayKA.show();
		}
	}
}

function goBackFromPayBill(){
	var currentForm = kony.application.getCurrentForm().id;
	var previousForm = kony.application.getPreviousForm().id;

	if(currentForm == 'frmNewBillKA'){
		if (previousForm == 'frmPayeeTransactionsKA'){
			frmPayeeTransactionsKA.show();
		} else if(previousForm == 'frmBillDetailsKA'){
			frmBillDetailsKA.show();
		} else {
			frmTransferPayLandingKA.show(); // for both frmTransferPayLandingKA and others
		}
	}}

function attachSwipeListener(){
	kony.print('attachSwipeListener');	
	CopyFlexContainer0a00646603d924a.addGestureRecognizer(2, {fingers : 1} ,onGestureClosure);
}

function onGestureClosure(myWidget, gestureInfo, context) {
	kony.print('onGestureClosure');
	kony.print('gestureInfo '+ JSON.stringify(gestureInfo));
	kony.print('myWidget' + JSON.stringify(myWidget));
	kony.print('context '+ JSON.stringify(context));
  //   if (gestureInfo.swipeDirection == 1) {        
    // alert(context);
  //       frmGesture.seg1.animateRows({
  //               rows: [{
  //                        sectionIndex: context["sectionIndex"],
  //                        rowIndex:context["rowIndex"]
  //                    }],
  //               widgets: ["sample1InnerFlex"],
  //               animation: getAnimDef("0%","-60%")
    //    });

  //   } else if (gestureInfo.swipeDirection == 2) {

  //   }
}
function getAnimDef(left,right) {

    // var transAnimDef1 = {
    //    "0":{

    //      "left":left
    //    },
    //     "100": {
    //         "left": right
    //     }
    // };
    // var transAnimDefObject = kony.ui.createAnimation(transAnimDef1);

    // return {
    //     definition: transAnimDefObject,
    //     config: {
    //         "duration": 1,
    //         "iterationCount": 1,
    //         "delay": 0,
    //         "fillMode":  kony.anim.FILL_MODE_FORWARDS
    //     }
    // };

}

function onMoveCode(){
    // if(swipedIndices["secIndex"] && swipedIndices["rowIndex"]){
  //       frmOrderResourcesListKA.segDetailskA.animateRows({
  //               rows: [{
  //                        sectionIndex: swipedIndices["secIndex"],
  //                        rowIndex:swipedIndices["rowIndex"]
  //                    }],
  //               widgets: ["flxChildTempKA"],
  //               animation: getAnimDef("-60%","0%")
    //    });
  //         swipedIndices={};
  //       }
}
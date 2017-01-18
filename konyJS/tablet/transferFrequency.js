function frequencySegmentRowClick()
{
  var selectedIndex = newTransfer.frequencySegment.selectedIndex;
  var boolStatus = newTransfer.frequencySegment.selectedItems[0].imgSegIcon.isVisible;
  var name  = newTransfer.frequencySegment.selectedItems[0].lblsegIcon;
  var data= {}; 
  if(boolStatus)
  {
    data = {
      lblsegIcon: name,
      imgSegIcon:{src:"",isVisible: false}
    };
  }

  else
  {
    data = {
      lblsegIcon: name,
      imgSegIcon:{src:"check_blue.png",isVisible: true}
    };  
  }
  loadFrequencyTypes();
  newTransfer.frequencySegment.setDataAt(data,selectedIndex[1],selectedIndex[0]);
  newTransfer.frequencyPickContainer.frequencyPickLabel.text = name;
}

function newTransferFrequencyEdit(){
  
	newTransfer.frequencyCard.animate(
        kony.ui.createAnimation({"100":{"height": frequencyCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
  
  newTransfer.frequencyLabel.animate(
        kony.ui.createAnimation({"100":{"left":"-65dp","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration/2},
        {"animationEnd": function () {}}
    );
  
   newTransfer.frequencyPick.animate(
        kony.ui.createAnimation({
           "100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.5, "delay": 0.2},
        {"animationEnd": function () {}}
    );
  
  newTransfer.frequencyPickContainer.animate(
        kony.ui.createAnimation({
           "100":{"top": "100%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0},
        {"animationEnd": function () {}}
    );
  
}

function newTransferFrequencyMadePick(){
  
	newTransfer.frequencyCard.animate(
         kony.ui.createAnimation({"100":{"height": defaultCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
	);
  
  	newTransfer.frequencyLabel.animate(
        kony.ui.createAnimation({"100":{"left": labelLeft,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration/2},
        {"animationEnd": function () {}}
    );
  
  	newTransfer.frequencyPick.animate(
        kony.ui.createAnimation({"100":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.5, "delay": 0.05},
        {"animationEnd": function () {}}
    );
  
  	 newTransfer.frequencyPickContainer.animate(
        kony.ui.createAnimation({
           "100":{"top": "0%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0},
        {"animationEnd": function () {}}
    );
}
function newTransferFrequencyEdit(height){
  
	frmNewTransferKA.frequencyCard.animate(
        kony.ui.createAnimation({"100":{"height": frequencyCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
    
    frmNewTransferKA.frequencyCardInner.animate(
    kony.ui.createAnimation({"100": { //"transform": transform, 
    "top": "60dp",
    "opacity": 1, "stepConfig": { "timingFunction": easeIn}}}), 
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function() {frmNewTransferKA.frequencyCardInner.skin = skntransferCardInner;},
    "animationEnd": function() {}}
    );
  
  frmNewTransferKA.frequencyLabel.animate(
        kony.ui.createAnimation({"100":{"left":"-65dp","stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration/2},
        {"animationEnd": function () {}}
    );
  
   frmNewTransferKA.frequencyPick.animate(
        kony.ui.createAnimation({
           "100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.5, "delay": 0.2},
        {"animationEnd": function () {}}
    );
  
  frmNewTransferKA.frequencyPickContainer.animate(
        kony.ui.createAnimation({
           "100":{"top": "100%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0},
        {"animationEnd": function () {}}
    );
  
}

function newTransferFrequencyMadePick(height){
  
	frmNewTransferKA.frequencyCard.animate(
         kony.ui.createAnimation({"100":{"height": height,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
	);
    
    frmNewTransferKA.frequencyCardInner.animate(
    kony.ui.createAnimation({"100": { //"transform": transform, 
    "top": "100%",
    "opacity": 0, "stepConfig": { "timingFunction": easeIn}}}), 
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function() {frmNewTransferKA.frequencyCardInner.skin = skntransferCardInner;},
    "animationEnd": function() {}}
    );
  
  	frmNewTransferKA.frequencyLabel.animate(
        kony.ui.createAnimation({"100":{"left": labelLeft,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards,"duration": duration/2},
        {"animationEnd": function () {}}
    );
  
  	frmNewTransferKA.frequencyPick.animate(
        kony.ui.createAnimation({"100":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.5, "delay": 0.05},
        {"animationEnd": function () {}}
    );
  
  	 frmNewTransferKA.frequencyPickContainer.animate(
        kony.ui.createAnimation({
           "100":{"top": "0%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0},
        {"animationEnd": function () {}}
    );
}

function newTransferRecurrenceEdit(height){
  
	frmNewTransferKA.recurrenceCard.animate(
        kony.ui.createAnimation({"100":{"height": recurrenceCardHeight,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
    );
    
    frmNewTransferKA.recurrenceCardInner.animate(
    kony.ui.createAnimation({"100": { //"transform": transform, 
    "top": "60dp",
    "opacity": 1, "stepConfig": { "timingFunction": easeIn}}}), 
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function() {frmNewTransferKA.recurrenceCardInner.skin = skntransferCardInner;},
    "animationEnd": function() {}}
    );
   
   frmNewTransferKA.recurrencePick.animate(
        kony.ui.createAnimation({
           "100":{"opacity": 0, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.5, "delay": 0.2},
        {"animationEnd": function () {}}
    );
  
  frmNewTransferKA.recurrencePickContainer.animate(
        kony.ui.createAnimation({
           "100":{"top": "100%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0},
        {"animationEnd": function () {}}
    ); 
    
  frmNewTransferKA.recurrenceLabel.animate(
    kony.ui.createAnimation({"100":{"left":"-65dp","stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards,"duration": duration},
    {"animationEnd": function () {}}
    );
}

function newTransferRecurrenceMadePick(height){
    kony.print("newTransferRecurrenceMadePick called");
	frmNewTransferKA.recurrenceCard.animate(
         kony.ui.createAnimation({"100":{"height": height,"stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration},
        {"animationEnd": function () {}}
	);
    
    frmNewTransferKA.recurrenceCardInner.animate(
    kony.ui.createAnimation({"100": { //"transform": transform, 
    "top": "100%",
    "opacity": 0, "stepConfig": { "timingFunction": easeIn}}}), 
    {"fillMode": forwards, "duration": duration},
    {"animationStart": function() {frmNewTransferKA.recurrenceCardInner.skin = skntransferCardInner;},
    "animationEnd": function() {}}
    );
   
  	frmNewTransferKA.recurrencePick.animate(
        kony.ui.createAnimation({"100":{"opacity": 1, "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration/1.5, "delay": 0.05},
        {"animationEnd": function () {}}
    );
  
  	 frmNewTransferKA.recurrencePickContainer.animate(
        kony.ui.createAnimation({
           "100":{"top": "0%", "stepConfig":{"timingFunction": easeIn}}}),
        {"fillMode": forwards, "duration": duration, "delay": 0.2},
        {"animationEnd": function () {}}
    );
    
    frmNewTransferKA.recurrenceLabel.animate(
    kony.ui.createAnimation({"100":{"left": labelLeft,"stepConfig":{"timingFunction": easeIn}}}),
    {"fillMode": forwards,"duration": duration, "delay": 0.2}, // duration/2
    {"animationEnd": function () {}}
    );
}

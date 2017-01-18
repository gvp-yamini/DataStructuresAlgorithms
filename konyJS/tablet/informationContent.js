function InformationClick(){
  if (userAgent == "iPad")
      {
          frmLoginKA.removeGestureRecognizer(swipeGestureiPhone);
          frmLoginKA.removeGestureRecognizer(swipeGesture);
      }
	openModal (unauthInformation.modalBkg,"modalBkg");
  unauthInformation.lblVersionValue.text = appConfig.appVersion;
	openModal(unauthInformation.infoModalContainer,"infoModalContainer");
}
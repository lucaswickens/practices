var Webflow = Webflow || [];
Webflow.push(function () {
  new AWF.MSF({hiddeButtonsOnSubmit: true, scrollTopOnStepChange: false, formSelector: '#quiz', nextSelector: '#nextButton', currentStepSelector: '#currentStep', backSelector: '#backButton', backText: [{step: '1', text: ' '}, {step: '2', text: ' Go back'}], nextText: [{step: '1', text: 'Take the quiz'}, {step: '2', text: 'Continue'}], completedPercentageSelector: '#completed', warningClass: 'warning', alertSelector: '#alertElement', alertText: 'Please complete all required fields'});
  
});

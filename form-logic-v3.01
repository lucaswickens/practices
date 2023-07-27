var Webflow = Webflow || [];
Webflow.push(function () {
  new AWF.MSF({
    hiddeButtonsOnSubmit: true,
    scrollTopOnStepChange: false,
    formSelector: "#regv2",
    nextSelector: "#msf-next",
    backText: [{ step: "1", text: "Go back" }],
    backSelector: "#backButton",
    completedPercentageSelector: "#completed",
    currentStepSelector: "#currentStep",
    warningClass: "warn",
    alertSelector: "#alertElement",
  });
  new AWF.Logic({
    submitHiddenInputs: true,
    checkConditionsOnLoad: true,
  });
});

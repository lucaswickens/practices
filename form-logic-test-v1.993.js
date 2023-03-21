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
    logicList: [
      {
        conditions: [{ selector: "#Address-line-2", operator: "empty" }],
        operator: "and",
        actions: [
          { selector: "#display-address-line-2", action: "hide", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: "#Recently-moved-from-abroad",
            operator: "equal",
            value: "false",
          },
        ],
        operator: "and",
        actions: [
          { selector: "#recently-moved-display", action: "hide", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Registered-with-a-GP-before"]',
            operator: "equal",
            value: "No",
          },
        ],
        operator: "and",
        actions: [
          {
            selector: "#registered-before-display",
            action: "hide",
            clear: false,
          },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Address-has-changed"]',
            operator: "equal",
            value: "Yes",
          },
        ],
        operator: "and",
        actions: [
          {
            selector: "#previous-postcode-display",
            action: "hide",
            clear: false,
          },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Ethnicity"]',
            operator: "equal",
            value: "Asian or Asian British",
          },
        ],
        operator: "and",
        actions: [
          { selector: "#asian-additional", action: "show", clear: false },
          { selector: "#black-additional", action: "hide", clear: true },
          { selector: "#mixed-additional", action: "hide", clear: true },
          { selector: "#white-additional", action: "hide", clear: true },
          { selector: "#another-additional", action: "hide", clear: true },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Ethnicity"]',
            operator: "equal",
            value: "Black African, Black British or Caribbean",
          },
        ],
        operator: "and",
        actions: [
          { selector: "#black-additional", action: "show", clear: false },
          { selector: "#asian-additional", action: "hide", clear: true },
          { selector: "#mixed-additional", action: "hide", clear: true },
          { selector: "#white-additional", action: "hide", clear: true },
          { selector: "#another-additional", action: "hide", clear: true },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Ethnicity"]',
            operator: "equal",
            value: "Mixed or multiple ethnic groups",
          },
        ],
        operator: "and",
        actions: [
          { selector: "#mixed-additional", action: "show", clear: false },
          { selector: "#asian-additional", action: "hide", clear: true },
          { selector: "#black-additional", action: "hide", clear: true },
          { selector: "#white-additional", action: "hide", clear: true },
          { selector: "#another-additional", action: "hide", clear: true },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Ethnicity"]',
            operator: "equal",
            value: "White",
          },
        ],
        operator: "and",
        actions: [
          { selector: "#white-additional", action: "show", clear: false },
          { selector: "#asian-additional", action: "hide", clear: true },
          { selector: "#black-additional", action: "hide", clear: true },
          { selector: "#mixed-additional", action: "hide", clear: true },
          { selector: "#another-additional", action: "hide", clear: true },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Ethnicity"]',
            operator: "equal",
            value: "Another ethnic group",
          },
        ],
        operator: "and",
        actions: [
          { selector: "#another-additional", action: "show", clear: false },
          { selector: "#asian-additional", action: "hide", clear: true },
          { selector: "#black-additional", action: "hide", clear: true },
          { selector: "#mixed-additional", action: "hide", clear: true },
          { selector: "#white-additional", action: "hide", clear: true },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Registered-with-a-GP-before"]',
            operator: "equal",
            value: "Yes",
          },
        ],
        operator: "and",
        actions: [
          {
            selector: "#home-address-changed-section",
            action: "show",
            clear: false,
          },
          {
            selector: "#home-address-changed-section",
            action: "require",
            clear: false,
          },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Registered-with-a-GP-before"]',
            operator: "equal",
            value: "No",
          },
        ],
        operator: "and",
        actions: [
          {
            selector: "#home-address-changed-section",
            action: "hide",
            clear: false,
          },
          {
            selector: "#previous-postcode-section",
            action: "hide",
            clear: false,
          },
          { selector: "#armed-forces-section", action: "hide", clear: false },
          {
            selector: "#home-address-changed-section",
            action: "unrequire",
            clear: true,
          },
          {
            selector: "#previous-postcode-section",
            action: "unrequire",
            clear: true,
          },
          {
            selector: "#armed-forces-section",
            action: "unrequire",
            clear: true,
          },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Address-has-changed"]',
            operator: "equal",
            value: "Yes",
          },
        ],
        operator: "and",
        actions: [
          {
            selector: "#previous-postcode-section",
            action: "show",
            clear: false,
          },
          {
            selector: "#previous-postcode-section",
            action: "require",
            clear: false,
          },
          { selector: "#armed-forces-section", action: "show", clear: false },
          {
            selector: "#armed-forces-section",
            action: "require",
            clear: false,
          },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Address-has-changed"]',
            operator: "equal",
            value: "No",
          },
        ],
        operator: "and",
        actions: [
          {
            selector: "#previous-postcode-section",
            action: "hide",
            clear: false,
          },
          {
            selector: "#previous-postcode-section",
            action: "unrequire",
            clear: true,
          },
          { selector: "#armed-forces-section", action: "show", clear: false },
          {
            selector: "#armed-forces-section",
            action: "require",
            clear: false,
          },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: "#Recently-moved-from-abroad",
            operator: "equal",
            value: "true",
          },
        ],
        operator: "and",
        actions: [
          {
            selector: "#recently-moved-additional",
            action: "show",
            clear: false,
          },
          {
            selector: "#recently-moved-additional",
            action: "require",
            clear: false,
          },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: "#Recently-moved-from-abroad",
            operator: "equal",
            value: "false",
          },
        ],
        operator: "and",
        actions: [
          {
            selector: "#recently-moved-additional",
            action: "hide",
            clear: false,
          },
          {
            selector: "#recently-moved-additional",
            action: "unrequire",
            clear: true,
          },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
      {
        conditions: [
          {
            selector: 'input[name="Ethnicity"]',
            operator: "equal",
            value: "Prefer not to say",
          },
        ],
        operator: "and",
        actions: [
          { selector: "#asian-additional", action: "hide", clear: true },
          { selector: "#black-additional", action: "hide", clear: true },
          { selector: "#mixed-additional", action: "hide", clear: true },
          { selector: "#white-additional", action: "hide", clear: true },
          { selector: "#another-additional", action: "hide", clear: true },
          { selector: "#reset-height", action: "custom", clear: false },
        ],
      },
    ],
    submitHiddenInputs: true,
    checkConditionsOnLoad: true,
  });
});

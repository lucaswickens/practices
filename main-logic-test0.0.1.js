window.addEventListener("load", function () {
  document.getElementById("mask").classList.remove("cls");

  window.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
      document.getElementById("msf-next").click();
      event.preventDefault();
    }
  });

  const underSixteen = document.getElementById("underSixteen");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const dobYear = document.getElementById("dob-year");

  firstName.addEventListener("input", () => {
    localStorage.setItem("firstName", firstName.value);
  });
  lastName.addEventListener("input", () => {
    localStorage.setItem("lastName", lastName.value);
  });
  phone.addEventListener("input", () => {
    localStorage.setItem("phone", phone.value);
  });
  dobYear.addEventListener("input", () => {
    if (dobYear.value > 2006) {
      underSixteen.style.display = "flex";
      resetHeight();
    } else {
      underSixteen.style.display = "none";
      resetHeight();
    }
  });
  const postcode = document.getElementById("postcode");
  const outCatchmentMessage = document.getElementById("outCatchmentMessage");
  const eligible = document.getElementById("eligible");
  const consentBox = document.getElementById("consentBox");
  const catchment = ["S2", "S8"];
  const icb = [
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    "S10",
    "S11",
    "S12",
    "S13",
    "S14",
    "S17",
    "S18",
    "S19",
    "S20",
    "S21",
    "S25",
    "S26",
    "S30",
    "S31",
    "S33",
    "S35",
    "S36",
    "S43",
    "S60",
    "S61",
    "S62",
    "S63",
    "S65",
    "S66",
    "S70",
    "S71",
    "S72",
    "S73",
    "S74",
    "S75",
    "S80",
    "S81",
    "S94",
    "S95",
    "S96",
    "S97",
    "S98",
    "S99",
    "DN1",
    "DN2",
    "DN3",
    "DN4",
    "DN5",
    "DN6",
    "DN7",
    "DN8",
    "DN9",
    "DN10",
    "DN11",
    "DN12",
    "DN55",
  ];
  let inICB;
  let inCatchment;
  postcode.addEventListener("input", () => {
    inICB = icb.some((str) => postcode.value.startsWith(str));
    inCatchment = catchment.some((str) => postcode.value.startsWith(str));
    if (inICB) {
      eligible.innerHTML = "You are eligible to register";
    } else {
      eligible.innerHTML = "Please note";
    }
    if (inCatchment) {
      outCatchmentMessage.style.display = "none";
      consentBox.innerHTML =
        "I understand that by registering, I am switching my NHS GP practice to Carrfield Medical Centre.";
    } else {
      outCatchmentMessage.style.display = "block";
      consentBox.innerHTML =
        "I understand that by registering, I am switching my NHS GP practice to Carrfield Medical Centre and I am not eligible for home visits.";
    }
  });

  // // Address lookup
  // const options = {
  //   componentRestrictions: { country: "uk" },
  // };

  // const autocompleteInput = document.getElementById("autocomplete");
  // const autocomplete = new google.maps.places.Autocomplete(
  //   autocompleteInput,
  //   options
  // );

  // autocomplete.addListener("place_changed", () => {
  //   const place = autocomplete.getPlace();

  //   place.address_components.forEach((component) => {
  //     const addressType = component.types[0];
  //     switch (addressType) {
  //       case "street_number":
  //         streetNoField.value = component.long_name;
  //         break;
  //       case "route":
  //         routeField.value = component.long_name;
  //         break;
  //       case "postal_town":
  //         cityField.value = component.long_name;
  //         break;
  //       case "postal_code":
  //         postcodeField.value = component.long_name;
  //         break;
  //     }
  //   });
  //   routeField.required = true;
  //   cityField.required = true;
  //   postcodeField.required = true;
  //   hasAddressField.value = "Yes";
  //   noAddressContainer.classList.add("hidden");
  //   if (
  //     document.getElementById("additionalFields").classList.contains("hidden")
  //   ) {
  //     document.getElementById("additionalFields").classList.remove("hidden");
  //     resetHeight();
  //     setTimeout(() => {
  //       document.getElementById("flat").focus();
  //     }, 401);
  //   } else {
  //     resetHeight();
  //     document.getElementById("flat").focus();
  //   }
  //   inICB = icb.some((str) => postcode.value.startsWith(str));
  //   inCatchment = catchment.some((str) => postcode.value.startsWith(str));
  //   if (inICB) {
  //     eligible.innerHTML = "You are eligible to register";
  //   } else {
  //     eligible.innerHTML = "Please note";
  //   }
  //   if (inCatchment) {
  //     outCatchmentMessage.style.display = "none";
  //     consentBox.innerHTML =
  //       "I understand that by registering, I am switching my NHS GP practice to Carrfield Medical Centre.";
  //   } else {
  //     outCatchmentMessage.style.display = "block";
  //     consentBox.innerHTML =
  //       "I understand that by registering, I am switching my NHS GP practice to Carrfield Medical Centre and I am not eligible for home visits.";
  //   }
  // });

  // // Address lookup - previous address
  // const previousAutocompleteInput = document.getElementById(
  //   "previous-address-input"
  // );
  // const previousAutocomplete = new google.maps.places.Autocomplete(
  //   previousAutocompleteInput,
  //   options
  // );

  // previousAutocomplete.addListener("place_changed", () => {
  //   const previousPlace = previousAutocomplete.getPlace();
  //   console.log(previousPlace);

  //   previousPlace.address_components.forEach((component) => {
  //     const addressType = component.types[0];
  //     switch (addressType) {
  //       case "street_number":
  //         document.getElementById("previous_street_number").value =
  //           component.long_name;
  //         break;
  //       case "route":
  //         document.getElementById("previous_route").value = component.long_name;
  //         break;
  //       case "postal_town":
  //         document.getElementById("previous_city").value = component.long_name;
  //         break;
  //       case "postal_code":
  //         document.getElementById("previous_postcode").value =
  //           component.long_name;
  //         break;
  //       case "administrative_area_level_1":
  //         document.getElementById("previous_country").value =
  //           component.long_name;
  //         break;
  //     }
  //   });
  //   if (
  //     document
  //       .getElementById("previousAdditionalFields")
  //       .classList.contains("hidden")
  //   ) {
  //     document
  //       .getElementById("previousAdditionalFields")
  //       .classList.remove("hidden");
  //     resetHeight();
  //     setTimeout(() => {
  //       document.getElementById("previous_additional").focus();
  //     }, 401);
  //   } else {
  //     document.getElementById("previous_additional").focus();
  //   }
  // });

  // // No address link
  // const noAddressLink = document.getElementById("no-address-link");
  // const hasAddressField = document.getElementById("has-address");
  // const noAddressContainer = document.getElementById("no-address-cont");
  // const streetNoField = document.getElementById("street_number");
  // const routeField = document.getElementById("route");
  // const cityField = document.getElementById("city");
  // const postcodeField = document.getElementById("postcode");
  // noAddressLink.addEventListener("click", () => {
  //   hasAddressField.value = "False";
  //   autocompleteInput.required = false;
  //   streetNoField.required = false;
  //   routeField.required = false;
  //   cityField.required = false;
  //   postcodeField.required = false;
  //   nextBtn.click();
  // });

  const totalSlides = document.querySelectorAll(".w-slider-dot").length;
  document
    .getElementById("reset-height")
    .addEventListener("click", resetHeight);

  const widths = [27.03, 47.3, 62.51, 73.91, 82.46, 88.88, 93.69, 97.29, 100];

  const sliderMask = document.querySelector("#mask");

  function animateHeight(element, to, duration, timingFunction) {
    const start = performance.now();
    const from = element.offsetHeight;
    const unit = "px";

    requestAnimationFrame(function step(timestamp) {
      const timeElapsed = timestamp - start;
      const progress = timeElapsed / duration;

      if (timeElapsed < duration) {
        const timingProgress = timingFunction(progress);
        element.style.height = from + (to - from) * timingProgress + unit;
        requestAnimationFrame(step);
      } else {
        element.style.height = to + unit;
      }
    });
  }

  function easeOut(t) {
    return t * (2 - t);
  }

  function resetHeight() {
    const slideNo = document.getElementById("currentStep").textContent;
    const target = slideNo + " of " + totalSlides;
    const slide = document.querySelector(
      '[aria-label="' + target + '"] .slide'
    );
    const slideHeight = slide.offsetHeight;
    animateHeight(sliderMask, slideHeight, 400, easeOut);
  }

  // Create function that can only be called once
  function createSingletonFunction(fn) {
    let called = false;
    return function (...args) {
      if (!called) {
        called = true;
        return fn(...args);
      } else {
        console.log("Function already ran");
      }
    };
  }
  const emailCapture = createSingletonFunction(() => {
    const abandoned = getLocalStorageValue("abandoned");
    if (abandoned !== "true") {
      console.log("Send AJAX");
      setLocalStorageValue("abandoned", true);
      fetch("https://api.form-data.com/f/n7036mvhghdbwvzm7o3z1o", {
        method: "post",
        body: JSON.stringify({ name: firstName.value, email: email.value }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {});
    }
  });

  Array.from(document.querySelectorAll(".change-slide")).forEach(function (
    changeSlideElement
  ) {
    changeSlideElement.addEventListener("click", function () {
      const slideNo = document.getElementById("currentStep").textContent;
      const progressWidth = "-" + (100 - widths[slideNo - 1]) + "%";
      document.getElementById("progress-indicator").style.transform =
        "translateX(" + progressWidth + ")";
      const input = document.querySelector('input[av-focus="' + slideNo + '"]');
      if (input) {
        setTimeout(() => {
          input.focus();
        }, 401);
      }
      if (slideNo === "3") {
        emailCapture();
        phoneInputField.value = phoneInput.getNumber();
        setLocalStorageValue("phone", phoneInputField.value);
      }
    });
  });

  // Ethnicity options
  document.querySelectorAll('input[name="Ethnicity"]').forEach((elem) => {
    elem.addEventListener("change", function () {
      // Hide all content divs
      document
        .querySelectorAll(".sub-options")
        .forEach((div) => div.classList.add("hidden"));

      // Get the value of the selected option
      let value = this.value;

      // Show the div with the matching data-ethnicity attribute
      if (value) {
        let selectedDiv = document.querySelector(
          `div[data-ethnicity='${value}']`
        );
        if (selectedDiv) {
          selectedDiv.classList.remove("hidden");
        }
      }
      resetHeight();
    });
  });

  // Get elements
  const addressChanged = document.getElementById("address-changed");
  const addressChangedOptions = addressChanged.querySelectorAll(
    'input[type="radio"]'
  );
  const addressChangedRedirected =
    addressChanged.querySelectorAll(".w-radio-input");
  const intCountryQuestion = document.getElementById("int-country");
  const intCountryField = document.getElementById("int-country-field");
  const countryBorn = document.getElementById("country-born");
  const countryBornOptions = countryBorn.querySelectorAll(
    'input[type="radio"]'
  );
  const previousPostcode = document.getElementById("previous-postcode");
  const previousPostcodeInput = document.getElementById(
    "previous-postcode-input"
  );
  const armedForces = document.getElementById("armed-forces");
  const armedForcesOptions = armedForces.querySelectorAll(
    'input[type="radio"]'
  );
  const armedForcesRedirected = armedForces.querySelectorAll(".w-radio-input");
  const ehicDetails = document.getElementById("ehic-details");
  const ehicDetailsInputs = ehicDetails.querySelectorAll('input[type="text"]');
  const enterUK = document.getElementById("enter-uk");
  const enterUKOptions = enterUK.querySelectorAll('input[type="text"]');
  const enterUKRedirected = enterUK.querySelectorAll(".w-radio-input");
  const movedFromEU = document.getElementById("moved-from-eu");
  const movedFromEUOptions = movedFromEU.querySelectorAll(
    'input[type="radio"]'
  );
  const movedFromEURedirected = movedFromEU.querySelectorAll(".w-radio-input");
  const interpreter = document.getElementById("interpreter");
  const interpreterOptions = interpreter.querySelectorAll(
    'input[type="radio"]'
  );
  const interpreterRedirected = interpreter.querySelectorAll(".w-radio-input");
  const previousAddress = this.document.getElementById("previous-address");
  const previousAddressInput = document.getElementById(
    "previous-address-input"
  );
  const hasPreviousAddressQuestion = document.getElementById(
    "has-previous-address"
  );
  const hasPreviousAddressOptions = hasPreviousAddressQuestion.querySelectorAll(
    'input[type="radio"]'
  );
  const hasPreviousAddressRedirected =
    hasPreviousAddressQuestion.querySelectorAll(".w-radio-input");
  documentsSection = document.getElementById("documents");
  const documentsOptions = documentsSection.querySelectorAll(
    'input[type="radio"]'
  );
  const documentsRedirected =
    documentsSection.querySelectorAll(".w-radio-input");
  preferredLang = document.getElementById("preferred-lang");
  preferredLangInput = document.getElementById("preferred-lang-input");

  // State
  let registeredBefore;
  let addressHasChanged;
  let countryBornInput;
  let recentlyMoved;
  let hasMovedFromEU;
  let hasPreviousAddress;
  let documents;
  let needsInterpreter;

  // Registered with GP before
  document
    .querySelectorAll('input[name="Registered-with-a-GP-before"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        // Get the value of the selected option
        registeredBefore = this.value;
        regBeforeLogic();
      });
    });

  // Address has changed
  document
    .querySelectorAll('input[name="Address-has-changed"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        addressHasChanged = this.value;
        regBeforeLogic();
      });
    });

  // Registered before logic
  function regBeforeLogic() {
    if (registeredBefore === "Yes") {
      addressChanged.classList.remove("hidden");
      addressChangedOptions.forEach((input) => {
        input.required = true;
      });
      if (addressHasChanged === "Yes" || addressHasChanged === "No") {
        armedForces.classList.remove("hidden");
        armedForcesOptions.forEach((input) => {
          input.required = true;
        });
      }
      if (addressHasChanged === "Yes") {
        previousPostcode.classList.remove("hidden");
        previousPostcodeInput.required = true;
      }
      if (addressHasChanged === "No") {
        previousPostcode.classList.add("hidden");
        previousPostcodeInput.required = false;
        previousPostcodeInput.value = "";
      }
    }
    if (registeredBefore === "No") {
      addressChanged.classList.add("hidden");
      addressChangedOptions.forEach((input) => {
        input.required = false;
        input.checked = false;
      });
      addressChangedRedirected.forEach((div) => {
        div.classList.remove("w--redirected-checked");
      });
      addressHasChanged = "";
      armedForces.classList.add("hidden");
      armedForcesOptions.forEach((input) => {
        input.required = false;
        input.checked = false;
      });
      armedForcesRedirected.forEach((div) => {
        div.classList.remove("w--redirected-checked");
      });
      previousPostcode.classList.add("hidden");
      previousPostcodeInput.required = false;
      previousPostcodeInput.value = "";
    }
    resetHeight();
  }

  // Recently moved from abroad
  document
    .querySelectorAll('input[name="Recently-moved-from-abroad"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        recentlyMoved = this.value;
        abroadLogic();
      });
    });

  // Country of birth
  document
    .querySelectorAll('input[name="Country-of-birth"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        countryBornInput = this.value;
        abroadLogic();
      });
    });

  // Moved from EU
  document.querySelectorAll('input[name="Moved-from-EU"]').forEach((elem) => {
    elem.addEventListener("change", function () {
      hasMovedFromEU = this.value;
      abroadLogic();
    });
  });

  // Documents
  document.querySelectorAll('input[name="Documents"]').forEach((elem) => {
    elem.addEventListener("change", function () {
      documents = this.value;
      abroadLogic();
    });
  });

  // Interpreter
  document
    .querySelectorAll('input[name="Interpreter-needed"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        needsInterpreter = this.value;
        abroadLogic();
      });
    });

  // Previous address
  document
    .querySelectorAll('input[name="Has-previous-UK-address"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        hasPreviousAddress = this.value;
        abroadLogic();
      });
    });

  function abroadLogic() {
    countryBorn.classList.remove("hidden");
    countryBornOptions.forEach((input) => {
      input.required = true;
    });
    // Country selected
    if (countryBornInput) {
      // Show birth details section and require place
      document.getElementById("birth-details").classList.remove("hidden");
      document.getElementById("birth-place-input").required = true;
      if (countryBornInput === "None of the above" || recentlyMoved === "Yes") {
        // Show int country field if abroad
        if (countryBornInput === "None of the above") {
          intCountryQuestion.classList.remove("hidden");
          intCountryField.required = true;
        }
        // Show enter UK date
        enterUK.classList.remove("hidden");
        enterUKOptions.forEach((input) => {
          input.required = true;
        });
        // Show moved from EU question
        movedFromEU.classList.remove("hidden");
        movedFromEUOptions.forEach((input) => {
          input.required = true;
        });
        // Show interpreter question
        interpreter.classList.remove("hidden");
        interpreterOptions.forEach((input) => {
          input.required = true;
        });
        // Hide previous address question
        hasPreviousAddressQuestion.classList.add("hidden");
        hasPreviousAddressOptions.forEach((input) => {
          input.required = false;
          input.checked = false;
        });
        hasPreviousAddressRedirected.forEach((div) => {
          div.classList.remove("w--redirected-checked");
        });
        hasPreviousAddress = "";
        // Hide previous address lookup
        previousAddress.classList.add("hidden");
        previousAddressInput.value = "";
        // If they have moved from EU, show documents question
        if (hasMovedFromEU === "Yes") {
          documentsSection.classList.remove("hidden");
          documentsOptions.forEach((input) => {
            input.required = true;
          });
          // If they have EHIC, show the question, else hide it
          if (documents === "European health insurance card (EHIC)") {
            ehicDetails.classList.remove("hidden");
            ehicDetailsInputs.forEach((input) => {
              input.required = true;
            });
          } else {
            ehicDetails.classList.add("hidden");
            ehicDetailsInputs.forEach((input) => {
              input.required = false;
              input.value = "";
            });
          }
        }
        // If they haven't moved from EU, hide documents and EHIC questions
        if (hasMovedFromEU === "No") {
          documentsSection.classList.add("hidden");
          documentsOptions.forEach((input) => {
            input.required = false;
            input.checked = false;
          });
          documentsRedirected.forEach((div) => {
            div.classList.remove("w--redirected-checked");
          });
          documents = "";
          ehicDetails.classList.add("hidden");
          ehicDetailsInputs.forEach((input) => {
            input.required = false;
            input.value = "";
          });
        }
        // If they need an interpreter, ask what language
        if (needsInterpreter === "Yes") {
          preferredLang.classList.remove("hidden");
          preferredLangInput.required = true;
        }
        if (needsInterpreter === "No") {
          preferredLang.classList.add("hidden");
          preferredLangInput.required = false;
          preferredLangInput.value = "";
        }
      } else {
        // If in UK and not recently moved
        // Hide int country field
        intCountryQuestion.classList.add("hidden");
        intCountryField.required = false;
        // Hide enter UK date
        enterUK.classList.add("hidden");
        enterUKOptions.forEach((input) => {
          input.required = false;
          input.value = "";
        });
        enterUKRedirected.forEach((div) => {
          div.classList.remove("w--redirected-checked");
        });
        // Hide moved from EU question
        movedFromEU.classList.add("hidden");
        movedFromEUOptions.forEach((input) => {
          input.required = false;
          input.checked = false;
        });
        movedFromEURedirected.forEach((div) => {
          div.classList.remove("w--redirected-checked");
        });
        hasMovedFromEU = "";
        // Hide interpreter question
        interpreter.classList.add("hidden");
        interpreterOptions.forEach((input) => {
          input.required = false;
          input.checked = false;
        });
        interpreterRedirected.forEach((div) => {
          div.classList.remove("w--redirected-checked");
        });
        needsInterpreter = "";
        // Hide language question
        preferredLang.classList.add("hidden");
        preferredLangInput.required = false;
        preferredLangInput.value = "";
        // Hide documents question
        documentsSection.classList.add("hidden");
        documentsOptions.forEach((input) => {
          input.required = false;
          input.checked = false;
        });
        documentsRedirected.forEach((div) => {
          div.classList.remove("w--redirected-checked");
        });
        documents = "";
        // Hide EHIC question
        ehicDetails.classList.add("hidden");
        ehicDetailsInputs.forEach((input) => {
          input.required = false;
          input.value = "";
        });
        // Show previous address question
        hasPreviousAddressQuestion.classList.remove("hidden");
        hasPreviousAddressOptions.forEach((input) => {
          input.required = true;
        });
        // If they have a previous address, show lookup
        if (hasPreviousAddress === "Yes") {
          previousAddress.classList.remove("hidden");
        }
        if (hasPreviousAddress === "No") {
          previousAddress.classList.add("hidden");
          previousAddressInput.value = "";
        }
      }
    }
    resetHeight();
  }
});

// Function to get a localStorage value
const getLocalStorageValue = (key) => {
  try {
    const value = localStorage.getItem(key);
    console.log(
      `Successfully retrieved value "${value}" for key "${key}" from localStorage.`
    );
    return value;
  } catch (error) {
    console.error(
      `Error retrieving value for key "${key}" from localStorage: ${error}`
    );
  }
};

// Function to set a localStorage value
const setLocalStorageValue = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting localStorage value");
  }
};

// When the page loads, read localStorage value and update hidden form input
const value = getLocalStorageValue("campaignId");
const hiddenInput = document.getElementById("campaignId");

// Update the hidden input's value
if (hiddenInput && value) {
  hiddenInput.value = value;
}

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["gb", "cn", "in", "pl", "pk", "so", "ye"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

const nextArrow = document.getElementById("nextButton");
const nextBtn = document.getElementById("msf-next");

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

nextBtn.addEventListener("click", () => scrollToTop());
nextArrow.addEventListener("click", () => nextBtn.click());

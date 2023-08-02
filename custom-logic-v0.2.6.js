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
  const email = document.getElementById("Email-address");
  const dobDay = document.getElementById("dob-day");
  const dobMonth = document.getElementById("dob-month");
  const dobYear = document.getElementById("dob-year");

  firstName.addEventListener("input", () => {
    localStorage.setItem("firstName", firstName.value);
  });
  lastName.addEventListener("input", () => {
    localStorage.setItem("lastName", lastName.value);
  });
  dobDay.addEventListener("input", () => {
    localStorage.setItem("dobDay", dobDay.value);
  });
  dobMonth.addEventListener("input", () => {
    localStorage.setItem("dobMonth", dobMonth.value);
  });
  dobYear.addEventListener("input", () => {
    localStorage.setItem("dobYear", dobYear.value);
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

  // Address lookup
  const options = {
    componentRestrictions: { country: "uk" },
  };

  const input = document.getElementById("autocomplete");
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    place.address_components.forEach((component) => {
      const addressType = component.types[0];
      switch (addressType) {
        case "street_number":
          document.getElementById("street_number").value = component.long_name;
          break;
        case "route":
          document.getElementById("route").value = component.long_name;
          break;
        case "postal_town":
          document.getElementById("city").value = component.long_name;
          break;
        case "postal_code":
          document.getElementById("postcode").value = component.long_name;
          break;
        // you can add more cases as needed
      }
    });
    if (
      document.getElementById("additionalFields").classList.contains("hidden")
    ) {
      document.getElementById("additionalFields").classList.remove("hidden");
      resetHeight();
      setTimeout(() => {
        document.getElementById("flat").focus();
      }, 401);
    } else {
      document.getElementById("flat").focus();
    }
  });

  // Address lookup - previous address
  const previousInput = document.getElementById("previous-address-input");
  const previousAutocomplete = new google.maps.places.Autocomplete(
    previousInput,
    options
  );

  previousAutocomplete.addListener("place_changed", () => {
    const previousPlace = previousAutocomplete.getPlace();
    console.log(previousPlace);

    previousPlace.address_components.forEach((component) => {
      const addressType = component.types[0];
      switch (addressType) {
        case "street_number":
          document.getElementById("previous_street_number").value =
            component.long_name;
          break;
        case "route":
          document.getElementById("previous_route").value = component.long_name;
          break;
        case "postal_town":
          document.getElementById("previous_city").value = component.long_name;
          break;
        case "postal_code":
          document.getElementById("previous_postcode").value =
            component.long_name;
          break;
        // you can add more cases as needed
      }
    });
    if (
      document
        .getElementById("previousAdditionalFields")
        .classList.contains("hidden")
    ) {
      document
        .getElementById("previousAdditionalFields")
        .classList.remove("hidden");
      resetHeight();
      setTimeout(() => {
        document.getElementById("previous_additional").focus();
      }, 401);
    } else {
      document.getElementById("previous_additional").focus();
    }
  });

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
  const previousPostcode = document.getElementById("previous-postcode");
  const armedForces = document.getElementById("armed-forces");
  const countryBorn = document.getElementById("country-born");
  const intCountryQuestion = document.getElementById("int-country");
  const intCountryField = document.getElementById("int-country-field");
  const countryBornOptions = countryBorn.querySelectorAll(
    'input[type="radio"]'
  );
  const previousPostcodeInput = document.getElementById(
    "previous-postcode-input"
  );
  const armedForcesOptions = armedForces.querySelectorAll(
    'input[type="radio"]'
  );
  const ehicDetails = document.getElementById("ehic-details");
  const ehicDetailsInputs = ehicDetails.querySelectorAll('input[type="text"]');

  // State
  let registeredBefore;
  let addressHasChanged;
  let countryBornInput;
  let recentlyMoved;
  let movedFromEU;

  // Registered with GP before
  document
    .querySelectorAll('input[name="Registered-with-a-GP-before"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        // Get the value of the selected option
        registeredBefore = this.value;

        // Show the div with the matching data-ethnicity attribute
        if (registeredBefore === "Yes") {
          addressChanged.classList.remove("hidden");
          armedForcesOptions.forEach((input) => {
            input.required = true;
          });
          if (addressHasChanged === "Yes") {
            previousPostcode.classList.remove("hidden");
            armedForces.classList.remove("hidden");
            previousPostcodeInput.required = true;
          }
          if (addressHasChanged === "No") {
            previousPostcode.classList.add("hidden");
            armedForces.classList.remove("hidden");
            previousPostcodeInput.required = false;
            previousPostcodeInput.value = "";
          }
        }
        if (registeredBefore === "No") {
          addressChanged.classList.add("hidden");
          armedForces.classList.add("hidden");
          previousPostcode.classList.add("hidden");
          previousPostcodeInput.required = false;
          previousPostcodeInput.value = "";
          armedForcesOptions.forEach((input) => {
            input.required = false;
            input.checked = false;
          });
        }
        resetHeight();
      });
    });

  // Address has changed
  document
    .querySelectorAll('input[name="Address-has-changed"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        // Get the value of the selected option
        addressHasChanged = this.value;

        // Show the div with the matching data-ethnicity attribute
        if (addressHasChanged === "Yes") {
          previousPostcode.classList.remove("hidden");
          armedForces.classList.remove("hidden");
          previousPostcodeInput.required = true;
        }
        if (addressHasChanged === "No") {
          previousPostcode.classList.add("hidden");
          armedForces.classList.remove("hidden");
          previousPostcodeInput.required = false;
        }
        resetHeight();
      });
    });

  // Recently moved from abroad
  document
    .querySelectorAll('input[name="Recently-moved-from-abroad"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        recentlyMoved = this.value;
        countryBorn.classList.remove("hidden");
        countryBornOptions.forEach((input) => {
          input.required = true;
        });
        resetHeight();
      });
    });

  // Country of birth
  document
    .querySelectorAll('input[name="Country-of-birth"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        countryBornInput = this.value;

        const enterUK = document.getElementById("enter-uk");
        const movedFromEU = document.getElementById("moved-from-eu");
        const enterUKOptions = enterUK.querySelectorAll('input[type="text"]');
        const movedFromEUOptions = movedFromEU.querySelectorAll(
          'input[type="radio"]'
        );
        const interpreter = document.getElementById("interpreter");
        const interpreterOptions = interpreter.querySelectorAll(
          'input[type="radio"]'
        );
        const hasPreviousAddress = document.getElementById(
          "has-previous-address"
        );
        const hasPreviousAddressOptions = hasPreviousAddress.querySelectorAll(
          'input[type="radio"]'
        );

        document.getElementById("birth-details").classList.remove("hidden");
        document.getElementById("birth-place-input").required = true;

        if (countryBornInput === "None of the above") {
          intCountryQuestion.classList.remove("hidden");
          intCountryField.required = true;
          enterUK.classList.remove("hidden");
          enterUKOptions.forEach((input) => {
            input.required = true;
          });
          movedFromEU.classList.remove("hidden");
          movedFromEUOptions.forEach((input) => {
            input.required = true;
          });
          interpreter.classList.remove("hidden");
          interpreterOptions.forEach((input) => {
            input.required = true;
          });
          hasPreviousAddress.classList.add("hidden");
          hasPreviousAddressOptions.forEach((input) => {
            input.required = false;
            input.checked = false;
          });
        } else {
          intCountryQuestion.classList.add("hidden");
          intCountryField.required = false;
          hasPreviousAddress.classList.remove("hidden");
          hasPreviousAddressOptions.forEach((input) => {
            input.required = true;
          });
          if (recentlyMoved === "Yes") {
            enterUK.classList.remove("hidden");
            enterUKOptions.forEach((input) => {
              input.required = true;
            });
            movedFromEU.classList.remove("hidden");
            movedFromEUOptions.forEach((input) => {
              input.required = true;
            });
            interpreter.classList.remove("hidden");
            interpreterOptions.forEach((input) => {
              input.required = true;
            });
          }
          if (recentlyMoved === "No") {
            enterUK.classList.add("hidden");
            enterUKOptions.forEach((input) => {
              input.required = false;
              input.value = "";
            });
            movedFromEU.classList.add("hidden");
            movedFromEUOptions.forEach((input) => {
              input.required = false;
              input.checked = false;
            });
            interpreter.classList.add("hidden");
            interpreterOptions.forEach((input) => {
              input.required = false;
              input.checked = false;
            });
          }
        }
        resetHeight();
      });
    });

  // Moved from EU
  document.querySelectorAll('input[name="Moved-from-EU"]').forEach((elem) => {
    elem.addEventListener("change", function () {
      let value = this.value;

      documentsSection = document.getElementById("documents");
      const documentsOptions = documentsSection.querySelectorAll(
        'input[type="radio"]'
      );

      if (value === "Yes") {
        documentsSection.classList.remove("hidden");
        documentsOptions.forEach((input) => {
          input.required = true;
        });
      }
      if (value === "No") {
        documentsSection.classList.add("hidden");
        documentsOptions.forEach((input) => {
          input.required = false;
          input.checked = false;
        });
        ehicDetails.classList.add("hidden");
        ehicDetailsInputs.forEach((input) => {
          input.required = false;
          input.value = "";
        });
      }
      resetHeight();
    });
  });

  // Documents
  document.querySelectorAll('input[name="Documents"]').forEach((elem) => {
    elem.addEventListener("change", function () {
      let value = this.value;

      if (value === "European health insurance card (EHIC)") {
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
      resetHeight();
    });
  });

  // Interpreter
  document
    .querySelectorAll('input[name="Interpreter-needed"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        let value = this.value;

        preferredLang = document.getElementById("preferred-lang");
        preferredLangInput = document.getElementById("preferred-lang-input");

        if (value === "Yes") {
          preferredLang.classList.remove("hidden");
          preferredLangInput.required = true;
        } else {
          preferredLang.classList.add("hidden");
          preferredLangInput.required = false;
          preferredLangInput.value = "";
        }
        resetHeight();
      });
    });

  // Previous address
  document
    .querySelectorAll('input[name="Has-previous-UK-address"]')
    .forEach((elem) => {
      elem.addEventListener("change", function () {
        let value = this.value;

        const previousAddress = document.getElementById("previous-address");
        const previousAddressInput = document.getElementById(
          "previous-address-input"
        );

        if (value === "Yes") {
          previousAddress.classList.remove("hidden");
        } else {
          previousAddress.classList.add("hidden");
          previousAddressInput.value = "";
        }
        resetHeight();
      });
    });
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
  phoneInputField.value = phoneInput.getNumber();
}

nextBtn.addEventListener("click", () => scrollToTop());
nextArrow.addEventListener("click", () => nextBtn.click());

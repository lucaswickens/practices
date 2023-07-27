window.addEventListener("load", function () {
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
    console.log(place);

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

  const totalSlides = document.querySelectorAll(".w-slider-dot").length;
  document
    .getElementById("reset-height")
    .addEventListener("click", resetHeight);

  console.log(`Total slides: ${totalSlides}`);

  const widths = [20.25, 37.5, 51.75, 64, 75.25, 84.5, 92.75, 100];

  const sliderMask = document.querySelector("#w-slider-mask-0");

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
    console.log(`Total slides: ${totalSlides}`);
    const slideNo = document.getElementById("currentStep").textContent;
    console.log(`Slide no: ${slideNo}`);
    const target = slideNo + " of " + totalSlides;
    console.log(`Target: ${target}`);
    const slide = document.querySelector(
      '[aria-label="' + target + '"] .slide'
    );
    console.log(`Slide: ${slide}`);
    const slideHeight = slide.offsetHeight;
    console.log(`Slide height: ${slideHeight}`);
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
  document.querySelectorAll('input[name="ethnicity"]').forEach((elem) => {
    elem.addEventListener("change", function () {
      console.log("option changed");
      // Hide all content divs
      document
        .querySelectorAll(".sub-options")
        .forEach((div) => (div.classList.add('hidden')));

      // Get the value of the selected option
      let value = this.value;

      // Show the div with the matching data-ethnicity attribute
      if (value) {
        console.log("contains value");
        let selectedDiv = document.querySelector(
          `div[data-ethnicity='${value}']`
        );
        console.log(selectedDiv);
        if (selectedDiv) {
          selectedDiv.classList.remove('hidden');
          console.log("removed hidden class from selected div");
        }
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

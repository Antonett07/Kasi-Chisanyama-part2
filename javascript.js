document.getElementById("hamburger").onclick = function () {
  document.getElementById("nav-links").classList.toggle("show");
};

function updateDateTime() {
  const now = new Date();

  const date = now.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const time = now.toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("date-time").innerHTML = `${date} | ${time}`;
}

// Run once immediately
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('enquiry-form');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const enquiryTypeInput = document.getElementById('enquiryType');
    const genderInputs = document.getElementsByName('gender');
    const enquiryText = document.getElementById('enquiryText');
    const submitButton = document.getElementById('submit-button');

    // Regular expressions for validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;  // Phone number format: 10 digits

    // Feedback spans
    const nameFeedback = document.getElementById('name-feedback');
    const surnameFeedback = document.getElementById('surname-feedback');
    const emailFeedback = document.getElementById('email-feedback');
    const phoneFeedback = document.getElementById('phone-feedback');
    const enquiryFeedback = document.getElementById('enquiry-feedback');
    const genderFeedback = document.getElementById('gender-feedback');

    // Function to toggle the submit button state
    function toggleSubmitButton() {
        if (
            nameInput.classList.contains('valid') &&
            surnameInput.classList.contains('valid') &&
            emailInput.classList.contains('valid') &&
            phoneInput.classList.contains('valid') &&
            enquiryTypeInput.classList.contains('valid') &&
            genderFeedback.style.display === 'none' &&
            enquiryText.value.trim() !== ''
        ) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Validate Name
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('invalid');
            nameFeedback.textContent = 'Input required at this field.';
            nameFeedback.style.display = 'block';
        } else {
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
            nameFeedback.textContent = '';
            nameFeedback.style.display = 'none';
        }
        toggleSubmitButton();
    }

    // Validate Surname
    function validateSurname() {
        if (surnameInput.value.trim() === '') {
            surnameInput.classList.add('invalid');
            surnameFeedback.textContent = 'Input required at this field.';
            surnameFeedback.style.display = 'block';
        } else {
            surnameInput.classList.remove('invalid');
            surnameInput.classList.add('valid');
            surnameFeedback.textContent = '';
            surnameFeedback.style.display = 'none';
        }
        toggleSubmitButton();
    }

    // Validate Email
    function validateEmail() {
        if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add('invalid');
            emailFeedback.textContent = 'Missing @ required.';
            emailFeedback.style.display = 'block';
        } else {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailFeedback.textContent = '';
            emailFeedback.style.display = 'none';
        }
        toggleSubmitButton();
    }

    // Validate Phone Number
    function validatePhone() {
        if (!phonePattern.test(phoneInput.value)) {
            phoneInput.classList.add('invalid');
            phoneFeedback.textContent = 'Phone number must be 10 digits.';
            phoneFeedback.style.display = 'block';
        } else {
            phoneInput.classList.remove('invalid');
            phoneInput.classList.add('valid');
            phoneFeedback.textContent = '';
            phoneFeedback.style.display = 'none';
        }
        toggleSubmitButton();
    }

    // Validate Enquiry Type
    function validateEnquiryType() {
        if (enquiryTypeInput.value === '') {
            enquiryTypeInput.classList.add('invalid');
            enquiryFeedback.textContent = 'Please select an enquiry type.';
            enquiryFeedback.style.display = 'block';
        } else {
            enquiryTypeInput.classList.remove('invalid');
            enquiryTypeInput.classList.add('valid');
            enquiryFeedback.textContent = '';
            enquiryFeedback.style.display = 'none';
        }
        toggleSubmitButton();
    }

    // Validate Gender
    function validateGender() {
        let selectedGender = false;
        for (let gender of genderInputs) {
            if (gender.checked) {
                selectedGender = true;
                break;
            }
        }

        if (!selectedGender) {
            genderFeedback.textContent = 'Please select a gender.';
            genderFeedback.style.display = 'block';
        } else {
            genderFeedback.textContent = '';
            genderFeedback.style.display = 'none';
        }
        toggleSubmitButton();
    }

    // Focus on first invalid field after submission attempt
    function focusOnFirstInvalidField() {
        const invalidFields = document.querySelectorAll('.invalid');
        if (invalidFields.length > 0) {
            invalidFields[0].focus();
        }
    }

    // Form submission handler
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual form submission for validation

        // Validate all fields before submitting
        validateName();
        validateSurname();
        validateEmail();
        validatePhone();
        validateEnquiryType();
        validateGender();

        if (
            nameInput.classList.contains('valid') &&
            surnameInput.classList.contains('valid') &&
            emailInput.classList.contains('valid') &&
            phoneInput.classList.contains('valid') &&
            enquiryTypeInput.classList.contains('valid') &&
            genderFeedback.style.display === 'none' &&
            enquiryText.value.trim() !== ''
        ) {
            // If everything is valid, you can submit the form (e.g., send data to the server)
            alert('Form submitted successfully!');
        } else {
            // If not, focus on the first invalid field
            focusOnFirstInvalidField();
        }
    });

    // Attach live validation to input fields
    nameInput.addEventListener('input', validateName);
    surnameInput.addEventListener('input', validateSurname);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    enquiryTypeInput.addEventListener('change', validateEnquiryType);
    enquiryText.addEventListener('input', toggleSubmitButton);
    genderInputs.forEach(gender => gender.addEventListener('change', validateGender));

});

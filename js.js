
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


updateDateTime();
setInterval(updateDateTime, 1000);


const dropBtn = document.querySelector(".dropbtn");
if (dropBtn) {
    dropBtn.onclick = function () {
        document.querySelector(".dropdown-content").classList.toggle("show");
    };
}


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('enquiry-form');
    if (!form) return; 

    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const enquiryTypeInput = document.getElementById('enquiryType');
    const genderInputs = document.getElementsByName('gender');
    const enquiryText = document.getElementById('enquiryText');
    const submitButton = document.getElementById('submit-button');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    const feedbacks = {
        name: document.getElementById('name-feedback'),
        surname: document.getElementById('surname-feedback'),
        email: document.getElementById('email-feedback'),
        phone: document.getElementById('phone-feedback'),
        enquiry: document.getElementById('enquiry-feedback'),
        gender: document.getElementById('gender-feedback')
    };

    function toggleSubmitButton() {
        const allValid = nameInput.classList.contains('valid') &&
                         surnameInput.classList.contains('valid') &&
                         emailInput.classList.contains('valid') &&
                         phoneInput.classList.contains('valid') &&
                         enquiryTypeInput.classList.contains('valid') &&
                         enquiryText.value.trim() !== '' &&
                         feedbacks.gender.style.display === 'none';
        submitButton.disabled = !allValid;
    }

    function validateInput(input, feedback, condition, message) {
        if (!condition) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            feedback.textContent = message;
            feedback.style.display = 'block';
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
            feedback.textContent = '';
            feedback.style.display = 'none';
        }
        toggleSubmitButton();
    }

    function validateGender() {
        const selected = Array.from(genderInputs).some(g => g.checked);
        feedbacks.gender.style.display = selected ? 'none' : 'block';
        feedbacks.gender.textContent = selected ? '' : 'Please select a gender.';
        toggleSubmitButton();
    }

    if (nameInput) nameInput.addEventListener('input', () => validateInput(nameInput, feedbacks.name, nameInput.value.trim() !== '', 'Input required at this field.'));
    if (surnameInput) surnameInput.addEventListener('input', () => validateInput(surnameInput, feedbacks.surname, surnameInput.value.trim() !== '', 'Input required at this field.'));
    if (emailInput) emailInput.addEventListener('input', () => validateInput(emailInput, feedbacks.email, emailPattern.test(emailInput.value), 'Invalid email format.'));
    if (phoneInput) phoneInput.addEventListener('input', () => validateInput(phoneInput, feedbacks.phone, phonePattern.test(phoneInput.value), 'Phone number must be 10 digits.'));
    if (enquiryTypeInput) enquiryTypeInput.addEventListener('change', () => validateInput(enquiryTypeInput, feedbacks.enquiry, enquiryTypeInput.value !== '', 'Please select an enquiry type.'));
    if (enquiryText) enquiryText.addEventListener('input', toggleSubmitButton);
    genderInputs.forEach(g => g.addEventListener('change', validateGender));

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        validateGender();
        if (!submitButton.disabled) {
            alert('Form submitted successfully!');
            form.reset();
            submitButton.disabled = true;
        } else {
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
});

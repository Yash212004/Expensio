document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const spinner = document.getElementById("spinner");
    const messageBox = document.getElementById("message-box"); // A div for showing messages

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        if (!validateForm()) return;

        spinner.classList.remove("hidden");

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
        };

        try {
            const response = await axios.post("./contact", formData);
            showMessage("Message sent successfully!", "success");
            form.reset(); // Clear form fields
        } catch (error) {
            showMessage("Failed to send message. Please try again.", "error");
            console.error("Error:", error);
        } finally {
            spinner.classList.add("hidden");
        }
    });

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your name.");
            isValid = false;
        }
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }
        if (subjectInput.value.trim() === "") {
            showError(subjectInput, "Please enter a subject.");
            isValid = false;
        }
        if (messageInput.value.trim() === "") {
            showError(messageInput, "Please enter a message.");
            isValid = false;
        }

        return isValid;
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function showError(inputElement, message) {
        inputElement.classList.add("error");
        inputElement.nextElementSibling.textContent = message;
    }

    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = `message ${type}`;
        messageBox.style.display = "block";
        setTimeout(() => messageBox.style.display = "none", 4000);
    }

    spinner.classList.add("hidden"); // Hide spinner initially
});

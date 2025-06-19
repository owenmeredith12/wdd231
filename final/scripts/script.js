
async function fetchJobs() {
    try {
        const response = await fetch('scripts/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function displayJobs() {
    const jobList = document.getElementById("jobs-list");
    if (!jobList) return;
    jobList.innerHTML = "";

    try {
        const jobData = await fetchJobs();

        jobData.forEach((job) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${job.title}</strong> at ${job.company}, ${job.location}<br><em>${job.description}</em>`;
            jobList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading jobs:", error);
        jobList.innerHTML = "<li>Unable to load job listings at this time.</li>";
    }
}


function setupNewsletterForm() {
    const form = document.getElementById("newsletter-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();

        if (email) {
            localStorage.setItem("newsletterEmail", email);
            showMessage(`Thanks for subscribing, ${email}!`, "success");
            form.reset();
        } else {
            showMessage("Please enter a valid email.", "error");
        }
    });
}


function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name && email && message) {
            localStorage.setItem("contactSubmission", JSON.stringify({ name, email, message }));
            showMessage(`Thank you, ${name}. Your message has been sent.`, "success");
            form.reset();
        } else {
            showMessage("Please complete all fields.", "error");
        }
    });
}


function showMessage(text, type) {
    const existing = document.getElementById("form-message");
    if (existing) existing.remove();

    const message = document.createElement("div");
    message.id = "form-message";
    message.className = type === "success" ? "success-message" : "error-message";
    message.textContent = text;

    const form = document.querySelector("form");
    if (form) form.appendChild(message);
}


window.addEventListener("DOMContentLoaded", () => {
    displayJobs();
    setupNewsletterForm();
    setupContactForm();
});

/* =========================================================

   SIOMAIBETHEONE: TOKWASIOMAI

   Website interactions and order form handling

   ========================================================= */

 

// Mobile navigation

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

 

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");

  });

 

  navMenu.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("active");

      menuToggle.textContent = "☰";

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute("aria-label", "Open navigation");

    });

  });

}

 

// Set the current year in the footer.

const currentYear = document.getElementById("currentYear");

if (currentYear) currentYear.textContent = new Date().getFullYear();

 

// Order form validation and Formspree submission.

const orderForm = document.getElementById("orderForm");

const orderMessage = document.getElementById("orderMessage");

 

if (orderForm && orderMessage) {

  orderForm.addEventListener("submit", async (event) => {

    event.preventDefault();

 

    const name = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("customerPhone").value.trim();

    const product = document.getElementById("product").value;

    const quantity = Number(document.getElementById("quantity").value);

    const phonePattern = /^(09|\+639)\d{9}$/;

 

    const showMessage = (message, type) => {

      orderMessage.textContent = message;

      orderMessage.className = `form-message ${type}`;

    };

 

    if (!name || !phone || !product || !Number.isInteger(quantity) || quantity < 1) {

      showMessage("Please complete all required fields and enter a valid quantity.", "error");

      return;

    }

 

    if (!phonePattern.test(phone)) {

      showMessage("Please enter a valid Philippine mobile number (09XXXXXXXXX or +639XXXXXXXXX).", "error");

      return;

    }

 

    const submitButton = orderForm.querySelector("button[type='submit']");

    const originalButtonText = submitButton ? submitButton.textContent : "Send Order Request";

 

    if (submitButton) {

      submitButton.disabled = true;

      submitButton.textContent = "Sending...";

    }

 

    try {

      const response = await fetch(orderForm.action, {

        method: "POST",

        body: new FormData(orderForm),

        headers: { Accept: "application/json" }

      });

 

      if (response.ok) {

        showMessage(`Thank you, ${name}. Your request for ${quantity} order(s) of ${product} has been sent. We will contact you to confirm the details.`, "success");

        orderForm.reset();

      } else {

        showMessage("Your order request could not be sent. Please try again later.", "error");

      }

    } catch (error) {

      showMessage("Unable to send your request. Please check your internet connection and try again.", "error");

    } finally {

      if (submitButton) {

        submitButton.disabled = false;

        submitButton.textContent = originalButtonText;

      }

    }

  });

}

 

// Reveal content as it enters the viewport. Content remains visible if

// IntersectionObserver is unavailable.

const animatedElements = document.querySelectorAll(

  ".product-card, .benefit, .team-photo, .about-content"

);

 

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver((entries, currentObserver) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("is-visible");

        currentObserver.unobserve(entry.target);

      }

    });

  }, { threshold: 0.12 });

 

  animatedElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

  });

}
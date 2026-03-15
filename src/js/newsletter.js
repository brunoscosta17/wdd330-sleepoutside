const newsletterForm = document.querySelector('#newsletter-form');
const newsletterEmail = document.querySelector('#newsletter-email');
const newsletterMessage = document.querySelector('#newsletter-message');

if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = newsletterEmail.value.trim();

        if (!email) {
            newsletterMessage.textContent = 'Please enter your email address.';
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            newsletterMessage.textContent = 'Please enter a valid email address.';
            return;
        }

        localStorage.setItem('sleepoutside-newsletter-email', email);
        newsletterMessage.textContent = 'Thanks for subscribing!';
        newsletterForm.reset();
    });
}

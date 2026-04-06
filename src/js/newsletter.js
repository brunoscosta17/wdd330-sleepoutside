import { getLocalStorage, qs, setLocalStorage } from './utils.mjs';

const newsletterForm = qs('#newsletter-form');
const newsletterEmail = qs('#newsletter-email');
const newsletterMessage = qs('#newsletter-message');

const STORAGE_KEY = 'sleepoutside-newsletter-subscribers';

function showMessage(message, type = 'success') {
    newsletterMessage.textContent = message;
    newsletterMessage.classList.remove('success', 'error');
    newsletterMessage.classList.add(type);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function getSubscribers() {
    return getLocalStorage(STORAGE_KEY) || [];
}

function saveSubscriber(email) {
    const subscribers = getSubscribers();
    subscribers.push(email);
    setLocalStorage(STORAGE_KEY, subscribers);
}

if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = newsletterEmail.value.trim().toLowerCase();

        if (!email) {
            showMessage('Please enter your email address.', 'error');
            newsletterEmail.focus();
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            newsletterEmail.focus();
            return;
        }

        const subscribers = getSubscribers();

        if (subscribers.includes(email)) {
            showMessage('This email is already subscribed.', 'error');
            newsletterEmail.focus();
            return;
        }

        saveSubscriber(email);
        showMessage('Thanks for subscribing!', 'success');
        newsletterForm.reset();
    });
}

const leadForm = document.getElementById('lead-form');
const emailInput = document.getElementById('email');
const consentInput = document.getElementById('consent');
const formMessage = document.getElementById('form-message');
const downloadPanel = document.getElementById('download-panel');

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const consentChecked = consentInput.checked;

  if (!email) {
    formMessage.textContent = 'Enter your work email to get the checklist.';
    formMessage.className = 'form-message error';
    emailInput.focus();
    return;
  }

  if (!emailInput.checkValidity()) {
    formMessage.textContent = 'Enter a valid email address.';
    formMessage.className = 'form-message error';
    emailInput.focus();
    return;
  }

  if (!consentChecked) {
    formMessage.textContent = 'Please confirm consent before getting the checklist.';
    formMessage.className = 'form-message error';
    consentInput.focus();
    return;
  }

  formMessage.textContent = `Checklist ready for ${email}.`;
  formMessage.className = 'form-message success';
  downloadPanel.hidden = false;
  downloadPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

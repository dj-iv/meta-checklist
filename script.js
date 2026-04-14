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

  // Disable button to prevent double-submit
  const submitBtn = leadForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  fetch('https://services.leadconnectorhq.com/hooks/u7joybjA2VMQkCBcNPYb/webhook-trigger/49db6ae2-342d-4243-acd2-298f628d803a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'office-signal-checklist' }),
  })
    .catch(() => {
      // Silently continue — don't block the user from getting the checklist
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send me the checklist';
      formMessage.textContent = `Checklist ready for ${email}.`;
      formMessage.className = 'form-message success';
      downloadPanel.hidden = false;
      downloadPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

'use strict';

const CONFIG = {
  navOffset: 80,
  packageHighlightMs: 1800,
};

const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

document.getElementById('hero').classList.add('loaded');

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
    hamburger.focus();
  }
});

function scrollToBooking() {
  const section = document.getElementById('booking');
  const top = section.getBoundingClientRect().top + window.scrollY - CONFIG.navOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}

let _pkgHighlightTimer = null;

function selectPackage(packageName) {
  const sel = document.getElementById('chosenPackage');
  sel.value = packageName;
  sel.classList.remove('error');
  document.getElementById('err-package').classList.remove('visible');
  scrollToBooking();

  clearTimeout(_pkgHighlightTimer);
  sel.style.boxShadow = '0 0 0 3px rgba(201,168,130,0.40)';
  sel.style.borderColor = 'var(--gold)';
  _pkgHighlightTimer = setTimeout(() => {
    sel.style.boxShadow = '';
    sel.style.borderColor = '';
  }, CONFIG.packageHighlightMs);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

(function setMinDate() {
  const input    = document.getElementById('weddingDate');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const y  = tomorrow.getFullYear();
  const m  = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const d  = String(tomorrow.getDate()).padStart(2, '0');
  input.min = `${y}-${m}-${d}`;
})();

function $(id) { return document.getElementById(id); }

function setFieldError(fieldId, errId, hasError) {
  const field = $(fieldId);
  const msg   = $(errId);
  field.classList.toggle('error', hasError);
  msg.classList.toggle('visible', hasError);
}

function validatePhone(value) {
  return /^[\+\d][\d\s\-\(\)]{6,19}$/.test(value.trim());
}

function parseDateLocal(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

['clientName', 'contactNumber', 'weddingDate', 'chosenPackage'].forEach(id => {
  $(id).addEventListener('input', () => {
    $(id).classList.remove('error');
  });
});
$('consent').addEventListener('change', () => {
  $('err-consent').classList.remove('visible');
});

async function sendBookingData(data) {
  console.group('📋 Lorem Ipsum Bridal Framework — New Array Submission');
  console.table(data);
  console.groupEnd();
  await new Promise(resolve => setTimeout(resolve, 800));
  return { ok: true };
}

const form          = $('bookingForm');
const modalOverlay  = $('modalOverlay');
const modalClose    = $('modalClose');
const modalSummary  = $('modalSummary');
const submitBtn     = $('submitBtn');
const submitBtnText = $('submitBtnText');

let submissionErrorEl = null;
function showSubmissionError(msg) {
  if (!submissionErrorEl) {
    submissionErrorEl = document.createElement('p');
    submissionErrorEl.style.cssText = 'color:var(--error);font-size:0.82rem;margin-bottom:1rem;text-align:center;';
    submitBtn.before(submissionErrorEl);
  }
  submissionErrorEl.textContent = msg;
  submissionErrorEl.style.display = 'block';
}
function clearSubmissionError() {
  if (submissionErrorEl) submissionErrorEl.style.display = 'none';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearSubmissionError();

  const name    = $('clientName').value.trim();
  const phone   = $('contactNumber').value.trim();
  const dateStr = $('weddingDate').value;
  const pkg     = $('chosenPackage').value;
  const guests  = $('guestCount').value;
  const notes   = $('notes').value.trim();
  const consent = $('consent').checked;

  let valid = true;

  const badName = name.length < 2;
  setFieldError('clientName', 'err-name', badName);
  if (badName) valid = false;

  const badPhone = !validatePhone(phone);
  setFieldError('contactNumber', 'err-phone', badPhone);
  if (badPhone) valid = false;

  let selectedDate = null;
  let badDate = !dateStr;
  if (!badDate) {
    selectedDate = parseDateLocal(dateStr);
    const today  = new Date(); today.setHours(0, 0, 0, 0);
    badDate = selectedDate <= today;
    $('err-date').textContent = badDate ? 'Wedding date must be in the future.' : 'Please select a future wedding date.';
  }
  setFieldError('weddingDate', 'err-date', badDate);
  if (badDate) valid = false;

  const badPkg = !pkg;
  setFieldError('chosenPackage', 'err-package', badPkg);
  if (badPkg) valid = false;

  $('err-consent').classList.toggle('visible', !consent);
  if (!consent) valid = false;

  if (!valid) {
    const firstError = form.querySelector('.error');
    if (firstError) {
      const top = firstError.getBoundingClientRect().top + window.scrollY - CONFIG.navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    return;
  }

  const dateDisplay = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : dateStr;

  const bookingData = {
    clientName:    name,
    contactNumber: phone,
    weddingDate:   dateDisplay,
    guestCount:    guests  || 'Not specified',
    chosenPackage: pkg,
    notes:         notes   || 'None',
    submittedAt:   new Date().toLocaleString(),
  };

  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  submitBtnText.textContent = 'Processing Data Array…';

  try {
    await sendBookingData(bookingData);
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtnText.textContent = 'Submit Booking Request';
    showSubmissionError('Something went wrong processing your request. Please try again.');
    return;
  }

  submitBtnText.textContent = 'Submitted ✓';
  submitBtn.classList.remove('loading');

  const summaryRows = [
    ['Client',  bookingData.clientName],
    ['Contact', bookingData.contactNumber],
    ['Date',    bookingData.weddingDate],
    ['Guests',  bookingData.guestCount],
    ['Package', bookingData.chosenPackage],
  ];
  modalSummary.innerHTML = summaryRows
    .map(([label, val]) => `<div class="modal-summary-row"><span>${label}</span><span>${val}</span></div>`)
    .join('');

  openModal();
});

function openModal() {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => modalClose.focus(), 50);
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  form.reset();
  submitBtn.disabled = false;
  submitBtnText.textContent = 'Submit Booking Request';
  clearSubmissionError();
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.field-error').forEach(el => el.classList.remove('visible'));
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal(); });

(function () {
  'use strict';

  function initLucide() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /* ── THEME TOGGLE (auth pages) ── */
  (function () {
    var saved = localStorage.getItem('fornix-theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (saved === 'light' || (!saved && prefersLight)) {
      document.documentElement.classList.add('light-mode');
    }

    if (!document.getElementById('themeToggle')) {
      var btn = document.createElement('button');
      btn.className = 'auth-theme-toggle';
      btn.id = 'themeToggle';
      btn.setAttribute('aria-label', 'Toggle theme');
      btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>' +
        '</svg>';
      document.body.appendChild(btn);

      function updateIcon() {
        var isLight = document.documentElement.classList.contains('light-mode');
        btn.innerHTML = isLight
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
      }
      updateIcon();

      btn.addEventListener('click', function () {
        document.documentElement.classList.toggle('light-mode');
        var isLight = document.documentElement.classList.contains('light-mode');
        localStorage.setItem('fornix-theme', isLight ? 'light' : 'dark');
        updateIcon();
      });
    }
  })();

  /* ── PASSWORD TOGGLE ── */
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.auth-password-toggle');
    if (!toggle) return;
    var input = toggle.parentElement.querySelector('.auth-input');
    var icon = toggle.querySelector('svg use');
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.setAttribute('href', '#icon-eye');
      toggle.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    } else {
      input.type = 'password';
      toggle.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
    }
  });

  /* ── PASSWORD STRENGTH ── */
  document.addEventListener('input', function (e) {
    var input = e.target.closest('#signupPassword');
    if (!input) return;
    var val = input.value;
    var bars = document.querySelectorAll('.auth-strength-bar span');
    var text = document.querySelector('.auth-strength-text');
    if (!bars.length || !text) return;
    var score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    bars.forEach(function (b, i) {
      b.className = '';
      if (i < score) {
        if (score <= 2) b.classList.add('weak');
        else if (score <= 3) b.classList.add('medium');
        else b.classList.add('strong');
      }
    });
    var labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
    text.textContent = labels[score] || '';
  });

  /* ── PASSWORD CONFIRM VALIDATION ── */
  document.addEventListener('input', function (e) {
    var input = e.target.closest('#signupConfirm');
    if (!input) return;
    var pw = document.getElementById('signupPassword');
    var err = input.closest('.auth-field').querySelector('.auth-error-msg');
    if (!pw || !err) return;
    if (input.value && input.value !== pw.value) {
      input.classList.add('error');
      err.textContent = 'Passwords do not match';
      err.classList.add('show');
    } else {
      input.classList.remove('error');
      err.classList.remove('show');
    }
  });

  /* ── SIGN IN FORM ── */
  var signinForm = document.getElementById('signinForm');
  if (signinForm) {
    signinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = signinForm.querySelector('.auth-submit');
      btn.disabled = true;
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Signing in...';
      setTimeout(function () {
        window.location.href = 'index.html';
      }, 1200);
    });
  }

  /* ── SIGN UP FORM ── */
  var signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var pw = document.getElementById('signupPassword');
      var confirm = document.getElementById('signupConfirm');
      if (pw && confirm && pw.value !== confirm.value) {
        confirm.classList.add('error');
        var err = confirm.closest('.auth-field').querySelector('.auth-error-msg');
        if (err) { err.textContent = 'Passwords do not match'; err.classList.add('show'); }
        return;
      }
      var btn = signupForm.querySelector('.auth-submit');
      btn.disabled = true;
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Creating account...';
      setTimeout(function () {
        showToast('Account created successfully!');
        setTimeout(function () { window.location.href = 'sign-in.html'; }, 800);
      }, 1500);
    });
  }

  /* ── FORGOT PASSWORD MODAL ── */
  var forgotBtn = document.getElementById('forgotBtn');
  var forgotModal = document.getElementById('forgotModal');
  var forgotClose = document.getElementById('forgotClose');
  var forgotForm = document.getElementById('forgotForm');
  if (forgotBtn && forgotModal) {
    forgotBtn.addEventListener('click', function (e) {
      e.preventDefault();
      forgotModal.classList.add('open');
    });
  }
  if (forgotClose) {
    forgotClose.addEventListener('click', function () {
      forgotModal.classList.remove('open');
    });
  }
  if (forgotModal) {
    forgotModal.addEventListener('click', function (e) {
      if (e.target === forgotModal) forgotModal.classList.remove('open');
    });
  }
  if (forgotForm) {
    var forgotSuccess = document.getElementById('forgotSuccess');
    var forgotFormBody = document.getElementById('forgotFormBody');
    forgotForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = forgotForm.querySelector('.auth-submit');
      btn.disabled = true;
      btn.innerHTML = 'Sending...';
      setTimeout(function () {
        if (forgotFormBody) forgotFormBody.style.display = 'none';
        if (forgotSuccess) forgotSuccess.classList.add('show');
      }, 1000);
    });
  }

  /* ── TOAST ── */
  var toastTimer;
  function showToast(msg) {
    var el = document.getElementById('authToast');
    if (!el) return;
    el.querySelector('.auth-toast-text').textContent = msg;
    el.classList.add('open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('open'); }, 3000);
  }

  /* ── ESCAPE ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.auth-modal-overlay.open, .modal-overlay.open').forEach(function (m) {
        m.classList.remove('open');
      });
    }
  });

  initLucide();
})();
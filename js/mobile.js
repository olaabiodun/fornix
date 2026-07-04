/* ── MOBILE TOGGLES + USER POPUP + THEME ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  var sidebar = document.getElementById('sidebar');
  var mobileOverlay = document.getElementById('mobileOverlay');
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var mobileSidebarClose = document.getElementById('mobileSidebarClose');
  var rpToggle = document.getElementById('rpToggle');

  /* ── THEME TOGGLE ── */
  (function () {
    var saved = localStorage.getItem('fornix-theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (saved === 'light' || (!saved && prefersLight)) {
      document.documentElement.classList.add('light-mode');
    }

    var topbarRight = document.querySelector('.topbar-right');
    if (topbarRight && !document.getElementById('themeToggle')) {
      var btn = document.createElement('button');
      btn.className = 'theme-toggle';
      btn.id = 'themeToggle';
      btn.setAttribute('aria-label', 'Toggle theme');
      btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>' +
        '</svg>';
      topbarRight.insertBefore(btn, topbarRight.firstChild);

      var themeIcon = btn.querySelector('svg');
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
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }
  })();

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
  if (mobileSidebarClose) mobileSidebarClose.addEventListener('click', closeSidebar);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeSidebar);

  /* ── DESKTOP SIDEBAR TOGGLE ── */
  var sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
    });
  }

  /* ── USER PROFILE POPUP ── */
  var userItem = document.querySelector('.sb-footer .user-item');
  if (userItem && !document.querySelector('.user-popup')) {
    var popup = document.createElement('div');
    popup.className = 'user-popup';
    popup.innerHTML =
      '<div class="user-popup-head">' +
        '<div class="user-popup-av"><img src="https://i.pravatar.cc/60?u=abiodun" alt="A" loading="lazy"></div>' +
        '<div class="user-popup-info"><div class="user-popup-name">Abiodun</div><div class="user-popup-email">abiodun@fornix.com</div></div>' +
      '</div>' +
      '<div class="user-popup-items">' +
        '<div class="user-popup-item"><i data-lucide="user" style="width:14px;height:14px;"></i> View Profile</div>' +
        '<div class="user-popup-item"><i data-lucide="settings" style="width:14px;height:14px;"></i> Account Settings</div>' +
        '<div class="user-popup-item"><i data-lucide="credit-card" style="width:14px;height:14px;"></i> Billing</div>' +
        '<div class="user-popup-item"><i data-lucide="users" style="width:14px;height:14px;"></i> Team Members</div>' +
        '<div class="user-popup-item"><i data-lucide="keyboard" style="width:14px;height:14px;"></i> Keyboard Shortcuts</div>' +
        '<div class="user-popup-divider"></div>' +
        '<div class="user-popup-item danger" id="signOutBtn"><i data-lucide="log-out" style="width:14px;height:14px;"></i> Sign Out</div>' +
      '</div>';
    userItem.parentElement.appendChild(popup);

    userItem.addEventListener('click', function (e) {
      e.stopPropagation();
      popup.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!popup.contains(e.target) && !userItem.contains(e.target)) {
        popup.classList.remove('open');
      }
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /* ── POPUP NAVIGATION ── */
  document.addEventListener('click', function (e) {
    var item = e.target.closest('.user-popup-item');
    if (!item) return;
    var text = item.textContent.trim();
    if (item.id === 'signOutBtn') {
      window.location.href = 'sign-in.html';
    } else if (text === 'Account Settings') {
      window.location.href = 'settings.html#profile';
    } else if (text === 'Billing') {
      window.location.href = 'settings.html#billing';
    } else if (text === 'Team Members') {
      window.location.href = 'settings.html#team';
    } else if (text === 'View Profile') {
      window.location.href = 'settings.html#profile';
    }
  });
});

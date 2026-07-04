document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  function activateTab(tabId) {
    document.querySelectorAll('.set-nav-item').forEach(function (n) { n.classList.remove('active'); });
    document.querySelectorAll('.set-tab').forEach(function (t) { t.classList.remove('active'); });
    var navItem = document.querySelector('.set-nav-item[data-tab="' + tabId + '"]');
    if (navItem) navItem.classList.add('active');
    var tabEl = document.getElementById('tab' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
    if (tabEl) tabEl.classList.add('active');
    var select = document.getElementById('setMobileSelect');
    if (select) select.value = tabId;
  }

  /* ── READ HASH ON LOAD ── */
  var hash = window.location.hash.replace('#', '');
  var validTabs = ['profile', 'security', 'notifications', 'billing', 'team'];
  if (hash && validTabs.indexOf(hash) !== -1) {
    activateTab(hash);
  }

  /* ── SIDEBAR TAB CLICK ── */
  document.querySelectorAll('.set-nav-item').forEach(function (item) {
    item.addEventListener('click', function () {
      activateTab(this.dataset.tab);
    });
  });

  /* ── MOBILE DROPDOWN ── */
  var mobileSelect = document.getElementById('setMobileSelect');
  if (mobileSelect) {
    mobileSelect.addEventListener('change', function () {
      activateTab(this.value);
    });
  }
});
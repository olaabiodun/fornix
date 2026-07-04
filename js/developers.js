(function () {
  'use strict';

  /* ── API USAGE CHART ── */
  var ctx = document.getElementById('apiUsageChart');
  if (ctx) {
    ctx = ctx.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'API Calls',
          data: [1240, 1800, 950, 2100, 1430, 890, 1650],
          borderColor: '#0ecb81',
          backgroundColor: 'rgba(14,203,129,.08)',
          fill: true,
          tension: .35,
          pointRadius: 2,
          pointHoverRadius: 4,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#6f767e', font: { size: 9, family: 'Inter' } }
          },
          y: {
            grid: { color: 'rgba(111,118,126,.12)' },
            ticks: { color: '#6f767e', font: { size: 9, family: 'Inter' }, maxTicksLimit: 5 }
          }
        }
      }
    });
  }

  /* ── TABS (API Keys / Webhooks / Quick Start) ── */
  var tabBtns = document.querySelectorAll('.dev-nav-item');
  var tabs = document.querySelectorAll('.dev-tab');
  if (tabBtns.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabs.forEach(function (t) { t.classList.remove('active'); });
        btn.classList.add('active');
        var target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ── LANGUAGE TABS ── */
  var langBtns = document.querySelectorAll('.dev-lang-tab');
  var langContent = document.querySelectorAll('.dev-lang-content');
  if (langBtns.length) {
    langBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        langBtns.forEach(function (b) { b.classList.remove('active'); });
        langContent.forEach(function (c) { c.style.display = 'none'; });
        btn.classList.add('active');
        var target = document.getElementById(btn.dataset.lang);
        if (target) target.style.display = '';
      });
    });
  }

  /* ── SHOW / HIDE KEY ── */
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.dev-key-toggle');
    if (!toggle) return;
    var code = toggle.closest('.dev-key-value').querySelector('code');
    if (code.classList.contains('hidden')) {
      code.classList.remove('hidden');
      toggle.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    } else {
      code.classList.add('hidden');
      toggle.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
    }
  });

  /* ── COPY KEY ── */
  document.addEventListener('click', function (e) {
    var copy = e.target.closest('.dev-key-action:not(.red)');
    if (!copy || !copy.closest('.dev-key-card')) return;
    var code = copy.closest('.dev-key-card').querySelector('.dev-key-value code');
    if (!code) return;
    var text = code.textContent.trim();
    navigator.clipboard.writeText(text).then(function () {
      copy.textContent = 'Copied!';
      setTimeout(function () { copy.textContent = 'Copy'; }, 2000);
    }).catch(function () {});
  });

  /* ── GENERATE KEY MODAL ── */
  var genBtn = document.getElementById('genKeyBtn');
  var genModal = document.getElementById('genKeyOverlay');
  var genClose = document.getElementById('genKeyClose');
  var genCancel = document.getElementById('genKeyCancel');
  var genSave = document.getElementById('genKeySave');

  function openGen() {
    genModal.style.display = '';
    document.body.style.overflow = 'hidden';
  }
  function closeGen() {
    genModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (genBtn) genBtn.addEventListener('click', openGen);
  if (genModal) genModal.addEventListener('click', function (e) {
    if (e.target === genModal) closeGen();
  });
  if (genClose) genClose.addEventListener('click', closeGen);
  if (genCancel) genCancel.addEventListener('click', closeGen);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeGen();
  });
  if (genSave) genSave.addEventListener('click', function (e) {
    e.preventDefault();
    closeGen();
    showToast('API key generated successfully');
  });

  /* ── COPY CODE BLOCK ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.dev-copy-btn');
    if (!btn) return;
    var codeBlock = btn.closest('.dev-docs-card').querySelector('.dev-code');
    if (!codeBlock) return;
    var text = codeBlock.textContent.trim();
    navigator.clipboard.writeText(text).then(function () {
      btn.classList.add('copied');
      btn.textContent = 'Copied';
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.textContent = 'Copy';
      }, 2000);
    }).catch(function () {});
  });

  /* ── DELETE KEY CONFIRM ── */
  document.addEventListener('click', function (e) {
    var del = e.target.closest('.dev-key-action.red');
    if (!del) return;
    if (confirm('Are you sure you want to delete this API key?')) {
      del.closest('.dev-key-card').remove();
      showToast('API key deleted');
    }
  });

  /* ── WEBHOOK TOGGLE ── */
  document.addEventListener('click', function (e) {
    var whToggle = e.target.closest('.dev-webhook-status');
    if (!whToggle) return;
    if (whToggle.classList.contains('active')) {
      whToggle.classList.remove('active');
      whToggle.classList.add('paused');
      whToggle.title = 'Paused';
      showToast('Webhook paused');
    } else {
      whToggle.classList.remove('paused');
      whToggle.classList.add('active');
      whToggle.title = 'Active';
      showToast('Webhook activated');
    }
  });

  /* ── COPY WEBHOOK SECRET ── */
  document.addEventListener('click', function (e) {
    var sec = e.target.closest('.dev-webhook-secret');
    if (!sec) return;
    var text = sec.textContent.trim().replace('Secret: ', '');
    navigator.clipboard.writeText(text).then(function () {
      var orig = sec.textContent;
      sec.textContent = 'Copied!';
      setTimeout(function () { sec.textContent = orig; }, 1500);
    }).catch(function () {});
  });

  /* ── TOAST ── */
  var toastTimer;
  function showToast(msg) {
    var el = document.getElementById('keyToast');
    if (!el) return;
    el.querySelector('.dev-toast-text').textContent = msg;
    el.classList.add('open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('open'); }, 3000);
  }
  var toastClose = document.getElementById('toastClose');
  if (toastClose) {
    toastClose.addEventListener('click', function () {
      document.getElementById('keyToast').classList.remove('open');
    });
  }

  /* ── MOCK DATA ── */
  var apiKeys = [
    { name: 'Production API Key', key: 'lf_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p', badge: 'live', perms: ['read', 'write'], created: '2026-04-12' },
    { name: 'Staging API Key', key: 'lf_test_z9y8x7w6v5u4t3s2r1q0p9o8i7u6y5', badge: 'test', perms: ['read', 'write', 'admin'], created: '2026-05-20' },
    { name: 'Mobile App Key', key: 'lf_live_m1n2b3v4c5x6z7a8s9d0f1g2h3j4k5l', badge: 'live', perms: ['read'], created: '2026-06-15' }
  ];
  var apiKeyList = document.getElementById('apiKeyList');
  if (apiKeyList) {
    apiKeys.forEach(function (k) {
      var permsHTML = '';
      k.perms.forEach(function (p) { permsHTML += '<span class="dev-key-perm">' + p + '</span>'; });
      var card = document.createElement('div');
      card.className = 'dev-key-card';
      card.innerHTML =
        '<div class="dev-key-top">' +
          '<div class="dev-key-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="15" r="4"/><path d="M10.85 12.15 19 4"/><path d="m18 5 2 2"/><path d="m15 8 2 2"/></svg></div>' +
          '<div class="dev-key-name">' + k.name + '</div>' +
          '<span class="dev-key-badge ' + k.badge + '">' + k.badge.charAt(0).toUpperCase() + k.badge.slice(1) + '</span>' +
          '<div class="dev-key-perms">' + permsHTML + '</div>' +
        '</div>' +
        '<div class="dev-key-value">' +
          '<code class="hidden">' + k.key + '</code>' +
          '<button class="dev-key-toggle">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="eye-off">' +
              '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>' +
              '<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>' +
              '<line x1="1" y1="1" x2="23" y2="23"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +
        '<div class="dev-key-meta">' +
          '<span>Created ' + k.created + '</span>' +
          '<div class="dev-key-actions">' +
            '<button class="dev-key-action">Copy</button>' +
            '<button class="dev-key-action red">Delete</button>' +
          '</div>' +
        '</div>';
      apiKeyList.appendChild(card);
    });
  }

  var webhooks = [
    { url: 'https://api.myapp.com/webhooks/ludo', events: 'charge.completed, refund.completed', status: 'active', sent: '12.4k', rate: '99.8%', secret: 'whsec_abc123...' },
    { url: 'https://staging.myapp.com/hooks/ludo', events: 'charge.*', status: 'paused', sent: '3.2k', rate: '97.5%', secret: 'whsec_def456...' }
  ];
  var webhookList = document.getElementById('webhookList');
  if (webhookList) {
    webhooks.forEach(function (w) {
      var el = document.createElement('div');
      el.className = 'dev-webhook';
      el.innerHTML =
        '<div class="dev-webhook-status ' + w.status + '" title="' + w.status.charAt(0).toUpperCase() + w.status.slice(1) + '"></div>' +
        '<div class="dev-webhook-info">' +
          '<div class="dev-webhook-url">' + w.url + '</div>' +
          '<div class="dev-webhook-events">Events: ' + w.events + '</div>' +
          '<div class="dev-webhook-secret">Secret: ' + w.secret + '</div>' +
        '</div>' +
        '<div class="dev-webhook-stats">' +
          '<div class="dev-webhook-stat"><div class="dev-webhook-stat-val">' + w.sent + '</div><div class="dev-webhook-stat-lbl">Sent</div></div>' +
          '<div class="dev-webhook-stat"><div class="dev-webhook-stat-val">' + w.rate + '</div><div class="dev-webhook-stat-lbl">Rate</div></div>' +
        '</div>';
      webhookList.appendChild(el);
    });
  }

  var activityData = [
    { path: 'GET /v1/charges', time: '2 min ago', dot: 'green' },
    { path: 'POST /v1/refunds', time: '14 min ago', dot: 'green' },
    { path: 'GET /v1/customers', time: '31 min ago', dot: 'amber' },
    { path: 'DELETE /v1/keys/live_...', time: '1h ago', dot: 'red' },
    { path: 'POST /v1/disputes', time: '2h ago', dot: 'green' },
    { path: 'GET /v1/balance', time: '3h ago', dot: 'green' },
    { path: 'POST /v1/charges', time: '5h ago', dot: 'amber' }
  ];
  var activityList = document.getElementById('devActivityList');
  if (activityList) {
    activityData.forEach(function (a) {
      var el = document.createElement('div');
      el.className = 'dev-activity-item';
      el.innerHTML =
        '<div class="dev-activity-dot ' + a.dot + '"></div>' +
        '<div class="dev-activity-info">' +
          '<div class="dev-activity-path">' + a.path + '</div>' +
          '<div class="dev-activity-meta"><span>' + a.time + '</span></div>' +
        '</div>';
      activityList.appendChild(el);
    });
  }

  /* ── USER POPUP (shared) ── */
  var userBtn = document.getElementById('userBtn');
  var userPopup = document.getElementById('userPopup');
  if (userBtn && userPopup) {
    userBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      userPopup.classList.toggle('show');
    });
    document.addEventListener('click', function (e) {
      if (userPopup.classList.contains('show') && !userPopup.contains(e.target) && e.target !== userBtn) {
        userPopup.classList.remove('show');
      }
    });
  }

  /* ── MODAL CLOSE ON ESCAPE ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)').forEach(function (m) {
        m.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
  });

})();
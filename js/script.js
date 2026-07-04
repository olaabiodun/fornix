document.addEventListener('DOMContentLoaded', function () {
  lucide.createIcons();

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
        updateChartColors();
      });
    }
  })();

  /* ── COUNTER ANIMATION ── */
  function animateCount(el, target, prefix, suffix, duration) {
    if (!prefix) prefix = '';
    if (!suffix) suffix = '';
    if (!duration) duration = 1200;
    let start = 0, step = target / (duration / 16);
    const tick = function () {
      start = Math.min(start + step, target);
      var formatted = Math.floor(start).toLocaleString();
      el.textContent = prefix + formatted + suffix;
      if (start < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  setTimeout(function () {
    animateCount(document.getElementById('rev'), 3250, '₦');
    animateCount(document.getElementById('avg'), 3250, '₦');
  }, 300);

  /* ── SIDEBAR TOGGLE ── */
  var sidebarToggle = document.getElementById('sidebarToggle');
  var sidebar = document.getElementById('sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
    });
  }

  /* ── TOPBAR BUTTONS ── */
  (function () {
    var topbar = document.querySelector('.topbar');
    if (!topbar) return;

    topbar.addEventListener('click', function (e) {
      var target = e.target.closest('.tb-btn, .toggle, .search-bar, .notif-btn');
      if (!target) return;

      /* Settings */
      if (target.querySelector('[data-lucide="settings-2"]')) {
        window.location.href = 'settings.html';
        return;
      }

      /* Live/Sandbox toggle */
      if (target.classList.contains('toggle')) {
        var wrap = target.closest('.live-wrap');
        if (wrap) {
          wrap.classList.toggle('sandbox');
          var dot = wrap.querySelector('.live-dot');
          var text = wrap.querySelector('.live-text');
          var isSandbox = wrap.classList.contains('sandbox');
          text.textContent = isSandbox ? 'Sandbox' : 'Live mode';
        }
        return;
      }

      /* Notification bell */
      if (target.classList.contains('notif-btn') || target.closest('.notif-btn')) {
        var btn = target.closest('.notif-btn') || target;
        var dd = btn.querySelector('.notif-dropdown');
        if (!dd) {
          dd = document.createElement('div');
          dd.className = 'notif-dropdown';
          dd.innerHTML =
            '<div class="notif-head"><span class="notif-head-title">Notifications</span><button class="notif-head-action">Mark all read</button></div>' +
            '<div class="notif-item"><div class="notif-item-icon green"><i data-lucide="check-circle" style="width:13px;height:13px;"></i></div><div class="notif-item-body"><div class="notif-item-text">Transaction #TXN-2847 completed successfully</div><div class="notif-item-time">2 min ago</div></div></div>' +
            '<div class="notif-item"><div class="notif-item-icon blue"><i data-lucide="user-plus" style="width:13px;height:13px;"></i></div><div class="notif-item-body"><div class="notif-item-text">New customer registered: Amina Yusuf</div><div class="notif-item-time">15 min ago</div></div></div>' +
            '<div class="notif-item"><div class="notif-item-icon amber"><i data-lucide="refresh-ccw" style="width:13px;height:13px;"></i></div><div class="notif-item-body"><div class="notif-item-text">Refund #RFD-033 requested by Chioma Okonkwo</div><div class="notif-item-time">1 hr ago</div></div></div>' +
            '<div class="notif-item"><div class="notif-item-icon red"><i data-lucide="alert-triangle" style="width:13px;height:13px;"></i></div><div class="notif-item-body"><div class="notif-item-text">Dispute #DSP-012 escalated — action required</div><div class="notif-item-time">3 hrs ago</div></div></div>';
          btn.style.position = 'relative';
          btn.appendChild(dd);
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        e.stopPropagation();
        dd.classList.toggle('open');
        return;
      }
    });

    document.addEventListener('click', function (e) {
      document.querySelectorAll('.notif-dropdown.open').forEach(function (dd) {
        if (!dd.closest('.notif-btn') || !dd.closest('.notif-btn').contains(e.target)) {
          dd.classList.remove('open');
        }
      });
    });
  })();

  /* ── CHART TABS ── */
  document.querySelectorAll('.chart-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.chart-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });

  var revenueChart, channelChart, g1, g2, g3;

  function getChartColors() {
    var isLight = document.documentElement.classList.contains('light-mode');
    return {
      grid: isLight ? 'rgba(225,229,236,.8)' : 'rgba(28,35,54,.8)',
      tick: isLight ? '#9aa2b5' : '#3d4a66',
      tooltipBg: isLight ? '#ffffff' : '#1c2336',
      tooltipBorder: isLight ? '#e1e5ec' : '#253050',
      tooltipTitle: isLight ? '#565d74' : '#7c88a8',
      tooltipBody: isLight ? '#0c0e16' : '#eef0f7',
      gaugeBg: isLight ? '#eef0f5' : '#1c2336',
      donutColors: isLight
        ? ['#0ecb81', '#4f8ef7', '#a78bfa', '#f6b44d']
        : ['#0ecb81', '#4f8ef7', '#a78bfa', '#f6b44d'],
      legendText: isLight ? '#565d74' : '#7c88a8',
      pointBorder: isLight ? '#ffffff' : '#111620',
    };
  }

  function updateChartColors() {
    var c = getChartColors();

    if (revenueChart) {
      revenueChart.options.scales.x.grid.color = c.grid;
      revenueChart.options.scales.x.ticks.color = c.tick;
      revenueChart.options.scales.y.grid.color = c.grid;
      revenueChart.options.scales.y.ticks.color = c.tick;
      revenueChart.options.plugins.tooltip.backgroundColor = c.tooltipBg;
      revenueChart.options.plugins.tooltip.borderColor = c.tooltipBorder;
      revenueChart.options.plugins.tooltip.titleColor = c.tooltipTitle;
      revenueChart.options.plugins.tooltip.bodyColor = c.tooltipBody;
      revenueChart.data.datasets[0].pointBorderColor = c.pointBorder;
      revenueChart.update();
    }

    if (channelChart) {
      channelChart.options.plugins.legend.labels.color = c.legendText;
      channelChart.options.plugins.tooltip.backgroundColor = c.tooltipBg;
      channelChart.options.plugins.tooltip.borderColor = c.tooltipBorder;
      channelChart.options.plugins.tooltip.titleColor = c.tooltipTitle;
      channelChart.options.plugins.tooltip.bodyColor = c.tooltipBody;
      channelChart.update();
    }

    if (g1) { g1.data.datasets[0].backgroundColor[1] = c.gaugeBg; g1.update(); }
    if (g2) { g2.data.datasets[0].backgroundColor[1] = c.gaugeBg; g2.update(); }
    if (g3) { g3.data.datasets[0].backgroundColor[1] = c.gaugeBg; g3.update(); }
  }

  /* ── REVENUE LINE CHART ── */
  var rCtx = document.getElementById('revenueChart').getContext('2d');
  var labels = ['Jun 1', 'Jun 3', 'Jun 5', 'Jun 7', 'Jun 9', 'Jun 11', 'Jun 13', 'Jun 15', 'Jun 17', 'Jun 19', 'Jun 21', 'Jun 23', 'Jun 25', 'Jun 27', 'Jun 29', 'Jul 1'];
  var data = [0, 0, 3250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var grad = rCtx.createLinearGradient(0, 0, 0, 190);
  grad.addColorStop(0, 'rgba(14,203,129,.22)');
  grad.addColorStop(1, 'rgba(14,203,129,0)');
  var cc = getChartColors();

  revenueChart = new Chart(rCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        borderColor: '#0ecb81',
        borderWidth: 2.5,
        fill: true,
        backgroundColor: grad,
        pointRadius: data.map(function (v) { return v > 0 ? 6 : 0; }),
        pointBackgroundColor: '#0ecb81',
        pointBorderColor: cc.pointBorder,
        pointBorderWidth: 2.5,
        pointHoverRadius: 8,
        tension: 0.35,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: cc.tooltipBg,
          borderColor: cc.tooltipBorder,
          borderWidth: 1,
          titleColor: cc.tooltipTitle,
          bodyColor: cc.tooltipBody,
          bodyFont: { family: 'Inter', size: 13 },
          titleFont: { family: 'Plus Jakarta Sans', size: 11 },
          padding: 12,
          callbacks: { label: function (c) { return ' \u20A6' + c.raw.toLocaleString(); } }
        }
      },
      scales: {
        x: {
          grid: { color: cc.grid, drawBorder: false },
          ticks: { color: cc.tick, font: { size: 10.5, family: 'Plus Jakarta Sans' }, maxRotation: 0, maxTicksLimit: 8 },
          border: { display: false }
        },
        y: {
          grid: { color: cc.grid, drawBorder: false },
          ticks: { color: cc.tick, font: { size: 10.5, family: 'Inter' }, callback: function (v) { return '\u20A6' + v.toLocaleString(); } },
          border: { display: false }, min: 0, max: 4000
        }
      }
    }
  });

  /* ── GAUGE ── */
  function gauge(id, val, color) {
    var canvas = document.getElementById(id);
    canvas.width = 100;
    canvas.height = 56;
    var c = getChartColors();
    var chart = new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [val, 100 - val],
          backgroundColor: [color, c.gaugeBg],
          borderWidth: 0,
          borderRadius: val > 0 ? 4 : 0,
        }]
      },
      options: {
        responsive: false, circumference: 180, rotation: -90, cutout: '74%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { duration: 1000 }
      }
    });
    return chart;
  }
  g1 = gauge('g1', 100, '#0ecb81');
  g2 = gauge('g2', 0, '#f05c5c');
  g3 = gauge('g3', 0, '#f6b44d');

  /* ── CHANNEL DONUT ── */
  var cd = getChartColors();
  channelChart = new Chart(document.getElementById('channelChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Card', 'Bank Transfer', 'USSD', 'QR'],
      datasets: [{
        data: [65, 20, 10, 5],
        backgroundColor: cd.donutColors,
        borderWidth: 0,
        borderRadius: 4,
        spacing: 3,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: cd.legendText, font: { size: 11, family: 'Plus Jakarta Sans' },
            boxWidth: 8, boxHeight: 8, borderRadius: 4, padding: 10, usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: cd.tooltipBg, borderColor: cd.tooltipBorder, borderWidth: 1,
          titleColor: cd.tooltipTitle, bodyColor: cd.tooltipBody,
          callbacks: { label: function (c) { return ' ' + c.label + ': ' + c.raw + '%'; } }
        }
      }
    }
  });

  /* ── MOBILE SIDEBAR / RIGHT PANEL TOGGLES ── */
  (function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('mobileOverlay');
    var rpPanel = document.querySelector('.right-panel');
    var rpToggle = document.getElementById('rpToggle');
    var menuBtn = document.getElementById('mobileMenuBtn');
    var sidebarClose = document.getElementById('mobileSidebarClose');

    function isMobile() { return window.innerWidth <= 1024; }

    function openSidebar() {
      if (!isMobile()) return;
      sidebar.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    function toggleRP() {
      if (!isMobile()) return;
      rpPanel.classList.toggle('open');
      rpToggle.classList.toggle('open');
      if (rpPanel.classList.contains('open')) {
        overlay.classList.add('open');
      } else {
        overlay.classList.remove('open');
      }
    }

    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', function () {
      closeSidebar();
      if (rpPanel) rpPanel.classList.remove('open');
      if (rpToggle) rpToggle.classList.remove('open');
    });
    if (rpToggle) rpToggle.addEventListener('click', toggleRP);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeSidebar();
        if (rpPanel) rpPanel.classList.remove('open');
        if (rpToggle) rpToggle.classList.remove('open');
      }
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 1024) {
          sidebar.classList.remove('open');
          if (rpPanel) rpPanel.classList.remove('open');
          if (rpToggle) rpToggle.classList.remove('open');
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 200);
    });
  })();

  /* ── AI CHAT ── */
  (function () {
    var rpEmpty = document.getElementById('rpEmpty');
    var rpMsgs = document.getElementById('rpMsgs');
    var rpInput = document.getElementById('rpInput');
    var rpSend = document.getElementById('rpSend');
    var rpChips = document.getElementById('rpChips');
    var rpClear = document.getElementById('rpClear');
    var rpNewChat = document.getElementById('rpNewChat');

    var aiResponses = {
      'what can you do': 'I can help you analyze your business data in real time. Ask me about transaction volumes, customer trends, payment method distribution, revenue over time, refund rates, or any metric on your dashboard. I can also provide summaries, comparisons, and forecasts based on your current data.',
      'top customers': 'Your top customers by transaction volume this month:\n\n1. **Chioma Okonkwo** — ₦245,000 (14 transactions)\n2. **Emeka Nwosu** — ₦189,500 (9 transactions)\n3. **Aisha Bello** — ₦156,200 (11 transactions)\n4. **Tunde Balogun** — ₦132,800 (7 transactions)\n5. **Ngozi Eze** — ₦118,400 (8 transactions)\n\nWould you like a detailed breakdown for any of these customers?',
      'avg transaction': 'Your average transaction value across all payment methods is **₦3,250**.\n\nBreakdown by method:\n- **Card**: ₦4,100\n- **Bank Transfer**: ₦2,850\n- **USSD**: ₦1,200\n- **QR**: ₦950\n\nThis is up 8% compared to last month.',
      'payment methods': 'Payment method distribution for the current period:\n\n• **Card**: 65% (₦2.1M)\n• **Bank Transfer**: 20% (₦650K)\n• **USSD**: 10% (₦325K)\n• **QR**: 5% (₦162K)\n\nCard payments continue to dominate, growing 12% month-over-month.',
      'revenue trend': 'Revenue has shown steady growth over the past 30 days. Total revenue is currently **₦3,250,000**, with a daily average of **₦108,333**.\n\n• Best day: June 15 (₦215,000)\n• Worst day: June 8 (₦48,000)\n• Week-over-week growth: **+7.2%**\n\nProjected month-end: ~₦3.5M at current pace.',
    };

    function addMsg(text, isUser) {
      if (rpEmpty) rpEmpty.style.display = 'none';
      if (rpMsgs) rpMsgs.classList.add('show');

      var msg = document.createElement('div');
      msg.className = 'rp-msg ' + (isUser ? 'user' : 'ai');
      msg.style.animationDelay = '0s';

      var av = document.createElement('div');
      av.className = 'rp-msg-av' + (isUser ? '' : ' ai');
      if (isUser) {
        av.innerHTML = '<img src="https://i.pravatar.cc/60?u=abiodun" alt="U" loading="lazy">';
      } else {
        av.innerHTML = '<i data-lucide="sparkles" style="width:13px;height:13px;"></i>';
      }

      var bubble = document.createElement('div');
      bubble.className = 'rp-msg-bubble';
      bubble.textContent = text;

      msg.appendChild(av);
      msg.appendChild(bubble);
      if (rpMsgs) {
        rpMsgs.appendChild(msg);
        rpMsgs.scrollTop = rpMsgs.scrollHeight;
      }

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function showTyping() {
      var el = document.createElement('div');
      el.className = 'rp-msg ai';
      el.id = 'rpTyping';
      el.style.animationDelay = '0s';
      el.innerHTML =
        '<div class="rp-msg-av ai"><i data-lucide="sparkles" style="width:13px;height:13px;"></i></div>' +
        '<div class="rp-msg-bubble"><div class="rp-typing"><span></span><span></span><span></span></div></div>';
      if (rpMsgs) {
        rpMsgs.appendChild(el);
        rpMsgs.scrollTop = rpMsgs.scrollHeight;
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function removeTyping() {
      var el = document.getElementById('rpTyping');
      if (el) el.remove();
    }

    function getResponse(query) {
      var q = query.toLowerCase().trim();
      for (var key in aiResponses) {
        if (q.includes(key)) return aiResponses[key];
      }
      if (/^(hi|hello|hey|howdy|sup|good morning|good evening)/.test(q)) {
        return 'Hi there! 👋 I\'m your Fornix AI assistant. I can help you analyze your business metrics, transactions, customers, and more. What would you like to explore?';
      }
      if (/how are you|how('s| is) it going/.test(q)) {
        return 'I\'m running smoothly! 😊 All systems are operational and I\'m ready to help you with your business data. What would you like to know?';
      }
      if (/thank|thanks/.test(q)) {
        return 'You\'re welcome! If you have any more questions about your business data, feel free to ask.';
      }
      if (/(revenue|income|earnings)/.test(q)) {
        return 'Your current revenue stands at **₦3,250,000** for the past 30 days. That\'s a 12% increase from the previous period. The daily average is approximately **₦108,333**. Would you like a breakdown by payment method or a daily trend?';
      }
      if (/(refund|cancel|chargeback)/.test(q)) {
        return 'Your refund rate is currently **2.3%** (67 refunds out of 2,847 transactions). The total refunded amount is **₦74,750**. Most refunds are in the Pending state (42%), with 35% Approved and 23% Declined.';
      }
      if (/(customer|user|client)/.test(q)) {
        return 'You have **1,230 unique customers** in the current period. Your top 5 customers account for 32% of total transaction volume. The customer retention rate is **78%**, and the average customer lifetime value is **₦8,450**.';
      }
      if (/(dispute|chargeback)/.test(q)) {
        return 'You have **23 active disputes** (0.8% of transactions). Currently 8 are Open, 9 Under Review, 4 Won, and 2 Lost. The average dispute resolution time is **5.2 days**. Would you like details on any specific dispute?';
      }
      return 'I understand you\'re asking about "' + q + '". Based on your current data, I can help with transaction analytics, customer insights, revenue trends, payment method breakdowns, and refund/dispute summaries. Could you rephrase or pick one of the suggested topics above?';
    }

    function ask(query) {
      if (!query || !query.trim()) return;
      addMsg(query, true);
      setTimeout(function () {
        showTyping();
        setTimeout(function () {
          removeTyping();
          addMsg(getResponse(query), false);
        }, 800 + Math.random() * 700);
      }, 200);
    }

    function sendInput() {
      var val = rpInput ? rpInput.value.trim() : '';
      if (!val) return;
      rpInput.value = '';
      rpInput.style.height = 'auto';
      ask(val);
    }

    if (rpInput) {
      rpInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendInput();
        }
      });
    }

    if (rpSend) rpSend.addEventListener('click', sendInput);

    if (rpChips) {
      rpChips.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip');
        if (!chip) return;
        var q = chip.getAttribute('data-ask');
        if (q) ask(q);
      });
    }

    function newChat() {
      if (rpMsgs) {
        rpMsgs.innerHTML = '';
        rpMsgs.classList.remove('show');
      }
      if (rpEmpty) rpEmpty.style.display = 'flex';
      if (rpInput) rpInput.value = '';
    }

    if (rpNewChat) rpNewChat.addEventListener('click', newChat);
    if (rpClear) rpClear.addEventListener('click', newChat);
  })();

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

    lucide.createIcons();
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

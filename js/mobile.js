/* ── MOBILE TOGGLES + USER POPUP + THEME + AI CHAT ── */
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

  /* ── RIGHT PANEL + AI CHAT (mobile only) ── */
  (function () {
    var content = document.querySelector('.content');
    if (!content) return;
    if (document.querySelector('.right-panel')) return;

    function isMobile() { return window.innerWidth <= 1024; }
    if (!isMobile()) return;

    var panel = document.createElement('div');
    panel.className = 'right-panel';
    panel.innerHTML =
      '<div class="rp-top">' +
        '<div class="rp-top-left">' +
          '<div class="rp-top-icon"><i data-lucide="sparkles" style="width:14px;height:14px;"></i></div>' +
          '<div><div class="rp-top-title">AI Assistant</div><div class="rp-top-sub">New conversation</div></div>' +
        '</div>' +
        '<div class="rp-top-right">' +
          '<div class="tb-btn" id="rpClear"><i data-lucide="rotate-ccw" style="width:13px;height:13px;"></i></div>' +
          '<div class="tb-btn" id="rpNewChat"><i data-lucide="square-pen" style="width:13px;height:13px;"></i></div>' +
        '</div>' +
      '</div>' +
      '<div class="rp-body">' +
        '<div class="rp-empty" id="rpEmpty">' +
          '<div class="rp-empty-icon"><i data-lucide="sparkles" style="width:22px;height:22px;"></i></div>' +
          '<div class="rp-empty-title">What would you like to understand about your business today?</div>' +
          '<div class="rp-empty-sub">Ask me anything about your transactions, customers, revenue, or performance.</div>' +
        '</div>' +
        '<div class="rp-msgs" id="rpMsgs"></div>' +
        '<div class="quick-row">' +
          '<div class="quick-card"><div class="quick-label">Total Transactions</div><div class="quick-val" style="color:var(--blue);">2,847</div></div>' +
          '<div class="quick-card"><div class="quick-label">Unique Customers</div><div class="quick-val" style="color:var(--purple);">1,230</div></div>' +
          '<div class="quick-card"><div class="quick-label">Success Rate</div><div class="quick-val" style="color:var(--green);">97.8%</div></div>' +
          '<div class="quick-card"><div class="quick-label">Active Period</div><div class="quick-val" style="color:var(--amber);font-size:13px;">30 days</div></div>' +
        '</div>' +
        '<div class="rp-chips" id="rpChips">' +
          '<button class="chip" data-ask="what can you do">What can you do?</button>' +
          '<button class="chip" data-ask="top customers">Top customers</button>' +
          '<button class="chip" data-ask="avg transaction">Avg. transaction</button>' +
          '<button class="chip" data-ask="payment methods">Payment methods</button>' +
          '<button class="chip" data-ask="revenue trend">Revenue trend</button>' +
        '</div>' +
        '<div class="rp-input-area">' +
          '<div class="rp-textarea-wrap">' +
            '<textarea class="rp-textarea" id="rpInput" placeholder="Ask anything about your business…" rows="2"></textarea>' +
          '</div>' +
          '<div class="rp-actions">' +
            '<div class="rp-mic"><i data-lucide="mic" style="width:13px;height:13px;"></i></div>' +
            '<div style="display:flex;align-items:center;gap:6px;">' +
              '<span style="font-size:11px;color:var(--t3);">Enter to send</span>' +
              '<div class="rp-send" id="rpSend"><i data-lucide="send" style="width:12px;height:12px;"></i></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    content.appendChild(panel);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    var rpPanel = document.querySelector('.right-panel');
    var rpToggle = document.getElementById('rpToggle');
    var rpEmpty = document.getElementById('rpEmpty');
    var rpMsgs = document.getElementById('rpMsgs');
    var rpInput = document.getElementById('rpInput');
    var rpSend = document.getElementById('rpSend');
    var rpChips = document.getElementById('rpChips');
    var rpClear = document.getElementById('rpClear');
    var rpNewChat = document.getElementById('rpNewChat');
    var mobileOverlay = document.getElementById('mobileOverlay');

    function isMobile() { return window.innerWidth <= 1024; }

    function toggleRP() {
      rpPanel.classList.toggle('open');
      if (rpToggle) rpToggle.classList.toggle('open');
      if (rpPanel.classList.contains('open')) {
        if (mobileOverlay) mobileOverlay.classList.add('open');
      } else {
        if (mobileOverlay) mobileOverlay.classList.remove('open');
      }
    }

    if (rpToggle) rpToggle.addEventListener('click', toggleRP);

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', function () {
        if (rpPanel) rpPanel.classList.remove('open');
        if (rpToggle) rpToggle.classList.remove('open');
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (rpPanel) rpPanel.classList.remove('open');
        if (rpToggle) rpToggle.classList.remove('open');
      }
    });

    /* ── AI RESPONSES ── */
    var aiResponses = {
      'what can you do': 'I can help you analyze your business data in real time. Ask me about transaction volumes, customer trends, payment method distribution, revenue over time, refund rates, or any metric on your dashboard. I can also provide summaries, comparisons, and forecasts based on your current data.',
      'top customers': 'Your top customers by transaction volume this month:\n\n1. **Chioma Okonkwo** — ₦245,000 (14 transactions)\n2. **Emeka Nwosu** — ₦189,500 (9 transactions)\n3. **Aisha Bello** — ₦156,200 (11 transactions)\n4. **Tunde Balogun** — ₦132,800 (7 transactions)\n5. **Ngozi Eze** — ₦118,400 (8 transactions)\n\nWould you like a detailed breakdown for any of these customers?',
      'avg transaction': 'Your average transaction value across all payment methods is **₦3,250**.\n\nBreakdown by method:\n- **Card**: ₦4,100\n- **Bank Transfer**: ₦2,850\n- **USSD**: ₦1,200\n- **QR**: ₦950\n\nThis is up 8% compared to last month.',
      'payment methods': 'Payment method distribution for the current period:\n\n• **Card**: 65% (₦2.1M)\n• **Bank Transfer**: 20% (₦650K)\n• **USSD**: 10% (₦325K)\n• **QR**: 5% (₦162K)\n\nCard payments continue to dominate, growing 12% month-over-month.',
      'revenue trend': 'Revenue has shown steady growth over the past 30 days. Total revenue is currently **₦3,250,000**, with a daily average of **₦108,333**.\n\n• Best day: June 15 (₦215,000)\n• Worst day: June 8 (₦48,000)\n• Week-over-week growth: **+7.2%**\n\nProjected month-end: ~₦3.5M at current pace.',
    };

    var defaultResponse = 'I understand you\'re asking about "{q}". Based on your current data, I can help with transaction analytics, customer insights, revenue trends, payment method breakdowns, and refund/dispute summaries. Could you rephrase or pick one of the suggested topics above?';

    function addMsg(text, isUser) {
      rpEmpty.style.display = 'none';
      rpMsgs.classList.add('show');

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
      rpMsgs.appendChild(msg);
      rpMsgs.scrollTop = rpMsgs.scrollHeight;

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function showTyping() {
      var el = document.createElement('div');
      el.className = 'rp-msg ai';
      el.id = 'rpTyping';
      el.style.animationDelay = '0s';

      var av = document.createElement('div');
      av.className = 'rp-msg-av ai';
      av.innerHTML = '<i data-lucide="sparkles" style="width:13px;height:13px;"></i>';

      var bubble = document.createElement('div');
      bubble.className = 'rp-msg-bubble';
      bubble.innerHTML = '<div class="rp-typing"><span></span><span></span><span></span></div>';

      el.appendChild(av);
      el.appendChild(bubble);
      rpMsgs.appendChild(el);
      rpMsgs.scrollTop = rpMsgs.scrollHeight;
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
      return defaultResponse.replace('{q}', q);
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
      rpMsgs.innerHTML = '';
      rpMsgs.classList.remove('show');
      rpEmpty.style.display = 'flex';
      if (rpInput) rpInput.value = '';
    }

    if (rpNewChat) rpNewChat.addEventListener('click', newChat);
    if (rpClear) rpClear.addEventListener('click', newChat);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 1024) {
          if (rpPanel) rpPanel.classList.remove('open');
          if (rpToggle) rpToggle.classList.remove('open');
        }
      }, 200);
    });
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

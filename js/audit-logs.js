document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  var allLogs = [
    { type:'auth', action:'User logged in', desc:'Admin user Abiodun authenticated via SSO', user:'Abiodun', ip:'192.168.1.45', badge:'auth', time:'2026-06-10T14:32:00', detail:{browser:'Chrome 125',os:'Windows 11',location:'Lagos, NG'} },
    { type:'payment', action:'Bulk payout processed', desc:'PO_batch_001 — ₦28,400 sent to 12 merchants', user:'System', ip:'—', badge:'create', time:'2026-06-10T14:15:00', detail:{batch:'PO_batch_001',amount:'₦28,400',merchants:'12'} },
    { type:'user', action:'Customer profile updated', desc:'Zainab Abdullah changed phone number', user:'Zainab A.', ip:'10.0.0.23', badge:'update', time:'2026-06-10T13:50:00', detail:{field:'phone',old:'+234 802 111 2222',new:'+234 802 333 4444'} },
    { type:'security', action:'2FA setting changed', desc:'Two-factor authentication was disabled for user', user:'Abiodun', ip:'192.168.1.45', badge:'update', time:'2026-06-10T13:22:00', detail:{setting:'2FA',old:'Enabled',new:'Disabled'} },
    { type:'system', action:'Database backup completed', desc:'Automated daily backup — 1.2 GB, 23s duration', user:'System', ip:'—', badge:'create', time:'2026-06-10T13:00:00', detail:{size:'1.2 GB',duration:'23s',type:'Daily'} },
    { type:'auth', action:'Failed login attempt', desc:'Invalid credentials for user "admin@ludo.com"', user:'Unknown', ip:'203.0.113.42', badge:'auth', time:'2026-06-10T12:45:00', detail:{attempts:'3',source:'external',blocked:'Yes'} },
    { type:'payment', action:'Refund approved', desc:'REF_m45n67 — ₦2,500 approved for Chioma Obi', user:'Abiodun', ip:'192.168.1.45', badge:'create', time:'2026-06-10T12:10:00', detail:{refund:'REF_m45n67',amount:'₦2,500',customer:'Chioma Obi'} },
    { type:'user', action:'New customer registered', desc:'Grace Olamide created account via referral', user:'Grace O.', ip:'10.0.0.56', badge:'create', time:'2026-06-10T11:30:00', detail:{referral:'SIMI_REF',method:'email'} },
    { type:'system', action:'API rate limit hit', desc:'Endpoint /api/v1/transactions exceeded 100 req/min', user:'—', ip:'198.51.100.7', badge:'auth', time:'2026-06-10T11:05:00', detail:{endpoint:'/api/v1/transactions',limit:'100/min',actual:'147/min'} },
    { type:'security', action:'New device login detected', desc:'Login from unrecognized device in Lagos, NG', user:'Abiodun', ip:'192.168.1.100', badge:'auth', time:'2026-06-10T10:30:00', detail:{device:'iPhone 15 Pro',os:'iOS 18',location:'Lagos, NG'} },
    { type:'payment', action:'Transaction disputed', desc:'DSP_002 — ₦1,200 disputed by Femi Adekunle', user:'Femi A.', ip:'10.0.0.34', badge:'create', time:'2026-06-10T09:45:00', detail:{dispute:'DSP_002',amount:'₦1,200',reason:'Service not rendered'} },
    { type:'user', action:'Merchant account suspended', desc:'Account flagged for unusual activity — temporary suspension', user:'System', ip:'—', badge:'delete', time:'2026-06-10T09:00:00', detail:{merchant:'Tunde Bakare',reason:'Unusual activity',duration:'24 hours'} },
    { type:'auth', action:'Password reset requested', desc:'Password reset email sent to femi@email.com', user:'Femi A.', ip:'10.0.0.34', badge:'update', time:'2026-06-10T08:15:00', detail:{method:'email',expires:'1 hour'} },
    { type:'system', action:'Cache cleared', desc:'Redis cache flushed — 2.3k keys removed', user:'System', ip:'—', badge:'delete', time:'2026-06-10T07:30:00', detail:{cache:'Redis',keys:'2,347',trigger:'Automated'} },
    { type:'payment', action:'Payout scheduled', desc:'PO_batch_003 — ₦9,600 scheduled for Jun 10', user:'System', ip:'—', badge:'create', time:'2026-06-10T06:00:00', detail:{batch:'PO_batch_003',amount:'₦9,600',date:'Jun 10, 2026'} },
    { type:'security', action:'IP whitelist updated', desc:'New IP range 10.0.0.0/24 added to whitelist', user:'Abiodun', ip:'192.168.1.45', badge:'update', time:'2026-06-09T18:30:00', detail:{range:'10.0.0.0/24',purpose:'Internal office'} },
    { type:'user', action:'Customer deleted account', desc:'Account for "Simi Ogun" permanently removed', user:'Simi O.', ip:'10.0.0.78', badge:'delete', time:'2026-06-09T17:00:00', detail:{reason:'User request',data_retention:'30 days'} },
    { type:'auth', action:'Session expired', desc:'User session timed out after 4h inactivity', user:'Kayode I.', ip:'10.0.0.12', badge:'auth', time:'2026-06-09T16:20:00', detail:{duration:'4h',action:'Auto-logout'} },
    { type:'system', action:'New deployment pushed', desc:'Release v2.14.3 deployed to production', user:'System', ip:'—', badge:'create', time:'2026-06-09T15:00:00', detail:{version:'v2.14.3',branch:'main',commits:'12'} },
    { type:'payment', action:'Webhook delivery failed', desc:'POST to https://hooks.example.com/payment returned 503', user:'System', ip:'—', badge:'auth', time:'2026-06-09T14:15:00', detail:{endpoint:'https://hooks.example.com/payment',status:'503',retries:'3'} },
  ];

  var visibleCount = 10;
  var activeType = 'all';
  var dateFilter = 'all';
  var searchInput = document.getElementById('logSearch');
  var logFeed = document.getElementById('logFeed');
  var loadMoreBtn = document.getElementById('loadMoreBtn');

  function fmtTime(iso) {
    var d = new Date(iso);
    return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
  }
  function fmtDateLabel(iso) {
    var d = new Date(iso);
    var today = new Date(); var yesterday = new Date(today); yesterday.setDate(yesterday.getDate()-1);
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function iconForType(t) {
    var icons = { auth:'log-in', payment:'credit-card', user:'user', system:'server', security:'shield' };
    return icons[t] || 'circle';
  }

  function getFiltered() {
    var q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var cutoff = null;
    if (dateFilter === 'today') { var d = new Date(); d.setHours(0,0,0,0); cutoff = d; }
    else if (dateFilter === '7d') { cutoff = new Date(Date.now() - 7*86400000); }
    else if (dateFilter === '30d') { cutoff = new Date(Date.now() - 30*86400000); }

    return allLogs.filter(function (log) {
      if (activeType !== 'all' && log.type !== activeType) return false;
      if (cutoff && new Date(log.time) < cutoff) return false;
      if (q) {
        return log.action.toLowerCase().indexOf(q) > -1 || log.desc.toLowerCase().indexOf(q) > -1 || log.user.toLowerCase().indexOf(q) > -1;
      }
      return true;
    });
  }

  function render() {
    var data = getFiltered();
    var show = data.slice(0, visibleCount);

    /* Live count */
    document.getElementById('liveCount').textContent = allLogs.length + ' total events';

    var html = '';
    var lastDate = '';

    show.forEach(function (log) {
      var dateLabel = fmtDateLabel(log.time);
      if (dateLabel !== lastDate) {
        if (lastDate !== '') html += '</div>';
        html += '<div class="al-date-group"><div class="al-date-label">' + dateLabel + '</div>';
        lastDate = dateLabel;
      }

      html += '<div class="al-item" data-id="' + log.action.replace(/\s+/g,'_') + '">';
      html += '<div class="al-item-icon ' + log.type + '"><i data-lucide="' + iconForType(log.type) + '" style="width:14px;height:14px;"></i></div>';
      html += '<div class="al-item-body">';
      html += '<div class="al-item-action"><span>' + log.action + '</span>';
      if (log.badge && log.badge !== 'auth') html += ' <span class="al-item-badge ' + log.badge + '">' + log.badge.toUpperCase() + '</span>';
      html += '</div>';
      html += '<div class="al-item-desc">' + log.desc + '</div>';
      html += '<div class="al-item-meta"><span><i data-lucide="user" style="width:10px;height:10px;"></i>' + log.user + '</span><span><i data-lucide="globe" style="width:10px;height:10px;"></i>' + log.ip + '</span><span><i data-lucide="clock" style="width:10px;height:10px;"></i>' + fmtTime(log.time) + '</span></div>';
      html += '<div class="al-item-detail"><div class="al-item-detail-grid">';
      for (var key in log.detail) {
        html += '<div><div class="al-item-detail-lbl">' + key + '</div><div class="al-item-detail-val">' + log.detail[key] + '</div></div>';
      }
      html += '</div></div></div>';
      html += '<button class="al-item-expand"><i data-lucide="chevron-down" style="width:12px;height:12px;"></i></button>';
      html += '</div>';
    });
    if (lastDate !== '') html += '</div>';

    if (show.length === 0) {
      html = '<div style="text-align:center;padding:60px 20px;color:var(--t3);"><div style="opacity:.4;margin-bottom:10px;"><i data-lucide="search" style="width:36px;height:36px;"></i></div><div style="font-size:14px;font-weight:600;color:var(--t2);">No matching events</div><div style="font-size:12px;margin-top:4px;">Try adjusting your filters</div></div>';
    }

    logFeed.innerHTML = html;

    /* Expand toggles */
    logFeed.querySelectorAll('.al-item-expand').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.closest('.al-item').classList.toggle('expanded');
      });
    });

    loadMoreBtn.style.display = visibleCount >= data.length ? 'none' : 'inline-flex';

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /* ── CHIP FILTERS ── */
  document.querySelectorAll('.al-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.al-chip').forEach(function (c) { c.classList.remove('active'); });
      this.classList.add('active');
      activeType = this.dataset.type;
      visibleCount = 10;
      render();
    });
  });

  /* ── DATE FILTER ── */
  document.getElementById('logDateFilter').addEventListener('change', function () {
    dateFilter = this.value;
    visibleCount = 10;
    render();
  });

  /* ── SEARCH ── */
  var debounceTimer;
  if (searchInput) searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () { visibleCount = 10; render(); }, 250);
  });

  /* ── LOAD MORE ── */
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', function () {
    visibleCount += 10;
    render();
  });

  render();
});
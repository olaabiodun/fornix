document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ── MOCK CUSTOMER DATA ── */
  var customers = [
    { id: 'CUS_001', name: 'Chukwuemeka O.', email: 'chukwu@email.com', phone: '+234 802 345 6789', status: 'vip', spent: 3250, count: 1, joined: '2026-01-15' },
    { id: 'CUS_002', name: 'Adaeze Nwosu', email: 'adaeze@email.com', phone: '+234 803 456 7890', status: 'active', spent: 1500, count: 1, joined: '2026-02-20' },
    { id: 'CUS_003', name: 'Bolu Adeyemi', email: 'bolu@email.com', phone: '+234 805 678 9012', status: 'active', spent: 800, count: 1, joined: '2026-03-10' },
    { id: 'CUS_004', name: 'Fatima Bello', email: 'fatima@email.com', phone: '+234 806 789 0123', status: 'vip', spent: 5000, count: 1, joined: '2025-11-05' },
    { id: 'CUS_005', name: 'Kemi Okafor', email: 'kemi@email.com', phone: '+234 807 890 1234', status: 'active', spent: 2000, count: 1, joined: '2026-04-22' },
    { id: 'CUS_006', name: 'Emeka Eze', email: 'emeka@email.com', phone: '+234 808 901 2345', status: 'vip', spent: 12000, count: 1, joined: '2025-09-14' },
    { id: 'CUS_007', name: 'Zainab Abdullah', email: 'zainab@email.com', phone: '+234 809 012 3456', status: 'inactive', spent: 450, count: 1, joined: '2026-05-01' },
    { id: 'CUS_008', name: 'Tunde Balogun', email: 'tunde@email.com', phone: '+234 810 123 4567', status: 'active', spent: 7800, count: 1, joined: '2025-12-18' },
    { id: 'CUS_009', name: 'Ngozi Okeke', email: 'ngozi@email.com', phone: '+234 811 234 5678', status: 'active', spent: 3200, count: 1, joined: '2026-03-30' },
    { id: 'CUS_010', name: 'Segun Lawal', email: 'segun@email.com', phone: '+234 812 345 6789', status: 'inactive', spent: 950, count: 1, joined: '2026-04-05' },
    { id: 'CUS_011', name: 'Chioma Obi', email: 'chioma@email.com', phone: '+234 813 456 7890', status: 'vip', spent: 15000, count: 1, joined: '2025-08-10' },
    { id: 'CUS_012', name: 'Yusuf Bello', email: 'yusuf@email.com', phone: '+234 814 567 8901', status: 'active', spent: 2100, count: 1, joined: '2026-02-28' },
    { id: 'CUS_013', name: 'Amara Okafor', email: 'amara@email.com', phone: '+234 815 678 9012', status: 'active', spent: 6700, count: 1, joined: '2025-10-22' },
    { id: 'CUS_014', name: 'Femi Adekunle', email: 'femi@email.com', phone: '+234 816 789 0123', status: 'inactive', spent: 300, count: 1, joined: '2026-05-15' },
    { id: 'CUS_015', name: 'Simi Ogunlade', email: 'simi@email.com', phone: '+234 817 890 1234', status: 'vip', spent: 4400, count: 1, joined: '2025-07-04' },
    { id: 'CUS_016', name: 'Ibrahim Musa', email: 'ibrahim@email.com', phone: '+234 818 901 2345', status: 'active', spent: 1850, count: 1, joined: '2026-04-11' },
    { id: 'CUS_017', name: 'Yetunde Ajayi', email: 'yetunde@email.com', phone: '+234 819 012 3456', status: 'vip', spent: 9200, count: 1, joined: '2025-06-19' },
    { id: 'CUS_018', name: 'Kayode Idowu', email: 'kayode@email.com', phone: '+234 820 123 4567', status: 'inactive', spent: 150, count: 1, joined: '2026-05-20' },
    { id: 'CUS_019', name: 'Ruth Bamidele', email: 'ruth@email.com', phone: '+234 821 234 5678', status: 'active', spent: 3600, count: 1, joined: '2026-01-08' },
    { id: 'CUS_020', name: 'Hauwa Mohammed', email: 'hauwa@email.com', phone: '+234 822 345 6789', status: 'active', spent: 2800, count: 1, joined: '2026-03-17' },
    { id: 'CUS_021', name: 'Michael Ojo', email: 'michael@email.com', phone: '+234 823 456 7890', status: 'vip', spent: 6300, count: 1, joined: '2025-11-28' },
    { id: 'CUS_022', name: 'Bisi Adegoke', email: 'bisi@email.com', phone: '+234 824 567 8901', status: 'inactive', spent: 750, count: 1, joined: '2026-04-30' },
    { id: 'CUS_023', name: 'Tobi Adeniyi', email: 'tobi@email.com', phone: '+234 825 678 9012', status: 'active', spent: 4100, count: 1, joined: '2025-12-03' },
    { id: 'CUS_024', name: 'Nnenna Eze', email: 'nnenna@email.com', phone: '+234 826 789 0123', status: 'active', spent: 1200, count: 1, joined: '2026-02-14' },
    { id: 'CUS_025', name: 'Emeka Okafor', email: 'emeka.o@email.com', phone: '+234 827 890 1234', status: 'active', spent: 10500, count: 1, joined: '2025-10-09' },
  ];

  /* Extend with plausible transaction counts and enriched data */
  customers.forEach(function (c) {
    c.count = Math.max(1, Math.floor(c.spent / 800) + 1);
    c.avgOrder = Math.round(c.spent / c.count);
    c.phone = c.phone;
    /* Recent activity (last 3 transactions) */
    c.recentActivity = [
      { type: 'credit', desc: 'Payment received', amount: Math.round(c.spent * 0.5), date: '3 days ago' },
      { type: c.count > 1 ? 'credit' : 'debit', desc: c.count > 1 ? 'Payment received' : 'Refund processed', amount: Math.round(c.spent * 0.3), date: '1 week ago' },
      { type: 'debit', desc: 'Payout settled', amount: Math.round(c.spent * 0.2), date: '2 weeks ago' },
    ];
  });

  var pageSize = 8;
  var currentPage = 1;
  var currentFilter = 'all';

  /* ── DOM REFS ── */
  var tbody = document.getElementById('custTableBody');
  var paginationEl = document.getElementById('custPagination');
  var searchInput = document.getElementById('custSearch');
  var filterSelect = document.getElementById('statusFilter');
  var modalOverlay = document.getElementById('custModalOverlay');
  var modalClose = document.getElementById('custModalClose');

  /* ── HELPERS ── */
  function fmt(n) { return '\u20A6' + n.toLocaleString(); }
  function avatarUrl(e) { return 'https://i.pravatar.cc/60?u=' + encodeURIComponent(e); }
  function fmtDate(iso) {
    var d = new Date(iso);
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function statusMeta(s) {
    if (s === 'vip') return { label: 'VIP', cls: 'vip' };
    if (s === 'active') return { label: 'Active', cls: 'active' };
    return { label: 'Inactive', cls: 'inactive' };
  }

  /* ── FILTER ── */
  function getFiltered() {
    var q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    var s = filterSelect ? filterSelect.value : 'all';
    return customers.filter(function (c) {
      if (s !== 'all' && c.status !== s) return false;
      if (q) {
        var match = c.name.toLowerCase().indexOf(q) > -1 ||
                    c.email.toLowerCase().indexOf(q) > -1 ||
                    c.phone.indexOf(q) > -1;
        if (!match) return false;
      }
      return true;
    });
  }

  /* ── RENDER ── */
  function render() {
    var filtered = getFiltered();
    var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    var start = (currentPage - 1) * pageSize;
    var page = filtered.slice(start, start + pageSize);

    /* Stats */
    document.getElementById('statTotal').textContent = customers.length;
    var active = 0; var vip = 0; var volume = 0;
    customers.forEach(function (c) {
      if (c.status === 'active') active++;
      if (c.status === 'vip') vip++;
      volume += c.spent;
    });
    document.getElementById('statActive').textContent = active + vip;
    document.getElementById('statVip').textContent = vip;
    document.getElementById('statVolume').textContent = fmt(volume);

    /* Table rows */
    var html = '';
    page.forEach(function (c) {
      var sm = statusMeta(c.status);
      html += '<tr class="cust-row-click" data-id="' + c.id + '">';
      html += '<td><div class="txn-user"><div class="txn-av"><img src="' + avatarUrl(c.email) + '" alt="' + c.name.charAt(0) + '" loading="lazy"></div><div><div class="txn-name">' + c.name + '</div><div class="txn-email">' + c.email + '</div></div></div></td>';
      html += '<td class="col-phone">' + c.phone + '</td>';
      html += '<td class="col-spent" style="color:var(--green);">' + fmt(c.spent) + '</td>';
      html += '<td class="col-count">' + c.count + '</td>';
      html += '<td><span class="cust-status ' + sm.cls + '"><span class="sdot"></span>' + sm.label + '</span></td>';
      html += '<td class="col-date">' + fmtDate(c.joined) + '</td>';
      html += '</tr>';
    });

    if (page.length === 0) {
      html = '<tr><td colspan="6" style="text-align:center;padding:40px 22px;color:var(--t3);font-size:13px;">No customers found.</td></tr>';
    }

    tbody.innerHTML = html;

    /* Pagination */
    var pInfo = paginationEl.querySelector('.pagination-info');
    var pActions = paginationEl.querySelector('.pagination-actions');
    pInfo.textContent = 'Showing ' + (filtered.length ? start + 1 : 0) + '\u2013' + Math.min(start + pageSize, filtered.length) + ' of ' + filtered.length;

    var btns = '';
    btns += '<button class="page-btn" data-page="prev" ' + (currentPage <= 1 ? 'disabled' : '') + '><i data-lucide="chevron-left" style="width:13px;height:13px;"></i></button>';
    for (var i = 1; i <= totalPages; i++) {
      btns += '<button class="page-btn ' + (i === currentPage ? 'active' : '') + '" data-page="' + i + '">' + i + '</button>';
    }
    btns += '<button class="page-btn" data-page="next" ' + (currentPage >= totalPages ? 'disabled' : '') + '><i data-lucide="chevron-right" style="width:13px;height:13px;"></i></button>';
    pActions.innerHTML = btns;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    /* Row clicks */
    tbody.querySelectorAll('.cust-row-click').forEach(function (row) {
      row.addEventListener('click', function () { openModal(this.dataset.id); });
    });

    /* Page btn binds */
    pActions.querySelectorAll('.page-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (this.disabled) return;
        var p = this.dataset.page;
        if (p === 'prev') { if (currentPage > 1) currentPage--; }
        else if (p === 'next') { if (currentPage < totalPages) currentPage++; }
        else { currentPage = parseInt(p); }
        render();
      });
    });
  }

  /* ── OPEN MODAL ── */
  function openModal(id) {
    var c = null;
    for (var i = 0; i < customers.length; i++) {
      if (customers[i].id === id) { c = customers[i]; break; }
    }
    if (!c) return;

    var sm = statusMeta(c.status);

    document.getElementById('custModalAv').innerHTML = '<img src="' + avatarUrl(c.email) + '" alt="' + c.name.charAt(0) + '" loading="lazy">';
    document.getElementById('custModalName').textContent = c.name;
    document.getElementById('custModalEmail').textContent = c.email;
    document.getElementById('custModalSpent').textContent = fmt(c.spent);
    document.getElementById('custModalStatusBadge').className = 'cust-status ' + sm.cls;
    document.getElementById('custModalStatusBadge').innerHTML = '<span class="sdot"></span>' + sm.label;

    document.getElementById('metricTransactions').textContent = c.count;
    document.getElementById('metricAvgOrder').textContent = fmt(c.avgOrder);
    document.getElementById('metricJoined').textContent = fmtDate(c.joined);

    document.getElementById('detailPhone').textContent = c.phone;
    document.getElementById('detailEmail').textContent = c.email;
    document.getElementById('detailId').textContent = c.id;
    document.getElementById('detailStatus').className = 'cust-status ' + sm.cls;
    document.getElementById('detailStatus').innerHTML = '<span class="sdot"></span>' + sm.label;

    /* Activity */
    var actHtml = '';
    c.recentActivity.forEach(function (a) {
      var icon = a.type === 'credit' ? 'arrow-down-left' : 'arrow-up-right';
      var iconCls = a.type === 'credit' ? 'credit' : 'debit';
      var amtCls = a.type === 'credit' ? 'pos' : 'neg';
      var sign = a.type === 'credit' ? '+' : '-';
      actHtml += '<div class="cust-activity-item">';
      actHtml += '<div class="cust-activity-icon ' + iconCls + '"><i data-lucide="' + icon + '" style="width:14px;height:14px;"></i></div>';
      actHtml += '<div class="cust-activity-info"><div class="cust-activity-desc">' + a.desc + '</div><div class="cust-activity-meta">' + a.date + '</div></div>';
      actHtml += '<div class="cust-activity-amount ' + amtCls + '">' + sign + ' ' + fmt(a.amount) + '</div>';
      actHtml += '</div>';
    });
    document.getElementById('custActivityList').innerHTML = actHtml;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /* ── CLOSE ── */
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ── ADD CUSTOMER FORM ── */
  var addModalOverlay = document.getElementById('addCustModalOverlay');
  var addModalClose = document.getElementById('addCustModalClose');
  var addCustBtn = document.getElementById('addCustBtn');
  var addCustCancel = document.getElementById('addCustCancel');
  var addCustSave = document.getElementById('addCustSave');

  function openAddForm() {
    document.getElementById('addCustName').value = '';
    document.getElementById('addCustEmail').value = '';
    document.getElementById('addCustPhone').value = '';
    document.getElementById('addCustStatus').value = 'active';
    addModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAddForm() {
    addModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function saveCustomer() {
    var name = document.getElementById('addCustName').value.trim();
    var email = document.getElementById('addCustEmail').value.trim();
    var phone = document.getElementById('addCustPhone').value.trim();
    var status = document.getElementById('addCustStatus').value;

    if (!name || !email) { alert('Please fill in name and email.'); return; }

    var newId = 'CUS_' + Math.random().toString(36).substring(2, 8).toUpperCase();
    var newCust = {
      id: newId, name: name, email: email, phone: phone || '—',
      status: status, spent: 0, count: 0, joined: new Date().toISOString().split('T')[0],
      avgOrder: 0,
      recentActivity: [
        { type: 'credit', desc: 'Account created', amount: 0, date: 'Just now' },
        { type: 'credit', desc: 'Welcome bonus', amount: 0, date: 'Just now' },
      ]
    };
    customers.unshift(newCust);
    closeAddForm();
    currentPage = 1;
    render();
  }

  if (addCustBtn) addCustBtn.addEventListener('click', openAddForm);
  if (addModalClose) addModalClose.addEventListener('click', closeAddForm);
  if (addCustCancel) addCustCancel.addEventListener('click', closeAddForm);
  if (addModalOverlay) addModalOverlay.addEventListener('click', function (e) { if (e.target === this) closeAddForm(); });
  if (addCustSave) addCustSave.addEventListener('click', saveCustomer);
  /* Allow Enter key to submit */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && addModalOverlay && addModalOverlay.classList.contains('open')) {
      e.preventDefault();
      saveCustomer();
    }
  });

  /* ── SEARCH / FILTER ── */
  var debounceTimer;
  if (searchInput) searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () { currentPage = 1; render(); }, 250);
  });
  if (filterSelect) filterSelect.addEventListener('change', function () { currentPage = 1; render(); });

  render();
});

document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ── MOCK DATA ── */
  var transactions = [
    { id: 'TXN_8f2a9d31', customer: 'Chukwuemeka O.', email: 'chukwu@email.com', amount: 3250, fee: 48.75, status: 'success', method: 'Card', date: '2026-06-05T14:32:00', type: 'credit' },
    { id: 'TXN_4b71e029', customer: 'Adaeze Nwosu', email: 'adaeze@email.com', amount: 1500, fee: 22.50, status: 'pending', method: 'Bank Transfer', date: '2026-06-04T09:15:00', type: 'credit' },
    { id: 'TXN_1c93fa87', customer: 'Bolu Adeyemi', email: 'bolu@email.com', amount: 800, fee: 0, status: 'failed', method: 'USSD', date: '2026-06-03T18:45:00', type: 'debit' },
    { id: 'TXN_d302af51', customer: 'Fatima Bello', email: 'fatima@email.com', amount: 5000, fee: 75, status: 'success', method: 'Card', date: '2026-06-02T11:20:00', type: 'credit' },
    { id: 'TXN_7e22bc09', customer: 'Kemi Okafor', email: 'kemi@email.com', amount: 2000, fee: 30, status: 'success', method: 'QR', date: '2026-06-01T07:55:00', type: 'credit' },
    { id: 'TXN_a45d6f12', customer: 'Emeka Eze', email: 'emeka@email.com', amount: 12000, fee: 180, status: 'success', method: 'Bank Transfer', date: '2026-05-30T15:10:00', type: 'credit' },
    { id: 'TXN_c83e7b04', customer: 'Zainab Abdullah', email: 'zainab@email.com', amount: 450, fee: 6.75, status: 'failed', method: 'Card', date: '2026-05-29T20:05:00', type: 'debit' },
    { id: 'TXN_f61d2a88', customer: 'Tunde Balogun', email: 'tunde@email.com', amount: 7800, fee: 117, status: 'success', method: 'Card', date: '2026-05-28T13:40:00', type: 'credit' },
    { id: 'TXN_e29b4c77', customer: 'Ngozi Okeke', email: 'ngozi@email.com', amount: 3200, fee: 48, status: 'pending', method: 'USSD', date: '2026-05-27T10:25:00', type: 'credit' },
    { id: 'TXN_ba1c3f60', customer: 'Segun Lawal', email: 'segun@email.com', amount: 950, fee: 14.25, status: 'success', method: 'Bank Transfer', date: '2026-05-26T16:50:00', type: 'debit' },
    { id: 'TXN_7d9f0e33', customer: 'Chioma Obi', email: 'chioma@email.com', amount: 15000, fee: 225, status: 'success', method: 'Card', date: '2026-05-25T08:15:00', type: 'credit' },
    { id: 'TXN_40ea15bd', customer: 'Yusuf Bello', email: 'yusuf@email.com', amount: 2100, fee: 31.50, status: 'pending', method: 'QR', date: '2026-05-24T12:30:00', type: 'credit' },
    { id: 'TXN_98d2c46a', customer: 'Amara Okafor', email: 'amara@email.com', amount: 6700, fee: 100.50, status: 'success', method: 'Bank Transfer', date: '2026-05-23T09:00:00', type: 'credit' },
    { id: 'TXN_53f1a902', customer: 'Femi Adekunle', email: 'femi@email.com', amount: 300, fee: 0, status: 'failed', method: 'USSD', date: '2026-05-22T22:10:00', type: 'debit' },
    { id: 'TXN_26c8d714', customer: 'Simi Ogunlade', email: 'simi@email.com', amount: 4400, fee: 66, status: 'success', method: 'Card', date: '2026-05-21T14:35:00', type: 'credit' },
    { id: 'TXN_8b5e2f09', customer: 'Ibrahim Musa', email: 'ibrahim@email.com', amount: 1850, fee: 27.75, status: 'pending', method: 'Bank Transfer', date: '2026-05-20T11:20:00', type: 'credit' },
    { id: 'TXN_fc7d3a81', customer: 'Yetunde Ajayi', email: 'yetunde@email.com', amount: 9200, fee: 138, status: 'success', method: 'Card', date: '2026-05-19T16:45:00', type: 'credit' },
    { id: 'TXN_1a4e8c55', customer: 'Kayode Idowu', email: 'kayode@email.com', amount: 150, fee: 0, status: 'failed', method: 'USSD', date: '2026-05-18T06:30:00', type: 'debit' },
    { id: 'TXN_ef29b0d4', customer: 'Ruth Bamidele', email: 'ruth@email.com', amount: 3600, fee: 54, status: 'success', method: 'QR', date: '2026-05-17T19:55:00', type: 'credit' },
    { id: 'TXN_6d0c1e72', customer: 'Emeka Okafor', email: 'emeka.o@email.com', amount: 10500, fee: 157.50, status: 'pending', method: 'Bank Transfer', date: '2026-05-16T10:05:00', type: 'credit' },
    { id: 'TXN_3b8a9f41', customer: 'Hauwa Mohammed', email: 'hauwa@email.com', amount: 2800, fee: 42, status: 'success', method: 'Card', date: '2026-05-15T13:15:00', type: 'credit' },
    { id: 'TXN_d14e5b67', customer: 'Michael Ojo', email: 'michael@email.com', amount: 6300, fee: 94.50, status: 'success', method: 'Bank Transfer', date: '2026-05-14T08:40:00', type: 'credit' },
    { id: 'TXN_5c0a872e', customer: 'Bisi Adegoke', email: 'bisi@email.com', amount: 750, fee: 11.25, status: 'failed', method: 'Card', date: '2026-05-13T21:20:00', type: 'debit' },
    { id: 'TXN_9e2f4b10', customer: 'Tobi Adeniyi', email: 'tobi@email.com', amount: 4100, fee: 61.50, status: 'success', method: 'QR', date: '2026-05-12T15:30:00', type: 'credit' },
    { id: 'TXN_70d3a89b', customer: 'Nnenna Eze', email: 'nnenna@email.com', amount: 1200, fee: 18, status: 'pending', method: 'USSD', date: '2026-05-11T09:10:00', type: 'credit' },
  ];

  var pageSize = 8;
  var currentPage = 1;
  var currentFilter = 'all';

  /* ── DOM REFS ── */
  var tbody = document.getElementById('txnTableBody');
  var paginationEl = document.getElementById('pagination');
  var searchInput = document.getElementById('txnSearch');
  var filterSelect = document.getElementById('statusFilter');
  var modalOverlay = document.getElementById('txnModalOverlay');
  var modalClose = document.getElementById('txnModalClose');

  /* ── FORMAT HELPERS ── */
  function formatCurrency(n) { return '\u20A6' + n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }

  function formatDate(iso) {
    var d = new Date(iso);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function formatTime(iso) {
    var d = new Date(iso);
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  }

  function formatDateTime(iso) {
    return formatDate(iso) + ' at ' + formatTime(iso);
  }

  function avatarUrl(email) { return 'https://i.pravatar.cc/60?u=' + encodeURIComponent(email); }

  /* ── STATUS HELPERS ── */
  function statusMeta(status) {
    if (status === 'success') return { label: 'Success', cls: 'success', dot: true };
    if (status === 'pending') return { label: 'Pending', cls: 'pending', dot: true };
    return { label: 'Failed', cls: 'failed', dot: true };
  }

  function methodIcon(method) {
    var icons = {
      'Card': 'credit-card',
      'Bank Transfer': 'building-2',
      'USSD': 'smartphone',
      'QR': 'scan-qr-code'
    };
    return icons[method] || 'credit-card';
  }

  /* ── GET FILTERED DATA ── */
  function getFiltered() {
    var q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    var s = filterSelect ? filterSelect.value : 'all';
    return transactions.filter(function (t) {
      if (s !== 'all' && t.status !== s) return false;
      if (q) {
        var match = t.customer.toLowerCase().indexOf(q) > -1 ||
                    t.email.toLowerCase().indexOf(q) > -1 ||
                    t.id.toLowerCase().indexOf(q) > -1;
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

    /* Update stats */
    var total = transactions.length;
    var volume = 0; var successCount = 0; var pendingCount = 0;
    transactions.forEach(function (t) {
      if (t.type === 'credit') volume += t.amount;
      if (t.status === 'success') successCount++;
      if (t.status === 'pending') pendingCount++;
    });
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statVolume').textContent = formatCurrency(volume);
    document.getElementById('statRate').textContent = Math.round((successCount / total) * 100) + '%';
    document.getElementById('statPending').textContent = pendingCount;

    var html = '';
    page.forEach(function (t) {
      var sm = statusMeta(t.status);
      var sign = t.type === 'credit' ? '+' : '-';
      var amtCls = t.type === 'credit' ? 'pos' : '';
      var amtColor = t.type === 'credit' ? '' : 'style="color:var(--red);"';
      html += '<tr class="txn-row-click" data-id="' + t.id + '">';
      html += '<td><div class="txn-user"><div class="txn-av"><img src="' + avatarUrl(t.email) + '" alt="' + t.customer.charAt(0) + '" loading="lazy"></div><div><div class="txn-name">' + t.customer + '</div><div class="txn-email">' + t.email + '</div></div></div></td>';
      html += '<td><span class="txn-ref">' + t.id + '</span></td>';
      html += '<td><span class="txn-amount ' + amtCls + '" ' + amtColor + '>' + sign + ' ' + formatCurrency(t.amount) + '</span></td>';
      html += '<td><span class="pill ' + sm.cls + '"><span class="pill-dot"></span>' + sm.label + '</span></td>';
      html += '<td class="col-method">' + t.method + '</td>';
      html += '<td class="col-date">' + formatDate(t.date) + '</td>';
      html += '</tr>';
    });

    if (page.length === 0) {
      html = '<tr><td colspan="6" style="text-align:center;padding:40px 22px;color:var(--t3);font-size:13px;">No transactions found matching your filters.</td></tr>';
    }

    tbody.innerHTML = html;

    /* ── RENDER PAGINATION ── */
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

    /* ── BIND ROW CLICKS ── */
    tbody.querySelectorAll('.txn-row-click').forEach(function (row) {
      row.addEventListener('click', function () { openModal(this.dataset.id); });
    });

    /* ── BIND PAGE BTNS ── */
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
    var t = null;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].id === id) { t = transactions[i]; break; }
    }
    if (!t) return;

    var sm = statusMeta(t.status);
    var sign = t.type === 'credit' ? '+' : '-';
    var timelineEvents = getTimeline(t);

    document.getElementById('modalStatusIcon').className = 'modal-status-icon ' + sm.cls;
    document.getElementById('modalStatusIcon').innerHTML = '<i data-lucide="' + (t.status === 'success' ? 'check-circle' : t.status === 'pending' ? 'clock' : 'x-circle') + '" style="width:18px;height:18px;"></i>';
    document.getElementById('modalTitle').textContent = t.status === 'success' ? 'Payment Successful' : t.status === 'pending' ? 'Payment Pending' : 'Payment Failed';
    document.getElementById('modalRef').textContent = t.id;
    document.getElementById('modalBadge').className = 'modal-badge ' + sm.cls;
    document.getElementById('modalBadge').innerHTML = '<span class="bdot"></span>' + sm.label;

    document.getElementById('modalAmount').textContent = sign + ' ' + formatCurrency(t.amount);
    document.getElementById('modalAmount').style.color = t.type === 'credit' ? 'var(--green)' : 'var(--red)';
    document.getElementById('modalFee').innerHTML = 'Fee: <span>' + formatCurrency(t.fee) + '</span> &middot; Total: <span>' + formatCurrency(t.amount + (t.type === 'credit' ? -t.fee : t.fee)) + '</span>';

    document.getElementById('modalCustAv').innerHTML = '<img src="' + avatarUrl(t.email) + '" alt="' + t.customer.charAt(0) + '" loading="lazy">';
    document.getElementById('modalCustName').textContent = t.customer;
    document.getElementById('modalCustEmail').textContent = t.email;

    document.getElementById('detailReference').textContent = t.id;
    document.getElementById('detailMethod').textContent = t.method;
    document.getElementById('detailDate').textContent = formatDateTime(t.date);
    document.getElementById('detailStatus').className = 'detail-val ' + sm.cls;
    document.getElementById('detailStatus').textContent = sm.label;
    document.getElementById('detailType').textContent = t.type === 'credit' ? 'Payment Received' : 'Refund / Payout';

    /* Timeline */
    var tlHtml = '';
    timelineEvents.forEach(function (e, idx) {
      tlHtml += '<div class="timeline-item">';
      tlHtml += '<div class="timeline-dot ' + e.dot + '"></div>';
      tlHtml += '<div class="timeline-content">';
      tlHtml += '<div class="timeline-label">' + e.label + '</div>';
      if (e.desc) tlHtml += '<div class="timeline-desc">' + e.desc + '</div>';
      tlHtml += '<div class="timeline-time">' + e.time + '</div>';
      tlHtml += '</div></div>';
    });
    document.getElementById('modalTimeline').innerHTML = tlHtml;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function getTimeline(t) {
    var events = [];
    var d = new Date(t.date);
    var dStr = formatDateTime(t.date);

    events.push({ label: 'Transaction Initiated', desc: 'Customer started ' + t.method + ' payment', time: dStr, dot: 'completed' });

    if (t.status === 'success') {
      var proc = new Date(d.getTime() + 60000);
      events.push({ label: 'Payment Processed', desc: 'Amount deducted from customer', time: formatDateTime(proc), dot: 'completed' });
      var comp = new Date(d.getTime() + 120000);
      events.push({ label: 'Settlement Confirmed', desc: 'Funds credited to your wallet', time: formatDateTime(comp), dot: 'completed' });
    } else if (t.status === 'pending') {
      var proc2 = new Date(d.getTime() + 60000);
      events.push({ label: 'Awaiting Confirmation', desc: 'Waiting for bank confirmation', time: formatDateTime(proc2), dot: 'current' });
      events.push({ label: 'Settlement Pending', desc: 'Will be completed once confirmed', time: '—', dot: 'pending' });
    } else {
      var fail = new Date(d.getTime() + 30000);
      events.push({ label: 'Transaction Failed', desc: t.method === 'Card' ? 'Card declined by issuer' : 'Payment gateway timeout', time: formatDateTime(fail), dot: 'failed' });
      events.push({ label: 'Amount Reversed', desc: 'No charge was applied', time: '—', dot: 'pending' });
    }
    return events;
  }

  /* ── CLOSE MODAL ── */
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ── SEARCH / FILTER ── */
  var debounceTimer;
  if (searchInput) searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () { currentPage = 1; render(); }, 250);
  });
  if (filterSelect) filterSelect.addEventListener('change', function () { currentPage = 1; render(); });

  /* ── INIT ── */
  render();
});

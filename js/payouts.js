document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ── MOCK DATA ── */
  var payouts = [
    { id: 'PO_batch_001', merchants: 12, total: 28400, method: 'Bank Transfer', status: 'completed', date: '2026-06-07T10:00:00', fee: 426, merchantList: [{name:'Bolu Adeyemi',email:'bolu@email.com',amt:3200},{name:'Zainab Abdullah',email:'zainab@email.com',amt:4500},{name:'Femi Adekunle',email:'femi@email.com',amt:1800},{name:'Kayode Idowu',email:'kayode@email.com',amt:2100},{name:'Bisi Adegoke',email:'bisi@email.com',amt:5600},{name:'Segun Lawal',email:'segun@email.com',amt:2800},{name:'Chioma Obi',email:'chioma@email.com',amt:3900},{name:'Emeka Okafor',email:'emeka.o@email.com',amt:1500},{name:'Nnenna Eze',email:'nnenna@email.com',amt:750},{name:'Tobi Adeniyi',email:'tobi@email.com',amt:1200},{name:'Aisha Bello',email:'aisha@email.com',amt:950},{name:'David Okonkwo',email:'david@email.com',amt:600}] },
    { id: 'PO_batch_002', merchants: 8, total: 18200, method: 'USSD', status: 'processing', date: '2026-06-05T14:30:00', fee: 273, merchantList: [{name:'Funke Adeola',email:'funke@email.com',amt:2200},{name:'Ibrahim Musa',email:'ibrahim@email.com',amt:3100},{name:'Grace Olamide',email:'grace@email.com',amt:1600},{name:'Tunde Bakare',email:'tunde@email.com',amt:2800},{name:'Halima Yusuf',email:'halima@email.com',amt:950},{name:'Chidi Okafor',email:'chidi@email.com',amt:1900},{name:'Ronke Adepoju',email:'ronke@email.com',amt:2650},{name:'Musa Bello',email:'musa@email.com',amt:3000}] },
    { id: 'PO_batch_003', merchants: 5, total: 9600, method: 'Bank Transfer', status: 'pending', date: '2026-06-10T09:00:00', fee: 144, merchantList: [{name:'Adebayo Ogunlesi',email:'adebayo@email.com',amt:2400},{name:'Simi Ogun',email:'simi@email.com',amt:1800},{name:'Yemi Alade',email:'yemi@email.com',amt:2100},{name:'Kunle Remi',email:'kunle@email.com',amt:1300},{name:'Tosin Adefuye',email:'tosin@email.com',amt:2000}] },
    { id: 'PO_batch_004', merchants: 15, total: 38500, method: 'QR', status: 'completed', date: '2026-05-31T16:00:00', fee: 577, merchantList: [{name:'Bolu Adeyemi',email:'bolu@email.com',amt:4500},{name:'Zainab Abdullah',email:'zainab@email.com',amt:3200},{name:'Femi Adekunle',email:'femi@email.com',amt:2800},{name:'Kayode Idowu',email:'kayode@email.com',amt:1900},{name:'Bisi Adegoke',email:'bisi@email.com',amt:4100},{name:'Segun Lawal',email:'segun@email.com',amt:3500},{name:'Chioma Obi',email:'chioma@email.com',amt:2200},{name:'Emeka Okafor',email:'emeka.o@email.com',amt:1800},{name:'Nnenna Eze',email:'nnenna@email.com',amt:900},{name:'Tobi Adeniyi',email:'tobi@email.com',amt:2600},{name:'Aisha Bello',email:'aisha@email.com',amt:1500},{name:'David Okonkwo',email:'david@email.com',amt:2100},{name:'Funke Adeola',email:'funke@email.com',amt:1800},{name:'Ibrahim Musa',email:'ibrahim@email.com',amt:3200},{name:'Grace Olamide',email:'grace@email.com',amt:1600}] },
    { id: 'PO_batch_005', merchants: 6, total: 11800, method: 'Bank Transfer', status: 'pending', date: '2026-06-12T11:00:00', fee: 177, merchantList: [{name:'Halima Yusuf',email:'halima@email.com',amt:2400},{name:'Chidi Okafor',email:'chidi@email.com',amt:1500},{name:'Ronke Adepoju',email:'ronke@email.com',amt:3100},{name:'Musa Bello',email:'musa@email.com',amt:1800},{name:'Adebayo Ogunlesi',email:'adebayo@email.com',amt:2000},{name:'Simi Ogun',email:'simi@email.com',amt:1000}] },
    { id: 'PO_batch_006', merchants: 10, total: 23100, method: 'USSD', status: 'completed', date: '2026-05-28T13:00:00', fee: 346, merchantList: [{name:'Yemi Alade',email:'yemi@email.com',amt:3200},{name:'Kunle Remi',email:'kunle@email.com',amt:1800},{name:'Tosin Adefuye',email:'tosin@email.com',amt:2400},{name:'Bolu Adeyemi',email:'bolu@email.com',amt:2900},{name:'Zainab Abdullah',email:'zainab@email.com',amt:1600},{name:'Femi Adekunle',email:'femi@email.com',amt:3500},{name:'Kayode Idowu',email:'kayode@email.com',amt:2100},{name:'Bisi Adegoke',email:'bisi@email.com',amt:1800},{name:'Segun Lawal',email:'segun@email.com',amt:1500},{name:'Chioma Obi',email:'chioma@email.com',amt:2300}] },
    { id: 'PO_batch_007', merchants: 4, total: 6400, method: 'Bank Transfer', status: 'processing', date: '2026-06-08T15:00:00', fee: 96, merchantList: [{name:'Emeka Okafor',email:'emeka.o@email.com',amt:2000},{name:'Nnenna Eze',email:'nnenna@email.com',amt:1200},{name:'Tobi Adeniyi',email:'tobi@email.com',amt:1800},{name:'Aisha Bello',email:'aisha@email.com',amt:1400}] },
  ];

  var pageSize = 5;
  var currentPage = 1;
  var searchInput = document.getElementById('payoutSearch');
  var statusFilter = document.getElementById('poStatusFilter');
  var tbody = document.getElementById('payoutTableBody');
  var paginationEl = document.getElementById('payoutPagination');
  var modalOverlay = document.getElementById('poModalOverlay');
  var modalClose = document.getElementById('poModalClose');

  function fmt(n) { return '\u20A6' + n.toLocaleString(); }
  function fmtDate(iso) {
    var d = new Date(iso);
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function avatarUrl(e) { return 'https://i.pravatar.cc/60?u=' + encodeURIComponent(e); }

  /* ── UPCOMING SCHEDULE ── */
  function renderSchedule() {
    var upcoming = payouts.filter(function (p) { return p.status === 'pending' || p.status === 'processing'; });
    upcoming.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });

    var container = document.getElementById('payoutSchedule');
    var html = '';
    var today = new Date().toISOString().split('T')[0];

    upcoming.forEach(function (p, i) {
      var d = new Date(p.date);
      var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var isToday = p.date.split('T')[0] === today;
      var dayStr = dayNames[d.getDay()] + ', ' + monthNames[d.getMonth()] + ' ' + d.getDate();

      html += '<div class="po-sched-card' + (isToday ? ' today' : '') + '">';
      html += '<div class="po-sched-date"><span class="po-sched-date-dot ' + (p.status === 'pending' ? 'amber' : 'blue') + '"></span>' + dayStr + '</div>';
      html += '<div class="po-sched-amount">' + fmt(p.total) + '</div>';
      html += '<div class="po-sched-desc">' + p.merchants + ' ' + (p.merchants === 1 ? 'merchant' : 'merchants') + ' &middot; ' + p.method + '</div>';
      html += '<div class="po-sched-merchants">' + p.id + ' &middot; ' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</div>';
      html += '</div>';
    });

    if (upcoming.length === 0) {
      html = '<div style="padding:20px 0;text-align:center;color:var(--t3);font-size:13px;">No upcoming payouts scheduled</div>';
    }

    container.innerHTML = html;
  }

  /* ── FILTER ── */
  function getFiltered() {
    var q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var s = statusFilter ? statusFilter.value : 'all';
    return payouts.filter(function (p) {
      if (s !== 'all' && p.status !== s) return false;
      if (q) {
        return p.id.toLowerCase().indexOf(q) > -1 || p.method.toLowerCase().indexOf(q) > -1;
      }
      return true;
    });
  }

  /* ── STATS ── */
  function updateStats() {
    var balance = 0, pending = 0, completed = 0;
    payouts.forEach(function (p) {
      if (p.status === 'completed') completed += p.total;
      if (p.status === 'pending') pending += p.total;
    });
    var upcoming = payouts.filter(function (p) { return p.status === 'pending' || p.status === 'processing'; }).length;
    document.getElementById('statBalance').textContent = fmt(balance);
    document.getElementById('statPending').textContent = fmt(pending);
    document.getElementById('statCompleted').textContent = fmt(completed);
    document.getElementById('statUpcoming').textContent = upcoming;
  }

  /* ── RENDER TABLE ── */
  function render() {
    updateStats();
    renderSchedule();

    var filtered = getFiltered();
    var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * pageSize;
    var page = filtered.slice(start, start + pageSize);

    var html = '';
    page.forEach(function (p) {
      var sm = p.status === 'completed' ? 'success' : p.status === 'processing' ? 'pending' : 'pending';
      html += '<tr class="po-row-click" data-id="' + p.id + '">';
      html += '<td><span class="txn-ref">' + p.id + '</span></td>';
      html += '<td><span style="font-weight:600;">' + p.merchants + '</span> <span style="color:var(--t2);font-size:12px;">merchants</span></td>';
      html += '<td><span class="txn-amount">' + fmt(p.total) + '</span></td>';
      html += '<td class="col-method">' + p.method + '</td>';
      html += '<td><span class="pill ' + sm + '"><span class="pill-dot"></span>' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</span></td>';
      html += '<td class="col-date">' + fmtDate(p.date) + '</td>';
      html += '</tr>';
    });

    if (page.length === 0) {
      html = '<tr><td colspan="6" style="text-align:center;padding:40px 22px;color:var(--t3);font-size:13px;">No payouts found.</td></tr>';
    }
    tbody.innerHTML = html;

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

    tbody.querySelectorAll('.po-row-click').forEach(function (row) {
      row.addEventListener('click', function () { openModal(this.dataset.id); });
    });
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

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /* ── OPEN MODAL ── */
  function openModal(id) {
    var p = null;
    for (var i = 0; i < payouts.length; i++) { if (payouts[i].id === id) { p = payouts[i]; break; } }
    if (!p) return;

    var ico = p.status === 'completed' ? 'check-circle' : p.status === 'processing' ? 'clock' : 'calendar';
    var cls = p.status === 'completed' ? 'success' : 'pending';
    document.getElementById('poModalIcon').className = 'modal-status-icon ' + cls;
    document.getElementById('poModalIcon').innerHTML = '<i data-lucide="' + ico + '" style="width:18px;height:18px;"></i>';
    document.getElementById('poModalTitle').textContent = 'Payout Batch';
    document.getElementById('poModalRef').textContent = p.id;
    document.getElementById('poModalBadge').className = 'modal-badge ' + cls;
    document.getElementById('poModalBadge').innerHTML = '<span class="bdot"></span>' + p.status.charAt(0).toUpperCase() + p.status.slice(1);

    document.getElementById('poModalAmount').textContent = fmt(p.total);
    document.getElementById('poModalCount').textContent = p.merchants + ' merchants';
    document.getElementById('poModalMethod').textContent = p.method;
    document.getElementById('poModalDate').textContent = fmtDate(p.date);
    document.getElementById('poModalFee').textContent = fmt(p.fee);

    var mHtml = '';
    p.merchantList.forEach(function (m) {
      mHtml += '<div class="po-modal-merchant">';
      mHtml += '<div class="po-modal-merchant-av"><img src="' + avatarUrl(m.email) + '" alt="' + m.name.charAt(0) + '" loading="lazy"></div>';
      mHtml += '<div class="po-modal-merchant-info"><div class="po-modal-merchant-name">' + m.name + '</div><div class="po-modal-merchant-email">' + m.email + '</div></div>';
      mHtml += '<div class="po-modal-merchant-amt">' + fmt(m.amt) + '</div>';
      mHtml += '</div>';
    });
    document.getElementById('poModalMerchants').innerHTML = mHtml;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  var debounceTimer;
  if (searchInput) searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer); currentPage = 1;
    debounceTimer = setTimeout(render, 250);
  });
  if (statusFilter) statusFilter.addEventListener('change', function () { currentPage = 1; render(); });

  render();
});
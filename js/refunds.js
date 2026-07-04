document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ── MOCK REFUND DATA ── */
  var refunds = [
    { id: 'REF_a12b34', customer: 'Bolu Adeyemi', email: 'bolu@email.com', amount: 800, fee: 0, reason: 'Duplicate charge', status: 'approved', method: 'USSD', date: '2026-06-03T18:45:00', resolved: '2026-06-04T10:30:00' },
    { id: 'REF_c56d78', customer: 'Zainab Abdullah', email: 'zainab@email.com', amount: 4500, fee: 67.5, reason: 'Product not delivered', status: 'pending', method: 'Card', date: '2026-05-29T20:05:00', resolved: null },
    { id: 'REF_e90f12', customer: 'Femi Adekunle', email: 'femi@email.com', amount: 300, fee: 0, reason: 'Payment failed — customer requested refund', status: 'declined', method: 'USSD', date: '2026-05-22T22:10:00', resolved: '2026-05-23T09:00:00' },
    { id: 'REF_g34h56', customer: 'Kayode Idowu', email: 'kayode@email.com', amount: 1500, fee: 0, reason: 'Wrong amount charged', status: 'pending', method: 'USSD', date: '2026-05-18T06:30:00', resolved: null },
    { id: 'REF_i78j90', customer: 'Bisi Adegoke', email: 'bisi@email.com', amount: 750, fee: 11.25, reason: 'Customer cancelled order', status: 'approved', method: 'Card', date: '2026-05-13T21:20:00', resolved: '2026-05-14T08:15:00' },
    { id: 'REF_k01l23', customer: 'Segun Lawal', email: 'segun@email.com', amount: 950, fee: 14.25, reason: 'Service not rendered', status: 'approved', method: 'Bank Transfer', date: '2026-05-26T16:50:00', resolved: '2026-05-27T11:00:00' },
    { id: 'REF_m45n67', customer: 'Chioma Obi', email: 'chioma@email.com', amount: 2500, fee: 37.5, reason: 'Overcharged', status: 'pending', method: 'Card', date: '2026-06-06T14:20:00', resolved: null },
    { id: 'REF_o89p01', customer: 'Emeka Okafor', email: 'emeka.o@email.com', amount: 1200, fee: 18, reason: 'Duplicate transaction', status: 'approved', method: 'Bank Transfer', date: '2026-06-02T09:35:00', resolved: '2026-06-03T16:00:00' },
    { id: 'REF_q23r45', customer: 'Nnenna Eze', email: 'nnenna@email.com', amount: 600, fee: 9, reason: 'Item returned', status: 'declined', method: 'USSD', date: '2026-05-30T12:10:00', resolved: '2026-05-31T10:45:00' },
    { id: 'REF_s67t89', customer: 'Tobi Adeniyi', email: 'tobi@email.com', amount: 1100, fee: 16.5, reason: 'Payment error', status: 'pending', method: 'QR', date: '2026-06-07T08:55:00', resolved: null },
    { id: 'REF_u01v23', customer: 'Aisha Bello', email: 'aisha@email.com', amount: 3200, fee: 48, reason: 'Service cancelled', status: 'approved', method: 'Card', date: '2026-06-01T11:20:00', resolved: '2026-06-02T14:00:00' },
    { id: 'REF_w45x67', customer: 'David Okonkwo', email: 'david@email.com', amount: 1800, fee: 27, reason: 'Overcharged', status: 'declined', method: 'Bank Transfer', date: '2026-05-25T15:40:00', resolved: '2026-05-26T09:30:00' },
    { id: 'REF_y89z01', customer: 'Funke Adeola', email: 'funke@email.com', amount: 950, fee: 0, reason: 'Wrong item sent', status: 'pending', method: 'USSD', date: '2026-06-08T07:15:00', resolved: null },
    { id: 'REF_ab23cd', customer: 'Ibrahim Musa', email: 'ibrahim@email.com', amount: 2100, fee: 31.5, reason: 'Duplicate charge', status: 'approved', method: 'Card', date: '2026-05-28T19:50:00', resolved: '2026-05-29T12:00:00' },
    { id: 'REF_ef45gh', customer: 'Grace Olamide', email: 'grace@email.com', amount: 700, fee: 0, reason: 'Service not provided', status: 'pending', method: 'QR', date: '2026-06-09T10:30:00', resolved: null },
  ];

  /* ── DOM REFS ── */
  var searchInput = document.getElementById('refundSearch');
  var modalOverlay = document.getElementById('refundModalOverlay');
  var modalClose = document.getElementById('refundModalClose');
  var modalApproveBtn = document.getElementById('modalApproveBtn');
  var modalDeclineBtn = document.getElementById('modalDeclineBtn');

  /* ── HELPERS ── */
  function fmt(n) { return '\u20A6' + n.toLocaleString(); }
  function avatarUrl(e) { return 'https://i.pravatar.cc/60?u=' + encodeURIComponent(e); }
  function fmtDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function fmtDateTime(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' at ' +
      d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
  }
  function statusMeta(s) {
    if (s === 'approved') return { label: 'Approved', cls: 'success' };
    if (s === 'pending') return { label: 'Pending', cls: 'pending' };
    return { label: 'Declined', cls: 'failed' };
  }

  /* ── GET FILTERED DATA ── */
  function getFiltered() {
    var q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    if (!q) return { all: refunds, pending: filterByStatus('pending'), approved: filterByStatus('approved'), declined: filterByStatus('declined') };
    var filtered = refunds.filter(function (r) {
      return r.customer.toLowerCase().indexOf(q) > -1 ||
             r.email.toLowerCase().indexOf(q) > -1 ||
             r.id.toLowerCase().indexOf(q) > -1 ||
             r.reason.toLowerCase().indexOf(q) > -1;
    });
    return {
      all: filtered,
      pending: filtered.filter(function(r){return r.status==='pending';}),
      approved: filtered.filter(function(r){return r.status==='approved';}),
      declined: filtered.filter(function(r){return r.status==='declined';})
    };
  }
  function filterByStatus(s) {
    return refunds.filter(function(r){return r.status===s;});
  }

  /* ── RENDER ── */
  function render() {
    var data = getFiltered();
    var totalAmount = 0;
    refunds.forEach(function(r){totalAmount+=r.amount;});

    /* Stats */
    document.getElementById('statPending').textContent = filterByStatus('pending').length;
    document.getElementById('statApproved').textContent = filterByStatus('approved').length;
    document.getElementById('statDeclined').textContent = filterByStatus('declined').length;
    document.getElementById('statTotal').textContent = fmt(totalAmount);
    document.getElementById('countPending').textContent = data.pending.length;
    document.getElementById('countApproved').textContent = data.approved.length;
    document.getElementById('countDeclined').textContent = data.declined.length;

    renderColumn('kanbanPending', data.pending);
    renderColumn('kanbanApproved', data.approved);
    renderColumn('kanbanDeclined', data.declined);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function renderColumn(containerId, items) {
    var container = document.getElementById(containerId);
    if (items.length === 0) {
      container.innerHTML = '<div class="kanban-empty"><div class="kanban-empty-icon"><i data-lucide="inbox" style="width:28px;height:28px;"></i></div><div class="kanban-empty-text">No refunds</div><div class="kanban-empty-sub">' + (searchInput && searchInput.value ? 'No matches found' : 'All clear here') + '</div></div>';
      return;
    }
    var html = '';
    items.forEach(function (r) {
      var sm = statusMeta(r.status);
      html += '<div class="kanban-card" data-id="' + r.id + '">';
      html += '<div class="kanban-card-top">';
      html += '<div class="kanban-card-av"><img src="' + avatarUrl(r.email) + '" alt="' + r.customer.charAt(0) + '" loading="lazy"></div>';
      html += '<div class="kanban-card-name">' + r.customer + '</div>';
      html += '<div class="kanban-card-ref">' + r.id + '</div>';
      html += '</div>';
      html += '<div class="kanban-card-amount" style="color:' + (r.status === 'approved' ? 'var(--green)' : r.status === 'declined' ? 'var(--red)' : 'var(--amber)') + ';">- ' + fmt(r.amount) + '</div>';
      html += '<div class="kanban-card-reason">' + r.reason + '</div>';
      html += '<div class="kanban-card-meta"><span>' + r.method + '</span><span>' + fmtDate(r.date) + '</span></div>';
      if (r.status === 'pending') {
        html += '<div class="kanban-card-actions">';
        html += '<button class="kanban-card-btn approve" data-id="' + r.id + '" data-action="approve"><i data-lucide="check" style="width:12px;height:12px;"></i> Approve</button>';
        html += '<button class="kanban-card-btn decline" data-id="' + r.id + '" data-action="decline"><i data-lucide="x" style="width:12px;height:12px;"></i> Decline</button>';
        html += '</div>';
      }
      html += '</div>';
    });
    container.innerHTML = html;

    /* Card click → modal */
    container.querySelectorAll('.kanban-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.kanban-card-btn')) return;
        openModal(this.dataset.id);
      });
    });

    /* Inline approve/decline */
    container.querySelectorAll('.kanban-card-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = this.dataset.id;
        var action = this.dataset.action;
        for (var i = 0; i < refunds.length; i++) {
          if (refunds[i].id === id) {
            refunds[i].status = action === 'approve' ? 'approved' : 'declined';
            refunds[i].resolved = new Date().toISOString();
            break;
          }
        }
        render();
      });
    });
  }

  /* ── OPEN MODAL ── */
  var currentModalId = null;
  function openModal(id) {
    var r = null;
    for (var i = 0; i < refunds.length; i++) {
      if (refunds[i].id === id) { r = refunds[i]; break; }
    }
    if (!r) return;
    currentModalId = r.id;

    var sm = statusMeta(r.status);
    document.getElementById('modalStatusIcon').className = 'modal-status-icon ' + sm.cls;
    var ico = r.status === 'approved' ? 'check-circle' : r.status === 'pending' ? 'clock' : 'x-circle';
    document.getElementById('modalStatusIcon').innerHTML = '<i data-lucide="' + ico + '" style="width:18px;height:18px;"></i>';
    document.getElementById('modalTitle').textContent = 'Refund ' + sm.label;
    document.getElementById('modalRef').textContent = r.id;
    document.getElementById('modalBadge').className = 'modal-badge ' + sm.cls;
    document.getElementById('modalBadge').innerHTML = '<span class="bdot"></span>' + sm.label;

    document.getElementById('modalAmount').textContent = '- ' + fmt(r.amount);
    document.getElementById('modalAmount').style.color = 'var(--red)';
    document.getElementById('modalFee').innerHTML = 'Fee waived: <span>' + fmt(r.fee) + '</span> &middot; Refund total: <span>' + fmt(r.amount - r.fee) + '</span>';

    document.getElementById('refSummaryReason').textContent = r.reason;
    document.getElementById('refSummaryMethod').textContent = r.method;
    document.getElementById('refSummaryRequested').textContent = fmtDateTime(r.date);
    document.getElementById('refSummaryResolved').textContent = fmtDateTime(r.resolved);

    document.getElementById('modalCustAv').innerHTML = '<img src="' + avatarUrl(r.email) + '" alt="' + r.customer.charAt(0) + '" loading="lazy">';
    document.getElementById('modalCustName').textContent = r.customer;
    document.getElementById('modalCustEmail').textContent = r.email;

    var events = getTimeline(r);
    var tlHtml = '';
    events.forEach(function (e) {
      tlHtml += '<div class="timeline-item">';
      tlHtml += '<div class="timeline-dot ' + e.dot + '"></div>';
      tlHtml += '<div class="timeline-content">';
      tlHtml += '<div class="timeline-label">' + e.label + '</div>';
      if (e.desc) tlHtml += '<div class="timeline-desc">' + e.desc + '</div>';
      tlHtml += '<div class="timeline-time">' + e.time + '</div>';
      tlHtml += '</div></div>';
    });
    document.getElementById('refundTimeline').innerHTML = tlHtml;

    /* Show/hide approve/decline in modal */
    if (modalApproveBtn) modalApproveBtn.style.display = r.status === 'pending' ? 'flex' : 'none';
    if (modalDeclineBtn) modalDeclineBtn.style.display = r.status === 'pending' ? 'flex' : 'none';

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function getTimeline(r) {
    var events = [];
    events.push({ label: 'Refund Requested', desc: r.reason, time: fmtDateTime(r.date), dot: 'completed' });
    if (r.status === 'approved') {
      var d = new Date(r.date);
      var d2 = new Date(d.getTime() + 3600000);
      events.push({ label: 'Under Review', desc: 'Review initiated by support', time: fmtDateTime(d2.toISOString()), dot: 'completed' });
      events.push({ label: 'Refund Approved', desc: 'Amount reversed to customer', time: fmtDateTime(r.resolved), dot: 'completed' });
    } else if (r.status === 'declined') {
      events.push({ label: 'Under Review', desc: 'Review initiated by support', time: fmtDateTime(new Date(new Date(r.date).getTime() + 3600000).toISOString()), dot: 'completed' });
      events.push({ label: 'Refund Declined', desc: 'Request did not meet policy criteria', time: fmtDateTime(r.resolved), dot: 'failed' });
    } else {
      events.push({ label: 'Awaiting Review', desc: 'Pending support team review', time: '—', dot: 'current' });
      events.push({ label: 'Decision Pending', desc: 'Will be approved or declined', time: '—', dot: 'pending' });
    }
    return events;
  }

  /* ── MODAL APPROVE / DECLINE ── */
  function handleModalAction(action) {
    if (!currentModalId) return;
    for (var i = 0; i < refunds.length; i++) {
      if (refunds[i].id === currentModalId) {
        refunds[i].status = action === 'approve' ? 'approved' : 'declined';
        refunds[i].resolved = new Date().toISOString();
        break;
      }
    }
    closeModal();
    render();
  }
  if (modalApproveBtn) modalApproveBtn.addEventListener('click', function () { handleModalAction('approve'); });
  if (modalDeclineBtn) modalDeclineBtn.addEventListener('click', function () { handleModalAction('decline'); });

  /* ── CLOSE MODAL ── */
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ── SEARCH ── */
  var debounceTimer;
  if (searchInput) searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(render, 250);
  });

  render();
});
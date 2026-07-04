document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ── MOCK DATA ── */
  var disputes = [
    { id: 'DSP_001', customer: 'Zainab Abdullah', email: 'zainab@email.com', amount: 4500, reason: 'Product not delivered — customer claims item never arrived despite tracking showing delivered.', status: 'open', method: 'Card', txnRef: 'TXN_a12b34', date: '2026-06-07T14:30:00', evidence: [{name:'Tracking Screenshot',size:'234 KB'},{name:'Customer Email',size:'45 KB'}], timeline: [{label:'Dispute Opened', desc:'Customer reported issue', time:'Jun 7, 14:30'},{label:'Evidence Requested', desc:'Awaiting merchant response', time:'Jun 7, 15:00'}] },
    { id: 'DSP_002', customer: 'Femi Adekunle', email: 'femi@email.com', amount: 1200, reason: 'Service not rendered — payment was taken but service was not provided. Customer demanding full refund.', status: 'review', method: 'Bank Transfer', txnRef: 'TXN_c56d78', date: '2026-06-05T09:15:00', evidence: [{name:'Payment Receipt',size:'156 KB'},{name:'Chat History',size:'892 KB'},{name:'Service Agreement',size:'312 KB'}], timeline: [{label:'Dispute Opened', desc:'Customer reported issue', time:'Jun 5, 09:15'},{label:'Under Review', desc:'Support team reviewing', time:'Jun 5, 11:30'},{label:'Merchant Contacted', desc:'Awaiting merchant evidence', time:'Jun 6, 10:00'}] },
    { id: 'DSP_003', customer: 'Chioma Obi', email: 'chioma@email.com', amount: 2500, reason: 'Unauthorized transaction — customer claims they did not authorize this payment. Card was used without consent.', status: 'won', method: 'Card', txnRef: 'TXN_e90f12', date: '2026-05-28T18:45:00', evidence: [{name:'Bank Statement',size:'1.2 MB'},{name:'IP Logs',size:'87 KB'},{name:'Device Fingerprint',size:'23 KB'}], timeline: [{label:'Dispute Opened', desc:'Customer reported issue', time:'May 28, 18:45'},{label:'Under Review', desc:'Fraud team assigned', time:'May 29, 09:00'},{label:'Evidence Submitted', desc:'Bank provided documentation', time:'May 30, 11:15'},{label:'Dispute Won', desc:'Resolved in merchant favor', time:'Jun 2, 14:30'}] },
    { id: 'DSP_004', customer: 'Kayode Idowu', email: 'kayode@email.com', amount: 800, reason: 'Duplicate charge — same transaction was processed twice. One instance was a duplicate.', status: 'review', method: 'USSD', txnRef: 'TXN_g34h56', date: '2026-06-03T11:20:00', evidence: [{name:'Transaction History',size:'178 KB'}], timeline: [{label:'Dispute Opened', desc:'Customer reported issue', time:'Jun 3, 11:20'},{label:'Under Review', desc:'Checking with processor', time:'Jun 3, 14:00'}] },
    { id: 'DSP_005', customer: 'Bisi Adegoke', email: 'bisi@email.com', amount: 3200, reason: 'Item significantly different from description — item received does not match what was ordered. Photos attached.', status: 'lost', method: 'Card', txnRef: 'TXN_i78j90', date: '2026-05-20T16:00:00', evidence: [{name:'Product Photos',size:'2.1 MB'},{name:'Order Details',size:'145 KB'},{name:'Website Screenshots',size:'890 KB'}], timeline: [{label:'Dispute Opened', desc:'Customer reported issue', time:'May 20, 16:00'},{label:'Under Review', desc:'Evidence review initiated', time:'May 21, 10:30'},{label:'Dispute Lost', desc:'Resolved in customer favor — refund issued', time:'May 25, 09:00'}] },
    { id: 'DSP_006', customer: 'Segun Lawal', email: 'segun@email.com', amount: 1800, reason: 'Payment method stolen — customers card was used fraudulently. Requesting chargeback.', status: 'open', method: 'Card', txnRef: 'TXN_k01l23', date: '2026-06-08T07:45:00', evidence: [], timeline: [{label:'Dispute Opened', desc:'Customer reported issue', time:'Jun 8, 07:45'}] },
    { id: 'DSP_007', customer: 'Nnenna Eze', email: 'nnenna@email.com', amount: 600, reason: 'Goods damaged on arrival — product was delivered with visible damage. Customer provided photos.', status: 'won', method: 'USSD', txnRef: 'TXN_q23r45', date: '2026-05-15T13:10:00', evidence: [{name:'Damage Photos',size:'1.8 MB'},{name:'Delivery Report',size:'95 KB'}], timeline: [{label:'Dispute Opened', desc:'Customer reported issue', time:'May 15, 13:10'},{label:'Under Review', desc:'Evidence collected', time:'May 16, 09:30'},{label:'Dispute Won', desc:'Resolved in merchant favor', time:'May 19, 11:00'}] },
    { id: 'DSP_008', customer: 'Tobi Adeniyi', email: 'tobi@email.com', amount: 1100, reason: 'Subscription not cancelled — customer unsubscribed but was still charged for next billing cycle.', status: 'open', method: 'QR', txnRef: 'TXN_s67t89', date: '2026-06-09T19:00:00', evidence: [], timeline: [{label:'Dispute Opened', desc:'Customer reported issue', time:'Jun 9, 19:00'}] },
  ];

  var searchInput = document.getElementById('disputeSearch');
  var activeFilter = 'all';

  function fmt(n) { return '\u20A6' + n.toLocaleString(); }
  function avatarUrl(e) { return 'https://i.pravatar.cc/60?u=' + encodeURIComponent(e); }

  function getFiltered() {
    var q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    return disputes.filter(function (d) {
      if (activeFilter !== 'all' && d.status !== activeFilter) return false;
      if (q) {
        return d.customer.toLowerCase().indexOf(q) > -1 || d.email.toLowerCase().indexOf(q) > -1 || d.id.toLowerCase().indexOf(q) > -1 || d.reason.toLowerCase().indexOf(q) > -1;
      }
      return true;
    });
  }

  function render() {
    /* Stats */
    var open = 0, review = 0, won = 0, lost = 0, atRisk = 0;
    disputes.forEach(function (d) {
      if (d.status === 'open') { open++; atRisk += d.amount; }
      if (d.status === 'review') { review++; atRisk += d.amount; }
      if (d.status === 'won') won++;
      if (d.status === 'lost') lost++;
    });
    document.getElementById('statOpen').textContent = open;
    document.getElementById('statReview').textContent = review;
    document.getElementById('statWon').textContent = won;
    document.getElementById('statLost').textContent = lost;
    document.getElementById('statAtRisk').textContent = fmt(atRisk);

    var data = getFiltered();
    var container = document.getElementById('disputeList');

    if (data.length === 0) {
      container.innerHTML = '<div class="dsp-empty"><div class="dsp-empty-icon"><i data-lucide="inbox" style="width:36px;height:36px;"></i></div><div class="dsp-empty-text">No disputes found</div><div class="dsp-empty-sub">' + (searchInput && searchInput.value ? 'Try a different search' : 'All disputes have been resolved') + '</div></div>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    var html = '';
    data.forEach(function (d) {
      var st = d.status;
      html += '<div class="dsp-card" data-id="'+d.id+'">';
      html += '<div class="dsp-card-header" data-toggle="'+d.id+'">';
      html += '<div class="dsp-card-av"><img src="'+avatarUrl(d.email)+'" alt="'+d.customer.charAt(0)+'" loading="lazy"></div>';
      html += '<div class="dsp-card-info"><div class="dsp-card-name">'+d.customer+'</div><div class="dsp-card-meta">'+d.id+' &middot; '+d.method+'</div></div>';
      html += '<div class="dsp-card-amount" style="color:'+(st==='lost'?'var(--red)':st==='won'?'var(--green)':'var(--amber)')+';">'+fmt(d.amount)+'</div>';
      html += '<span class="dsp-card-status '+st+'">'+st.charAt(0).toUpperCase()+st.slice(1)+'</span>';
      html += '<div class="dsp-card-chevron"><i data-lucide="chevron-down" style="width:14px;height:14px;"></i></div>';
      html += '</div>';
      html += '<div class="dsp-card-body">';
      html += '<div class="dsp-card-desc">'+d.reason+'</div>';
      html += '<div class="dsp-card-detail-grid"><div><div class="dsp-card-detail-lbl">Transaction Ref</div><div class="dsp-card-detail-val">'+d.txnRef+'</div></div><div><div class="dsp-card-detail-lbl">Opened</div><div class="dsp-card-detail-val">'+d.timeline[0].time+'</div></div></div>';
      if (d.evidence.length > 0) {
        html += '<div style="font-size:12px;font-weight:700;margin-bottom:8px;">Evidence ('+d.evidence.length+')</div>';
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">';
        d.evidence.forEach(function (ev) {
          html += '<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--bg-s);border:1px solid var(--border);border-radius:6px;font-size:11px;"><i data-lucide="file-text" style="width:11px;height:11px;color:var(--blue);"></i>'+ev.name+' <span style="color:var(--t3);font-family:Inter,sans-serif;">'+ev.size+'</span></div>';
        });
        html += '</div>';
      }
      if (d.status === 'open' || d.status === 'review') {
        html += '<div class="dsp-card-actions">';
        html += '<button class="dsp-card-btn approve" data-id="'+d.id+'" data-action="won"><i data-lucide="shield-check" style="width:12px;height:12px;"></i> Resolve (Won)</button>';
        html += '<button class="dsp-card-btn reject" data-id="'+d.id+'" data-action="lost"><i data-lucide="shield-off" style="width:12px;height:12px;"></i> Resolve (Lost)</button>';
        html += '<button class="dsp-card-btn" data-id="'+d.id+'" data-action="review" style="margin-left:auto;"><i data-lucide="search" style="width:12px;height:12px;"></i> Mark Review</button>';
        html += '</div>';
      }
      html += '</div></div>';
    });
    container.innerHTML = html;

    /* Toggle accordion */
    container.querySelectorAll('.dsp-card-header').forEach(function (hdr) {
      hdr.addEventListener('click', function () {
        var card = this.parentElement;
        card.classList.toggle('expanded');
      });
    });

    /* Action buttons */
    container.querySelectorAll('.dsp-card-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = this.dataset.id;
        var action = this.dataset.action;
        for (var i = 0; i < disputes.length; i++) {
          if (disputes[i].id === id) {
            disputes[i].status = action;
            break;
          }
        }
        render();
      });
    });

    /* Click card name/av → open modal */
    container.querySelectorAll('.dsp-card-av, .dsp-card-name, .dsp-card-amount, .dsp-card-status').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        var card = this.closest('.dsp-card');
        if (card) openModal(card.dataset.id);
      });
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /* ── TABS ── */
  document.querySelectorAll('.dsp-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.dsp-tab').forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      activeFilter = this.dataset.filter;
      render();
    });
  });

  /* ── SEARCH ── */
  var debounceTimer;
  if (searchInput) searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(render, 250);
  });

  /* ── MODAL ── */
  var modalOverlay = document.getElementById('disputeModalOverlay');
  var modalClose = document.getElementById('dspModalClose');

  function openModal(id) {
    var d = null;
    for (var i = 0; i < disputes.length; i++) { if (disputes[i].id === id) { d = disputes[i]; break; } }
    if (!d) return;

    var icons = { open:'flag', review:'search', won:'shield-check', lost:'shield-off' };
    var cls = { open:'pending', review:'pending', won:'success', lost:'failed' };
    document.getElementById('dspModalIcon').className = 'modal-status-icon ' + cls[d.status];
    document.getElementById('dspModalIcon').innerHTML = '<i data-lucide="'+icons[d.status]+'" style="width:18px;height:18px;"></i>';
    document.getElementById('dspModalTitle').textContent = 'Dispute #' + d.id;
    document.getElementById('dspModalRef').textContent = 'Opened ' + d.timeline[0].time;
    document.getElementById('dspModalBadge').className = 'modal-badge ' + cls[d.status];
    document.getElementById('dspModalBadge').innerHTML = '<span class="bdot"></span>' + d.status.charAt(0).toUpperCase() + d.status.slice(1);

    document.getElementById('dspModalAv').innerHTML = '<img src="'+avatarUrl(d.email)+'" alt="'+d.customer.charAt(0)+'" loading="lazy">';
    document.getElementById('dspModalName').textContent = d.customer;
    document.getElementById('dspModalEmail').textContent = d.email;
    document.getElementById('dspModalAmount').textContent = fmt(d.amount);
    document.getElementById('dspModalReason').textContent = d.reason;
    document.getElementById('dspModalTxnRef').textContent = d.txnRef;
    document.getElementById('dspModalMethod').textContent = d.method;
    document.getElementById('dspModalOpened').textContent = d.timeline[0].time;

    var evHtml = '';
    if (d.evidence.length === 0) evHtml = '<div style="font-size:12px;color:var(--t3);padding:8px 0;">No evidence uploaded yet</div>';
    d.evidence.forEach(function (ev) {
      evHtml += '<div class="dsp-evidence-item"><div class="dsp-evidence-icon"><i data-lucide="file-text" style="width:13px;height:13px;"></i></div><div class="dsp-evidence-name">'+ev.name+'</div><div class="dsp-evidence-size">'+ev.size+'</div></div>';
    });
    document.getElementById('dspModalEvidence').innerHTML = evHtml;

    var tlHtml = '';
    d.timeline.forEach(function (t) {
      tlHtml += '<div class="timeline-item"><div class="timeline-dot completed"></div><div class="timeline-content"><div class="timeline-label">'+t.label+'</div><div class="timeline-desc">'+t.desc+'</div><div class="timeline-time">'+t.time+'</div></div></div>';
    });
    if (d.status === 'open') {
      tlHtml += '<div class="timeline-item"><div class="timeline-dot current"></div><div class="timeline-content"><div class="timeline-label">Awaiting Review</div><div class="timeline-desc">Pending support action</div><div class="timeline-time">—</div></div></div>';
    }
    document.getElementById('dspModalTimeline').innerHTML = tlHtml;

    var resolveBtn = document.getElementById('dspModalResolve');
    var loseBtn = document.getElementById('dspModalLose');
    if (d.status === 'open' || d.status === 'review') {
      resolveBtn.style.display = 'flex'; loseBtn.style.display = 'flex';
      resolveBtn.dataset.id = d.id; resolveBtn.dataset.action = 'won';
      loseBtn.dataset.id = d.id; loseBtn.dataset.action = 'lost';
    } else {
      resolveBtn.style.display = 'none'; loseBtn.style.display = 'none';
    }

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

  /* Modal resolve buttons */
  document.getElementById('dspModalResolve').addEventListener('click', function () {
    if (!this.dataset.id) return;
    for (var i = 0; i < disputes.length; i++) { if (disputes[i].id === this.dataset.id) { disputes[i].status = this.dataset.action; break; } }
    closeModal(); render();
  });
  document.getElementById('dspModalLose').addEventListener('click', function () {
    if (!this.dataset.id) return;
    for (var i = 0; i < disputes.length; i++) { if (disputes[i].id === this.dataset.id) { disputes[i].status = this.dataset.action; break; } }
    closeModal(); render();
  });

  render();
});
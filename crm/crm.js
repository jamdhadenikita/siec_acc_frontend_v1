// =============================================================
// CRM MODULE — SIEC (Aquilon ERP)
// Lead Registration · Contacted Leads · Deals · Closed Won · Activities Log
// Same structure as purchase.js: one page, module tabs, shared helpers.
// The helper block below (icons → uid, pagination) is copied unchanged
// from purchase.js so both modules behave and look identical.
// =============================================================

function iconPlus() { return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>`; }
function iconEdit() { return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`; }
function iconTrash() { return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>`; }
function iconEye() { return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`; }
function iconX() { return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6L6 18M6 6l12 12"/></svg>`; }
function iconSave() { return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>`; }
function iconCheckCircle() { return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>`; }
function iconXCircle() { return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`; }
function iconTruck() { return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`; }
function iconChevronLeft() { return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>`; }
function iconChevronRight() { return `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>`; }

// ---------- Toast System (identical pattern to Vendors) ----------
function showToast(message, kind) {
  kind = kind || 'success';
  var wrap = document.getElementById('toastWrap');
  var colors = { success: 'bg-green-600', info: 'bg-primary', warning: 'bg-amber-600', error: 'bg-red-600' };
  var el = document.createElement('div');
  el.className = 'toast ' + colors[kind] + ' text-white text-sm font-semibold px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-xs';
  el.innerHTML = '<span>' + message + '</span>';
  wrap.appendChild(el);
  setTimeout(function () {
    el.style.transition = 'opacity .3s';
    el.style.opacity = '0';
    setTimeout(function () { el.remove(); }, 300);
  }, 2600);
}

// ---------- Modal System ----------
function openModal(innerHtml, opts) {
  opts = opts || {};
  var root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4" id="modalOverlay">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]" id="modalBackdrop"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl w-full ${opts.width || 'max-w-2xl'} max-h-[92vh] overflow-hidden animate-modal" ${opts.id ? 'id="' + opts.id + '"' : ''}>
        ${innerHtml}
      </div>
    </div>`;
  document.getElementById('modalBackdrop').addEventListener('click', closeModal);
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalRoot').innerHTML = '';
  document.body.style.overflow = '';
}
function modalHeader(title, subtitle) {
  return `
    <div class="flex items-start justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
      <div>
        <h3 class="text-lg font-bold text-gray-900">${title}</h3>
        ${subtitle ? '<p class="text-xs text-gray-500 mt-0.5">' + subtitle + '</p>' : ''}
      </div>
      <button onclick="closeModal()" class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition">${iconX()}</button>
    </div>`;
}
function modalFooter(saveLabel, onSaveAttr, extraBtns) {
  return `
    <div class="flex items-center justify-between gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl sticky bottom-0">
      <div>${extraBtns || ''}</div>
      <div class="flex gap-2">
        <button onclick="closeModal()" class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-white transition">Cancel</button>
        <button ${onSaveAttr} class="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition shadow-sm flex items-center gap-1.5">${iconSave()} ${saveLabel}</button>
      </div>
    </div>`;
}
function fld(label, inputHtml, hint) {
  return `<div class="mb-3"><label class="form-label">${label}</label>${inputHtml}${hint ? '<div class="form-hint">' + hint + '</div>' : ''}</div>`;
}

// ---------- Shared helpers ----------
function money(n) { return '₹' + Number(n || 0).toLocaleString('en-IN'); }
function badge(text, color) {
  var map = { green: 'badge-green', amber: 'badge-amber', red: 'badge-red', gray: 'badge-gray', blue: 'badge-blue' };
  var dot = { green: 'badge-dot-green', amber: 'badge-dot-amber', red: 'badge-dot-red', gray: 'badge-dot-gray', blue: 'badge-dot-blue' };
  return '<span class="badge ' + map[color] + '"><span class="badge-dot ' + dot[color] + '"></span>' + text + '</span>';
}
function rowActionsHtml(editFn, delFn, viewFn) {
  var html = '<div class="flex gap-1">';
  if (viewFn) html += '<button onclick="' + viewFn + '" class="btn-icon-action" title="View">' + iconEye() + '</button>';
  html += '<button onclick="' + editFn + '" class="btn-icon-action" title="Edit">' + iconEdit() + '</button>';
  html += '<button onclick="' + delFn + '" class="btn-icon-action danger" title="Delete">' + iconTrash() + '</button>';
  html += '</div>';
  return html;
}
function panelWrap(titleHtml, bodyHtml, extraHead) {
  return `
    <div class="panel-card">
      <div class="panel-card-head">
        <div class="panel-card-title">${titleHtml}</div>
        ${extraHead || ''}
      </div>
      <div>${bodyHtml}</div>
    </div>`;
}
function tableHtml(cols, rowsHtml) {
  var colHeaders = cols.map(function (c) {
    return '<th class="text-left text-[11px] font-bold uppercase tracking-wide text-gray-500 px-4 py-3 whitespace-nowrap">' + c + '</th>';
  }).join('');
  return `
    <div class="overflow-x-auto">
      <table class="w-full text-[13px]">
        <thead><tr class="bg-gray-50 border-b border-gray-200">${colHeaders}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>`;
}
function emptyRow(colspan, label, addFnLabel, addFn) {
  return `
    <tr><td colspan="${colspan}" class="text-center py-10 text-gray-400 text-sm">
      <div class="flex justify-center mb-2 empty-icon-svg">${iconTruck()}</div>
      ${label} Try adjusting your filters or
      <button onclick="${addFn}" class="text-primary font-semibold hover:underline">${addFnLabel}</button>.
    </td></tr>`;
}
function fmtDate(iso) {
  if (!iso) return '—';
  var d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function todayIso() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function uid(prefix, list) {
  var n = list.length ? Math.max.apply(null, list.map(function (x) { return parseInt((x.number || '0').split('-')[1], 10) || 0; })) + 1 : 1001;
  return prefix + '-' + n;
}

function paginateList(list, state) {
  var totalItems = list.length;
  var totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;
  var start = (state.page - 1) * state.pageSize;
  return { pageItems: list.slice(start, start + state.pageSize), totalItems: totalItems, totalPages: totalPages };
}

function paginationBarHtml(module, totalItems, state) {
  var totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));
  var start = totalItems === 0 ? 0 : (state.page - 1) * state.pageSize + 1;
  var end = Math.min(totalItems, state.page * state.pageSize);
  return `
    <div class="pagination-bar">
      <div class="pagination-info">Showing ${start}–${end} of ${totalItems}</div>
      <div class="pagination-controls">
        <select class="pagination-size-select" onchange="changePMPageSize('${module}', this.value)">
          <option value="5" ${state.pageSize === 5 ? 'selected' : ''}>5</option>
          <option value="10" ${state.pageSize === 10 ? 'selected' : ''}>10</option>
          <option value="25" ${state.pageSize === 25 ? 'selected' : ''}>25</option>
          <option value="50" ${state.pageSize === 50 ? 'selected' : ''}>50</option>
        </select>
        <button type="button" class="pagination-btn" onclick="goToPMPage('${module}', ${state.page - 1})" ${state.page <= 1 ? 'disabled' : ''} title="Previous page">${iconChevronLeft()}</button>
        <span class="pagination-page-label">Page ${state.page} of ${totalPages}</span>
        <button type="button" class="pagination-btn" onclick="goToPMPage('${module}', ${state.page + 1})" ${state.page >= totalPages ? 'disabled' : ''} title="Next page">${iconChevronRight()}</button>
      </div>
    </div>`;
}

// ---------- CRM small helpers (same style as the helpers above) ----------
function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function $v(id) { return (document.getElementById(id) || {}).value || ''; }
function optionsHtml(list, sel, blank) { return (blank ? '<option value="">' + blank + '</option>' : '') + list.map(function (o) { return '<option ' + (o === sel ? 'selected' : '') + '>' + esc(o) + '</option>'; }).join(''); }
function fa(n) { return '<i class="fa-solid fa-' + n + ' text-[12px]"></i>'; }
function actBtn(fn, icon, title, cls) { return '<button onclick="' + fn + '" class="btn-icon-action' + (cls ? ' ' + cls : '') + '" title="' + title + '">' + fa(icon) + '</button>'; }
function modalForm(title, sub, body, saveLabel, saveFn, width) {
  openModal(modalHeader(title, sub) + '<div class="px-6 py-4 modal-scroll">' + body + '</div>' + modalFooter(saveLabel, 'onclick="' + saveFn + '"'), { width: width || 'max-w-lg' });
}
function journeyBtn(no) { return '<button onclick="openJourney(\'' + no + '\')" class="px-4 py-2 rounded-lg text-sm font-semibold text-primary border border-primary/40 hover:bg-primary-soft transition">View Journey</button>'; }

// =============================================================
// MASTERS (dynamic dropdowns — edit these lists, UI updates itself)
// =============================================================
var leadSources = ['Website', 'Referral', 'Exhibition', 'Cold Call', 'Social Media', 'Other'];
var serviceList = ['ETP', 'STP', 'WTP', 'Environmental Audit', 'Consultancy', 'Other'];
var lostReasons = ['Price too high', 'Chose competitor', 'No response', 'Project cancelled', 'Other'];
var dealStages = [
  { name: 'Qualification', prob: 10 }, { name: 'Site Visit', prob: 30 }, { name: 'Proposal', prob: 50 },
  { name: 'Negotiation', prob: 75 }, { name: 'Closed Won', prob: 100, won: true }, { name: 'Closed Lost', prob: 0, lost: true }
];
function stageObj(n) { return dealStages.find(function (s) { return s.name === n; }) || { prob: 0 }; }
function openStages() { return dealStages.filter(function (s) { return !s.won && !s.lost; }).map(function (s) { return s.name; }); }
function stageName(k) { return dealStages.find(function (s) { return s[k]; }).name; }

// =============================================================
// SEED DATA (demo — replace with API calls when the CRM backend is ready)
// =============================================================
var leads = [
  { id: 'ld8', number: 'LD-1008', name: 'Rajesh Kulkarni', company: 'Shree Dairy Pvt Ltd', designation: 'Plant Manager', mobile: '9822011001', email: 'rajesh@shreedairy.in', city: 'Pune', source: 'Referral', service: 'ETP', status: 'registered', nextFollowup: '', notes: '', lostReason: '', createdAt: '2026-10-18' },
  { id: 'ld7', number: 'LD-1007', name: 'Meera Joshi', company: 'Sahyadri Foods', designation: 'Operations Head', mobile: '9765012340', email: 'meera@sahyadrifoods.in', city: 'Nashik', source: 'Website', service: 'STP', status: 'registered', nextFollowup: '', notes: '', lostReason: '', createdAt: '2026-10-16' },
  { id: 'ld6', number: 'LD-1006', name: 'Anil Pawar', company: 'Nashik Municipal Corporation', designation: 'Executive Engineer', mobile: '9422055566', email: 'anil@nmc.gov.in', city: 'Nashik', source: 'Exhibition', service: 'STP', status: 'contacted', nextFollowup: '2026-10-25', notes: '', lostReason: '', createdAt: '2026-10-09' },
  { id: 'ld5', number: 'LD-1005', name: 'Sunita Deshmukh', company: 'Deshmukh Textiles', designation: 'Manager', mobile: '9923011122', email: 'sunita@deshmukhtex.in', city: 'Ichalkaranji', source: 'Cold Call', service: 'ETP', status: 'contacted', nextFollowup: '2026-10-15', notes: '', lostReason: '', createdAt: '2026-10-05' },
  { id: 'ld4', number: 'LD-1004', name: 'Vikas Shinde', company: 'Shinde Agro Industries', designation: 'Owner', mobile: '9370045678', email: 'vikas@shindeagro.in', city: 'Satara', source: 'Referral', service: 'WTP', status: 'converted', nextFollowup: '', notes: '', lostReason: '', createdAt: '2026-09-12' },
  { id: 'ld3', number: 'LD-1003', name: 'Kavita Rane', company: 'Rane Auto Components', designation: 'Admin Head', mobile: '9822098765', email: 'kavita@raneauto.in', city: 'Pune', source: 'Social Media', service: 'Consultancy', status: 'converted', nextFollowup: '', notes: '', lostReason: '', createdAt: '2026-09-02' },
  { id: 'ld2', number: 'LD-1002', name: 'Imran Sheikh', company: 'Sheikh Hospital Trust', designation: 'Trustee', mobile: '9867012345', email: 'imran@sheikhtrust.org', city: 'Mumbai', source: 'Cold Call', service: 'STP', status: 'lost', nextFollowup: '', notes: '', lostReason: 'Price too high', createdAt: '2026-08-25' },
  { id: 'ld1', number: 'LD-1001', name: 'Prakash Mehta', company: 'Mehta Chemicals', designation: 'Director', mobile: '9890123456', email: 'prakash@mehtachem.in', city: 'Aurangabad', source: 'Website', service: 'Environmental Audit', status: 'converted', nextFollowup: '', notes: '', lostReason: '', createdAt: '2026-08-12' }
];
var deals = [
  { id: 'dl3', number: 'DL-1003', leadNo: 'LD-1004', title: 'WTP – Shinde Agro Industries', company: 'Shinde Agro Industries', contact: 'Vikas Shinde', amount: 850000, stage: 'Site Visit', expectedClose: '2026-11-25', notes: '', createdAt: '2026-09-20', closedAt: '', lostReason: '' },
  { id: 'dl2', number: 'DL-1002', leadNo: 'LD-1003', title: 'Consultancy – Rane Auto Components', company: 'Rane Auto Components', contact: 'Kavita Rane', amount: 400000, stage: 'Proposal', expectedClose: '2026-11-10', notes: '', createdAt: '2026-09-10', closedAt: '', lostReason: '' },
  { id: 'dl1', number: 'DL-1001', leadNo: 'LD-1001', title: 'Environmental Audit – Mehta Chemicals', company: 'Mehta Chemicals', contact: 'Prakash Mehta', amount: 1250000, stage: 'Closed Won', expectedClose: '', notes: '', createdAt: '2026-08-20', closedAt: '2026-09-30', lostReason: '' }
];
var activities = [];
function seedAct(at, no, co, type, ref, action, text) { activities.push({ id: 'ac' + activities.length, at: at + 'T10:00:00', leadNo: no, company: co, type: type, ref: ref, action: action, text: text }); }
seedAct('2026-08-12', 'LD-1001', 'Mehta Chemicals', 'Lead', 'LD-1001', 'Registered', 'Lead registered via Website');
seedAct('2026-08-15', 'LD-1001', 'Mehta Chemicals', 'Lead', 'LD-1001', 'Contacted', 'Marked as contacted: call about audit scope');
seedAct('2026-08-20', 'LD-1001', 'Mehta Chemicals', 'Deal', 'DL-1001', 'Converted', 'Lead converted to deal DL-1001');
seedAct('2026-09-05', 'LD-1001', 'Mehta Chemicals', 'Deal', 'DL-1001', 'Stage Changed', 'Stage: Qualification → Site Visit');
seedAct('2026-09-30', 'LD-1001', 'Mehta Chemicals', 'Deal', 'DL-1001', 'Closed Won', 'Deal closed won — ₹12,50,000');
seedAct('2026-08-25', 'LD-1002', 'Sheikh Hospital Trust', 'Lead', 'LD-1002', 'Registered', 'Lead registered via Cold Call');
seedAct('2026-09-08', 'LD-1002', 'Sheikh Hospital Trust', 'Lead', 'LD-1002', 'Lead Lost', 'Marked lost: Price too high');
seedAct('2026-09-02', 'LD-1003', 'Rane Auto Components', 'Lead', 'LD-1003', 'Registered', 'Lead registered via Social Media');
seedAct('2026-09-10', 'LD-1003', 'Rane Auto Components', 'Deal', 'DL-1002', 'Converted', 'Lead converted to deal DL-1002');
seedAct('2026-10-02', 'LD-1003', 'Rane Auto Components', 'Deal', 'DL-1002', 'Stage Changed', 'Stage: Qualification → Proposal');
seedAct('2026-09-12', 'LD-1004', 'Shinde Agro Industries', 'Lead', 'LD-1004', 'Registered', 'Lead registered via Referral');
seedAct('2026-09-20', 'LD-1004', 'Shinde Agro Industries', 'Deal', 'DL-1003', 'Converted', 'Lead converted to deal DL-1003');
seedAct('2026-10-05', 'LD-1005', 'Deshmukh Textiles', 'Lead', 'LD-1005', 'Registered', 'Lead registered via Cold Call');
seedAct('2026-10-07', 'LD-1005', 'Deshmukh Textiles', 'Lead', 'LD-1005', 'Contacted', 'Marked as contacted: interested in ETP');
seedAct('2026-10-09', 'LD-1006', 'Nashik Municipal Corporation', 'Lead', 'LD-1006', 'Registered', 'Lead registered via Exhibition');
seedAct('2026-10-12', 'LD-1006', 'Nashik Municipal Corporation', 'Lead', 'LD-1006', 'Contacted', 'Marked as contacted: met at expo');
seedAct('2026-10-16', 'LD-1007', 'Sahyadri Foods', 'Lead', 'LD-1007', 'Registered', 'Lead registered via Website');
seedAct('2026-10-18', 'LD-1008', 'Shree Dairy Pvt Ltd', 'Lead', 'LD-1008', 'Registered', 'Lead registered via Referral');
activities.sort(function (a, b) { return a.at < b.at ? 1 : -1; });

function logAct(no, company, type, ref, action, text) {
  activities.unshift({ id: 'ac' + Date.now() + Math.random(), at: new Date().toISOString(), leadNo: no, company: company, type: type, ref: ref, action: action, text: text });
}
function findLead(id) { return leads.find(function (x) { return x.id === id; }); }
function findDeal(id) { return deals.find(function (x) { return x.id === id; }); }
function refreshAll() { renderDB(); renderLR(true); renderCL(true); renderDL(true); renderCW(true); renderAL(true); }

// =============================================================
// PAGINATION STATE + TAB SWITCHING
// =============================================================
var pmPageState = { lr: { page: 1, pageSize: 10 }, cl: { page: 1, pageSize: 10 }, dl: { page: 1, pageSize: 10 }, cw: { page: 1, pageSize: 10 }, al: { page: 1, pageSize: 10 } };
function renderPMModule(m, keep) { ({ db: renderDB, lr: renderLR, cl: renderCL, dl: renderDL, cw: renderCW, al: renderAL })[m](keep); }
function goToPMPage(m, p) { pmPageState[m].page = p; renderPMModule(m, true); }
function changePMPageSize(m, s) { pmPageState[m].pageSize = Number(s); pmPageState[m].page = 1; renderPMModule(m, true); }
var CRM_TABS = { 'dashboard': 'db', 'lead-registration': 'lr', 'contacted-leads': 'cl', 'deals': 'dl', 'closed-won': 'cw', 'activities-log': 'al' };
function crmTabName(mod) { return Object.keys(CRM_TABS).find(function (k) { return CRM_TABS[k] === mod; }); }
// keep the sidebar highlight + URL in step with the active tab
function syncCrmSidebar(mod) {
  var name = crmTabName(mod);
  document.querySelectorAll('.sidebar-nav-link[data-page^="crm-"]').forEach(function (a) {
    var on = a.dataset.page === 'crm-' + name;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  try { history.replaceState(null, '', '?tab=' + name); } catch (e) {}
}
function switchModuleTab(mod) {
  syncCrmSidebar(mod);
  document.querySelectorAll('.module-tab-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.module === mod); });
  document.querySelectorAll('.module-tab-panel').forEach(function (p) { p.classList.toggle('hidden', p.dataset.module !== mod); });
  renderPMModule(mod, true);
}
function openJourney(no) { closeModal(); document.getElementById('search-al').value = no; switchModuleTab('al'); renderAL(); }

// =============================================================
// LEADS — shared table for Lead Registration + Contacted Leads
// =============================================================
function leadStatusBadge(s) { var m = { registered: ['Registered', 'blue'], contacted: ['Contacted', 'amber'], converted: ['Converted', 'green'], lost: ['Lost', 'red'] }[s] || ['—', 'gray']; return badge(m[0], m[1]); }
function isOverdue(l) { return l.status === 'contacted' && l.nextFollowup && l.nextFollowup < todayIso(); }
function getFilteredLeads(mod, fixedStatus) {
  var q = $v('search-' + mod).toLowerCase(), st = $v('filterStatus-' + mod) || 'all', src = $v('filterSource-' + mod) || 'all';
  return leads.filter(function (l) {
    var ok = !q || [l.number, l.name, l.company, l.mobile, l.email].join(' ').toLowerCase().indexOf(q) !== -1;
    return ok && (fixedStatus ? l.status === fixedStatus : (st === 'all' || l.status === st)) && (src === 'all' || l.source === src);
  });
}
function leadsPanel(mod, panel, title, filtered, actFn, empty, emptyLabel, emptyFn) {
  var pg = paginateList(filtered, pmPageState[mod]);
  var rows = pg.pageItems.length ? pg.pageItems.map(function (l) {
    var od = isOverdue(l);
    return `
      <tr class="border-b border-gray-100 table-row-hover">
        <td class="px-4 py-3 font-mono text-[12.5px] font-semibold text-gray-700">${l.number}</td>
        <td class="px-4 py-3"><div class="font-semibold text-gray-800">${esc(l.name)} ${tempPill(l.temp)}</div><div class="text-[11px] text-gray-400">${esc(l.company)}</div></td>
        <td class="px-4 py-3 text-gray-600">${esc(l.mobile)}<div class="text-[11px] text-gray-400">${esc(l.email)}</div></td>
        <td class="px-4 py-3 text-gray-600">${esc(l.source)}<div class="text-[11px] text-gray-400">${esc(l.service)}</div></td>
        <td class="px-4 py-3">${leadStatusBadge(l.status)}</td>
        <td class="px-4 py-3 ${od ? 'text-red-600 font-semibold' : 'text-gray-600'}">${fmtDate(l.nextFollowup)}${od ? '<div class="text-[11px]">Overdue</div>' : ''}</td>
        <td class="px-4 py-3">${actFn(l)}</td>
      </tr>`;
  }).join('') : emptyRow(7, empty, emptyLabel, emptyFn);
  document.getElementById(panel).innerHTML = panelWrap(title + ' <span class="panel-count-chip">' + filtered.length + '</span>',
    tableHtml(['Lead No', 'Lead', 'Contact', 'Source / Service', 'Status', 'Follow-up', 'Actions'], rows) + paginationBarHtml(mod, filtered.length, pmPageState[mod]));
}
function setText(id, v) { document.getElementById(id).textContent = v; }
function countLeads(s) { return leads.filter(function (l) { return l.status === s; }).length; }

// ---------- Lead Registration ----------
function leadActsLR(l) {
  return '<div class="flex gap-1">' + actBtn("viewLead('" + l.id + "')", 'eye', 'View') + actBtn("editLead('" + l.id + "')", 'pen', 'Edit') +
    (l.status === 'registered' ? actBtn("openContacted('" + l.id + "')", 'phone', 'Mark as contacted') + actBtn("delLead('" + l.id + "')", 'trash', 'Delete', 'danger') : '') + '</div>';
}
function renderLR(keep) {
  if (!keep) pmPageState.lr.page = 1;
  leadsPanel('lr', 'lrPanel', 'Leads', getFilteredLeads('lr'), leadActsLR, 'No leads found.', 'register a new lead', 'openAddLead()');
  setText('totalLR', leads.length); setText('regLR', countLeads('registered')); setText('contLR', countLeads('contacted')); setText('convLR', countLeads('converted'));
}
function filterLR() { renderLR(); }
function clearFiltersLR() { ['filterStatus-lr', 'filterSource-lr'].forEach(function (i) { document.getElementById(i).value = 'all'; }); document.getElementById('search-lr').value = ''; renderLR(); }

function openAddLead() { openLeadModal(null); }
function editLead(id) { openLeadModal(findLead(id)); }
function openLeadModal(existing) {
  var e = existing || { name: '', company: '', designation: '', mobile: '', email: '', city: '', source: '', service: '', notes: '', temp: 'warm', priority: 'P2', assignedTo: '', nextFollowup: '' }, isEdit = !!existing;
  modalForm(isEdit ? 'Edit Lead' : 'Register New Lead', isEdit ? e.number : 'Add a new lead record',
    '<div class="grid grid-cols-2 gap-3">' +
    fld('Contact Person <span class="required">*</span>', '<input id="ld_name" value="' + esc(e.name) + '" placeholder="e.g. Rajesh Kulkarni" class="form-input">') +
    fld('Company / Organisation', '<input id="ld_company" value="' + esc(e.company) + '" class="form-input">') +
    fld('Designation', '<input id="ld_desig" value="' + esc(e.designation) + '" class="form-input">') +
    fld('Mobile <span class="required">*</span>', '<input id="ld_mobile" value="' + esc(e.mobile) + '" placeholder="10-digit mobile" class="form-input">') +
    fld('Email', '<input id="ld_email" type="email" value="' + esc(e.email) + '" class="form-input">') +
    fld('City', '<input id="ld_city" value="' + esc(e.city) + '" class="form-input">') +
    fld('Lead Source', '<select id="ld_source" class="form-input">' + optionsHtml(leadSources, e.source, 'Select source') + '</select>') +
    fld('Service Interested In', '<select id="ld_service" class="form-input">' + optionsHtml(serviceList, e.service, 'Select service') + '</select>') +
    fld('Temperature', '<select id="ld_temp" class="form-input">' + tempOptions(e.temp) + '</select>') +
    fld('Priority', '<select id="ld_prio" class="form-input">' + optionsHtml(['P1', 'P2', 'P3'], e.priority) + '</select>') +
    fld('Assign to', '<select id="ld_staff" class="form-input">' + optionsHtml(staffList, e.assignedTo, 'Unassigned') + '</select>') +
    fld('Follow-up date', '<input id="ld_follow" type="date" value="' + (e.nextFollowup || '') + '" class="form-input">') +
    '</div>' + fld('Notes', '<textarea id="ld_notes" rows="2" class="form-input">' + esc(e.notes) + '</textarea>'),
    isEdit ? 'Update Lead' : 'Register Lead', "saveLead('" + (isEdit ? e.id : '') + "')", 'max-w-2xl');
}
function saveLead(id) {
  var name = $v('ld_name').trim(), mobile = $v('ld_mobile').trim();
  if (!name || mobile.replace(/\D/g, '').length < 10) { showToast('Name and a valid 10-digit mobile are required', 'error'); return; }
  var p = { name: name, company: $v('ld_company').trim(), designation: $v('ld_desig').trim(), mobile: mobile, email: $v('ld_email').trim(), city: $v('ld_city').trim(), source: $v('ld_source'), service: $v('ld_service'), notes: $v('ld_notes').trim(), temp: $v('ld_temp'), priority: $v('ld_prio'), assignedTo: $v('ld_staff'), nextFollowup: $v('ld_follow') };
  if (id) {
    var l = findLead(id); Object.assign(l, p);
    logAct(l.number, l.company || l.name, 'Lead', l.number, 'Updated', 'Lead details updated'); showToast('Lead updated', 'success');
  } else {
    p.id = 'ld' + Date.now(); p.number = uid('LD', leads); p.status = 'registered'; p.lostReason = ''; p.createdAt = todayIso();
    leads.unshift(p); logAct(p.number, p.company || p.name, 'Lead', p.number, 'Registered', 'Lead registered' + (p.source ? ' via ' + p.source : '')); showToast('Lead registered', 'success');
  }
  closeModal(); refreshAll();
}
function delLead(id) {
  var l = findLead(id); if (!l) return;
  openModal(`
    ${modalHeader('Delete Lead', l.number)}
    <div class="px-6 py-4 text-sm text-gray-600">Delete <b class="text-gray-800">${esc(l.name)}</b> (${esc(l.company)})? Its activity history will also be removed.</div>
    ${modalFooter('Delete', 'onclick="confirmDelLead(\'' + id + '\')"')}
  `, { width: 'max-w-md' });
}
function confirmDelLead(id) {
  var l = findLead(id);
  leads = leads.filter(function (x) { return x.id !== id; }); activities = activities.filter(function (a) { return a.leadNo !== l.number; });
  closeModal(); refreshAll(); showToast('Lead deleted', 'warning');
}
function viewLead(id) {
  var l = findLead(id); if (!l) return;
  openModal(`
    ${modalHeader('Lead — ' + l.number, l.name + ' · ' + l.company)}
    <div class="px-6 py-4 modal-scroll"><div class="grid grid-cols-2 gap-3 text-sm">
      <div><span class="text-gray-500">Status</span><br>${leadStatusBadge(l.status)}</div>
      <div><span class="text-gray-500">Registered On</span><br>${fmtDate(l.createdAt)}</div>
      <div><span class="text-gray-500">Designation</span><br>${esc(l.designation) || '—'}</div>
      <div><span class="text-gray-500">City</span><br>${esc(l.city) || '—'}</div>
      <div><span class="text-gray-500">Mobile</span><br>${esc(l.mobile)}</div>
      <div><span class="text-gray-500">Email</span><br>${esc(l.email) || '—'}</div>
      <div><span class="text-gray-500">Source</span><br>${esc(l.source) || '—'}</div>
      <div><span class="text-gray-500">Service</span><br>${esc(l.service) || '—'}</div>
      <div><span class="text-gray-500">Next Follow-up</span><br>${fmtDate(l.nextFollowup)}</div>
      <div><span class="text-gray-500">Temperature</span><br>${tempPill(l.temp) || '—'}</div>
      <div><span class="text-gray-500">Priority</span><br>${prioPill(l.priority)}</div>
      <div><span class="text-gray-500">Assigned to</span><br>${esc(l.assignedTo) || 'Unassigned'}</div>
      ${l.lostReason ? '<div><span class="text-gray-500">Lost Reason</span><br>' + esc(l.lostReason) + '</div>' : ''}
      <div class="col-span-2"><span class="text-gray-500">Notes</span><br>${esc(l.notes) || '—'}</div>
    </div></div>
    ${modalFooter('Close', 'onclick="closeModal()"', journeyBtn(l.number))}
  `, { width: 'max-w-xl' });
}
function openContacted(id) {
  var l = findLead(id);
  modalForm('Mark as Contacted', l.number + ' · ' + l.name,
    fld('How was the lead contacted? <span class="required">*</span>', '<textarea id="ct_note" rows="2" class="form-input" placeholder="e.g. Phone call, discussed ETP requirement"></textarea>') +
    fld('Next Follow-up Date', '<input id="ct_next" type="date" class="form-input">'), 'Save', "saveContacted('" + id + "')");
}
function saveContacted(id) {
  var l = findLead(id), note = $v('ct_note').trim();
  if (!note) { showToast('Please add how the lead was contacted', 'error'); return; }
  l.status = 'contacted'; l.nextFollowup = $v('ct_next');
  logAct(l.number, l.company || l.name, 'Lead', l.number, 'Contacted', 'Marked as contacted: ' + note);
  closeModal(); refreshAll(); showToast('Lead moved to Contacted Leads', 'success');
}

// ---------- Contacted Leads ----------
function leadActsCL(l) {
  return '<div class="flex gap-1">' + actBtn("viewLead('" + l.id + "')", 'eye', 'View') + actBtn("openFollowup('" + l.id + "')", 'calendar-check', 'Log follow-up') +
    actBtn("openConvert('" + l.id + "')", 'handshake', 'Convert to deal') + actBtn("openLost('lead','" + l.id + "')", 'ban', 'Mark lost', 'danger') + '</div>';
}
function renderCL(keep) {
  if (!keep) pmPageState.cl.page = 1;
  leadsPanel('cl', 'clPanel', 'Contacted Leads', getFilteredLeads('cl', 'contacted'), leadActsCL, 'No contacted leads yet.', 'register a lead', "switchModuleTab('lr')");
  setText('totalCL', countLeads('contacted')); setText('overdueCL', leads.filter(isOverdue).length); setText('convCL', countLeads('converted')); setText('lostCL', countLeads('lost'));
}
function filterCL() { renderCL(); }
function clearFiltersCL() { document.getElementById('filterSource-cl').value = 'all'; document.getElementById('search-cl').value = ''; renderCL(); }
function openFollowup(id) {
  var l = findLead(id);
  modalForm('Log Follow-up', l.number + ' · ' + l.name,
    fld('Follow-up Details <span class="required">*</span>', '<textarea id="fu_note" rows="2" class="form-input"></textarea>') +
    fld('Next Follow-up Date', '<input id="fu_next" type="date" value="' + (l.nextFollowup || '') + '" class="form-input">'), 'Save', "saveFollowup('" + id + "')");
}
function saveFollowup(id) {
  var l = findLead(id), note = $v('fu_note').trim();
  if (!note) { showToast('Please enter the follow-up details', 'error'); return; }
  l.nextFollowup = $v('fu_next');
  logAct(l.number, l.company || l.name, 'Lead', l.number, 'Follow-up', note + (l.nextFollowup ? ' (next: ' + fmtDate(l.nextFollowup) + ')' : ''));
  closeModal(); refreshAll(); showToast('Follow-up logged', 'success');
}
function openConvert(id) {
  var l = findLead(id);
  modalForm('Convert to Deal', l.number + ' · ' + l.name,
    fld('Deal Title <span class="required">*</span>', '<input id="cv_title" value="' + esc((l.service || 'Project') + ' – ' + (l.company || l.name)) + '" class="form-input">') +
    '<div class="grid grid-cols-2 gap-3">' + fld('Expected Amount (₹)', '<input id="cv_amt" type="number" min="0" value="0" class="form-input">') + fld('Expected Close Date', '<input id="cv_close" type="date" class="form-input">') + '</div>' +
    fld('Initial Stage', '<select id="cv_stage" class="form-input">' + optionsHtml(openStages()) + '</select>'), 'Create Deal', "saveConvert('" + id + "')");
}
function saveConvert(id) {
  var l = findLead(id), t = $v('cv_title').trim();
  if (!t) { showToast('Deal title is required', 'error'); return; }
  var d = { id: 'dl' + Date.now(), number: uid('DL', deals), leadNo: l.number, title: t, company: l.company || l.name, contact: l.name, amount: Number($v('cv_amt')) || 0, stage: $v('cv_stage'), expectedClose: $v('cv_close'), notes: '', createdAt: todayIso(), closedAt: '', lostReason: '' };
  deals.unshift(d); l.status = 'converted'; l.nextFollowup = '';
  logAct(l.number, d.company, 'Deal', d.number, 'Converted', 'Lead converted to deal ' + d.number + ' (' + t + ')');
  closeModal(); refreshAll(); showToast('Lead converted to deal ' + d.number, 'success');
}
// one "lost" modal for both leads and deals
function openLost(kind, id) {
  var o = kind === 'lead' ? findLead(id) : findDeal(id);
  modalForm(kind === 'lead' ? 'Mark Lead as Lost' : 'Mark Deal as Lost', o.number + ' · ' + (o.title || o.name),
    fld('Reason <span class="required">*</span>', '<select id="ls_reason" class="form-input">' + optionsHtml(lostReasons, '', 'Select reason') + '</select>') +
    fld('Remarks', '<textarea id="ls_note" rows="2" class="form-input"></textarea>'), 'Mark Lost', "saveLost('" + kind + "','" + id + "')");
}
function saveLost(kind, id) {
  var reason = $v('ls_reason'), note = $v('ls_note').trim();
  if (!reason) { showToast('Please select a reason', 'error'); return; }
  var txt = reason + (note ? ' — ' + note : '');
  if (kind === 'lead') {
    var l = findLead(id); l.status = 'lost'; l.lostReason = reason; l.nextFollowup = '';
    logAct(l.number, l.company || l.name, 'Lead', l.number, 'Lead Lost', 'Marked lost: ' + txt);
  } else {
    var d = findDeal(id); d.stage = stageName('lost'); d.lostReason = reason; d.closedAt = todayIso();
    logAct(d.leadNo, d.company, 'Deal', d.number, 'Closed Lost', 'Deal closed lost: ' + txt);
  }
  closeModal(); refreshAll(); showToast('Marked as lost', 'warning');
}

// =============================================================
// DEALS (open pipeline) + CLOSED WON
// =============================================================
function stageBadge(n) { var s = stageObj(n); return badge(n, s.won ? 'green' : s.lost ? 'red' : 'blue'); }
function getFilteredDeals(mod, won) {
  var q = $v('search-' + mod).toLowerCase(), sg = $v('filterStage-' + mod) || 'all';
  return deals.filter(function (d) {
    var s = stageObj(d.stage);
    return (won ? s.won : !s.won && !s.lost) && (sg === 'all' || d.stage === sg) && (!q || [d.number, d.leadNo, d.title, d.company, d.contact].join(' ').toLowerCase().indexOf(q) !== -1);
  });
}
function sumDeals(list) { return list.reduce(function (t, d) { return t + (Number(d.amount) || 0); }, 0); }
function renderDL(keep) {
  if (!keep) pmPageState.dl.page = 1;
  var filtered = getFilteredDeals('dl', false), pg = paginateList(filtered, pmPageState.dl);
  var rows = pg.pageItems.length ? pg.pageItems.map(function (d) {
    return `
      <tr class="border-b border-gray-100 table-row-hover">
        <td class="px-4 py-3 font-mono text-[12.5px] font-semibold text-gray-700">${d.number}<div class="text-[11px] text-gray-400 font-normal">${d.leadNo}</div></td>
        <td class="px-4 py-3"><div class="font-semibold text-gray-800">${esc(d.title)}</div><div class="text-[11px] text-gray-400">${esc(d.company)}</div></td>
        <td class="px-4 py-3 font-mono font-semibold text-gray-800">${money(d.amount)}</td>
        <td class="px-4 py-3"><select class="inline-filter-select" onchange="changeStage('${d.id}', this.value)">${optionsHtml(openStages(), d.stage)}</select></td>
        <td class="px-4 py-3 text-gray-600">${stageObj(d.stage).prob}%</td>
        <td class="px-4 py-3 text-gray-600">${fmtDate(d.expectedClose)}</td>
        <td class="px-4 py-3"><div class="flex gap-1">${actBtn("viewDeal('" + d.id + "')", 'eye', 'View')}${actBtn("openEditDeal('" + d.id + "')", 'pen', 'Edit')}${actBtn("openWon('" + d.id + "')", 'trophy', 'Mark closed won')}${actBtn("openLost('deal','" + d.id + "')", 'ban', 'Mark lost', 'danger')}</div></td>
      </tr>`;
  }).join('') : emptyRow(7, 'No open deals.', 'convert a contacted lead', "switchModuleTab('cl')");
  document.getElementById('dlPanel').innerHTML = panelWrap('Open Deals <span class="panel-count-chip">' + filtered.length + '</span>',
    tableHtml(['Deal No', 'Deal', 'Amount', 'Stage', 'Win %', 'Expected Close', 'Actions'], rows) + paginationBarHtml('dl', filtered.length, pmPageState.dl));
  var open = getFilteredDealsAll(false), won = getFilteredDealsAll(true);
  setText('openDL', open.length); setText('valDL', money(sumDeals(open))); setText('wonDL', won.length);
  setText('lostDL', deals.filter(function (d) { return stageObj(d.stage).lost; }).length);
}
function getFilteredDealsAll(won) { return deals.filter(function (d) { var s = stageObj(d.stage); return won ? s.won : !s.won && !s.lost; }); }
function filterDL() { renderDL(); }
function clearFiltersDL() { document.getElementById('filterStage-dl').value = 'all'; document.getElementById('search-dl').value = ''; renderDL(); }
function changeStage(id, st) {
  var d = findDeal(id), old = d.stage; if (old === st) return;
  d.stage = st; logAct(d.leadNo, d.company, 'Deal', d.number, 'Stage Changed', 'Stage: ' + old + ' → ' + st);
  refreshAll(); showToast('Stage updated', 'success');
}
function openEditDeal(id) {
  var d = findDeal(id);
  modalForm('Edit Deal', d.number, fld('Deal Title <span class="required">*</span>', '<input id="de_title" value="' + esc(d.title) + '" class="form-input">') +
    '<div class="grid grid-cols-2 gap-3">' + fld('Amount (₹)', '<input id="de_amt" type="number" min="0" value="' + d.amount + '" class="form-input">') + fld('Expected Close Date', '<input id="de_close" type="date" value="' + (d.expectedClose || '') + '" class="form-input">') + '</div>' +
    fld('Notes', '<textarea id="de_notes" rows="2" class="form-input">' + esc(d.notes) + '</textarea>'), 'Update Deal', "saveDeal('" + id + "')");
}
function saveDeal(id) {
  var d = findDeal(id), t = $v('de_title').trim();
  if (!t) { showToast('Deal title is required', 'error'); return; }
  d.title = t; d.amount = Number($v('de_amt')) || 0; d.expectedClose = $v('de_close'); d.notes = $v('de_notes').trim();
  logAct(d.leadNo, d.company, 'Deal', d.number, 'Updated', 'Deal details updated');
  closeModal(); refreshAll(); showToast('Deal updated', 'success');
}
function openWon(id) {
  var d = findDeal(id);
  modalForm('Mark as Closed Won', d.number + ' · ' + d.title, fld('Final Deal Value (₹) <span class="required">*</span>', '<input id="wn_amt" type="number" min="1" value="' + d.amount + '" class="form-input">'), 'Close Deal', "saveWon('" + id + "')", 'max-w-md');
}
function saveWon(id) {
  var d = findDeal(id), a = Number($v('wn_amt'));
  if (!a) { showToast('Enter the final deal value', 'error'); return; }
  d.amount = a; d.stage = stageName('won'); d.closedAt = todayIso();
  logAct(d.leadNo, d.company, 'Deal', d.number, 'Closed Won', 'Deal closed won — ' + money(a));
  closeModal(); refreshAll(); showToast('Deal closed won', 'success');
}
function viewDeal(id) {
  var d = findDeal(id); if (!d) return;
  openModal(`
    ${modalHeader('Deal — ' + d.number, d.title)}
    <div class="px-6 py-4 modal-scroll"><div class="grid grid-cols-2 gap-3 text-sm">
      <div><span class="text-gray-500">Stage</span><br>${stageBadge(d.stage)}</div>
      <div><span class="text-gray-500">Amount</span><br><span class="font-semibold">${money(d.amount)}</span></div>
      <div><span class="text-gray-500">Company</span><br>${esc(d.company)}</div>
      <div><span class="text-gray-500">Contact</span><br>${esc(d.contact)}</div>
      <div><span class="text-gray-500">Lead</span><br><span class="font-mono">${d.leadNo}</span></div>
      <div><span class="text-gray-500">Win Probability</span><br>${stageObj(d.stage).prob}%</div>
      <div><span class="text-gray-500">Expected Close</span><br>${fmtDate(d.expectedClose)}</div>
      <div><span class="text-gray-500">Closed On</span><br>${fmtDate(d.closedAt)}</div>
      ${d.lostReason ? '<div class="col-span-2"><span class="text-gray-500">Lost Reason</span><br>' + esc(d.lostReason) + '</div>' : ''}
      <div class="col-span-2"><span class="text-gray-500">Notes</span><br>${esc(d.notes) || '—'}</div>
    </div></div>
    ${modalFooter('Close', 'onclick="closeModal()"', journeyBtn(d.leadNo))}
  `, { width: 'max-w-xl' });
}

function renderCW(keep) {
  if (!keep) pmPageState.cw.page = 1;
  var filtered = getFilteredDeals('cw', true), pg = paginateList(filtered, pmPageState.cw);
  var rows = pg.pageItems.length ? pg.pageItems.map(function (d) {
    return `
      <tr class="border-b border-gray-100 table-row-hover">
        <td class="px-4 py-3 font-mono text-[12.5px] font-semibold text-gray-700">${d.number}</td>
        <td class="px-4 py-3"><div class="font-semibold text-gray-800">${esc(d.title)}</div><div class="text-[11px] text-gray-400">${esc(d.company)} · ${esc(d.contact)}</div></td>
        <td class="px-4 py-3 font-mono font-semibold text-gray-800">${money(d.amount)}</td>
        <td class="px-4 py-3 text-gray-600">${fmtDate(d.closedAt)}</td>
        <td class="px-4 py-3 font-mono text-[12px] text-gray-500">${d.leadNo}</td>
        <td class="px-4 py-3"><div class="flex gap-1">${actBtn("viewDeal('" + d.id + "')", 'eye', 'View')}${actBtn("openJourney('" + d.leadNo + "')", 'timeline', 'View journey')}</div></td>
      </tr>`;
  }).join('') : emptyRow(6, 'No closed deals yet.', 'open the deals pipeline', "switchModuleTab('dl')");
  document.getElementById('cwPanel').innerHTML = panelWrap('Closed Won Deals <span class="panel-count-chip">' + filtered.length + '</span>',
    tableHtml(['Deal No', 'Deal', 'Amount', 'Closed On', 'Lead', 'Actions'], rows) + paginationBarHtml('cw', filtered.length, pmPageState.cw));
  var won = getFilteredDealsAll(true);
  setText('totalCW', won.length); setText('valCW', money(sumDeals(won))); setText('avgCW', money(won.length ? Math.round(sumDeals(won) / won.length) : 0));
}
function filterCW() { renderCW(); }
function clearFiltersCW() { document.getElementById('search-cw').value = ''; renderCW(); }

// =============================================================
// ACTIVITIES LOG
// =============================================================
var activityColors = { Registered: 'blue', Updated: 'gray', Contacted: 'amber', 'Follow-up': 'amber', Converted: 'green', 'Stage Changed': 'blue', 'Closed Won': 'green', 'Closed Lost': 'red', 'Lead Lost': 'red' };
function renderAL(keep) {
  if (!keep) pmPageState.al.page = 1;
  var q = $v('search-al').toLowerCase(), t = $v('filterType-al') || 'all', a = $v('filterAction-al') || 'all';
  var filtered = activities.filter(function (x) {
    return (t === 'all' || x.type === t) && (a === 'all' || x.action === a) && (!q || [x.leadNo, x.company, x.ref, x.text].join(' ').toLowerCase().indexOf(q) !== -1);
  });
  var pg = paginateList(filtered, pmPageState.al);
  var rows = pg.pageItems.length ? pg.pageItems.map(function (x) {
    return `
      <tr class="border-b border-gray-100 table-row-hover">
        <td class="px-4 py-3 text-gray-700">${fmtDate(x.at.slice(0, 10))}<div class="text-[11px] text-gray-400">${new Date(x.at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div></td>
        <td class="px-4 py-3"><div class="font-mono text-[12.5px] font-semibold text-gray-700">${x.leadNo}</div><div class="text-[11px] text-gray-400">${esc(x.company)}</div></td>
        <td class="px-4 py-3">${badge(x.type, x.type === 'Lead' ? 'blue' : 'gray')} <span class="font-mono text-[11.5px] text-gray-500 ml-1">${x.ref}</span></td>
        <td class="px-4 py-3">${badge(x.action, activityColors[x.action] || 'gray')}</td>
        <td class="px-4 py-3 text-gray-600">${esc(x.text)}</td>
      </tr>`;
  }).join('') : emptyRow(5, 'No activities found.', 'clear the filters', 'clearFiltersAL()');
  document.getElementById('alPanel').innerHTML = panelWrap('Activities <span class="panel-count-chip">' + filtered.length + '</span>',
    tableHtml(['When', 'Lead', 'Record', 'Action', 'Details'], rows) + paginationBarHtml('al', filtered.length, pmPageState.al));
  var today = todayIso();
  setText('totalAL', activities.length); setText('todayAL', activities.filter(function (x) { return x.at.slice(0, 10) === today; }).length);
  setText('convAL', countLeads('converted')); setText('wonAL', getFilteredDealsAll(true).length);
}
function filterAL() { renderAL(); }
function clearFiltersAL() { ['filterType-al', 'filterAction-al'].forEach(function (i) { document.getElementById(i).value = 'all'; }); document.getElementById('search-al').value = ''; renderAL(); }

// =============================================================
// DASHBOARD TAB — stats, follow-up calendar, upcoming list, charts
// =============================================================
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var staffList = ['Admin', 'Rohit Patil', 'Neha Joshi'];
var meetingTypes = ['In-office', 'Online', 'Phone call', 'Client visit'];
var priorityColor = { P1: '#dc2626', P2: '#d97706', P3: '#1985bf' };
var chartPalette = ['#7c3aed', '#1985bf', '#f59e0b', '#8b5cf6', '#ef4444', '#0891b2'];
var dbYM = { y: new Date().getFullYear(), m: new Date().getMonth() };
function pad2(n) { return String(n).padStart(2, '0'); }
function keyOf(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function relIso(n) { var d = new Date(); d.setDate(d.getDate() + n); return keyOf(d); }
function setHtml(id, h) { document.getElementById(id).innerHTML = h; }
function tempPill(t) { var m = { hot: ['Hot', 'red'], warm: ['Warm', 'amber'], cold: ['Cold', 'blue'] }[t]; return m ? '<span class="badge badge-' + m[1] + '" style="padding:1px 7px;font-size:10px">' + m[0] + '</span>' : ''; }
function prioPill(p) { return p ? '<span style="font-size:11px;font-weight:700;color:' + priorityColor[p] + '">' + p + '</span>' : '—'; }
function tempOptions(sel) { return ['hot', 'warm', 'cold'].map(function (v) { return '<option value="' + v + '" ' + (v === sel ? 'selected' : '') + '>' + v.charAt(0).toUpperCase() + v.slice(1) + '</option>'; }).join(''); }

// demo data: give the seed leads temperature, priority, owner and follow-up dates around today
(function () {
  var t = ['hot', 'warm', 'cold'], p = ['P1', 'P2', 'P3'];
  leads.forEach(function (l, i) { l.temp = t[i % 3]; l.priority = p[(i + 1) % 3]; l.assignedTo = staffList[i % 3]; });
  var set = function (id, d, note) { var l = findLead(id); l.nextFollowup = relIso(d); l.notes = note; };
  set('ld8', 0, 'Needs ETP for the new dairy plant'); set('ld6', 0, 'Met at expo, wants an STP proposal');
  set('ld7', 2, 'Share the STP brochure'); set('ld5', -3, 'Asked to call after the plant visit');
})();

function pendingFollowups() { return leads.filter(function (l) { return l.nextFollowup && (l.status === 'registered' || l.status === 'contacted'); }); }
function dbShift(n) { dbYM.m += n; if (dbYM.m < 0) { dbYM.m = 11; dbYM.y--; } if (dbYM.m > 11) { dbYM.m = 0; dbYM.y++; } renderDB(); }
function buildGrid(y, m) {
  var first = new Date(y, m, 1).getDay(), dim = new Date(y, m + 1, 0).getDate(), prev = new Date(y, m, 0).getDate(), cells = [], i, t = 1;
  for (i = first - 1; i >= 0; i--) cells.push({ d: new Date(y, m - 1, prev - i), out: true });
  for (i = 1; i <= dim; i++) cells.push({ d: new Date(y, m, i), out: false });
  while (cells.length < 42) cells.push({ d: new Date(y, m + 1, t++), out: true });
  return cells;
}
function renderDB() {
  var td = todayIso(), pend = pendingFollowups(), by = {};
  var lostN = countLeads('lost') + deals.filter(function (d) { return stageObj(d.stage).lost; }).length;
  var logged = activities.filter(function (a) { return a.action === 'Follow-up'; }).length;
  var cards = [['Total leads', leads.length, 'users', 'bg-primary-soft text-primary'],
    ['Today follow-ups', pend.filter(function (l) { return l.nextFollowup === td; }).length, 'calendar-day', 'bg-red-50 text-red-500'],
    ['Total follow-ups', pend.length + logged, 'repeat', 'bg-amber-50 text-amber-600'],
    ['Won', getFilteredDealsAll(true).length, 'circle-check', 'bg-green-50 text-green-600'],
    ['Lost', lostN, 'circle-xmark', 'bg-gray-100 text-gray-500']];
  setHtml('dbStats', cards.map(function (c) {
    return '<div class="db-stat"><div class="db-stat-ico ' + c[3] + '"><i class="fa-solid fa-' + c[2] + '"></i></div><div><div class="stat-label">' + c[0] + '</div><div class="stat-value">' + c[1] + '</div></div></div>';
  }).join(''));

  // upcoming follow-ups (today first, then by date)
  var up = pend.slice().sort(function (a, b) { var ta = a.nextFollowup === td, tb = b.nextFollowup === td; if (ta !== tb) return ta ? -1 : 1; return a.nextFollowup < b.nextFollowup ? -1 : 1; }).slice(0, 6);
  setHtml('dbUpcoming', up.length ? up.map(function (l) {
    var t = l.nextFollowup === td;
    return '<div class="db-up' + (t ? ' today' : '') + '" onclick="viewLead(\'' + l.id + '\')">' + (t ? '<span class="db-up-tag">TODAY</span>' : '') +
      '<div class="flex justify-between gap-2"><span class="font-semibold text-[12px] text-gray-800">' + esc(l.name) + '</span><span class="text-[10px] ' + (l.nextFollowup < td ? 'text-red-600 font-semibold' : 'text-gray-400') + '">' + fmtDate(l.nextFollowup) + '</span></div>' +
      '<div class="flex justify-between gap-2 text-[10.5px] text-gray-500"><span class="truncate">' + esc(l.company || l.mobile) + '</span>' + prioPill(l.priority) + '</div>' +
      '<div class="text-[10.5px] text-gray-400 truncate mt-0.5">' + (esc((l.notes || '').slice(0, 52)) || '—') + '</div></div>';
  }).join('') : '<p class="text-[12px] text-gray-400 text-center py-3">No upcoming follow-ups</p>');

  // calendar
  pend.forEach(function (l) { (by[l.nextFollowup] = by[l.nextFollowup] || []).push(l); });
  setHtml('dbMonthBig', '<div class="db-month">' + MONTHS[dbYM.m].toUpperCase() + '</div><div class="db-year">' + dbYM.y + '</div>');
  setHtml('dbNavLabel', MONTHS[dbYM.m] + ' ' + dbYM.y);
  var cells = buildGrid(dbYM.y, dbYM.m).map(function (c) {
    var k = keyOf(c.d), arr = by[k] || [];
    return '<div class="db-cell' + (c.out ? ' out' : '') + (k === td ? ' today' : '') + (arr.length ? ' has' : '') + '"' + (arr.length ? ' onclick="openDay(\'' + k + '\')"' : '') + '><span class="db-num">' + c.d.getDate() + '</span>' +
      (arr.length ? '<span class="db-badge' + (k < td ? ' late' : k === td ? ' now' : '') + '">' + arr.length + '</span>' +
        arr.slice(0, 2).map(function (l) { return '<div class="db-chip t-' + l.temp + '">' + esc(l.name.split(' ')[0]) + '</div>'; }).join('') +
        (arr.length > 2 ? '<div class="db-chip">+' + (arr.length - 2) + '</div>' : '') : '') + '</div>';
  }).join('');
  setHtml('dbGrid', '<div class="db-dow">' + DOW.map(function (d) { return '<span>' + d + '</span>'; }).join('') + '</div><div class="db-grid">' + cells + '</div>');

  // monthly lead trend (last 6 months)
  var months = [], i, now = new Date();
  for (i = 5; i >= 0; i--) { var d = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ k: d.getFullYear() + '-' + pad2(d.getMonth() + 1), label: MONTHS[d.getMonth()].slice(0, 3), c: 0 }); }
  leads.forEach(function (l) { var m = months.find(function (x) { return x.k === (l.createdAt || '').slice(0, 7); }); if (m) m.c++; });
  var max = Math.max.apply(null, months.map(function (x) { return x.c; }).concat(1));
  setHtml('dbTrend', '<div class="db-bars">' + months.map(function (m) {
    return '<div class="db-bar-col"><span class="db-bar-val">' + m.c + '</span><div class="db-bar-area"><div class="db-bar" style="height:' + Math.round(m.c / max * 100) + '%"></div></div><span class="db-bar-lbl">' + m.label + '</span></div>';
  }).join('') + '</div>');

  // leads by service (donut)
  var svc = {}, acc = 0, total = leads.length || 1;
  leads.forEach(function (l) { var k = l.service || 'Other'; svc[k] = (svc[k] || 0) + 1; });
  var keys = Object.keys(svc);
  var stops = keys.map(function (k, j) { var a = acc / total * 100; acc += svc[k]; return chartPalette[j % chartPalette.length] + ' ' + a + '% ' + (acc / total * 100) + '%'; }).join(',');
  setHtml('dbDonut', '<div class="db-donut-wrap"><div class="db-donut" style="background:conic-gradient(' + (stops || '#e5e7eb 0 100%') + ')"><div class="db-donut-hole">' + leads.length + '<span>leads</span></div></div><div class="db-legend">' +
    keys.map(function (k, j) { return '<div><i style="background:' + chartPalette[j % chartPalette.length] + '"></i>' + esc(k) + ' <b>' + svc[k] + '</b></div>'; }).join('') + '</div></div>');
}

// ---------- day overlay + follow-up actions ----------
function openDay(key) {
  var list = pendingFollowups().filter(function (l) { return l.nextFollowup === key; });
  if (!list.length) return;
  var rows = list.map(function (l) {
    return `
      <tr class="border-b border-gray-100 table-row-hover">
        <td class="px-4 py-3"><div class="font-semibold text-gray-800">${esc(l.name)}</div><div class="text-[11px] text-gray-400">${esc(l.company)}</div></td>
        <td class="px-4 py-3 text-gray-600">${esc(l.mobile)}</td>
        <td class="px-4 py-3 text-gray-600">${esc(l.service)}</td>
        <td class="px-4 py-3">${tempPill(l.temp)}</td>
        <td class="px-4 py-3">${prioPill(l.priority)}</td>
        <td class="px-4 py-3 text-gray-600">${esc(l.assignedTo) || 'Unassigned'}</td>
        <td class="px-4 py-3"><div class="flex gap-1">${actBtn("viewLead('" + l.id + "')", 'eye', 'View')}${actBtn("openFuDone('" + l.id + "')", 'circle-check', 'Mark done')}${actBtn("openFuNext('" + l.id + "')", 'calendar-plus', 'Next follow-up')}${actBtn("openJourney('" + l.number + "')", 'clock-rotate-left', 'History')}</div></td>
      </tr>`;
  }).join('');
  openModal(modalHeader('Follow-ups — ' + fmtDate(key), list.length + ' lead' + (list.length > 1 ? 's' : '')) +
    '<div class="px-6 py-4 modal-scroll">' + tableHtml(['Lead', 'Mobile', 'Service', 'Temp', 'Priority', 'Assigned', 'Actions'], rows) + '</div>' + modalFooter('Close', 'onclick="closeModal()"'), { width: 'max-w-4xl' });
}
function fuCommon() {
  return fld('Taken by <span class="required">*</span>', '<select id="fu_by" class="form-input">' + optionsHtml(staffList, '', 'Select staff') + '</select>') +
    fld('Meeting type <span class="required">*</span>', '<select id="fu_mt" class="form-input">' + optionsHtml(meetingTypes, '', 'Select type') + '</select>');
}
function fuValid() { if (!$v('fu_by') || !$v('fu_mt')) { showToast('Select who took the follow-up and the meeting type', 'error'); return false; } return true; }
function openFuDone(id) {
  var l = findLead(id);
  modalForm('Mark follow-up as done', l.number + ' · ' + l.name, fld('Follow-up note <span class="required">*</span>', '<textarea id="fu_note" rows="3" class="form-input" placeholder="What happened on this call or meeting?"></textarea>') + fuCommon(), 'Submit', "saveFuDone('" + id + "')");
}
function saveFuDone(id) {
  var l = findLead(id), note = $v('fu_note').trim();
  if (!note) { showToast('Please add a follow-up note', 'error'); return; }
  if (!fuValid()) return;
  logAct(l.number, l.company || l.name, 'Lead', l.number, 'Follow-up', 'Follow-up done (' + $v('fu_mt') + ', by ' + $v('fu_by') + '): ' + note);
  l.nextFollowup = ''; closeModal(); refreshAll(); showToast('Follow-up marked as done', 'success');
}
function openFuNext(id) {
  var l = findLead(id);
  modalForm('Schedule next follow-up', l.number + ' · ' + l.name, fld('Next follow-up date <span class="required">*</span>', '<input id="fu_date" type="date" class="form-input">') + fuCommon(), 'Submit', "saveFuNext('" + id + "')");
}
function saveFuNext(id) {
  var l = findLead(id), d = $v('fu_date');
  if (!d) { showToast('Pick the next follow-up date', 'error'); return; }
  if (!fuValid()) return;
  l.nextFollowup = d;
  logAct(l.number, l.company || l.name, 'Lead', l.number, 'Follow-up', 'Next follow-up scheduled for ' + fmtDate(d) + ' (' + $v('fu_mt') + ', by ' + $v('fu_by') + ')');
  closeModal(); refreshAll(); showToast('Next follow-up scheduled', 'success');
}

// =============================================================
// INIT
// =============================================================
refreshAll();
// sidebar CRM links switch tabs in place (no page reload); deep links open the right tab
document.querySelectorAll('.sidebar-nav-link[data-page^="crm-"]').forEach(function (a) {
  a.addEventListener('click', function (e) { e.preventDefault(); switchModuleTab(CRM_TABS[a.dataset.page.slice(4)]); });
});
(function () {
  var t = new URLSearchParams(location.search).get('tab'); t = CRM_TABS[t] || t;
  switchModuleTab(['db', 'lr', 'cl', 'dl', 'cw', 'al'].indexOf(t) !== -1 ? t : 'db');
})();
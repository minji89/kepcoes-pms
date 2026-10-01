/* ============================================================
   공통 LNB 구성 스크립트
   - 모든 페이지가 동일한 2depth 구성을 갖도록 메뉴를 정규화합니다.
   - 2depth 열림/닫힘은 CSS(hover, focus-within)로 처리합니다.
   ============================================================ */
(function () {
  "use strict";

  /* 1depth 라벨(공백 제거 기준) → 2depth 목록 */
  var MENU = {
    사업접수: [
      { label: "신규 프로젝트 등록", href: "/pms-new-project.html" },
      { label: "추진단계 프로젝트 현황", href: "/pms-promotion-status.html" },
    ],
    프로젝트관리: [{ label: "프로젝트 현황", href: "/pms-project-status.html" }],
    계약관리: [
      { label: "수주계약 현황", href: "/pms-contract-status.html" },
      { label: "발주계약 현황", href: "/pms-order-contract-status.html" },
    ],
    자금관리: [
      { label: "상환 계획", href: "/pms-fund-interest.html" },
      { label: "상환 현황", href: "/pms-fund-repayment.html" },
      { label: "계획대비 실적 현황", href: "/pms-fund-plan-performance.html" },
      { label: "투자금 지급현황", href: "/pms-investment-payments.html" },
    ],
  };

  /* 현재 경로 → 활성 2depth 라벨 (상세 페이지는 소속 메뉴를 활성화) */
  MENU["\uC0AC\uC5C5\uACB0\uC0B0"] = [
    { label: "\uC0AC\uC5C5 \uACB0\uC0B0", href: "/pms-business-settlement.html?view=list" },
  ];
  MENU["\uC0AC\uC5C5\uAD00\uB9AC"] = [
    { label: "\uC0AC\uC5C5\uACB0\uC0B0", href: "/pms-business-settlement.html?view=list" },
  ];
  MENU["\uC0AC\uC5C5\uC811\uC218"] = [
    { label: "\uC2E0\uADDC \uD504\uB85C\uC81D\uD2B8 \uB4F1\uB85D", href: "/pms-new-project.html" },
    { label: "\uCD94\uC9C4\uB2E8\uACC4 \uD504\uB85C\uC81D\uD2B8 \uD604\uD669", href: "/pms-promotion-status.html" },
  ];
  MENU["\uACC4\uC57D\uAD00\uB9AC"] = [
    { label: "\uC218\uC8FC\uACC4\uC57D \uD604\uD669", href: "/pms-contract-status.html" },
    { label: "\uBC1C\uC8FC\uACC4\uC57D \uD604\uD669", href: "/pms-order-contract-status.html" },
  ];
  MENU["\uD1B5\uACC4"] = [
    { label: "\uC885\uD569\uD604\uD669", href: "/pms-statistics-overview.html" },
    { label: "\uC5F0\uB3C4\uBCC4 \uBE44\uAD50\uD604\uD669", href: "/pms-statistics-yearly.html" },
  ];
  MENU["\uB9C8\uC774\uD398\uC774\uC9C0"] = [
    { label: "\uB0B4 \uD504\uB85C\uC81D\uD2B8 \uD604\uD669", href: "/pms-my-projects.html" },
    { label: "\uB370\uC774\uD130 \uC218\uC815\uC694\uCCAD", href: "/pms-data-change-requests.html" },
    { label: "\uB0B4 \uC815\uBCF4 \uC218\uC815", href: "/pms-my-profile.html" },
  ];
  MENU["\uCD9C\uC7A5\uAD00\uB9AC"] = [
    { label: "\uCD9C\uC7A5 \uD604\uD669", href: "/pms-business-trip-status.html" },
    { label: "\uCD9C\uC7A5 \uC815\uC0B0\uB0B4\uC5ED", href: "/pms-business-trip-settlements.html" },
  ];
  MENU["\uACF5\uD1B5\uAD00\uB9AC"] = [
    { label: "PMS \uACBD\uC601\uBAA9\uD45C \uAD00\uB9AC", href: "/pms-management-goals.html" },
    { label: "\uCD9C\uC7A5 \uB2E8\uAC00 \uBC0F \uAE30\uC900 \uC124\uC815", href: "/pms-trip-rate-settings.html" },
    { label: "\uC0AC\uC6A9\uC790 \uAD00\uB9AC", href: "/pms-admin-management.html" },
    { label: "\uAD8C\uD55C\uADF8\uB8F9 \uBC0F \uBA54\uB274\uBCC4 \uAD8C\uD55C \uAD00\uB9AC", href: "/pms-permission-groups.html" },
    { label: "\uC2DC\uC2A4\uD15C \uAD8C\uD55C \uAD00\uB9AC", href: "/pms-system-permissions.html" },
    { label: "\uC811\uC18D \uC544\uC774\uD53C(IP) \uAD00\uB9AC", href: "/pms-access-ip-management.html" },
    { label: "\uCF54\uB4DC \uAD00\uB9AC", href: "/pms-code-management.html" },
    { label: "\uB85C\uADF8\uC778 \uD604\uD669", href: "/pms-login-status.html" },
    { label: "\uBA54\uB274\uBCC4 \uC811\uC18D\uD604\uD669", href: "/pms-menu-access-status.html" },
    { label: "EPC\uC0AC \uAD00\uB9AC", href: "/pms-epc-management.html" },
    { label: "\uACF5\uC9C0\uC0AC\uD56D \uAD00\uB9AC", href: "/pms-notice-management.html" },
    { label: "\uC591\uC2DD \uB4F1 \uC790\uB8CC\uC2E4 \uAD00\uB9AC", href: "/pms-resource-management.html" },
  ];
  MENU["\uD504\uB85C\uC81D\uD2B8\uAD00\uB9AC"] = [
    { label: "\uD504\uB85C\uC81D\uD2B8 \uD604\uD669", href: "/pms-project-status.html" },
  ];
  MENU["\uC790\uAE08\uAD00\uB9AC"] = [
    { label: "\uC0C1\uD658 \uACC4\uD68D", href: "/pms-fund-interest.html" },
    { label: "\uC0C1\uD658 \uD604\uD669", href: "/pms-fund-repayment.html" },
    { label: "계획대비 실적 현황", href: "/pms-fund-plan-performance.html" },
    { label: "\uD22C\uC790\uAE08 \uC9C0\uAE09\uD604\uD669", href: "/pms-investment-payments.html" },
  ];

  var ACTIVE_BY_PATH = {
    "/pms-new-project.html": "신규 프로젝트 등록",
    "/pms-promotion-status.html": "추진단계 프로젝트 현황",
    "/pms-project-status.html": "프로젝트 현황",
    "/pms-project-detail.html": "프로젝트 현황",
    "/pms-project-promotion.html": "프로젝트 현황",
    "/pms-project-contract.html": "프로젝트 현황",
    "/pms-project-investment.html": "프로젝트 현황",
    "/pms-project-investment-epc.html": "프로젝트 현황",
    "/pms-project-repayment.html": "프로젝트 현황",
    "/pms-project-order.html": "프로젝트 현황",
    "/pms-order-contract-status.html": "발주계약 현황",
    "/pms-order-new.html": "프로젝트 현황",
    "/pms-order-detail.html": "프로젝트 현황",
    "/pms-contract-status.html": "수주계약 현황",
    "/pms-fund-interest.html": "상환 계획",
    "/pms-fund-repayment.html": "상환 현황",
    "/pms-fund-plan-performance.html": "계획대비 실적 현황",
  };

  ACTIVE_BY_PATH["/pms-business-settlement.html"] = "\uC0AC\uC5C5 \uACB0\uC0B0";
  ACTIVE_BY_PATH["/pms-statistics-overview.html"] = "\uC885\uD569\uD604\uD669";
  ACTIVE_BY_PATH["/pms-statistics-yearly.html"] = "\uC5F0\uB3C4\uBCC4 \uBE44\uAD50\uD604\uD669";
  ACTIVE_BY_PATH["/pms-my-projects.html"] = "\uB0B4 \uD504\uB85C\uC81D\uD2B8 \uD604\uD669";
  ACTIVE_BY_PATH["/pms-data-change-requests.html"] = "\uB370\uC774\uD130 \uC218\uC815\uC694\uCCAD";
  ACTIVE_BY_PATH["/pms-data-change-request-detail.html"] = "\uB370\uC774\uD130 \uC218\uC815\uC694\uCCAD";
  ACTIVE_BY_PATH["/pms-my-profile.html"] = "\uB0B4 \uC815\uBCF4 \uC218\uC815";
  ACTIVE_BY_PATH["/pms-management-goals.html"] = "PMS \uACBD\uC601\uBAA9\uD45C \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-admin-management.html"] = "\uC0AC\uC6A9\uC790 \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-permission-groups.html"] = "\uAD8C\uD55C\uADF8\uB8F9 \uBC0F \uBA54\uB274\uBCC4 \uAD8C\uD55C \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-permission-group-new.html"] = "\uAD8C\uD55C\uADF8\uB8F9 \uBC0F \uBA54\uB274\uBCC4 \uAD8C\uD55C \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-system-permissions.html"] = "\uC2DC\uC2A4\uD15C \uAD8C\uD55C \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-access-ip-management.html"] = "\uC811\uC18D \uC544\uC774\uD53C(IP) \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-code-management.html"] = "\uCF54\uB4DC \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-login-status.html"] = "\uB85C\uADF8\uC778 \uD604\uD669";
  ACTIVE_BY_PATH["/pms-menu-access-status.html"] = "\uBA54\uB274\uBCC4 \uC811\uC18D\uD604\uD669";
  ACTIVE_BY_PATH["/pms-epc-management.html"] = "EPC\uC0AC \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-epc-detail.html"] = "EPC\uC0AC \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-investment-payments.html"] = "\uD22C\uC790\uAE08 \uC9C0\uAE09\uD604\uD669";
  ACTIVE_BY_PATH["/pms-business-trip-status.html"] = "\uCD9C\uC7A5 \uD604\uD669";
  ACTIVE_BY_PATH["/pms-business-trip-settlements.html"] = "\uCD9C\uC7A5 \uC815\uC0B0\uB0B4\uC5ED";
  ACTIVE_BY_PATH["/pms-trip-rate-settings.html"] = "\uCD9C\uC7A5 \uB2E8\uAC00 \uBC0F \uAE30\uC900 \uC124\uC815";
  ACTIVE_BY_PATH["/pms-notice-management.html"] = "\uACF5\uC9C0\uC0AC\uD56D \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-notice-view.html"] = "\uACF5\uC9C0\uC0AC\uD56D \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-notice-form.html"] = "\uACF5\uC9C0\uC0AC\uD56D \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-resource-management.html"] = "\uC591\uC2DD \uB4F1 \uC790\uB8CC\uC2E4 \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-resource-view.html"] = "\uC591\uC2DD \uB4F1 \uC790\uB8CC\uC2E4 \uAD00\uB9AC";
  ACTIVE_BY_PATH["/pms-resource-form.html"] = "\uC591\uC2DD \uB4F1 \uC790\uB8CC\uC2E4 \uAD00\uB9AC";

  function normalize(text) {
    return (text || "").replace(/\s+/g, "");
  }

  /* LNB가 있는 모든 화면에서 신규 프로젝트 STEP 모달을 사용할 수 있게 합니다. */
  function ensureIntakeWizardAssets() {
    if (!document.querySelector('link[href^="/assets/pms-intake-wizard.css"]')) {
      var stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/assets/pms-intake-wizard.css?v=20260917-3";
      document.head.appendChild(stylesheet);
    }

    if (!window.PMSIntakeWizardLoaded &&
        !document.querySelector('script[src^="/assets/pms-intake-wizard.js"]')) {
      var script = document.createElement("script");
      script.src = "/assets/pms-intake-wizard.js?v=20260930-1";
      document.body.appendChild(script);
    }
  }

  /* 모달은 배경이나 Esc가 아닌 명시적인 닫기 버튼으로만 종료합니다. */
  function ensureExplicitModalDismissal() {
    if (document.documentElement.hasAttribute("data-explicit-modal-dismissal")) return;
    document.documentElement.setAttribute("data-explicit-modal-dismissal", "true");

    var modalSelector = [
      "dialog[open]",
      '[aria-modal="true"]',
      ".lookup-overlay",
      ".alert-overlay",
      ".modal-overlay",
      ".admin-modal",
      ".reset-modal",
      ".iw-overlay",
      '[class$="-modal"]'
    ].join(",");

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;

      var modalRoot = target.closest(modalSelector);
      if (!modalRoot) return;

      /* 배경 자체를 선택한 경우 기존 모달별 배경 클릭 핸들러보다 먼저 차단합니다. */
      if (target === modalRoot) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var hasOpenModal = Array.prototype.some.call(document.querySelectorAll(modalSelector), function (modal) {
        if (modal.hidden) return false;
        if (modal.tagName === "DIALOG" && !modal.open) return false;
        return modal.getClientRects().length > 0;
      });
      if (!hasOpenModal) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  }

  function getCurrentProjectContractForm() {
    try {
      var raw = sessionStorage.getItem("pms.newProject");
      var savedProject = raw ? JSON.parse(raw) : null;
      if (savedProject && savedProject.contractForm) return savedProject.contractForm;
    } catch (err) {}

    var contractFormField = document.querySelector("#rcpForm, #contractFormValue");
    return contractFormField ? contractFormField.textContent.trim() : "";
  }

  function syncProjectInvestmentTab() {
    var normalPath = "/pms-project-investment.html";
    var epcPath = "/pms-project-investment-epc.html";
    var projectTabs = document.querySelector(".tabs");
    if (!projectTabs) return;

    var contractForm = getCurrentProjectContractForm();
    if (!contractForm) return;

    var isEpc = /^EPC/i.test(contractForm);
    var activePath = isEpc ? epcPath : normalPath;
    var hiddenPath = isEpc ? normalPath : epcPath;
    var pagePath = window.location.pathname;

    if (pagePath === hiddenPath) {
      window.location.replace(activePath + window.location.search + window.location.hash);
      return;
    }

    projectTabs.querySelectorAll('a[href^="' + hiddenPath + '"]').forEach(function (tab) {
      tab.remove();
    });

    projectTabs.querySelectorAll('a[href^="' + activePath + '"]').forEach(function (tab) {
      tab.textContent = "\uD22C\uC790";
    });

    document.querySelectorAll('.card-more[href^="' + hiddenPath + '"]').forEach(function (link) {
      var url = new URL(link.href, window.location.origin);
      link.href = activePath + url.search + url.hash;
    });
  }

  /* nav-item 에서 아이콘/화살표를 제외한 라벨만 읽습니다. */
  function labelOf(navItem) {
    var clone = navItem.cloneNode(true);
    clone.querySelectorAll("svg, .chev, i").forEach(function (el) {
      el.remove();
    });
    return normalize(clone.textContent);
  }

  function buildSubnav(children, activeLabel) {
    var ul = document.createElement("ul");
    ul.className = "subnav";

    children.forEach(function (child) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "subnav-item";
      a.href = child.href;

      var isActive = child.label === activeLabel;
      if (isActive) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }

      var dot = document.createElement("span");
      dot.className = "dot";
      dot.setAttribute("aria-hidden", "true");

      a.appendChild(dot);
      a.appendChild(document.createTextNode(child.label));
      li.appendChild(a);
      ul.appendChild(li);
    });

    return ul;
  }

  function renderCanonicalNav(nav) {
    nav.innerHTML =
      '<li><a class="nav-item" href="/pms-new-project.html"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16"/><path d="M13 10h6a1 1 0 0 1 1 1v10"/><path d="M7 8h3M7 12h3M7 16h3"/></svg>\uC0AC\uC5C5 \uC811\uC218<span class="chev" aria-hidden="true"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-project-status.html"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>\uD504\uB85C\uC81D\uD2B8 \uAD00\uB9AC<span class="chev" aria-hidden="true"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-contract-status.html"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h9l5 5v11H5z"/><path d="M9 13h6M9 17h4"/></svg>\uACC4\uC57D \uAD00\uB9AC<span class="chev" aria-hidden="true"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-fund-interest.html"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="11" rx="2"/><path d="M7 12h4"/></svg>\uC790\uAE08 \uAD00\uB9AC<span class="chev" aria-hidden="true"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-business-settlement.html?view=list"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>\uC0AC\uC5C5 \uACB0\uC0B0<span class="chev" aria-hidden="true"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-statistics-overview.html"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M3 19h18"/></svg>\uD1B5\uACC4<span class="chev" aria-hidden="true"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-my-projects.html"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>\uB9C8\uC774 \uD398\uC774\uC9C0<span class="chev" aria-hidden="true"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-business-trip-status.html"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19h16M6 16l2-8h8l2 8M9 8V5h6v3"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/></svg>\uCD9C\uC7A5 \uAD00\uB9AC<span class="chev" aria-hidden="true"></span></a></li>' +
      '<li><a class="nav-item" href="#"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.09A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3V9.6h.09A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.12.4.36.75.7 1 .3.24.7.38 1.1.4h.09v4h-.09c-.4.02-.8.16-1.1.4-.34.25-.58.6-.7 1Z"/></svg>\uACF5\uD1B5 \uAD00\uB9AC<span class="chev" aria-hidden="true"></span></a></li>';
  }

  /* LNB 외부 바로가기는 공통 관리 메뉴 바로 아래에 배치합니다. */
  function renderLnbUtilities(nav) {
    var sidebar = nav.closest(".sidebar");
    if (!sidebar) return;

    sidebar.querySelectorAll(".sidebar-foot, .guide-foot, .lnb-utility-links").forEach(function (element) {
      element.remove();
    });

    var utilities = document.createElement("div");
    utilities.className = "lnb-utility-links";
    utilities.innerHTML =
      '<section class="lnb-favorites" aria-label="즐겨찾기"><strong class="lnb-favorites-title">즐겨찾기</strong><div class="lnb-favorites-list"></div></section>' +
      '<a class="lnb-utility-link" href="https://srm.kepco.net/" target="_blank" rel="noopener noreferrer" aria-label="전자입찰시스템 SRM 로그인 새 창으로 열기">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h5M9 12h7M9 16h7"/></svg>' +
      '<span>전자입찰시스템(SRM)</span></a>' +
      '<a class="lnb-utility-link manual" href="#" aria-label="매뉴얼 다운로드">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v12M7.5 10.5 12 15l4.5-4.5"/><path d="M5 19h14"/></svg>' +
      '<span>매뉴얼 다운로드</span></a>';
    nav.parentElement.appendChild(utilities);

    renderLnbFavorites(utilities);

    if (!document.getElementById("pmsLnbUtilityStyle")) {
      var style = document.createElement("style");
      style.id = "pmsLnbUtilityStyle";
      style.textContent =
        '.sidebar .lnb-utility-links{display:grid;gap:8px;margin:8px 14px 18px;padding-top:8px;border-top:1px solid #e5e9f0}' +
        '.sidebar .lnb-favorites{display:grid;gap:3px;padding:7px 8px 8px;border:1px solid #d9e4f3;border-radius:7px;background:#f5f8fd}' +
        '.sidebar .lnb-favorites-title{display:block;margin-bottom:2px;color:#1d5fbf;font-size:11px;font-weight:700}' +
        '.sidebar .lnb-favorites-list{display:grid;gap:1px}' +
        '.sidebar .lnb-favorite-link{display:block;min-width:0;padding:4px 5px;border-radius:4px;color:#40516a;font-size:11.5px;line-height:1.35;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
        '.sidebar .lnb-favorite-link:hover,.sidebar .lnb-favorite-link.active{background:#e5efff;color:#1769e8;font-weight:700}' +
        '.sidebar .lnb-utility-link{display:flex;align-items:center;gap:9px;min-height:40px;padding:9px 11px;border:1px solid #dbe4f1;border-radius:7px;background:#fff;color:#40516a;font-size:12.5px;font-weight:600;text-decoration:none}' +
        '.sidebar .lnb-utility-link:hover{border-color:#9fc2f8;background:#f8fbff;color:#1769e8}' +
        '.sidebar .lnb-utility-link.manual{border-color:#bfdbfe;background:#eff6ff;color:#1769e8}' +
        '.sidebar .lnb-utility-link svg{width:18px;height:18px;flex:none}';
      document.head.appendChild(style);
    }
  }

  function getLnbFavorites() {
    var defaults = [
      { depth1: "사업 접수", depth2: "신규 프로젝트 등록", href: "/pms-new-project.html" },
      { depth1: "프로젝트 관리", depth2: "프로젝트 현황", href: "/pms-project-status.html" },
      { depth1: "계약 관리", depth2: "수주계약 현황", href: "/pms-contract-status.html" },
      { depth1: "자금 관리", depth2: "투자금 지급현황", href: "/pms-investment-payments.html" },
      { depth1: "마이 페이지", depth2: "내 프로젝트 현황", href: "/pms-my-projects.html" }
    ];
    try {
      var saved = JSON.parse(localStorage.getItem("pmsDashboardFavorites"));
      return Array.isArray(saved) && saved.length ? saved.slice(0, 5) : defaults;
    } catch (error) {
      return defaults;
    }
  }

  function renderLnbFavorites(scope) {
    var list = (scope || document).querySelector(".lnb-favorites-list");
    if (!list) return;
    list.innerHTML = "";
    getLnbFavorites().forEach(function (item) {
      var link = document.createElement("a");
      link.className = "lnb-favorite-link";
      link.href = item.href;
      link.textContent = item.depth2;
      link.title = item.depth1 + " > " + item.depth2;
      if (window.location.pathname === new URL(item.href, window.location.origin).pathname) {
        link.classList.add("active");
      }
      list.appendChild(link);
    });
  }

  window.addEventListener("pms:favorites-updated", function () {
    renderLnbFavorites(document);
  });
  window.addEventListener("storage", function (event) {
    if (event.key === "pmsDashboardFavorites") renderLnbFavorites(document);
  });

  function applySettlementGuide() {
    var sidebar = document.querySelector(".sidebar");
    var top = document.querySelector(".top");
    if (!sidebar || !top) return;

    sidebar.innerHTML =
      '<div class="guide-logo"><img src="/images/kepco-es-logo.png" alt="KEPCO ES"><span>☰</span></div>' +
      '<nav class="nav" aria-label="\uC8FC \uBA54\uB274"><ul>' +
      '<li><a class="nav-item" href="/pms-business-settlement.html"><i>▥</i>\uC0AC\uC5C5\uAD00\uB9AC<span class="chev"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-project-status.html"><i>▱</i>\uD504\uB85C\uC81D\uD2B8 \uAD00\uB9AC<span class="chev"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-contract-status.html"><i>▧</i>\uACC4\uC57D\uAD00\uB9AC<span class="chev"></span></a></li>' +
      '<li><a class="nav-item" href="/pms-fund-repayment.html"><i>▣</i>\uC790\uAE08\uAD00\uB9AC<span class="chev"></span></a></li>' +
      '<li><a class="nav-item" href="#"><i>▥</i>\uD1B5\uACC4(\uBD84\uC11D)<span class="chev"></span></a></li>' +
      '<li><a class="nav-item" href="#"><i>⌖</i>\uCD9C\uC7A5\uAD00\uB9AC<span class="chev"></span></a></li>' +
      '<li><a class="nav-item" href="#"><i>♙</i>\uB9C8\uC774\uD398\uC774\uC9C0<span class="chev"></span></a></li>' +
      '<li><a class="nav-item" href="#"><i>⚙</i>\uACF5\uD1B5\uAD00\uB9AC<span class="chev"></span></a></li>' +
      '</ul></nav><div class="guide-foot"><a href="#">▦　\uC0AC\uC5C5\uAD00\uB9AC\uC2DC\uC2A4\uD15C(PMS)</a><a href="#">▤　\uC804\uC790\uC785\uCC30\uC2DC\uC2A4\uD15C(SRM)</a><a href="#">?　\uC628\uB77C\uC778 \uB9E4\uB274\uC5BC</a></div>';

    top.innerHTML = '<h1>\uC0AC\uC5C5\uAD00\uB9AC\uC2DC\uC2A4\uD15C</h1><span class="pms">PMS</span><div class="right"><span class="groups">\uAD8C\uD55C　<b>\uADF8\uB8F9#1</b>　\uADF8\uB8F9#2　\uADF8\uB8F9#3　\uADF8\uB8F9#4</span><span><strong>\uC774\uD76C\uC131 \uBD80\uC7A5</strong> [\uC2DC\uC2A4\uD15C\uAD00\uB9AC\uC790]</span><u>\uB85C\uADF8\uC544\uC6C3</u></div>';

    var style = document.createElement("style");
    style.textContent = '.sidebar{width:252px!important;flex:0 0 252px!important;background:#fff!important}.guide-logo{height:65px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;border-bottom:1px solid #e4eaf3}.guide-logo img{width:158px;height:auto}.guide-logo span{font-size:22px;color:#113a80}.sidebar .nav{padding:42px 12px 10px}.sidebar .nav-item{margin:0 3px 10px;padding:12px;border-radius:5px;color:#142e62;font-weight:600}.sidebar .nav-item.active{background:linear-gradient(90deg,#f4f8ff,#edf3ff);color:#1266ed}.sidebar .nav-item i{width:24px;font-style:normal;font-size:19px;color:#35558b}.sidebar .nav-item .chev{border-color:currentColor}.sidebar .subnav{padding:0 0 12px 39px;background:#fff}.sidebar .subnav-item{padding:7px 9px;color:#122d66;font-weight:600}.sidebar .subnav-item.active{color:#1266ed}.guide-foot{margin-top:auto;padding:14px;display:grid;gap:9px}.guide-foot a{padding:12px;border:1px solid #dbe4f1;border-radius:6px;color:#122d66;font-size:13px;font-weight:600}.top{height:65px!important}.heading .excel{display:none!important}.content{max-width:none!important;padding:18px 20px 30px!important}.project{grid-template-columns:100px 1fr 354px!important;padding:17px 22px!important}.metric{min-height:156px!important;padding:16px!important}.value{margin-top:17px!important}.compare,.down{margin-top:14px!important}';
    document.head.appendChild(style);
  }

  function renderSettlementList() {
    var content = document.querySelector(".content");
    if (!content) return;

    setTimeout(function () {
      var settlementTable = content.querySelector(".settlement-table");
      if (!settlementTable || !settlementTable.tBodies.length) return;

      var tableBody = settlementTable.tBodies[0];
      var sourceRows = Array.prototype.slice.call(tableBody.rows);
      var groupHead = settlementTable.tHead.rows[0];
      var detailHead = settlementTable.tHead.rows[1];
      [
        ["\uACB0\uC0B0", 2],
        ["\uC77C\uC815", 4],
        ["\uC9C0\uD45C", 4]
      ].forEach(function (group) {
        var th = document.createElement("th");
        th.colSpan = group[1];
        th.textContent = group[0];
        groupHead.appendChild(th);
      });
      [
        "\uD68C\uC218\uCD1D\uC561", "\uC218\uC775\uB960(%)", "\uACC4\uC57D\uC77C", "\uC900\uACF5\uC77C", "\uC0C1\uD658\uAC1C\uC2DC\uC77C", "\uC0C1\uD658\uC885\uB8CC\uC77C",
        "IRR(%)", "XIRR(%)", "\uACB0\uC0B0IRR(%)", "\uACB0\uC0B0XIRR(%)"
      ].forEach(function (label) {
        var th = document.createElement("th");
        th.textContent = label;
        detailHead.appendChild(th);
      });
      var detailRows = [
        ["4,345,123", "6", "2025.10.23", "2025.10.23", "2025.10.23", "2025.10.23", "6", "13.5", "6", "13.5"],
        ["4,345,123", "-", "2025.03.03", "2025.03.03", "2025.03.03", "2025.03.03", "6", "13.5", "6", "13.5"],
        ["4,345,123", "6", "2025.10.23", "2025.10.23", "2025.10.23", "2025.10.23", "4", "7", "4", "7"]
      ];
      sourceRows.forEach(function (row, index) {
        detailRows[index].forEach(function (value) {
          var td = document.createElement("td");
          td.textContent = value;
          row.appendChild(td);
        });
      });
      while (tableBody.rows.length < 10) {
        var nextRow = sourceRows[(tableBody.rows.length - sourceRows.length) % sourceRows.length].cloneNode(true);
        nextRow.cells[0].textContent = String(24 - tableBody.rows.length);
        tableBody.appendChild(nextRow);
      }
      settlementTable.style.minWidth = "2700px";
    }, 0);

    content.innerHTML =
      '<div class="settlement-page-head"><h1>\uC0AC\uC5C5\uACB0\uC0B0</h1><div>⌂　HOME　›　\uC0AC\uC5C5\uACB0\uC0B0　›　<strong>\uC0AC\uC5C5\uACB0\uC0B0</strong></div></div>' +
      '<section class="settlement-filter"><div class="filter-row"><b>\uC870\uD68C\uAE30\uAC04</b><select><option>\uACB0\uC0B0(\uC885\uB8CC)\uC77C</option></select><input value="2026.07.01"><span>~</span><input value="2026.07.30"><button>\uD604\uC7AC \uC804</button><button>1\uAC1C\uC6D4</button><button>3\uAC1C\uC6D4</button><button>1\uB144</button></div><div class="filter-row"><b>\uAD6C\uBD84</b><select><option>\uC804\uCCB4</option></select></div><div class="filter-row"><b>\uD0A4\uC6CC\uB4DC \uAC80\uC0C9</b><select><option>\uC804\uCCB4</option></select><input class="keyword" placeholder="\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694"><button class="search">\uAC80\uC0C9</button><button>\uCD08\uAE30\uD654</button></div></section>' +
      '<div class="settlement-tools"><span>\uC870\uD68C \uACB0\uACFC : <b>24\uAC74</b></span><div><select><option>10\uAC1C</option></select><button class="download">\uB2E4\uC6B4\uB85C\uB4DC(Excel)</button></div></div>' +
      '<div class="settlement-table-wrap"><table class="settlement-table"><thead><tr><th rowspan="2">\uC21C\uBC88</th><th rowspan="2">\uAD6C\uBD84</th><th rowspan="2">\uACB0\uC0B0(\uC885\uB8CC)\uC77C</th><th rowspan="2">\uD504\uB85C\uC81D\uD2B8\uBC88\uD638</th><th rowspan="2">\uACC4\uC57D \uD615\uD0DC</th><th rowspan="2">\uD504\uB85C\uC81D\uD2B8\uBA85</th><th rowspan="2">\uB2F4\uB2F9\uC790</th><th colspan="5">\uACC4\uD68D</th></tr><tr><th>\uCD1D \uC0AC\uC5C5\uAE08\uC561</th><th>\uD22C\uC790\uAE08\uC561</th><th>\uC0C1\uD658\uAE08\uC561</th><th>\uC218\uC775\uAE08</th><th>\uC218\uC775\uB960(%)</th></tr></thead><tbody>' +
      '<tr><td>24</td><td>\uC0C1\uD658 \uC644\uB8CC</td><td>2025.10.23</td><td><a href="/pms-business-settlement.html">2026_0610</a></td><td>ESCO \uACC4\uC57D</td><td><a href="/pms-business-settlement.html">\uC804\uAE30\uACF5\uC0AC\uC870\uC9C1\uBCF8\uBD80 \uC0AC\uC625 LED \uC870\uBA85\uAD50\uCCB4\uC0AC\uC5C5</a></td><td>\uD64D\uAE38\uB3D9</td><td>29,090,909</td><td>26,519,000</td><td>31,090,909</td><td>4,345,123</td><td>6</td></tr>' +
      '<tr><td>23</td><td>\uC720\uBCF4</td><td>2025.03.03</td><td><a href="/pms-business-settlement.html">2026_0645</a></td><td>ESCO \uACC4\uC57D</td><td><a href="/pms-business-settlement.html">GE-4 \uC5D0\uB108\uC9C0\uD6A8\uC728\uD654 \uC0AC\uC5C5</a></td><td>\uD64D\uAE38\uB3D9</td><td>29,090,909</td><td>26,519,000</td><td>23,000,000</td><td>4,345,123</td><td>-</td></tr>' +
      '<tr><td>22</td><td>\uBCF4\uC99D \uC644\uB8CC</td><td>2025.10.23</td><td><a href="/pms-business-settlement.html">2026_0610</a></td><td>EPC(\uC6A9\uC5ED) \uACC4\uC57D</td><td><a href="/pms-business-settlement.html">\uC804\uAE30\uACF5\uC0AC\uC870\uC9C1\uBCF8\uBD80 \uC0AC\uC625 LED \uC870\uBA85\uAD50\uCCB4\uC0AC\uC5C5</a></td><td>\uAE40\uC774\uC601</td><td>29,090,909</td><td>26,519,000</td><td>31,090,909</td><td>4,345,123</td><td>6</td></tr>' +
      '</tbody></table></div>' +
      '<div class="settlement-pagination"><button>‹</button><button>1</button><button class="on">2</button><button>3</button><button>4</button><button>5</button><button>›</button></div>';

    var style = document.createElement("style");
    style.textContent = '.settlement-page-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.settlement-page-head h1{margin:0;font-size:25px}.settlement-page-head div{color:#64748b;font-size:13px}.settlement-filter{padding:18px 24px;background:#fff;border:1px solid #e5e9f0;border-radius:10px;box-shadow:0 1px 2px rgba(15,23,42,.04)}.filter-row{display:flex;align-items:center;gap:8px;min-height:40px;padding:5px 0}.filter-row b{width:92px;color:#1e293b}.filter-row input,.filter-row select,.filter-row button,.settlement-tools select{height:32px;padding:0 10px;border:1px solid #cbd5e1;border-radius:4px;background:#fff;color:#475569;font:inherit}.filter-row input{width:130px}.filter-row .keyword{width:310px}.filter-row .search{margin-left:auto;min-width:70px;color:#fff;background:#1d6ff2;border-color:#1d6ff2}.settlement-tools{display:flex;align-items:center;justify-content:space-between;margin:16px 0 12px;color:#475569}.settlement-tools div{display:flex;gap:8px}.download{height:32px;padding:0 13px;border:0;border-radius:4px;background:#10a64a;color:#fff;font-weight:700}.settlement-table-wrap{overflow:auto;background:#fff;border:1px solid #cbd5e1}.settlement-table{width:100%;min-width:1180px;border-collapse:collapse;font-size:12px;text-align:center}.settlement-table th{padding:8px 6px;background:#f1f5f9;border:1px solid #cbd5e1;color:#1e293b}.settlement-table td{padding:10px 6px;border:1px solid #d8dee8;white-space:nowrap}.settlement-table td:nth-child(6){max-width:250px;overflow:hidden;text-overflow:ellipsis;text-align:left}.settlement-table a{color:#1e293b;text-decoration:underline}.settlement-pagination{display:flex;justify-content:center;gap:5px;margin:28px 0 4px}.settlement-pagination button{width:30px;height:30px;border:1px solid #cbd5e1;background:#fff;color:#475569}.settlement-pagination .on{background:#1d6ff2;color:#fff;border-color:#1d6ff2}@media(max-width:900px){.settlement-page-head{align-items:flex-start;gap:10px;flex-direction:column}.filter-row{flex-wrap:wrap}.filter-row .search{margin-left:0}.settlement-tools{align-items:flex-start;gap:10px;flex-direction:column}}';
    document.head.appendChild(style);
  }

  function renderInvestmentList() {
    var content = document.querySelector(".content");
    if (!content) return;

    setTimeout(function () {
      var primaryTable = content.querySelector(".investment-table");
      var detailTable = content.querySelector(".investment-detail table");
      if (!primaryTable || !detailTable) return;

      var primaryHead = primaryTable.tHead.rows[0];
      Array.prototype.forEach.call(detailTable.tHead.rows[0].cells, function (cell) {
        primaryHead.appendChild(cell.cloneNode(true));
      });
      Array.prototype.forEach.call(primaryTable.tBodies[0].rows, function (row, index) {
        Array.prototype.forEach.call(detailTable.tBodies[0].rows[index].cells, function (cell) {
          row.appendChild(cell.cloneNode(true));
        });
      });

      var tableBody = primaryTable.tBodies[0];
      var sourceRows = Array.prototype.slice.call(tableBody.rows);
      while (tableBody.rows.length < 10) {
        var nextRow = sourceRows[(tableBody.rows.length - sourceRows.length) % sourceRows.length].cloneNode(true);
        nextRow.cells[0].textContent = String(24 - tableBody.rows.length);
        tableBody.appendChild(nextRow);
      }
      primaryTable.style.minWidth = "1900px";
      detailTable.closest(".investment-detail").remove();
    }, 0);

    content.innerHTML =
      '<div class="settlement-page-head"><h1>\uD22C\uC790\uBE44 \uC9C0\uAE09\uD604\uD669</h1><div>⌂　HOME　›　\uC790\uAE08 \uAD00\uB9AC　›　<strong>\uD22C\uC790\uBE44 \uC9C0\uAE09\uD604\uD669</strong></div></div>' +
      '<section class="settlement-filter"><div class="filter-row"><b>\uC870\uD68C\uAE30\uAC04</b><select><option>\uC138\uAE08\uACC4\uC0B0\uC11C \uBC1C\uD589\uC77C</option></select><input value="2026.07.01"><span>~</span><input value="2026.07.30"><button>\uD604\uC7AC \uC804</button><button>1\uAC1C\uC6D4</button><button>3\uAC1C\uC6D4</button><button>1\uB144</button></div><div class="filter-row"><b>\uC9C0\uAE09\uAD6C\uBD84</b><select><option>\uC804\uCCB4</option></select></div><div class="filter-row"><b>\uD0A4\uC6CC\uB4DC \uAC80\uC0C9</b><select><option>\uC804\uCCB4</option></select><input class="keyword" placeholder="\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694"><button class="search">\uAC80\uC0C9</button><button>\uCD08\uAE30\uD654</button></div></section>' +
      '<div class="settlement-tools"><span>\uC870\uD68C \uACB0\uACFC : <b>24\uAC74</b></span><div><select><option>10\uAC1C</option></select><button class="download">\uB2E4\uC6B4\uB85C\uB4DC(Excel)</button></div></div>' +
      '<div class="settlement-table-wrap"><table class="settlement-table investment-table"><thead><tr><th>\uC21C\uBC88</th><th>\uACC4\uC57D\uCCB4\uACB0\uC77C</th><th>\uD504\uB85C\uC81D\uD2B8\uBC88\uD638</th><th>\uD504\uB85C\uC81D\uD2B8\uBA85</th><th>\uC5D0\uB108\uC9C0\uC0AC\uC6A9\uC790</th><th>EPC\uC0AC</th><th>\uC9C0\uAE09\uD68C\uCC28</th><th>\uC9C0\uAE09\uAD6C\uBD84</th><th>\uC9C0\uAE09\uBE44\uC728(%)</th></tr></thead><tbody>' +
      '<tr><td>24</td><td>2026.10.15</td><td>2026_1023K</td><td><a href="#">\uC804\uAE30\uACF5\uC0AC\uC870\uC9C1\uBCF8\uBD80 \uC0AC\uC625 LED \uC870\uBA85\uAD50\uCCB4\uC0AC\uC5C5</a></td><td>(\uC8FC)\uC5D8\uC5E0\uC5D0\uB108\uC9C0</td><td>\uC2E0\uC6D4\uAC74\uC124</td><td>1</td><td>\uC120\uAE08</td><td>50</td></tr>' +
      '<tr><td>23</td><td>2026.10.15</td><td>2026_1023K</td><td><a href="#">GE-4 \uC5D0\uB108\uC9C0\uD6A8\uC728\uD654(ID Fan VVVF \uC124\uCE58) \uC0AC\uC5C5</a></td><td>(\uC8FC)\uD5E4\uBE5B</td><td>(\uC8FC)\uAC00\uC2DC\uC13C\uD130</td><td>2</td><td>\uC900\uACF5\uAE08</td><td>33</td></tr>' +
      '<tr><td>22</td><td>2026.11.15</td><td>2026_1023K</td><td><a href="#">(\uC8FC)\uC5D8\uC5E0\uC5D0\uB108\uC9C0\uD6A8\uC728\uD654 LED \uC870\uBA85\uAD50\uCCB4\uC0AC\uC5C5</a></td><td>(\uC8FC)LS\uC804\uC120</td><td>\uB3D9\uC9C4\uC0DD\uC131</td><td>3</td><td>\uAE30\uC131\uAE08</td><td>100</td></tr></tbody></table></div>' +
      '<div class="settlement-table-wrap investment-detail"><table class="settlement-table"><thead><tr><th>\uACF5\uAE09\uAC00\uC561(\uC6D0)</th><th>\uBD80\uAC00\uC138(\uC6D0)</th><th>\uD569\uACC4\uC561(\uC6D0)</th><th>\uC9C0\uAE09\uB204\uC801\uC561(\uC6D0)</th><th>\uC9C0\uAE09\uB204\uC801\uBE44\uC728(%)</th><th>\uC138\uAE08\uACC4\uC0B0\uC11C\uBC1C\uD589\uC77C</th><th>\uC9C0\uAE09\uC77C</th><th>\uB2F4\uB2F9\uC790</th></tr></thead><tbody><tr><td>392,400</td><td>4,316,400</td><td>3,896,831</td><td>163,830,850</td><td>50</td><td>2026.10.15</td><td>2026.10.15</td><td>\uD64D\uAE38\uB3D9</td></tr><tr><td>392,400</td><td>4,316,400</td><td>3,896,831</td><td>163,830,850</td><td>66</td><td>2026.10.15</td><td>2026.10.15</td><td>\uD64D\uAE38\uB3D9</td></tr><tr><td>392,400</td><td>4,316,400</td><td>3,896,831</td><td>163,830,850</td><td>100</td><td>2026.11.15</td><td>2026.11.15</td><td>\uD64D\uAE38\uB3D9</td></tr></tbody></table></div>' +
      '<div class="settlement-pagination"><button>‹</button><button>1</button><button class="on">2</button><button>3</button><button>4</button><button>5</button><button>›</button></div>';

    var style = document.createElement("style");
    style.textContent = '.settlement-page-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.settlement-page-head h1{margin:0;font-size:25px}.settlement-page-head div{color:#64748b;font-size:13px}.settlement-filter{padding:18px 24px;background:#fff;border:1px solid #e5e9f0;border-radius:10px;box-shadow:0 1px 2px rgba(15,23,42,.04)}.filter-row{display:flex;align-items:center;gap:8px;min-height:40px;padding:5px 0}.filter-row b{width:92px;color:#1e293b}.filter-row input,.filter-row select,.filter-row button,.settlement-tools select{height:32px;padding:0 10px;border:1px solid #cbd5e1;border-radius:4px;background:#fff;color:#475569;font:inherit}.filter-row input{width:130px}.filter-row .keyword{width:310px}.filter-row .search{margin-left:auto;min-width:70px;color:#fff;background:#1d6ff2;border-color:#1d6ff2}.settlement-tools{display:flex;align-items:center;justify-content:space-between;margin:16px 0 12px;color:#475569}.settlement-tools div{display:flex;gap:8px}.download{height:32px;padding:0 13px;border:0;border-radius:4px;background:#10a64a;color:#fff;font-weight:700}.settlement-table-wrap{width:100%;max-width:100%;overflow-x:auto;overflow-y:hidden;background:#fff;border:1px solid #cbd5e1}.settlement-table{width:max-content;min-width:1180px;border-collapse:collapse;font-size:12px;text-align:center}.settlement-table th{padding:8px 6px;background:#f1f5f9;border:1px solid #cbd5e1;color:#1e293b;white-space:nowrap}.settlement-table td{padding:10px 6px;border:1px solid #d8dee8;white-space:nowrap}.settlement-table td:nth-child(4){max-width:280px;overflow:hidden;text-overflow:ellipsis;text-align:left}.settlement-table a{color:#1e293b;text-decoration:underline}.investment-detail{margin-top:18px;max-width:980px}.investment-table th{white-space:nowrap}.settlement-pagination{display:flex;justify-content:center;gap:5px;margin:28px 0 4px}.settlement-pagination button{width:30px;height:30px;border:1px solid #cbd5e1;background:#fff;color:#475569}.settlement-pagination .on{background:#1d6ff2;color:#fff;border-color:#1d6ff2}@media(max-width:900px){.settlement-page-head{align-items:flex-start;gap:10px;flex-direction:column}.filter-row{flex-wrap:wrap}.filter-row .search{margin-left:0}.settlement-tools{align-items:flex-start;gap:10px;flex-direction:column}}';
    document.head.appendChild(style);
  }

  var PROJECT_ROUND_KEY = "pms-project-round-state:2026_06_12";

  function getProjectRoundState() {
    var state = { current: 1, selected: 1, rounds: {} };
    try {
      var stored = JSON.parse(window.localStorage.getItem(PROJECT_ROUND_KEY) || "null");
      if (stored && stored.current > 0 && stored.rounds) state = stored;
    } catch (error) {}
    var savedRounds = Object.keys(state.rounds).map(Number).filter(function (round) { return Number.isFinite(round) && round > 0; });
    if (savedRounds.length) state.current = Math.max.apply(Math, [state.current].concat(savedRounds));
    savedRounds.forEach(function (round) {
      var changedRound = state.rounds[round];
      var previousRound = state.rounds[round - 1];
      if (round <= 1 || !changedRound || !changedRound.reason || !previousRound) return;
      previousRound.changeReasons = previousRound.changeReasons || {};
      previousRound.changeReasons[changedRound.section || "basic"] = {
        round: round,
        reason: changedRound.reason,
      };
    });
    if (!state.selected || state.selected > state.current) state.selected = state.current;
    return state;
  }

  function saveProjectRoundState(state) {
    try { window.localStorage.setItem(PROJECT_ROUND_KEY, JSON.stringify(state)); } catch (error) {}
  }

  function applyRoundValues(roundData) {
    if (!roundData) return;
    Object.keys(roundData.values || {}).forEach(function (id) {
      var element = document.getElementById(id);
      if (!element) return;
      var value = roundData.values[id];
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(element.tagName)) element.value = value;
      else element.textContent = value;
    });
  }

  function renderRoundChangeReasons(roundData) {
    document.querySelectorAll(".project-round-reason").forEach(function (item) { item.remove(); });
    if (!roundData || !roundData.changeReasons) return;
    Object.keys(roundData.changeReasons).forEach(function (section) {
      var entry = roundData.changeReasons[section];
      var reason = typeof entry === "object" ? entry.reason : entry;
      var selectedRound = getProjectRoundState().selected;
      if (!reason) return;
      var notice = document.createElement("div");
      notice.className = "project-round-reason";
      notice.innerHTML = '<strong>' + selectedRound + '차 | 변경사유</strong><span></span>';
      notice.querySelector("span").textContent = reason;

      if (window.location.pathname === "/pms-project-promotion.html") {
        var steps = document.querySelector(".steps");
        if (steps) steps.insertAdjacentElement("afterend", notice);
      } else if (window.location.pathname === "/pms-project-detail.html") {
        var tabbar = document.querySelector(".tabbar");
        var tabCard = tabbar && tabbar.closest(".card");
        if (tabCard) tabCard.insertAdjacentElement("afterend", notice);
      }
    });
  }

  function setRoundReadonly(readonly) {
    document.querySelectorAll("main.content input, main.content select, main.content textarea").forEach(function (control) {
      if (control.id === "projectRoundSelect" || control.closest("[data-project-round]")) return;
      if (!control.hasAttribute("data-round-was-disabled")) control.setAttribute("data-round-was-disabled", control.disabled ? "true" : "false");
      var textView = control.nextElementSibling && control.nextElementSibling.classList.contains("project-round-text") ? control.nextElementSibling : null;
      if (readonly) {
        if (!textView) {
          textView = document.createElement("span");
          textView.className = "project-round-text";
          control.insertAdjacentElement("afterend", textView);
        }
        var value = control.tagName === "SELECT" && control.selectedIndex >= 0 ? control.options[control.selectedIndex].text : control.value;
        if ((control.type === "checkbox" || control.type === "radio") && !control.checked) value = "미선택";
        textView.textContent = String(value || "-");
        control.setAttribute("data-round-display", control.style.display || "");
        control.style.display = "none";
        control.disabled = true;
      } else {
        if (textView) textView.remove();
        control.style.display = control.getAttribute("data-round-display") || "";
        control.removeAttribute("data-round-display");
        control.disabled = control.getAttribute("data-round-was-disabled") === "true";
      }
    });
    document.querySelectorAll('main.content .fval button, main.content [data-act="save"], main.content [data-act="change-contract"]').forEach(function (button) {
      if (!button.hasAttribute("data-round-button-display")) button.setAttribute("data-round-button-display", button.style.display || "");
      button.style.display = readonly ? "none" : button.getAttribute("data-round-button-display");
    });
    document.querySelectorAll('main.content [data-act="draft"], main.content [data-act="conclude"]').forEach(function (button) {
      if (!button.hasAttribute("data-round-was-button-disabled")) button.setAttribute("data-round-was-button-disabled", button.disabled ? "true" : "false");
      button.disabled = readonly ? true : button.getAttribute("data-round-was-button-disabled") === "true";
      if (readonly) {
        button.setAttribute("aria-disabled", "true");
        button.setAttribute("tabindex", "-1");
      } else {
        button.removeAttribute("aria-disabled");
        button.removeAttribute("tabindex");
      }
    });
    document.body.classList.toggle("project-round-readonly", readonly);
  }

  function syncReviewRequestButton() {
    var hasNewRound = getProjectRoundState().current > 1;
    var reviewRequestButton = document.querySelector('[data-act="review-request"]');
    if (reviewRequestButton) {
      if (!reviewRequestButton.hasAttribute("data-round-was-review-disabled")) reviewRequestButton.setAttribute("data-round-was-review-disabled", reviewRequestButton.disabled ? "true" : "false");
      reviewRequestButton.disabled = hasNewRound ? true : reviewRequestButton.getAttribute("data-round-was-review-disabled") === "true";
      reviewRequestButton.setAttribute("aria-disabled", reviewRequestButton.disabled ? "true" : "false");
      reviewRequestButton.title = hasNewRound ? "신규 계약 차수에서는 사업심의를 다시 요청할 수 없습니다." : "";
    }
    var goContractButton = document.querySelector('[data-act="go-contract"]');
    if (goContractButton) {
      goContractButton.disabled = false;
      goContractButton.setAttribute("aria-disabled", "false");
      goContractButton.removeAttribute("tabindex");
      goContractButton.title = "";
    }
  }

  function selectProjectRound(round) {
    var state = getProjectRoundState();
    state.selected = Math.max(1, Math.min(state.current, Number(round) || state.current));
    saveProjectRoundState(state);
    applyRoundValues(state.rounds[state.selected]);
    renderRoundChangeReasons(state.rounds[state.selected]);
    setRoundReadonly(state.current > 1 && state.selected < state.current);
    syncReviewRequestButton();
    window.dispatchEvent(new CustomEvent("pms:project-round-change", { detail: { round: state.selected, data: state.rounds[state.selected] || null } }));
  }

  function renderProjectRound() {
    var host = document.querySelector("[data-project-round]");
    if (!host) return;
    var state = getProjectRoundState();
    var count = state.current;
    if (count === 1) {
      host.innerHTML = '<span>계약 현황 차수</span><strong class="project-round-current">1차</strong>';
      selectProjectRound(1);
      return;
    }
    var options = "";
    for (var round = count; round >= 1; round -= 1) {
      options += '<option value="' + round + '"' + (round === state.selected ? " selected" : "") + '>' + round + '차</option>';
    }
    host.innerHTML = '<label for="projectRoundSelect">계약 현황 차수</label><select id="projectRoundSelect" aria-label="계약 현황 차수">' + options + "</select>";
    host.querySelector("select").addEventListener("change", function () {
      selectProjectRound(this.value);
      try { window.sessionStorage.setItem("pms-project-round-navigation", this.value); } catch (error) {}
      window.location.assign("/pms-project-detail.html");
    });
    selectProjectRound(state.selected);
  }

  function applyContractChangeRound(snapshot) {
    var state = getProjectRoundState();
    var nextRound = state.current + 1;
    if (snapshot && snapshot.previous && !state.rounds[state.current]) state.rounds[state.current] = snapshot.previous;
    if (snapshot && snapshot.next && snapshot.next.reason) {
      state.rounds[state.current] = state.rounds[state.current] || snapshot.previous || { values: {} };
      state.rounds[state.current].changeReasons = state.rounds[state.current].changeReasons || {};
      state.rounds[state.current].changeReasons[snapshot.next.section || "basic"] = {
        round: nextRound,
        reason: snapshot.next.reason,
      };
    }
    state.rounds[nextRound] = snapshot && snapshot.next ? snapshot.next : state.rounds[state.current] || { values: {} };
    state.current = nextRound;
    state.selected = nextRound;
    saveProjectRoundState(state);
    renderProjectRound();
    return nextRound;
  }

  window.PMSProjectRound = {
    applyContractChange: applyContractChangeRound,
    select: selectProjectRound,
    getState: getProjectRoundState,
    render: renderProjectRound,
  };

  /* 모든 PMS 화면 상단의 프로젝트 통합검색 / 자동완성입니다. */
  function ensureGlobalProjectSearch() {
    var header = document.querySelector(".topbar, .top");
    if (!header || header.querySelector(".pms-project-search")) return;

    var projects = [
      { no: "2026-05011", name: "포천 물류센터 LED 에너지효율화사업" },
      { no: "2026-06012", name: "천안 (주)선영 LED 에너지효율화사업" },
      { no: "2026-04108", name: "고양인버터 에너지 효율화 사업" },
      { no: "2026-03217", name: "전기공사중계조합 본관시설 LED 교체공사" },
      { no: "2026-02134", name: "서초동 오피스텔 에너지절감 사업" },
      { no: "2025-24111", name: "포천 포천파워(주) 고압인버터 에너지 효율화 사업" }
    ];

    var search = document.createElement("div");
    search.className = "pms-project-search";
    search.innerHTML =
      '<label class="sr-only" for="pms-global-project-search">프로젝트 통합검색</label>' +
      '<span class="pms-search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></span>' +
      '<input id="pms-global-project-search" type="search" role="combobox" autocomplete="off" aria-autocomplete="list" aria-expanded="false" aria-controls="pms-project-search-results" placeholder="프로젝트 명 또는 프로젝트 번호를 입력하세요">' +
      '<div class="pms-project-search-results" id="pms-project-search-results" role="listbox" hidden></div>';

    var anchor = header.querySelector(".pms-permission-groups, .user, .pms-global-user");
    /* 페이지마다 사용자 영역을 감싸는 DOM 깊이가 달라 헤더의 직계 자식까지 올려서 삽입합니다. */
    while (anchor && anchor.parentElement !== header) anchor = anchor.parentElement;
    header.insertBefore(search, anchor || null);

    var input = search.querySelector("input");
    var results = search.querySelector(".pms-project-search-results");
    var activeIndex = -1;
    var matched = [];

    function escapeHtml(value) {
      return String(value).replace(/[&<>\"']/g, function (character) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#39;" }[character];
      });
    }

    function highlight(value, query) {
      var safe = escapeHtml(value);
      var escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return safe.replace(new RegExp("(" + escapedQuery + ")", "ig"), "<mark>$1</mark>");
    }

    function closeResults() {
      results.hidden = true;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
      activeIndex = -1;
    }

    function openProject(project) {
      window.location.href = "/pms-project-detail.html?projectNo=" + encodeURIComponent(project.no);
    }

    function selectActive(index) {
      var options = results.querySelectorAll('[role="option"]');
      if (!options.length) return;
      activeIndex = (index + options.length) % options.length;
      options.forEach(function (option, optionIndex) {
        var selected = optionIndex === activeIndex;
        option.classList.toggle("active", selected);
        option.setAttribute("aria-selected", selected ? "true" : "false");
        if (selected) {
          input.setAttribute("aria-activedescendant", option.id);
          option.scrollIntoView({ block: "nearest" });
        }
      });
    }

    function renderResults() {
      var query = input.value.trim();
      if (!query) { closeResults(); return; }
      var normalizedQuery = normalize(query).toLowerCase();
      matched = projects.filter(function (project) {
        return normalize(project.no + project.name).toLowerCase().indexOf(normalizedQuery) > -1;
      }).slice(0, 6);
      activeIndex = -1;

      results.innerHTML = matched.length ? matched.map(function (project, index) {
        return '<button type="button" id="pms-project-option-' + index + '" class="pms-project-search-option" role="option" aria-selected="false" data-index="' + index + '">' +
          '<span class="pms-project-number">' + highlight(project.no, query) + '</span>' +
          '<span class="pms-project-name">' + highlight(project.name, query) + '</span>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>';
      }).join("") : '<div class="pms-project-search-empty">일치하는 프로젝트가 없습니다.</div>';
      results.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }

    input.addEventListener("input", renderResults);
    input.addEventListener("focus", function () { if (input.value.trim()) renderResults(); });
    input.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (results.hidden) renderResults();
        selectActive(activeIndex + (event.key === "ArrowDown" ? 1 : -1));
      } else if (event.key === "Enter" && activeIndex > -1) {
        event.preventDefault();
        openProject(matched[activeIndex]);
      } else if (event.key === "Escape") {
        closeResults();
      }
    });
    results.addEventListener("click", function (event) {
      var option = event.target.closest("[data-index]");
      if (option) openProject(matched[Number(option.getAttribute("data-index"))]);
    });
    document.addEventListener("click", function (event) {
      if (!search.contains(event.target)) closeResults();
    });
  }

  function ensureGlobalPermissionGroups(header, user) {
    header.querySelectorAll(".groups, .seg").forEach(function (element) {
      var label = normalize(element.textContent);
      if (label.indexOf("권한") > -1 && label.indexOf("그룹#") > -1) element.remove();
    });

    var permissions = header.querySelector(".pms-permission-groups");
    if (!permissions) {
      permissions = document.createElement("div");
      permissions.className = "pms-permission-groups";
      permissions.setAttribute("role", "group");
      permissions.setAttribute("aria-label", "권한 그룹 선택");
      permissions.innerHTML =
        '<span class="pms-permission-label">권한</span>' +
        [1, 2, 3, 4].map(function (number) {
          return '<button type="button" data-permission-group="' + number + '" aria-pressed="false">그룹#' + number + "</button>";
        }).join("");
      user.parentElement.insertBefore(permissions, user);
    }

    var selected = 1;
    try { selected = Number(sessionStorage.getItem("pms.permissionGroup")) || 1; } catch (err) {}

    function selectGroup(number) {
      permissions.querySelectorAll("[data-permission-group]").forEach(function (button) {
        var active = Number(button.getAttribute("data-permission-group")) === number;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      try { sessionStorage.setItem("pms.permissionGroup", String(number)); } catch (err) {}
    }

    permissions.addEventListener("click", function (event) {
      var button = event.target.closest("[data-permission-group]");
      if (button) selectGroup(Number(button.getAttribute("data-permission-group")));
    });
    selectGroup(selected);
  }

  /* 모든 PMS 화면의 사용자 정보 우측에 공통 로그아웃을 구성합니다. */
  function ensureGlobalLogout() {
    var header = document.querySelector(".topbar, .top");
    if (!header) return;

    var user = header.querySelector(".user");
    if (!user) {
      user = Array.prototype.find.call(header.querySelectorAll("span, p"), function (item) {
        return item.textContent.indexOf("이희성") > -1;
      });
      if (user) user.classList.add("user");
    }
    if (!user) {
      user = document.createElement("span");
      user.className = "user pms-global-user";
      user.innerHTML = "<b>이희성 부장</b> <small>[시스템 관리자]</small>";
      header.appendChild(user);
    }

    var role = user.querySelector("small");
    if (!role && normalize(user.textContent).indexOf("[시스템관리자]") > -1) {
      var nameElement = user.querySelector("b, strong");
      var name = nameElement ? nameElement.textContent.trim() : "이희성 부장";
      user.innerHTML = "<b>" + name + "</b> <small>[시스템 관리자]</small>";
      role = user.querySelector("small");
    }
    if (role && normalize(role.textContent) === "[시스템관리자]") {
      role.textContent = "[시스템 관리자]";
    }

    ensureGlobalPermissionGroups(header, user);

    var logout = header.querySelector(".logout, .pms-logout");
    if (!logout) {
      logout = document.createElement("a");
      user.insertAdjacentElement("afterend", logout);
    }
    logout.className = "logout pms-logout";
    logout.href = "/pms-login.html";
    logout.target = "_top";
    logout.textContent = "| Logout";
    logout.setAttribute("aria-label", "로그아웃 후 로그인 페이지로 이동");
    logout.addEventListener("click", function (event) {
      event.preventDefault();
      window.top.location.assign("/pms-login.html");
    });

    var style = document.createElement("style");
    style.textContent = ".pms-permission-groups{display:flex;align-items:center;gap:2px;padding:5px 7px;border-radius:9px;background:#f1f5f9;white-space:nowrap}.topbar>.pms-permission-groups,.top>.pms-permission-groups{margin-left:auto}.pms-permission-label{padding:0 5px;color:#64748b;font-size:12px}.pms-permission-groups button{height:28px;padding:0 12px;border:0;border-radius:6px;background:transparent;color:#64748b;font:inherit;font-size:12px;font-weight:500;cursor:pointer}.pms-permission-groups button.active{background:#1d6ff2;color:#fff;font-weight:700;box-shadow:0 2px 5px rgba(29,111,242,.2)}.pms-permission-groups button:focus-visible{outline:2px solid #93c5fd;outline-offset:1px}.topbar .user,.top .user,.pms-global-user{margin-left:0!important;color:#334155;font-size:13px;white-space:nowrap}.pms-global-user small{color:#64748b}.pms-logout{flex:none;color:#64748b!important;font-size:13px!important;font-weight:500;text-decoration:none!important;white-space:nowrap;cursor:pointer}.pms-logout:hover{color:#1d4ed8!important;text-decoration:underline!important}@media(max-width:1050px){.pms-permission-groups button{padding:0 8px}.pms-permission-label{display:none}}";
    document.head.appendChild(style);
  }

  function initLnb() {
    ensureIntakeWizardAssets();
    ensureExplicitModalDismissal();
    syncProjectInvestmentTab();
    ensureGlobalLogout();
    ensureGlobalProjectSearch();

    /* 축소 기능이 없는 LNB 햄버거 버튼은 모든 화면에서 제거합니다. */
    document.querySelectorAll(
      '.sidebar .hamburger, .sidebar-head [aria-label*="메뉴 접기"], .guide-logo > span'
    ).forEach(function (button) {
      button.remove();
    });

    var pagePath = window.location.pathname.replace(/\/index\.html$/, "/");
    var initialRoundState = getProjectRoundState();
    var navigationRound = null;
    try {
      navigationRound = window.sessionStorage.getItem("pms-project-round-navigation");
      window.sessionStorage.removeItem("pms-project-round-navigation");
    } catch (error) {}
    // 탭 이동 시에도 사용자가 선택한 기존 차수를 유지합니다.
    initialRoundState.selected = navigationRound ? Number(navigationRound) : initialRoundState.selected;
    saveProjectRoundState(initialRoundState);
    var roundStyle = document.createElement("style");
    roundStyle.textContent = '[data-project-round]{margin-left:auto;display:flex;align-items:center;gap:12px;color:#64748b;font-size:14px}[data-project-round] .project-round-current{min-width:54px;color:#0f172a;font-weight:700;text-align:center}[data-project-round] select{width:62px;height:36px;padding:0 8px;border:1px solid #cbd5e1;border-radius:7px;background:#fff;color:#0f172a;font:inherit;font-weight:500;cursor:pointer}.project-round-text{display:inline-flex;align-items:center;min-height:34px;color:#334155;line-height:1.5;white-space:pre-wrap}.project-round-reason{display:grid;grid-template-columns:130px minmax(0,1fr);gap:12px;margin-bottom:16px;padding:13px 16px;border:1px solid #f1d48a;border-radius:7px;background:#fffbeb;color:#475569}.project-round-reason strong{color:#92400e;white-space:nowrap}.project-round-readonly .fval,.project-round-readonly .change-field{background:#fff}.project-round-readonly [data-act="draft"]:disabled,.project-round-readonly [data-act="conclude"]:disabled,[data-act="review-request"]:disabled,[data-act="go-contract"]:disabled{opacity:.42;cursor:not-allowed;pointer-events:none}';
    document.head.appendChild(roundStyle);
    renderProjectRound();
    var contentRoot = document.querySelector("main.content");
    if (contentRoot) new MutationObserver(syncReviewRequestButton).observe(contentRoot, { childList: true, subtree: true });

    /* 모든 화면의 LNB BI는 메인 종합 대시보드로 이동한다. */
    document.addEventListener("click", function (event) {
      var logoTarget = event.target.closest(".sidebar .logo, .sidebar .guide-logo img");
      if (!logoTarget) return;
      event.preventDefault();
      window.top.location.assign("/pms-dashboard.html");
    });

    document.querySelectorAll(".sidebar a.logo, .sidebar .logo a").forEach(function (brandLink) {
      brandLink.setAttribute("href", "/pms-dashboard.html");
      brandLink.setAttribute("target", "_top");
      brandLink.setAttribute("aria-label", "PMS 종합 대시보드로 이동");
    });

    /* 링크로 감싸지지 않은 BI 이미지도 동일하게 대시보드로 연결한다. */
    document.querySelectorAll(".sidebar .logo img, .sidebar .guide-logo img").forEach(function (brandImage) {
      if (brandImage.closest("a")) return;
      brandImage.setAttribute("role", "link");
      brandImage.setAttribute("tabindex", "0");
      brandImage.setAttribute("aria-label", "PMS 종합 대시보드로 이동");
      brandImage.style.cursor = "pointer";
      brandImage.addEventListener("click", function () {
        window.top.location.href = "/pms-dashboard.html";
      });
      brandImage.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.top.location.href = "/pms-dashboard.html";
        }
      });
    });

    /* 메뉴 DOM 구조와 무관하게 BI 연결을 먼저 완료한 뒤 LNB를 초기화한다. */
    var nav = document.querySelector(".nav > ul");
    if (!nav) return;

    renderCanonicalNav(nav);

    if (pagePath === "/pms-data-change-requests.html") {
      var requestBody = document.getElementById("requestBody");
      if (requestBody) {
        requestBody.addEventListener("click", function (event) {
          var projectCell = event.target.closest(".cell-project");
          if (projectCell) window.location.href = "/pms-data-change-request-detail.html";
        });
        requestBody.addEventListener("keydown", function (event) {
          if (event.key === "Enter" && event.target.classList.contains("cell-project")) {
            window.location.href = "/pms-data-change-request-detail.html";
          }
        });
        requestBody.querySelectorAll(".cell-project").forEach(function (cell) {
          cell.tabIndex = 0;
          cell.setAttribute("role", "link");
          cell.style.cursor = "pointer";
          cell.style.textDecoration = "underline";
        });
      }
    }

    /* 투자금 지급현황은 원리금 상환내역과 동일한 조회/목록 UI 규격을 적용합니다. */
    if (pagePath === "/pms-investment-payments.html") {
      document.title = "\uD22C\uC790\uAE08 \uC9C0\uAE09\uD604\uD669 | \uC0AC\uC5C5\uAD00\uB9AC\uC2DC\uC2A4\uD15C(PMS)";
      var investmentTitle = document.querySelector(".page-head h2");
      var investmentCrumb = document.querySelector(".page-head .crumb b");
      if (investmentTitle) investmentTitle.textContent = "\uD22C\uC790\uAE08 \uC9C0\uAE09\uD604\uD669";
      if (investmentCrumb) investmentCrumb.textContent = "\uD22C\uC790\uAE08 \uC9C0\uAE09\uD604\uD669";

      var investmentStyle = document.createElement("style");
      investmentStyle.textContent =
        '.content{gap:18px}.page-head{align-items:flex-end!important;padding-bottom:0!important;border-bottom:0!important}.page-head h2{font-size:25px;letter-spacing:-.03em}' +
        '.card{border-color:#e5e9f0!important;box-shadow:0 1px 2px rgba(15,23,42,.04)}.card-body{padding:20px 24px 24px!important}' +
        '.filters{gap:8px 18px!important}.filter-row{min-height:40px}.filter-row label{color:#334155}.filter-row input,.filter-row select,.filter-row button,.list-tools select{border-radius:6px!important;color:#334155}' +
        '.filter-actions .btn-dark{background:#1d6ff2!important;border-color:#1d6ff2!important}.filter-actions .btn:not(.btn-dark){background:#fff;color:#334155}' +
        '.list-tools{min-height:36px;margin-bottom:12px}.list-tools select{height:36px;margin-right:8px;padding:0 10px;border:1px solid #cbd5e1;background:#fff}' +
        '.table-scroll{margin-top:0!important;border-color:#e5e9f0!important;border-radius:8px}th{padding:13px 10px!important;background:#f8fafc!important;color:#334155;border-color:#e5e9f0!important}td{padding:13px 10px!important;border-color:#eef2f7!important}' +
        '.master tbody tr.selected td{background:#eff6ff!important;color:#1d4ed8}.detail{width:100%!important;min-width:820px;margin-top:18px!important}.detail th{background:#eef2f7!important}' +
        '.pagination{gap:5px!important;margin:24px 0 0!important}.pagination button{width:32px!important;height:32px!important;border-radius:4px;color:#475569}.pagination .on{background:#1d6ff2!important;border-color:#1d6ff2!important;color:#fff}';
      document.head.appendChild(investmentStyle);
    }

    // 사업 결산 화면도 기존 PMS LNB의 SVG 아이콘 세트를 사용한다.
    if (pagePath === "/pms-business-settlement.html") {
      var originalIcons = [
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16"/><path d="M13 10h6a1 1 0 0 1 1 1v10"/><path d="M7 8h3M7 12h3M7 16h3M16 14h1M16 18h1"/></svg>',
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M15 11v4"/></svg>',
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h9l5 5v11H5z"/><path d="M9 13h6M9 17h4"/></svg>',
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/><path d="M7 12h4"/></svg>',
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>',
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>',
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>'
      ];
      Array.prototype.forEach.call(nav.children, function (li, index) {
        var item = li.querySelector(":scope > .nav-item");
        if (!item || !originalIcons[index]) return;
        var icon = item.querySelector("svg.nav-icon");
        if (icon) icon.outerHTML = originalIcons[index];
        else item.insertAdjacentHTML("afterbegin", originalIcons[index]);
      });

      var commonFrameStyle = document.createElement("style");
      commonFrameStyle.textContent =
        'html,body{font-family:"Noto Sans KR",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;font-size:14px!important;line-height:1.5!important}' +
        'body,.app{background:#f1f5f9!important}.app main{background:#f1f5f9!important}.top{background:#fff!important;border-bottom:1px solid #e5e9f0!important}.content{background:transparent!important}.sidebar{width:248px!important;flex:0 0 248px!important}.sidebar .logo{height:60px!important;padding:0 20px!important}.sidebar .logo img{height:30px!important;width:auto!important}.sidebar .nav{padding:16px 12px!important}.sidebar .nav-item{display:flex!important;align-items:center!important;gap:12px!important;min-height:0!important;margin:0!important;padding:12px 14px!important;border-radius:8px!important;font-size:14.5px!important;font-weight:500!important;line-height:1.5!important}.sidebar .nav-item.active{font-weight:700!important}.sidebar .nav-icon{width:20px!important;height:20px!important;flex:none!important}.sidebar .nav-item .chev{width:8px!important;height:8px!important;margin-left:auto!important}.sidebar .subnav{padding:2px 0 6px 26px!important}.sidebar .subnav-item{gap:10px!important;padding:8px 10px!important;font-size:14px!important;line-height:1.5!important}.sidebar .dot{width:5px!important;height:5px!important}.top{height:60px!important;padding:0 26px!important;gap:16px!important}.top h1{font-size:19px!important;line-height:1.5!important}.top .right{gap:14px!important}.content{padding:26px!important}';
      document.head.appendChild(commonFrameStyle);

      var pageHead = document.querySelector(".heading");
      if (pageHead) {
        var titleGroup = pageHead.querySelector("div");
        var pageTitle = titleGroup && titleGroup.querySelector("h1");
        var breadcrumb = titleGroup && titleGroup.querySelector("div");
        if (pageTitle && breadcrumb) {
          breadcrumb.className = "guide-breadcrumb";
          pageHead.insertBefore(pageTitle, pageHead.firstChild);
          pageHead.appendChild(breadcrumb);
          titleGroup.remove();

          var breadcrumbStyle = document.createElement("style");
          breadcrumbStyle.textContent = '.heading{display:flex!important;align-items:center!important;justify-content:space-between!important;margin-bottom:18px!important}.heading h1{margin:0!important}.guide-breadcrumb{display:flex;align-items:center;color:#64748b;font-size:13px;white-space:nowrap}.guide-breadcrumb strong{color:#1e293b}';
          document.head.appendChild(breadcrumbStyle);
        }
      }

      var settlementTables = document.querySelectorAll(".table table");
      var scheduleTable = settlementTables[settlementTables.length - 1];
      if (scheduleTable) {
        scheduleTable.innerHTML =
          '<thead><tr><th>\uAD6C\uBD84</th><th>\uC2DC\uC791\uC77C</th><th>\uC885\uB8CC\uC77C</th></tr></thead>' +
          '<tbody><tr><td>\uC2DC\uACF5\uC77C</td><td>2026.10.20</td><td>2026.11.19</td></tr>' +
          '<tr><td>\uC900\uACF5\uC77C</td><td>2026.11.20</td><td>2026.12.17</td></tr>' +
          '<tr><td>\uC0C1\uD658</td><td>2026.12.18</td><td>2028.11.18</td></tr></tbody>';
      }
    }

    if (pagePath === "/pms-business-settlement.html" && new URLSearchParams(window.location.search).get("view") === "list") {
      renderSettlementList();
    }
    if (pagePath === "/pms-project-investment.html" && new URLSearchParams(window.location.search).get("view") === "list") {
      renderInvestmentList();
    }

    var settlementKey = "\uC0AC\uC5C5\uACB0\uC0B0";
    var hasSettlement = Array.prototype.some.call(nav.children, function (li) {
      var item = li.querySelector(":scope > .nav-item");
      return item && (labelOf(item) === settlementKey || (pagePath === "/pms-business-settlement.html" && labelOf(item) === "\uC0AC\uC5C5\uAD00\uB9AC"));
    });

    if (!hasSettlement) {
      var settlementLi = document.createElement("li");
      settlementLi.innerHTML =
        '<a class="nav-item" href="#">' +
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>' +
        "\uC0AC\uC5C5 \uACB0\uC0B0 <span class=\"chev\" aria-hidden=\"true\"></span>" +
        "</a>";

      var fundLi = Array.prototype.find.call(nav.children, function (li) {
        var item = li.querySelector(":scope > .nav-item");
        return item && labelOf(item) === "\uC790\uAE08\uAD00\uB9AC";
      });
      nav.insertBefore(settlementLi, fundLi ? fundLi.nextSibling : null);
    }

    var statisticsKey = "\uD1B5\uACC4";
    var hasStatistics = Array.prototype.some.call(nav.children, function (li) {
      var item = li.querySelector(":scope > .nav-item");
      return item && labelOf(item) === statisticsKey;
    });

    if (!hasStatistics) {
      var statisticsLi = document.createElement("li");
      statisticsLi.innerHTML =
        '<a class="nav-item" href="#">' +
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M3 19h18"/></svg>' +
        statisticsKey + ' <span class="chev" aria-hidden="true"></span>' +
        "</a>";

      var settlementMenuLi = Array.prototype.find.call(nav.children, function (li) {
        var item = li.querySelector(":scope > .nav-item");
        return item && labelOf(item) === settlementKey;
      });
      nav.insertBefore(statisticsLi, settlementMenuLi ? settlementMenuLi.nextSibling : null);
    }

    var path = pagePath;
    var activeLabel = ACTIVE_BY_PATH[path] || "";
    var view = new URLSearchParams(window.location.search).get("view");
    if (path === "/pms-project-status.html" && view === "mine") {
      activeLabel = "\uB0B4 \uD504\uB85C\uC81D\uD2B8 \uD604\uD669";
    }
    if (path === "/pms-project-status.html" && view === "change-request") {
      activeLabel = "\uB370\uC774\uD130 \uC218\uC815\uC694\uCCAD";
    }
    if (path === "/pms-project-investment.html" && new URLSearchParams(window.location.search).get("view") === "list") {
      activeLabel = "\uD22C\uC790\uBE44 \uC9C0\uAE09\uD604\uD669";
    }

    Array.prototype.forEach.call(nav.children, function (li) {
      var navItem = li.querySelector(":scope > .nav-item");
      if (!navItem) return;

      var children = MENU[labelOf(navItem)];

      /* 하위 메뉴가 없는 메뉴는 화살표를 감춥니다. */
      if (!children) {
        li.classList.add("no-sub");
        return;
      }

      /* 기존 2depth 는 제거하고 공통 정의로 다시 생성합니다. */
      var existing = li.querySelector(":scope > .subnav");
      if (existing) existing.remove();

      var scopedActiveLabel = activeLabel;
      if (path === "/pms-fund-plan-performance.html") {
        var openedFromStatistics = new URLSearchParams(window.location.search).get("menu") === "statistics";
        var currentMenuLabel = labelOf(navItem);
        if ((openedFromStatistics && currentMenuLabel !== statisticsKey) ||
            (!openedFromStatistics && currentMenuLabel === statisticsKey)) {
          scopedActiveLabel = "";
        }
      }

      var hasActiveChild = children.some(function (child) {
        return child.label === scopedActiveLabel;
      });

      li.appendChild(buildSubnav(children, scopedActiveLabel));

      /* 1depth 는 페이지를 이동하지 않고 2depth 펼침/접힘만 제어합니다. */
      navItem.setAttribute("href", "#");
      navItem.setAttribute("role", "button");
      navItem.setAttribute("aria-expanded", hasActiveChild ? "true" : "false");
      navItem.addEventListener("click", function (event) {
        event.preventDefault();
        var willOpen = !li.classList.contains("is-open");

        Array.prototype.forEach.call(nav.children, function (otherLi) {
          if (otherLi === li) return;
          otherLi.classList.remove("is-open");
          var otherItem = otherLi.querySelector(":scope > .nav-item");
          if (otherItem && otherItem.hasAttribute("aria-expanded")) {
            otherItem.setAttribute("aria-expanded", "false");
          }
        });

        li.classList.toggle("is-open", willOpen);
        navItem.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });

      /* 현재 페이지가 속한 메뉴는 처음부터 열린 상태로 유지합니다. */
      navItem.classList.toggle("active", hasActiveChild);
      li.classList.toggle("is-open", hasActiveChild);
      if (hasActiveChild) {
        navItem.setAttribute("aria-current", "page");
      } else {
        navItem.removeAttribute("aria-current");
      }
    });

    renderLnbUtilities(nav);
    var srmLink = document.querySelector('.lnb-utility-link[href="https://srm.kepco.net/"]');
    if (srmLink) {
      srmLink.href = 'https://leehee4343.github.io/kepcoes-srm-prototype/modules/01_%ED%98%91%EB%A0%A5%EC%97%85%EC%B2%B4%EC%B0%BD%EA%B5%AC_%EB%A1%9C%EA%B7%B8%EC%9D%B8%EC%A0%84/SRMLogin.html';
    }

    if (path === "/pms-business-settlement.html") {
      var excelButton = document.querySelector(".excel");
      if (excelButton) {
        excelButton.remove();
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLnb);
  } else {
    initLnb();
  }
})();

/* ============================================================
   공통 사업 접수 STEP 모달 (STEP1 ~ STEP3)
   - 어느 화면에서든 "신규 프로젝트 등록" 진입 시 딤드 + STEP 모달을 띄웁니다.
   - 각 STEP 은 단일 선택이며, 선택 시 다음 STEP 으로 슬라이드 이동합니다.
   - STEP3 확인 후 "프로젝트 등록" 을 누르면 신규 프로젝트 등록 페이지를 호출합니다.
   ============================================================ */
(function () {
  "use strict";

  /* pms-lnb.js의 공통 로더와 페이지별 기존 script가 함께 있어도 한 번만 초기화합니다. */
  if (window.PMSIntakeWizardLoaded) return;
  window.PMSIntakeWizardLoaded = true;

  var ENTRY_PAGE = "/pms-new-project.html";
  var TARGET_PAGE = "/pms-new-project.html";
  var ENTRY_LABEL = "신규프로젝트등록";

  var STEPS = [
    {
      key: "form",
      title: "사업의 계약형태를 선택해 주세요.",
      options: [
        { value: "esco", label: "ESCO 계약", description: "에너지 절감 성과를 기반으로 하는 계약 방식을 선택합니다." },
        { value: "epc", label: "EPC(용역) 계약", description: "설계·조달·시공 등 종합적인 용역 계약 방식을 선택합니다." },
        { value: "etc", label: "기타 계약", description: "위 유형에 해당하지 않는 기타 계약 방식을 선택합니다." },
      ],
    },
    {
      key: "type",
      title: "사업의 계약유형을 선택해 주세요.",
      options: [
        { value: "profit", label: "수익사업", description: "수익형 사업" },
        { value: "policy", label: "정책사업", description: "정책형 사업" },
      ],
    },
    {
      key: "review",
      title: "사업심의 여부를 선택해 주세요.",
      options: [
        { value: "target", label: "사업심의 대상", description: "심의 대상 사업" },
        { value: "exempt", label: "사업심의 면제", description: "심의 면제 사업" },
      ],
    },
  ];

  var LAST = STEPS.length - 1;
  var state = { index: 0, picked: {} };
  var overlay = null;
  var lastFocused = null;

  function normalize(text) {
    return (text || "").replace(/\s+/g, "");
  }

  function usesContractType(form) {
    return form === "esco" || form === "etc";
  }

  /* ---------- 마크업 생성 ---------- */
  function arrowIcon(direction) {
    var points = direction === "prev" ? "12,3 12,15 4,9" : "6,3 14,9 6,15";
    return '<svg viewBox="0 0 18 18" aria-hidden="true"><polygon points="' + points + '"/></svg>';
  }

  function optionIcon(value) {
    if (value === "esco") {
      return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 51c2-19 12-32 38-36 0 24-10 35-29 34"/><path d="M16 53c5-15 15-24 29-31"/></svg>';
    }
    if (value === "epc") {
      return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 39v-7c0-10 6-18 15-20m15 27v-7c0-10-6-18-15-20M12 39h40v7H12zM8 47h48M27 10v18m10-18v18"/><path d="M15 47c3 7 8 9 17 9s14-2 17-9"/></svg>';
    }
    if (value === "target" || value === "profit" || value === "policy") {
      return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 7h24v34H12z"/><path d="M18 15h12M18 22h12M18 29h7"/><path d="m29 33 3 3 6-7"/></svg>';
    }
    return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 8h25l8 8v40H17z"/><path d="M42 8v10h9M24 27h19M24 35h19M24 43h14"/></svg>';
  }

  function buildStep(step, index) {
    var items = step.options
      .map(function (option, optionIndex) {
        return (
          '<li><button class="iw-option" type="button" aria-pressed="false" data-value="' +
          option.value +
          '"><span class="iw-option-no">' + String(optionIndex + 1).padStart(2, "0") + '</span><span class="iw-option-icon">' + optionIcon(option.value) + '</span><span class="iw-option-label">' +
          option.label +
          '</span><span class="iw-option-arrow" aria-hidden="true">→</span>' +
          "</button></li>"
        );
      })
      .join("");

    return (
      '<section class="iw-step" data-step="' +
      (index + 1) +
      '" role="group" aria-label="STEP ' +
      (index + 1) +
      '">' +
      '<div class="iw-intro"><p class="iw-step-count">STEP ' + (index + 1) + '.</p><h2 class="iw-step-title">' + step.title.replace("선택해", "<em>선택해</em>") + '</h2><p class="iw-step-desc">프로젝트 생성 이후,<br>변경할 수 없는 정보이므로<br>정확하게 선택해 주세요.</p></div>' +
      '<ul class="iw-options">' +
      items +
      '</ul><p class="iw-hint"><span aria-hidden="true">✓</span> 프로젝트 생성 이후, 변경할 수 없는 정보이므로 정확하게 입력해 주세요.</p>' +
      "</section>"
    );
  }

  function buildOverlay() {
    var el = document.createElement("div");
    el.className = "iw-overlay";
    el.id = "intakeWizard";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "iwHeadTitle");
    el.hidden = true;

    el.innerHTML =
      '<div class="iw-frame">' +
      '<button class="iw-nav prev" type="button" data-act="prev" aria-label="이전 단계">' +
      arrowIcon("prev") +
      "</button>" +
      '<div class="iw-panel">' +
      '<div class="iw-head"><h1 class="iw-dialog-title" id="iwHeadTitle">신규 프로젝트 등록</h1>' +
      '<button class="iw-close" type="button" data-act="close" aria-label="닫기"><span aria-hidden="true">×</span></button>' +
      "</div>" +
      '<div class="iw-viewport">' +
      '<div class="iw-track" id="iwTrack">' +
      STEPS.map(buildStep).join("") +
      "</div>" +
      "</div>" +
      '<div class="iw-foot">' +
      '<div class="iw-summary" aria-label="선택 정보" hidden>' +
      '<div><span>계약 형태</span><strong data-summary="form"></strong></div>' +
      '<div><span>계약 유형</span><strong data-summary="type"></strong></div>' +
      '<div><span>사업 심의</span><strong data-summary="review"></strong></div>' +
      "</div>" +
      '<div class="iw-actions">' +
      '<button class="iw-btn primary" type="button" data-act="submit" hidden>프로젝트 등록</button>' +
      '<button class="iw-btn" type="button" data-act="close">취소</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<button class="iw-nav next" type="button" data-act="next" aria-label="다음 단계">' +
      arrowIcon("next") +
      "</button>" +
      "</div>";

    document.body.appendChild(el);
    return el;
  }

  /* ---------- 상태 반영 ---------- */
  function render() {
    var track = overlay.querySelector("#iwTrack");
    track.style.transform = "translateX(-" + (state.index * 100) / STEPS.length + "%)";

    /* 화살표 : 첫 STEP 은 이전 숨김, 마지막 STEP 은 다음 숨김 */
    var prev = overlay.querySelector('[data-act="prev"]');
    var next = overlay.querySelector('[data-act="next"]');
    prev.hidden = state.index === 0;
    next.hidden = state.index === LAST;
    /* 선택 전에는 다음 단계로 넘어갈 수 없습니다. */
    next.disabled = !state.picked[STEPS[state.index].key];

    /* 사업 접수 버튼은 3개 STEP 이 모두 선택된 마지막 STEP 에서만 노출합니다. */
    var hasContractTypeStep = usesContractType(state.picked.form);
    var isEpc = state.picked.form === "epc";
    var complete = Boolean(
      state.picked.form && state.picked.review && (!hasContractTypeStep || state.picked.type)
    );
    overlay.querySelector(".iw-panel").classList.toggle("iw-confirm-ready", state.index === LAST && complete);
    var summary = overlay.querySelector(".iw-summary");
    var typeSummary = summary.querySelector('[data-summary="type"]').parentElement;
    typeSummary.hidden = isEpc;
    summary.classList.toggle("iw-summary-epc", isEpc);
    summary.hidden = !(state.index === LAST && complete);
    if (!summary.hidden) {
      STEPS.forEach(function (step) {
        var selected = step.options.find(function (option) {
          return option.value === state.picked[step.key];
        });
        summary.querySelector('[data-summary="' + step.key + '"]').textContent = selected ? selected.label : "";
      });
    }
    overlay.querySelector('[data-act="submit"]').hidden = !(state.index === LAST && complete);

    /* EPC는 계약유형 단계를 건너뛰므로 심의 단계가 STEP 2로 표시됩니다. */
    overlay.querySelectorAll(".iw-step-count").forEach(function (count, index) {
      count.textContent = "STEP " + (isEpc && index === LAST ? 2 : index + 1) + ".";
    });

    /* 현재 STEP 영역에만 포커스가 가도록 처리합니다. */
    overlay.querySelectorAll(".iw-step").forEach(function (section, index) {
      var isCurrent = index === state.index;
      section.setAttribute("aria-hidden", isCurrent ? "false" : "true");
      section.querySelectorAll(".iw-option").forEach(function (button) {
        button.tabIndex = isCurrent ? 0 : -1;
      });
    });

    /* 슬라이드 전체가 아닌 현재 STEP의 실제 높이에 맞춰 하단 확인 영역을 붙입니다. */
    var currentStep = overlay.querySelectorAll(".iw-step")[state.index];
    overlay.querySelector(".iw-viewport").style.height = currentStep.scrollHeight + "px";
  }

  function goTo(index) {
    state.index = Math.min(Math.max(index, 0), LAST);
    render();
  }

  function previousIndex() {
    return state.index === LAST && !usesContractType(state.picked.form) ? 0 : state.index - 1;
  }

  function nextIndex() {
    return state.index === 0 && !usesContractType(state.picked.form) ? LAST : state.index + 1;
  }

  function pick(stepIndex, value) {
    var step = STEPS[stepIndex];
    state.picked[step.key] = value;

    if (step.key === "form" && !usesContractType(value)) {
      delete state.picked.type;
      var typeSection = overlay.querySelector('.iw-step[data-step="2"]');
      typeSection.querySelectorAll(".iw-option").forEach(function (button) {
        button.setAttribute("aria-pressed", "false");
      });
    }

    /* 단일 선택 : 같은 STEP 의 다른 항목 선택을 해제합니다. */
    var section = overlay.querySelectorAll(".iw-step")[stepIndex];
    section.querySelectorAll(".iw-option").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.value === value));
    });

    if (stepIndex < LAST) {
      goTo(stepIndex === 0 && !usesContractType(value) ? LAST : stepIndex + 1);
    } else {
      render();
    }
  }

  /* ---------- 열기 / 닫기 ---------- */
  function open() {
    if (!overlay) {
      overlay = buildOverlay();
      bind();
    }

    lastFocused = document.activeElement;
    state.index = 0;
    state.picked = {};
    overlay.querySelectorAll(".iw-option").forEach(function (button) {
      button.setAttribute("aria-pressed", "false");
    });

    overlay.hidden = false;
    document.body.classList.add("iw-open");
    render();
    overlay.querySelector(".iw-step .iw-option").focus();
  }

  function close() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove("iw-open");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function submit() {
    if (!window.confirm("신규 프로젝트 등록으로 이동하시겠습니까?")) return;

    var query = STEPS.filter(function (step) {
      return state.picked[step.key];
    }).map(function (step) {
      return step.key + "=" + encodeURIComponent(state.picked[step.key]);
    }).join("&");
    window.location.href = TARGET_PAGE + "?" + query;
  }

  function bind() {
    overlay.addEventListener("click", function (event) {
      /* 딤드 영역 클릭 시 닫기 */
      if (event.target === overlay) {
        close();
        return;
      }

      var option = event.target.closest(".iw-option");
      if (option) {
        var section = option.closest(".iw-step");
        pick(Number(section.dataset.step) - 1, option.dataset.value);
        return;
      }

      var action = event.target.closest("[data-act]");
      if (!action) return;

      if (action.dataset.act === "close") close();
      if (action.dataset.act === "prev") goTo(previousIndex());
      if (action.dataset.act === "next") goTo(nextIndex());
      if (action.dataset.act === "submit") submit();
    });

    document.addEventListener("keydown", function (event) {
      if (overlay.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft" && state.index > 0) goTo(previousIndex());
      if (event.key === "ArrowRight" && state.index < LAST && state.picked[STEPS[state.index].key]) goTo(nextIndex());
    });
  }

  /* ---------- 진입 지점 가로채기 ---------- */
  function initEntryPoints() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("a, button");
      if (!link) return;

      var href = link.tagName === "A" ? link.getAttribute("href") || "" : "";
      var isTargetLink = href === ENTRY_PAGE || href.indexOf(ENTRY_PAGE + "?") === 0;
      var isEntry =
        link.dataset.intake === "new-project" || isTargetLink || normalize(link.textContent) === ENTRY_LABEL;
      if (!isEntry) return;

      /* 이미 STEP 선택을 마친 뒤 호출된 페이지 이동은 가로채지 않습니다. */
      if (link.tagName === "A" && link.search && link.search.indexOf("form=") > -1) return;

      event.preventDefault();
      open();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEntryPoints);
  } else {
    initEntryPoints();
  }
})();

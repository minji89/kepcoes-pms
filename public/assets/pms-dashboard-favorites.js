(function(){
  "use strict";
  var menus={
    "사업 접수":[{label:"신규 프로젝트 등록",href:"/pms-new-project.html"},{label:"추진단계 프로젝트 현황",href:"/pms-promotion-status.html"}],
    "프로젝트 관리":[{label:"프로젝트 현황",href:"/pms-project-status.html"}],
    "계약 관리":[{label:"수주계약 현황",href:"/pms-contract-status.html"},{label:"발주계약 현황",href:"/pms-order-contract-status.html"}],
    "자금 관리":[{label:"상환 계획",href:"/pms-fund-interest.html"},{label:"상환 현황",href:"/pms-fund-repayment.html"},{label:"계획대비 실적 현황",href:"/pms-fund-plan-performance.html"},{label:"투자금 지급현황",href:"/pms-investment-payments.html"}],
    "사업 결산":[{label:"사업결산",href:"/pms-business-settlement.html?view=list"}],
    "마이페이지":[{label:"내 프로젝트 현황",href:"/pms-my-projects.html"},{label:"데이터 수정요청",href:"/pms-data-change-requests.html"},{label:"내 정보 수정",href:"/pms-my-profile.html"}],
    "출장 관리":[{label:"출장 현황",href:"/pms-business-trip-status.html"},{label:"출장 정산내역",href:"/pms-business-trip-settlements.html"}],
    "공통 관리":[{label:"PMS 경영목표 관리",href:"/pms-management-goals.html"},{label:"출장 단가 및 기준 설정",href:"/pms-trip-rate-settings.html"},{label:"사용자 관리",href:"/pms-admin-management.html"}]
  };
  var defaults=[
    {depth1:"사업 접수",depth2:"신규 프로젝트 등록",href:"/pms-new-project.html"},
    {depth1:"프로젝트 관리",depth2:"프로젝트 현황",href:"/pms-project-status.html"},
    {depth1:"계약 관리",depth2:"수주계약 현황",href:"/pms-contract-status.html"},
    {depth1:"자금 관리",depth2:"투자금 지급현황",href:"/pms-investment-payments.html"},
    {depth1:"마이페이지",depth2:"내 프로젝트 현황",href:"/pms-my-projects.html"}
  ];
  var colors=["#1d6ff2","#0f9f83","#805ad5","#e48b16","#e45858"],storageKey="pmsDashboardFavorites";
  var grid=document.getElementById("favoriteGrid"),dialog=document.getElementById("favoriteDialog"),editList=document.getElementById("favoriteEditList");
  function getFavorites(){try{var saved=JSON.parse(localStorage.getItem(storageKey));return Array.isArray(saved)&&saved.length?saved.slice(0,5):defaults}catch(e){return defaults}}
  function renderCards(items){grid.innerHTML=items.map(function(item,index){return '<a class="favorite-card" style="--favorite-color:'+colors[index]+'" href="'+item.href+'"><span class="favorite-depth1">'+item.depth1+'</span><b class="favorite-depth2">'+item.depth2+'</b><span class="favorite-arrow" aria-hidden="true">→</span></a>'}).join("")}
  function depth1Options(selected){return '<option value="">1Depth 선택</option>'+Object.keys(menus).map(function(name){return '<option value="'+name+'"'+(name===selected?' selected':'')+'>'+name+'</option>'}).join("")}
  function depth2Options(depth1,selected){return '<option value="">2Depth 선택</option>'+((menus[depth1]||[]).map(function(item){return '<option value="'+item.href+'" data-label="'+item.label+'"'+(item.label===selected?' selected':'')+'>'+item.label+'</option>'}).join(""))}
  function renderEditor(items){editList.innerHTML=Array.from({length:5},function(_,index){var item=items[index]||{};return '<div class="favorite-edit-row"><span class="favorite-number">'+(index+1)+'</span><select class="depth1-select" aria-label="'+(index+1)+'번 1Depth">'+depth1Options(item.depth1)+'</select><select class="depth2-select" aria-label="'+(index+1)+'번 2Depth"'+(!item.depth1?' disabled':'')+'>'+depth2Options(item.depth1,item.depth2)+'</select></div>'}).join("")}
  editList.addEventListener("change",function(event){if(!event.target.classList.contains("depth1-select"))return;var row=event.target.closest(".favorite-edit-row"),depth2=row.querySelector(".depth2-select");depth2.innerHTML=depth2Options(event.target.value,"");depth2.disabled=!event.target.value});
  document.getElementById("openFavoriteSetting").addEventListener("click",function(){renderEditor(getFavorites());dialog.showModal()});
  document.getElementById("saveFavorites").addEventListener("click",function(event){event.preventDefault();var items=Array.from(editList.querySelectorAll(".favorite-edit-row")).map(function(row){var depth1=row.querySelector(".depth1-select").value,select=row.querySelector(".depth2-select"),option=select.options[select.selectedIndex];return depth1&&select.value?{depth1:depth1,depth2:option.dataset.label||option.textContent,href:select.value}:null}).filter(Boolean).slice(0,5);if(!items.length)return;localStorage.setItem(storageKey,JSON.stringify(items));renderCards(items);window.dispatchEvent(new CustomEvent("pms:favorites-updated"));dialog.close()});
  function renderDashboardRework(){
    var favoriteSection=document.querySelector('.favorite-section');
    if(!favoriteSection||document.querySelector('.dashboard-rework'))return;
    Array.prototype.forEach.call(document.querySelectorAll('main.content > section:not(.favorite-section)'),function(section){section.hidden=true});
    var link=document.createElement('link');link.rel='stylesheet';link.href='/assets/pms-dashboard-rework.css';document.head.appendChild(link);
    var dashboard=document.createElement('div');dashboard.className='dashboard-rework';dashboard.innerHTML=
      '<section class="dash-block" data-motion-section="project"><div class="dash-section-title"><b>프로젝트 현황</b><span>기준일자 : 2026.06.10</span></div><div class="project-summary dash-panel">'+
      '<div class="project-total"><div><span class="dot"></span><b>진행 프로젝트</b><strong><span class="project-count" data-count="164">0</span><small>건</small></strong></div><div class="stage-counts"><span>추진 <b>32건</b></span><span>심의 <b>7건</b></span><span>계약 <b>92건</b></span><span>종료 <b>21건</b></span></div></div>'+
      '<div class="pie-unit"><b>계약 형태</b><div class="pie pie-a" role="img" aria-label="계약 형태: ESCO 140건, EPC 용역 20건, 기타 20건"></div><ul><li>ESCO 계약(건) : <strong>140</strong></li><li>EPC(용역) 계약(건) : <strong>20</strong></li><li>기타 : <strong>20</strong></li></ul></div>'+
      '<div class="pie-unit"><b>계약 유형</b><div class="pie pie-b" role="img" aria-label="계약 유형: 수익사업 140건, 정책사업 20건, 정책사업 비표준 20건, 기타 4건"></div><ul><li>수익사업(건) : <strong>140</strong></li><li>정책사업(건) : <strong>20</strong></li><li>정책사업(비표준) : <strong>20</strong></li><li>기타 : <strong>4</strong></li></ul></div>'+
      '<div class="pie-unit"><b>사업 심의</b><div class="pie pie-c" role="img" aria-label="사업 심의: 심의 대상 140건, 심의 면제 20건"></div><ul><li>심의 대상(건) : <strong>140</strong></li><li>심의 면제(건) : <strong>20</strong></li></ul></div></div></section>'+
      '<section class="dash-block" data-motion-section="goal"><div class="dash-section-title"><b>2026년 경영목표 대비 실적</b><small>프로젝트 단위로 계약 체결 이후에 발생된 매출 및 절감량을 기준으로 합니다.</small></div><div class="goal-summary dash-panel"><div class="metric-card"><b>연간 경영목표</b><dl><div><dt>연간 사업비</dt><dd>48,000,000,000원</dd></div><div><dt>매출</dt><dd>29,400,000,000원</dd></div><div><dt>EERS 절감량</dt><dd>20,000,000 kWh/년</dd></div><div><dt>에너지 절감량</dt><dd>20,000,000 kWh/년</dd></div></dl></div><div class="metric-card"><b>실적 <small>기준일자 : 2026.06.10</small></b><dl><div><dt>연간 사업비</dt><dd>27,472,120,000원</dd></div><div><dt>매출</dt><dd>18,243,230,000원</dd></div><div><dt>EERS 절감량</dt><dd>10,000,000 kWh/년</dd></div><div><dt>에너지 절감량</dt><dd>10,000,000 kWh/년</dd></div></dl></div><div class="goal-chart"><b>목표 대비 실적</b><div class="chart-area">'+
      [['연간 사업비',57],['매출',57],['EERS 절감량',17],['에너지 절감량',17]].map(function(item){return '<div class="bar-item"><div class="bars" role="img" aria-label="'+item[0]+' 목표 대비 실적 '+item[1]+'퍼센트"><i style="height:'+Math.max(28,item[1]*1.55)+'px"></i><em style="height:'+Math.max(8,item[1])+'px"><strong>'+item[1]+'%</strong></em></div><span>'+item[0]+'</span></div>'}).join('')+
      '</div></div></div></section>'+
      '<section class="dash-block" data-motion-section="finance"><div class="dash-section-title"><b>투자/상환 현황</b></div><div class="finance-grid"><div class="finance-panel dash-panel"><h3>ESCO 계약</h3>'+financeRows('#fabe00')+'</div><div class="finance-panel dash-panel"><h3>EPC(용역) 계약</h3>'+financeRows('#5b9bd5')+'</div></div></section>';
    favoriteSection.insertAdjacentElement('afterend',dashboard);
    observeDashboardSections(dashboard);
  }
  function animateProjectCount(element){
    if(!element)return;
    var target=Number(element.dataset.count),started=performance.now(),duration=950,run=(element._countAnimationRun||0)+1;
    element._countAnimationRun=run;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){element.textContent=target;return}
    function tick(now){if(element._countAnimationRun!==run)return;var progress=Math.min((now-started)/duration,1),eased=1-Math.pow(1-progress,3);element.textContent=Math.round(target*eased);if(progress<1)requestAnimationFrame(tick)}
    requestAnimationFrame(tick);
  }
  function observeDashboardSections(dashboard){
    var sections=dashboard.querySelectorAll('[data-motion-section]');
    if(!('IntersectionObserver' in window)){Array.prototype.forEach.call(sections,function(section){section.classList.add('is-visible')});animateProjectCount(dashboard.querySelector('.project-count'));return}
    var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){
      var section=entry.target;
      if(entry.isIntersecting){
        section.classList.remove('is-visible');
        void section.offsetWidth;
        section.classList.add('is-visible');
        if(section.dataset.motionSection==='project'){var count=section.querySelector('.project-count');count.textContent='0';animateProjectCount(count)}
      }else if(entry.boundingClientRect.bottom<0||entry.boundingClientRect.top>window.innerHeight){section.classList.remove('is-visible')}
    })},{threshold:.18,rootMargin:'0px 0px -8% 0px'});
    Array.prototype.forEach.call(sections,function(section){observer.observe(section)});
  }
  function financeRows(color){return '<div class="finance-pair"><div class="finance-row"><span>매출(계획)</span><b>48,000,000,000원</b></div><div class="finance-row"><span>매출(실적)</span><b>48,000,000,000원</b></div><div class="progress" role="progressbar" aria-label="매출 계획 대비 실적 달성률" aria-valuemin="0" aria-valuemax="100" aria-valuenow="57" style="--progress-color:'+color+'"><i style="width:57%"></i><strong>57%</strong></div></div><div class="finance-row"><span>영업외 수익</span><b>48,000,000,000원</b></div><div class="finance-pair"><div class="finance-row"><span>상환(계획)</span><b>29,400,000,000원</b></div><div class="finance-row"><span>상환(실적)</span><b>29,400,000,000원</b></div><div class="progress" role="progressbar" aria-label="상환 계획 대비 실적 달성률" aria-valuemin="0" aria-valuemax="100" aria-valuenow="57" style="--progress-color:'+color+'"><i style="width:57%"></i><strong>57%</strong></div></div>'}
  renderCards(getFavorites());
  renderDashboardRework();
})();

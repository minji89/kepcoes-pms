"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  FileText,
  Headphones,
  LockKeyhole,
  Mail,
  Megaphone,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

type Modal = "apply" | "notice" | "find-id" | "find-password" | null;

const bids = [
  {
    category: "공사",
    title: "서초동 1601-9 오피스텔 신축공사 중 기계식주차설비공사",
    deadline: "2026.08.31 18:00",
    method: "경쟁입찰(일반)",
    selection: "제한적 최저가 입찰",
  },
  {
    category: "용역",
    title: "2026년 에너지효율화 사업 성과측정 및 검증 용역",
    deadline: "2026.09.04 17:00",
    method: "제한경쟁입찰",
    selection: "협상에 의한 계약",
  },
  {
    category: "물품",
    title: "고효율 LED 조명기기 연간 단가 구매",
    deadline: "2026.09.10 16:00",
    method: "경쟁입찰(일반)",
    selection: "최저가 입찰",
  },
];

const stepLabels = [
  ["STEP 01", "약관 및 개인정보 수집 동의"],
  ["STEP 02", "기본 정보 입력"],
  ["STEP 03", "담당자 정보 입력"],
  ["STEP 04", "신청 정보 확인 및 제출"],
  ["STEP 05", "협력업체 신청 완료"],
];

const Field = ({ label, children, required = true }: { label: string; children: React.ReactNode; required?: boolean }) => (
  <div className="form-row">
    <label>{label}{required && <em>*</em>}</label>
    <div className="form-control-group">{children}</div>
  </div>
);

export default function Home() {
  const [modal, setModal] = useState<Modal>(null);
  const [step, setStep] = useState(1);
  const [bidIndex, setBidIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [passwordResult, setPasswordResult] = useState<"success" | "error" | null>(null);

  const openApply = () => {
    setStep(1);
    setModal("apply");
  };

  const closeModal = () => {
    setModal(null);
    setPasswordResult(null);
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    alert("로그인 기능은 협력업체 승인 계정 연동 후 제공됩니다.");
  };

  const currentBid = bids[bidIndex];

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="켑코이에스 SRM 홈">
          <Image src="/images/kepco-es-logo.png" alt="켑코이에스 주식회사" width={158} height={40} priority />
        </a>
        <div className="system-name"><span>전자입찰시스템</span><b>SRM</b></div>
        <nav aria-label="유틸리티 메뉴">
          <button type="button" onClick={() => setModal("notice")}><FileText size={16} /> 입찰공고</button>
          <button type="button"><CircleHelp size={16} /> 이용안내</button>
          <span className="help-phone"><Headphones size={17} /> 02-6959-4561</span>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">KEPCO ES SUPPLIER RELATIONSHIP MANAGEMENT</p>
            <h1>투명한 입찰, 신뢰의 파트너십.<br /><strong>더 나은 에너지의 시작</strong>입니다.</h1>
            <p className="lead">켑코이에스는 한국전력공사와 6개 발전사가 함께 설립한<br />에너지 효율 향상 전문기업입니다.</p>

            <div className="bid-card">
              <div className="bid-head">
                <div><span>PUBLIC NOTICE</span><h2>진행 중인 입찰공고</h2></div>
                <button type="button" onClick={() => setModal("notice")}>전체보기 <ArrowRight size={15} /></button>
              </div>
              <div className="bid-body">
                <span className={`category category-${bidIndex}`}>{currentBid.category}</span>
                <button className="bid-title" type="button" onClick={() => setModal("notice")}>{currentBid.title}</button>
                <dl>
                  <div><dt>입찰 마감 일시</dt><dd>{currentBid.deadline}</dd></div>
                  <div><dt>계약 방법</dt><dd>{currentBid.method}</dd></div>
                  <div><dt>낙찰자 선정 방법</dt><dd>{currentBid.selection}</dd></div>
                </dl>
              </div>
              <div className="bid-nav">
                <button type="button" aria-label="이전 공고" onClick={() => setBidIndex((current) => (current + bids.length - 1) % bids.length)}><ChevronLeft /></button>
                <div>{bids.map((_, index) => <button key={index} className={index === bidIndex ? "active" : ""} aria-label={`${index + 1}번 공고`} onClick={() => setBidIndex(index)} />)}</div>
                <button type="button" aria-label="다음 공고" onClick={() => setBidIndex((current) => (current + 1) % bids.length)}><ChevronRight /></button>
              </div>
            </div>
          </div>

          <section className="login-card" aria-labelledby="login-title">
            <div className="login-icon"><ShieldCheck /></div>
            <p className="card-kicker">PARTNER LOGIN</p>
            <h2 id="login-title">전자입찰시스템 <b>SRM</b></h2>
            <p>사용자 계정으로 로그인해 업무를 시작하세요.</p>
            <form onSubmit={handleLogin}>
              <label><span>아이디</span><div className="input-wrap"><UserRound /><input required placeholder="사업자등록번호를 입력해 주세요" inputMode="numeric" /></div></label>
              <label><span>비밀번호</span><div className="input-wrap"><LockKeyhole /><input required type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력해 주세요" /><button type="button" aria-label="비밀번호 표시" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>
              <label className="remember"><input type="checkbox" /> <span>아이디 저장</span></label>
              <button className="login-button" type="submit">로그인 <ArrowRight size={18} /></button>
            </form>
            <div className="login-links">
              <button type="button" onClick={() => setModal("find-id")}>아이디 찾기</button>
              <i />
              <button type="button" onClick={() => setModal("find-password")}>비밀번호 찾기</button>
            </div>
            <div className="contact-box"><Headphones /><div><span>로그인 문의 (운영담당)</span><b>홍길동 과장 · 02-6959-4561</b><small>simon@kepcoes.co.kr</small></div></div>
            <div className="apply-actions">
              <button className="apply" type="button" onClick={openApply}>협력업체 신청 <ArrowRight /></button>
              <button className="manual" type="button"><FileText /> 협력업체 신청 매뉴얼</button>
            </div>
          </section>
        </div>
      </section>

      <section className="feature-strip">
        <article><span>01</span><ShieldCheck /><div><b>공정하고 투명한 입찰</b><p>모든 입찰 과정을 한눈에 확인할 수 있습니다.</p></div></article>
        <article><span>02</span><Building2 /><div><b>파트너와 함께하는 성장</b><p>검증된 협력업체와 지속 가능한 가치를 만듭니다.</p></div></article>
        <article><span>03</span><FileText /><div><b>편리한 전자계약</b><p>공고부터 계약까지 온라인으로 안전하게 진행합니다.</p></div></article>
      </section>

      <footer>
        <div className="footer-brand">KEPCO <b>ES</b><span>전자입찰시스템 SRM</span></div>
        <div><p>서울특별시 송파구 중대로 113 전기회관 8층 · 대표전화 02-6959-4500</p><p>Copyright © KEPCO Energy Solution Co., Ltd. All rights reserved.</p></div>
        <div className="footer-links"><a href="#">개인정보처리방침</a><a href="#">이용약관</a></div>
      </footer>

      {modal === "notice" && <NoticeModal onClose={closeModal} bid={currentBid} />}
      {modal === "find-id" && <SimpleModal title="아이디 찾기" onClose={closeModal}><InfoBox title="본 입찰시스템의 아이디는 협력업체의 사업자등록번호입니다." text="사업자등록번호의 숫자만 입력해 주세요. 문의사항은 02-6959-4561로 연락 부탁드립니다." /><div className="modal-bottom"><button className="secondary" onClick={closeModal}>닫기</button></div></SimpleModal>}
      {modal === "find-password" && <PasswordModal result={passwordResult} setResult={setPasswordResult} onClose={closeModal} />}
      {modal === "apply" && <ApplyModal step={step} setStep={setStep} onClose={closeModal} agreedTerms={agreedTerms} setAgreedTerms={setAgreedTerms} agreedPrivacy={agreedPrivacy} setAgreedPrivacy={setAgreedPrivacy} />}
    </main>
  );
}

function ModalFrame({ title, onClose, wide = false, children }: { title: string; onClose: () => void; wide?: boolean; children: React.ReactNode }) {
  return <div className="overlay" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className={`modal ${wide ? "wide" : ""}`}><header><div><span>KEPCO ES · SRM</span><h2>{title}</h2></div><button type="button" aria-label="닫기" onClick={onClose}><X /></button></header>{children}</div></div>;
}

function SimpleModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <ModalFrame title={title} onClose={onClose}><div className="simple-content">{children}</div></ModalFrame>;
}

function InfoBox({ title, text }: { title: string; text: string }) {
  return <div className="info-box"><div><Megaphone /></div><p><b>{title}</b><span>{text}</span></p></div>;
}

function NoticeModal({ onClose, bid }: { onClose: () => void; bid: typeof bids[number] }) {
  return <ModalFrame title="입찰공고 내역서" onClose={onClose} wide><div className="notice-content"><div className="notice-title"><span className="category">{bid.category}</span><div><p>공고번호 KEPCOES-2026-0821</p><h3>{bid.title}</h3></div></div><div className="notice-summary"><div><span>입찰 진행사</span><b>켑코이에스 주식회사</b></div><div><span>입찰 진행 방법</span><b>{bid.method}</b></div><div><span>보증금률</span><b>입찰금액의 5%</b></div><div><span>입찰 마감</span><b>{bid.deadline}</b></div></div><section className="notice-section"><h4>입찰 일정 계획</h4><div className="timeline"><div className="done"><i><Check /></i><b>공고 게시</b><span>2026.08.21</span></div><div className="active"><i>2</i><b>입찰서 접수</b><span>진행 중</span></div><div><i>3</i><b>개찰 및 평가</b><span>2026.09.01</span></div><div><i>4</i><b>낙찰자 선정</b><span>2026.09.03</span></div></div></section><section className="notice-section"><h4>입찰업체 전달내역</h4><table><tbody><tr><th>공사 장소</th><td>서울특별시 서초구 서초동 1601-9</td></tr><tr><th>계약 기간</th><td>계약일로부터 12개월</td></tr><tr><th>담당 부서</th><td>사업개발실 · 02-6959-4561</td></tr></tbody></table></section><section className="notice-section"><h4>입찰 품목</h4><table><thead><tr><th>품목</th><th>규격</th><th>수량</th><th>단위</th></tr></thead><tbody><tr><td>기계식 주차설비</td><td>설계도서 및 시방서 참조</td><td>1</td><td>식</td></tr></tbody></table></section><div className="modal-bottom"><button className="secondary" onClick={onClose}>닫기</button></div></div></ModalFrame>;
}

function PasswordModal({ result, setResult, onClose }: { result: "success" | "error" | null; setResult: (value: "success" | "error" | null) => void; onClose: () => void }) {
  if (result) return <SimpleModal title={result === "success" ? "비밀번호 찾기" : "정보 불일치 안내"} onClose={onClose}><InfoBox title={result === "success" ? "담당자의 이메일(leeh**43@n*ver.com)로 임시 비밀번호가 전송되었습니다." : "입력하신 정보가 일치하지 않습니다."} text={result === "success" ? "임시 비밀번호로 로그인 후 반드시 비밀번호를 변경해 주세요." : "정보가 확인되지 않은 경우 임시 비밀번호를 발송할 수 없습니다. 문의사항은 02-6959-4561로 연락 부탁드립니다."} /><div className="modal-bottom"><button className="secondary" onClick={onClose}>닫기</button></div></SimpleModal>;
  return <SimpleModal title="비밀번호 찾기" onClose={onClose}><InfoBox title="협력업체 신청 시 등록한 담당자 정보 확인이 필요합니다." text="정보가 확인되면 담당자의 이메일로 임시 비밀번호가 발송됩니다." /><form className="find-form" onSubmit={(e) => { e.preventDefault(); setResult("success"); }}><Field label="사업자등록번호(아이디)"><input required inputMode="numeric" placeholder="숫자로만 입력해 주세요" /></Field><Field label="담당자 이메일"><div className="email-fields"><input required aria-label="이메일 아이디" /><span>@</span><select aria-label="이메일 도메인"><option>naver.com</option><option>google.com</option><option>hanmail.net</option><option>직접 입력</option></select></div></Field><Field label="담당자 휴대폰 번호"><div className="phone-fields"><select><option>010</option></select><span>-</span><input required maxLength={4} /><span>-</span><input required maxLength={4} /></div></Field><div className="modal-bottom"><button className="primary" type="submit">비밀번호 찾기</button><button className="secondary" type="button" onClick={onClose}>닫기</button></div></form></SimpleModal>;
}

function ApplyModal({ step, setStep, onClose, agreedTerms, setAgreedTerms, agreedPrivacy, setAgreedPrivacy }: { step: number; setStep: (step: number) => void; onClose: () => void; agreedTerms: boolean; setAgreedTerms: (value: boolean) => void; agreedPrivacy: boolean; setAgreedPrivacy: (value: boolean) => void }) {
  const canContinue = step !== 1 || (agreedTerms && agreedPrivacy);
  return <ModalFrame title="협력업체 신청" onClose={onClose} wide><div className="apply-content"><InfoBox title="켑코이에스의 발주 사업에 참여하기 위해서는 협력업체로 등록해야 합니다." text="아래 단계에 따라 정보를 입력해 주세요. 관리자 승인까지 영업일 기준 약 3일이 소요됩니다." /><div className="steps">{stepLabels.map(([number, label], index) => <div key={number} className={`${step === index + 1 ? "active" : ""} ${step > index + 1 ? "done" : ""}`}><span>{step > index + 1 ? <Check size={15} /> : number}</span><b>{label}</b></div>)}</div>{step === 1 && <div className="step-panel"><h3>약관 및 개인정보 수집 동의</h3><Agreement title="SRM 이용약관" checked={agreedTerms} onChange={setAgreedTerms}>제1조 목적<br />본 약관은 켑코이에스 전자입찰시스템이 제공하는 전자입찰 서비스의 이용조건 및 절차를 규정합니다.<br /><br />이용자는 공고 내용과 입찰 유의사항을 충분히 확인한 후 입찰에 참여해야 하며, 제출한 정보에 대한 책임을 부담합니다.</Agreement><Agreement title="개인정보 수집 및 이용" checked={agreedPrivacy} onChange={setAgreedPrivacy}>수집 항목: 회사명, 사업자등록번호, 대표자명, 주소, 담당자 이름, 연락처 및 이메일<br />이용 목적: 협력업체 등록 심사, 입찰·계약 업무 진행 및 결과 안내<br />보유 기간: 관계 법령 및 내부 규정에 따른 보유기간까지</Agreement></div>}{step === 2 && <div className="step-panel"><h3>기본 정보 입력</h3><div className="form-table"><Field label="사업자등록번호"><div className="inline"><input required placeholder="숫자로만 입력해 주세요" /><button type="button">중복 확인</button></div></Field><Field label="비밀번호"><input required type="password" placeholder="영문/숫자/특수기호 조합 8~20자" /></Field><Field label="비밀번호 확인"><input required type="password" placeholder="입력하신 비밀번호를 확인해 주세요" /></Field><Field label="회사명"><input required placeholder="예) 켑코이에스" /></Field><Field label="대표자명"><input required placeholder="예) 홍길동" /></Field><Field label="전화번호"><div className="phone-fields"><select><option>02</option><option>031</option><option>070</option></select><span>-</span><input /><span>-</span><input /></div></Field><Field label="업종"><input placeholder="예) 전자, 통신" /></Field><Field label="업태"><input placeholder="예) 전자부품, 소프트웨어" /></Field><Field label="주소"><div className="address-fields"><input placeholder="우편번호" /><button type="button">주소 검색</button><input className="wide-input" readOnly placeholder="기본 주소는 검색 후 자동 입력됩니다" /><input className="wide-input" placeholder="상세 주소를 입력해 주세요" /></div></Field></div><h3 className="subheading">관련 증빙서류 제출</h3><div className="upload-grid">{["사업자등록증", "법인인감증명서", "면허증", "신용평가등급 확인서"].map((label) => <label key={label}><span>{label}<em>*</em></span><input type="file" /><i><FileText /> 파일을 선택해 주세요</i></label>)}</div></div>}{step === 3 && <div className="step-panel"><h3>담당자 정보 입력</h3><div className="form-table"><Field label="이름"><input placeholder="예) 홍길동" /></Field><Field label="이메일"><div className="email-fields"><input /><span>@</span><select><option>이메일 선택</option><option>naver.com</option><option>google.com</option><option>직접 입력</option></select></div></Field><Field label="휴대폰 번호"><div className="phone-fields"><select><option>010</option></select><span>-</span><input /><span>-</span><input /></div></Field><Field label="직책"><input placeholder="예) 이사, 대리" /></Field><Field label="담당 업무"><input placeholder="예) 영업, 기획" /></Field><Field label="전화번호"><div className="phone-fields"><select><option>02</option><option>010</option></select><span>-</span><input /><span>-</span><input /></div></Field></div></div>}{step === 4 && <div className="step-panel"><h3>신청 정보 확인 및 제출</h3><section className="review-section"><h4>기본 정보</h4><dl><div><dt>사업자등록번호</dt><dd>135-82-77202</dd></div><div><dt>회사명</dt><dd>㈜큐비트엑스</dd></div><div><dt>대표자명</dt><dd>이홍대, 윤지병</dd></div><div><dt>전화번호</dt><dd>02-833-1650</dd></div><div><dt>업종 / 업태</dt><dd>IT인프라 / 소프트웨어 개발</dd></div><div><dt>주소</dt><dd>(12654) 경기도 고양시 일산서구 강선로 118</dd></div></dl></section><section className="review-section"><h4>담당자 정보</h4><dl><div><dt>이름</dt><dd>이희성</dd></div><div><dt>이메일</dt><dd>leehee43@naver.com</dd></div><div><dt>휴대폰 번호</dt><dd>010-6844-2810</dd></div><div><dt>직책 / 담당 업무</dt><dd>부장 / PM 및 기획</dd></div></dl></section><p className="review-note">입력하신 내용을 확인해 주세요. 최종 제출 후에는 관리자 검토가 시작됩니다.</p></div>}{step === 5 && <div className="complete-panel"><div className="complete-icon"><Check /></div><p>APPLICATION COMPLETE</p><h3>협력업체 신청이 완료되었습니다.</h3><span>입력하신 협력업체 정보와 제출 서류가 정상적으로 등록되었습니다.<br />담당자 검토 결과는 이메일 또는 SMS로 안내됩니다.</span></div>}<div className="wizard-actions">{step > 1 && step < 5 && <button className="secondary" onClick={() => setStep(step - 1)}><ArrowLeft /> 이전 단계</button>}<div />{step < 4 && <button className="primary" disabled={!canContinue} onClick={() => canContinue && setStep(step + 1)}>다음 단계 <ArrowRight /></button>}{step === 4 && <button className="primary" onClick={() => setStep(5)}>최종 제출 <Check /></button>}{step === 5 && <button className="primary" onClick={onClose}>신청 완료(닫기)</button>}</div></div></ModalFrame>;
}

function Agreement({ title, checked, onChange, children }: { title: string; checked: boolean; onChange: (value: boolean) => void; children: React.ReactNode }) {
  return <section className="agreement"><h4>{title}</h4><div>{children}</div><label><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} /><span>{title} 내용을 읽어 보았으며 동의합니다.</span><em>*</em></label></section>;
}

/**
 * THIS-IS-NOT-PART-OF-CTF-PLEASE-IGNORE.js
 *
 * When this script is loaded it creates a large, prominent fullscreen modal
 * only for CTF / educational purposes.
 *
 * Safe: no network calls, no data collection, only DOM/CSS manipulation.
 */

(function createCTFDisclaimer() {
  // Prevent double-insertion
  if (document.getElementById('ctf-disclaimer-overlay')) return;

  // Styles
  const css = `
    #ctf-disclaimer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2147483647; /* extremely high to be visible above everything */
      -webkit-font-smoothing:antialiased;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }
    #ctf-disclaimer-box {
      max-width: 1100px;
      width: calc(100% - 48px);
      margin: 16px;
      background: #111;
      color: #fff;
      border-radius: 14px;
      padding: 34px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      border: 6px solid rgba(255, 0, 0, 0.85);
      text-align: center;
    }
    #ctf-disclaimer-title {
      font-size: 42px;
      line-height: 1.05;
      margin: 0 0 12px 0;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #ffdddd;
      text-transform: uppercase;
    }
    #ctf-disclaimer-subtitle {
      font-size: 18px;
      margin: 0 0 20px 0;
      color: #ffdede;
    }
    #ctf-disclaimer-body {
      font-size: 16px;
      margin: 0 0 22px 0;
      color: #e7e7e7;
      line-height: 1.5;
    }
    #ctf-disclaimer-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .ctf-disclaimer-btn {
      appearance: none;
      -webkit-appearance: none;
      border: 0;
      padding: 12px 18px;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
      min-width: 160px;
    }
    .ctf-disclaimer-btn.close {
      background: #1f1f1f;
      color: #fff;
      box-shadow: inset 0 -2px 0 rgba(0,0,0,0.4);
      border: 2px solid rgba(255,255,255,0.06);
    }
    .ctf-disclaimer-btn.ack {
      background: linear-gradient(90deg, #ff4d4d, #ff7a7a);
      color: #120100;
      border: 2px solid rgba(255,0,0,0.15);
    }
    #ctf-disclaimer-footer {
      margin-top: 18px;
      font-size: 13px;
      color: #bfbfbf;
    }

    /* small screens */
    @media (max-width: 520px) {
      #ctf-disclaimer-title { font-size: 28px; }
      #ctf-disclaimer-box { padding: 22px; border-radius: 10px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-generated-by', 'ctf-disclaimer.js');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const overlay = document.createElement('div');
  overlay.id = 'ctf-disclaimer-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'ctf-disclaimer-title');
  overlay.setAttribute('aria-describedby', 'ctf-disclaimer-body');

  const box = document.createElement('div');
  box.id = 'ctf-disclaimer-box';

  box.innerHTML = `
    <h1 id="ctf-disclaimer-title">This is a Fake Attacker Site</h1>
    <div id="ctf-disclaimer-subtitle">Simulation — FOR CTF / EDUCATIONAL PURPOSES ONLY</div>
    <p id="ctf-disclaimer-body">
      This page is intentionally crafted as a simulated "attacker" page for Capture The Flag (CTF)
      challenges and security training. It is <strong>non-functional</strong> and must not be used
      for real-world malicious activity. All content is provided for learning and analysis only.
    </p>
    <div id="ctf-disclaimer-actions">
      <button class="ctf-disclaimer-btn close" id="ctf-disclaimer-close">Close (I understand)</button>
      <button class="ctf-disclaimer-btn ack" id="ctf-disclaimer-learn">Why this exists</button>
    </div>
    <div id="ctf-disclaimer-footer">
      If you found this accidentally, do not interact with any simulated input fields and report the URL
      to the repository owner. Use only in isolated/testing environments.
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  const closeBtn = document.getElementById('ctf-disclaimer-close');
  const learnBtn = document.getElementById('ctf-disclaimer-learn');

  function closeOverlay() {
    const e = document.getElementById('ctf-disclaimer-overlay');
    const s = document.querySelector('style[data-generated-by="ctf-disclaimer.js"]');
    if (e) e.remove();
    if (s) s.remove();
  }

  function showExplanation() {
    const existing = document.getElementById('ctf-disclaimer-explain');
    if (existing) return;
    const explain = document.createElement('div');
    explain.id = 'ctf-disclaimer-explain';
    explain.style.marginTop = '18px';
    explain.style.fontSize = '14px';
    explain.style.color = '#dfdfdf';
    explain.innerHTML = `
      <strong>Purpose:</strong> To provide a safe, visible example for reversing and analyzing
      common phishing techniques in a controlled CTF environment. This page does <em>not</em>
      collect or transmit real data. <em>Do not reuse</em> these patterns on real targets.
    `;
    box.appendChild(explain);
    closeBtn.focus();
  }

  closeBtn.addEventListener('click', closeOverlay, { once: true });
  learnBtn.addEventListener('click', showExplanation);

  function onKey(e) {
    if (e.key === 'Escape') closeOverlay();
  }
  document.addEventListener('keydown', onKey, { once: true });

  const previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  const observer = new MutationObserver(() => {
    if (!document.getElementById('ctf-disclaimer-overlay')) {
      document.documentElement.style.overflow = previousOverflow || '';
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true });

  closeBtn.focus();
})();

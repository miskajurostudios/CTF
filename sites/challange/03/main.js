document.addEventListener("DOMContentLoaded", function () {
  const pwInput = document.getElementById("pw");
  const submit = document.getElementById("submit");
  const result = document.getElementById("result");

  function showMessage(html, ok = true) {
    result.innerHTML = html;
    result.style.borderColor = ok ? "#d1fae5" : "#fde2e2";
    result.style.background = ok ? "#f7fffb" : "#fff7f7";
  }

  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const pw = pwInput.value || "";
    try {
      if (!window.MiskaAuth || typeof window.MiskaAuth.verifyPassword !== "function") {
        showMessage("<strong>Error:</strong> auth module not loaded.", false);
        return;
      }
      const res = window.MiskaAuth.verifyPassword(pw);
      if (res && res.ok) {
        showMessage(`<strong>Access granted.</strong><br><code>${escapeHtml(res.flag)}</code>`, true);
      } else {
        showMessage("<strong>Access denied.</strong> Wrong Password.", false);
      }
    } catch (err) {
      showMessage("<strong>Exception:</strong> " + String(err), false);
    }
  });

  pwInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") submit.click();
  });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
});

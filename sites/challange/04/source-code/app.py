
# ======================================
#______ _____  ___ ______  ___  ___ _____ 
#| ___ \  ___|/ _ \|  _  \ |  \/  ||  ___|
#| |_/ / |__ / /_\ \ | | | | .  . || |__  
#|    /|  __||  _  | | | | | |\/| ||  __| 
#| |\ \| |___| | | | |/ /  | |  | || |___ 
#\_| \_\____/\_| |_/___/   \_|  |_/\____/ 
#
# This challange is supposed to be solved as
# blackbox. NO looking at the sourcode! (i guess?)
# ======================================









































from flask import Flask, request, make_response, render_template_string, jsonify
from cryptography.fernet import Fernet
import json
import sys
import subprocess

app = Flask(__name__)

host_ip = "0.0.0.0"
host_port = "5000"

ACCOUNT_1_USER = "Administrator"
ACCOUNT_1_PASS = "not_strong_password"
ACCOUNT_2_USER = "Johny"
ACCOUNT_2_PASS = "P4SSW0RD"

_logins_dict = {
    ACCOUNT_1_USER: ACCOUNT_1_PASS,
    ACCOUNT_2_USER: ACCOUNT_2_PASS
}
users_json_str = json.dumps(_logins_dict, indent=2)

PLAIN_FLAG = b"MJS_Flag{N3tw0r-kT4B..-FL4G:)}"
fernet_key = Fernet.generate_key()
fernet = Fernet(fernet_key)
encrypted_flag = fernet.encrypt(PLAIN_FLAG)


print(f"\n\n\nWEBSERVER IS GOING TO RUN ON http://{host_ip}:{host_port}/\n\n")

HOME_HTML = """
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Login Page | www.MiskaSec.mjs</title>
  <style>
    #hidden { display: none; }
    button {
      width: 210px;
    }
  </style>
</head>
<body>
  <h2>Login</h2>
  <form id="loginForm">
    <label>user: <input id="user" name="user"></label><br>
    <label>pass: <input id="pass" name="pass" type="password"></label><br>
    <button type="submit">Login</button>
  </form>

  <div id="result" style="margin-top:16px"></div>
  <pre id="hidden"></pre>

<script>
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('user').value || "";
  const pass = document.getElementById('pass').value || "";

  fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: user, pass: pass})
  })
  .then(resp => resp.json().then(body => ({status: resp.status, body: body})))
  .then(obj => {
    const div = document.getElementById('result');
    if (obj.status === 200 && obj.body.ok) {
      div.innerHTML = "<b>Authenticated:</b> " + (obj.body.flag || "(no flag)");
    } else {
      div.innerHTML = "<b>🚨 Authentication Failed! 🚨</b>";
    }
  })
  .catch(err => {
    document.getElementById('result').innerText = 'Error while calling /api/login: ' + err;
  });

  fetch('/users.json', { method: 'GET', credentials: 'same-origin' })
    .then(r => r.text())
    .then(txt => {
      document.getElementById('hidden').innerText = txt;
      console.log('Not here! But close enough.');
    })
    .catch(e => {
      console.warn('background fetch failed', e);
    });

});
</script>
</body>
</html>
"""

@app.route("/", methods=["GET"])
def home():
    return render_template_string(HOME_HTML)

@app.route("/users.json", methods=["GET"])
def users_json():
    resp = make_response(users_json_str)
    resp.headers["Content-Type"] = "application/json"
    return resp

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json(force=True, silent=True) or {}
    username = data.get("user", "")
    password = data.get("pass", "")

    valid = False
    if username == ACCOUNT_1_USER and password == ACCOUNT_1_PASS:
        valid = True
    if username == ACCOUNT_2_USER and password == ACCOUNT_2_PASS:
        valid = True

    if valid:
        try:
            flag_plain = fernet.decrypt(encrypted_flag).decode('utf-8')
        except Exception:
            flag_plain = "<error decrypting flag>"
        return jsonify({
            "ok": True,
            "message": "Authenticated",
            "flag": flag_plain
        })
    else:
        return jsonify({
            "ok": False,
            "message": "Bad credentials"
        }), 401

if __name__ == "__main__":
    app.run(host=host_ip, port=host_port, debug=False)

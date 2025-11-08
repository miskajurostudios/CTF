(function (global) {
  "use strict";

  function _0x288a(){const _0x242c2b=['167759aOPLKC','9869490VmorBJ','6458830OyPgOY','26883880wOELdk','44XpKMbw','aHR0cHM6Ly9taXNrYWp1cm9zdHVkaW9zLmdpdGh1Yi5pby9DVEYvc2l0ZXMvRnVuY3Rpb25hbGl0eS9BZG1pbl9TdXBlcl9TZWNyZXQudHh0','3324wfEYLY','2746296ptPjAp','217011ToWPeb','2laDusn','9290PKQOLZ'];_0x288a=function(){return _0x242c2b;};return _0x288a();}const _0x255d43=_0x12c5;function _0x12c5(_0x298e62,_0x552d6f){const _0x288a2c=_0x288a();return _0x12c5=function(_0x12c5a1,_0x218547){_0x12c5a1=_0x12c5a1-0x192;let _0x2ed795=_0x288a2c[_0x12c5a1];return _0x2ed795;},_0x12c5(_0x298e62,_0x552d6f);}(function(_0x50e90d,_0x44bc63){const _0x536ae9=_0x12c5,_0x2cec8e=_0x50e90d();while(!![]){try{const _0x16eacc=-parseInt(_0x536ae9(0x19b))/0x1*(-parseInt(_0x536ae9(0x199))/0x2)+-parseInt(_0x536ae9(0x198))/0x3*(parseInt(_0x536ae9(0x194))/0x4)+parseInt(_0x536ae9(0x19a))/0x5*(parseInt(_0x536ae9(0x196))/0x6)+-parseInt(_0x536ae9(0x192))/0x7+-parseInt(_0x536ae9(0x197))/0x8+-parseInt(_0x536ae9(0x19c))/0x9+parseInt(_0x536ae9(0x193))/0xa;if(_0x16eacc===_0x44bc63)break;else _0x2cec8e['push'](_0x2cec8e['shift']());}catch(_0x301ce9){_0x2cec8e['push'](_0x2cec8e['shift']());}}}(_0x288a,0xb1891));const __FLAG=atob(_0x255d43(0x195));
  const __SECRET = "admin123_secret";

  function verifyPassword(password) {
    if (typeof password !== "string") return { ok: false };
    if (password === __SECRET) {
      return { ok: true, flag: __FLAG };
    }
    return { ok: false };
  }

  global.MiskaAuth = {
    verifyPassword
  };
})(window);
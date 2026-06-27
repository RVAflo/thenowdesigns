/* The Now Designs — shared behaviour (nav, mobile menu, scroll reveal, year) */
(function(){
  var nav = document.getElementById('nav');
  if (nav) {
    addEventListener('scroll', function(){ nav.classList.toggle('scrolled', scrollY > 30); });
  }
  var t = document.getElementById('toggle'), l = document.getElementById('navlinks');
  if (t && l) {
    t.addEventListener('click', function(){ t.classList.toggle('open'); l.classList.toggle('open'); });
    l.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ t.classList.remove('open'); l.classList.remove('open'); });
    });
  }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .14 });
  document.querySelectorAll('[data-reveal]').forEach(function(el){ io.observe(el); });
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // contact form -> Web3Forms (AJAX, inline status)
  var form = document.getElementById('tnd-form');
  if (form) {
    var status = document.getElementById('tnd-form-status');
    var btn = document.getElementById('tnd-submit');
    var label = btn ? btn.querySelector('.btn__label') : null;
    var defaultLabel = label ? label.textContent : 'Send it';
    var sending = false;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (sending) return;                       // guard against double-submit
      sending = true;
      if (btn) btn.disabled = true;
      if (label) label.textContent = 'Sending…';
      if (status) { status.textContent = ''; status.className = 'form-status'; }
      var done = function(msg, cls){
        sending = false;
        if (btn) btn.disabled = false;
        if (label) label.textContent = defaultLabel;
        if (status) { status.textContent = msg; status.className = 'form-status ' + cls; }
      };
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
      .then(function(r){ return r.json(); })
      .then(function(j){
        if (j.success) {
          form.reset();
          done("Thanks — we'll reply today 🍒", 'ok');
        } else {
          done('Hmm, that didn’t send. Email us at aiden@thenowdesigns.com', 'err');
        }
      })
      .catch(function(){
        done('Network error. Email us at aiden@thenowdesigns.com', 'err');
      });
    });
  }

  // cookie consent banner (shows once, choice stored locally)
  try {
    if (!localStorage.getItem('tnd-cookie-choice')) {
      var b = document.createElement('div');
      b.className = 'cookie-banner';
      b.innerHTML = '<p>We use only essential cookies to make this site work, plus minimal third-party services (checkout &amp; fonts). See our <a href="/cookies/">Cookie Policy</a>.</p><div class="cookie-actions"><button class="decline" type="button">Decline</button><button class="accept" type="button">Accept</button></div>';
      document.body.appendChild(b);
      requestAnimationFrame(function(){ b.classList.add('show'); });
      var close = function(choice){ try { localStorage.setItem('tnd-cookie-choice', choice); } catch(e){} b.classList.remove('show'); setTimeout(function(){ b.remove(); }, 500); };
      b.querySelector('.accept').addEventListener('click', function(){ close('accepted'); });
      b.querySelector('.decline').addEventListener('click', function(){ close('declined'); });
    }
  } catch(e){}
})();

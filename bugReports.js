const y = document.getElementById('bugReport');
if (y) {
  y.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') {
      const m = y.value.trim();
      if (!m) return;

      const payload = {
        message: m,
        browser: navigator.userAgent,
        time: new Date().toLocaleString(),
        version: document.getElementById('versionLabel')?.textContent || 'Unknown'
      };

      fetch('https://backend-website-h19f.onrender.com', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(() => {
        alert("Bug report sent! Thank you 🙂");
        y.value = '';
      })
      .catch(err => {
        console.error("Failed:", err);
        alert("Failed to send bug report. Check console.");
      });
    }
  });
}

const bugInput = document.getElementById('bugReport');

if (bugInput) {
  bugInput.addEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      const message = bugInput.value.trim();
      if (!message) return;

      const payload = {
        message,
        browser: navigator.userAgent,
        platform: navigator.platform,
        time: new Date().toLocaleString(),
        version: document.getElementById('versionLabel')?.textContent || 'Unknown'
      };

      const confirmation = `
You are about to send this bug report:
-------------------------------
Message: ${payload.message}
Browser/Platform: ${payload.browser} / ${payload.platform}
Time: ${payload.time}
Version: ${payload.version}
-------------------------------
Proceed?
      `;

      if (!confirm(confirmation)) return;

      try {
        const res = await fetch('https://backend-website-h19f.onrender.com/report', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        alert("Bug report sent! Thank you.");
        bugInput.value = '';
      } catch (err) {
        console.error("Failed:", err);
        alert("Failed to send bug report. Check console.");
      }
    }
  });
}

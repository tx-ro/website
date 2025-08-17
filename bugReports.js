const bugInput = document.getElementById('bugReport');

if (bugInput) {
  bugInput.addEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      const message = bugInput.value.trim();
      if (!message) return;

      const browserInfo = navigator.userAgent;
      const platformInfo = navigator.platform;
      const version = document.getElementById('versionLabel')?.textContent || 'Unknown';
      const time = new Date().toLocaleString();

      // Show confirmation popup
      const confirmation = `
You are about to send this bug report:
-------------------------------
Message: ${message}
Browser: ${browserInfo}
Platform: ${platformInfo}
Time: ${time}
Version: ${version}
-------------------------------
Proceed? (It can sometimes take a few seconds to send, be patient.)
      `;
      if (!confirm(confirmation)) return;

      // Prepare payload for backend
      const payload = {
        message,
        browser: browserInfo,
        platform: platformInfo,
        time,
        version
      };

      try {
        const res = await fetch('https://backend-website-h19f.onrender.com/report', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        alert("Bug report sent! Thank you 🙂");
        bugInput.value = '';
      } catch (err) {
        console.error("Failed:", err);
        alert("Failed to send bug report. Check console.");
      }
    }
  });
}

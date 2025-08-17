const y = document.getElementById('bugReport');
if (y) {
  y.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') {
      const message = y.value.trim();
      if (!message) return;

      fetch('https://backend-website-h19f.onrender.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
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

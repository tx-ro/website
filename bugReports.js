// bugReport.js
const a = [
  "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQw",
  "NjcwNDQ4NTk0MTkwMzM4MC9Pdm1IOU1hUEktVVpIMU5vQ2po",
  "WjkxaEhRWkZaSlpYejNGTENLRnJSdVFyaEVCU3p3amN5Sm4x",
  "NFRrc2I2czZ0QVFRVTIzU2k="
];

function b(c){return c.map(d=>atob(d)).join('');}

const x = b(a);

const y = document.getElementById('bugReport');
if(y){
  y.addEventListener('keydown',e=>{
    if(e.ctrlKey && e.key==='Enter'){
      const m=y.value.trim();
      if(!m) return;

      const p={
        content:`**Bug Report**\n${m}\n\n**Browser:** ${navigator.userAgent}\n**Time:** ${new Date().toLocaleString()}\n**Version:** ${document.getElementById('versionLabel')?.textContent||'Unknown'}`
      };

      fetch(x,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(p)
      })
      .then(()=>{alert("Bug report sent! Thank you 🙂");y.value='';})
      .catch(err=>{console.error("Failed:",err);alert("Failed to send bug report. Check console.");});
    }
  });
}

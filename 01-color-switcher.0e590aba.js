const t=document.getElementById("start"),e=document.getElementById("stop");let r=null;e.disabled=!0;const d=document.querySelector("body");t.addEventListener("click",(t=>{r=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.target.setAttribute("disabled",!0),t.target.nextElementSibling.removeAttribute("disabled")})),e.addEventListener("click",(t=>{clearInterval(r),t.target.setAttribute("disabled",!0),t.target.previousElementSibling.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.0e590aba.js.map
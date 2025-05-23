(function() {
  const currentScript = document.currentScript;
  window.addEventListener(
    "load",
    function() {
      const id = `s${Date.now()}`;
      const el = document.body.appendChild(document.createElement("div"));
      el.id = id;
      el.style.position = "fixed";

      el.className = "Screensaver";
      el.innerHTML = `<div><div>${(currentScript &&
        currentScript.getAttribute("message")) ||
        window.location.hostname}</div></div>`;

      const width = el.offsetWidth;
      const height = el.offsetHeight;

      const style = document.body.appendChild(document.createElement("style"));

      style.textContent = `
#${id} {
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: 100000;
  color: #3b332c;
  /*background-color: #221911;*/
  background:url('/images/leather2.png');
  background-color: #0f0604;
  font-size: 72px;
  font-weight:800;
  -webkit-text-stroke: 1px #76706b;
  text-shadow: 0px 1px 1px #76706b;
}
#${id} div {
  width: ${width}px;
  height: ${height}px;
  line-height: 1;
}
#${id} > div {
  animation: x${id} 13s linear infinite alternate;
}
#${id} > div > div {
  animation: y${id} 7s linear infinite alternate;
}
@keyframes x${id} {
  100% {
    transform: translateX(calc(95vw - ${width}px));
  }
}

@keyframes y${id} {
  100% {
    transform: translateY(calc(99vh - ${height}px));
  }
}
`;
      let timeoutId = null;
      let timeout =
        (currentScript && Number(currentScript.getAttribute("timeout"))) ||
        180000;

      function disable() {
        el.style.display = "none";
        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
          el.style.display = "block";
        }, timeout);
      }
      disable();
      document.addEventListener("mousemove", disable);
      document.addEventListener("keydown", disable);
      document.addEventListener("scroll", disable);
    },
    { once: true }
  );
})();

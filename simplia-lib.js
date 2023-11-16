var myWorker;
function embedScript(data, type, url) {
  let script = self.document.createElement('script');
  let head = self.document.getElementsByTagName('script')[0];
  script.type = type;
  script.text = data;
  head.parentNode.insertBefore(script, head);
  if (url == '/DeviceManager/sw/app.js') {
    DeviceManager.DeviceAppWidgets.setOptions({
      widgetId: "_FFFFFFFFFFFFFF000055555555555555_",
      targetId: "DeviceManagerRoot",
      showDescription: true
    });
    DeviceManager.DeviceAppWidgets.render();
    myWorker.postMessage({ url: '/public/as/_FFFFFFFFFFFFFF00001618436548084142_/at/_FFFFFFFFFFFFFF00001618436548084142_/contact-button.js', type: 'text/javascript' });

  }
  if (url.includes('contact-button.js')) {
    renderRedButton()
  }
}

function activate(e) {
  if (window.widgetActivated) {
    return
  }
  var sty = document.createElement('link');
  sty.rel = 'stylesheet';
  sty.href = '/simplia/dist/css/all.css';
  document.head.append(sty)
  myWorker = new Worker('/CommunicationClient/Workers/commAppWorker.js');
  myWorker.postMessage({ url: '/DeviceManager/sw/app.js', type: 'text/javascript' });

  myWorker.onmessage = function (event) {
    if (event.data.script && event.data.type) {
      embedScript(event.data.script, event.data.type, event.data.url);
    }
  }
  window.widgetActivated = true;
  console.log('Activated', e.target)
}
window.addEventListener('touchstart', activate, { once: true })
window.addEventListener('mousemove', activate, { once: true })
window.addEventListener('mousedown', activate, { once: true })
window.addEventListener('wheel', activate, { once: true })
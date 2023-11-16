var CommApp = window.top.CommApp;
//const widgetId  = 'PAGEUS';
var ptalk = document.getElementById('pushtotalk');
ptalk.addEventListener('mousedown', pushToTalk);
ptalk.addEventListener('mouseup', pushToTalkUp);
var isPushHold = false;
var isPushFired = false;
var pushTimeOut;

function pushToTalk() {
  let win = window.top;
  isPushHold = true;
  pushTimeOut = setTimeout(() => {
    if (isPushHold && !isPushFired) {
      console.log("down");
      isPushFired = true;
      clearTimeout(pushTimeOut);
      $('#pushtotalk').css('color','red');
      let pttObj = {Action: "hold",mode:"PAGE"};
      CommApp.StartPageus(pttObj,()=>{});
    }
  }, 1000);
}

function pushToTalkUp() {
  clearTimeout(pushTimeOut);
  event.preventDefault();
  isPushHold = false;
  let win = window.top;
  if (isPushFired) {
    console.log("HOLD UP");
    $('#pushtotalk').css('color','#0072c5');
    let pttObj = {Action: "unhold",isSignedIn: isSignedInflag,mode:"PAGE"};
    CommApp.StartPageus(pttObj,()=>{});
  } else {
    let pttObj = {Action: "click",isSignedIn: isSignedInflag,mode:"PAGE"};
    CommApp.StartPageus(pttObj,()=>{});
  }

  if (window.top.$cookies.get("accessToken") == null) {
      //this.modalVisible = true;
       let mode = "PAGE";
      openSimpliaMessageForm({mode:mode});
      //this.$refs.msgModal.msgFocus();
    } else {
      //let win = window.top;
      //let pttObj = {Mode:"PAGE" ,isSignedIn: isSignedInflag};
      //CommApp.StartAnonymousChat(pttObj,()=>{});
    }
    isPushFired = false;
}

function PageusAction(event) {
  console.log('Got pageus Action:',event);
  let pttObj = {Action: event, isSignedIn: true};
  //{Action: "unhold", isSignedIn: true}
  $('#pageusIconId').show();
  if(event == "hold") {
    $('#pageusIconId').css('color','red');
  } else if(event == "unhold") {
    $('#pageusIconId').css('color','#0072c5');
  }
  CommApp.StartPageus(pttObj,()=>{});
}

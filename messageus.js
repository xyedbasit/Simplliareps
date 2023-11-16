var CommApp = window.top.CommApp;

function MessageAction(event) {
  console.log('Got message Action:',event);

  if(event == "STARTCHAT") {
    //openPlayerServerForm(null);
    //window.top.CommApp.mediaPlayer.callProgressStart('Video_IvrProgress');

    $('#messageIconId').show();
    //$('#messageIconId').css('color','red');
    if (window.top.$cookies.get("accessToken") == null) {
       let mode = "MESSAGE";
       let pttObj = {Mode:"MESSAGE" ,isSignedIn: isSignedInflag};
       CommApp.StartChat({},()=>{});
      openSimpliaMessageForm({mode:mode});
    } else {
      let win = window.top;
      let pttObj = {Mode:"MESSAGE" ,isSignedIn: isSignedInflag};
      CommApp.StartChat({},()=>{});
    }
  }
}

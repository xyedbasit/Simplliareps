    var CommApp = window.top.CommApp;
    var widgetId  = 'CALLUS';
    var clientId = window.top.LivingScript_0070.context.clientNodeId;

    if(window.top.CommApp) {
        var state = CommApp.registerWidget({
          widgetId : widgetId,
          clientId : clientId
        }, stateCallback);
    }

    function Action(event,toPE) {
      console.log("call us widget got data toPE",toPE);
      if(state == 'offHook') {
        $('#endcallIconId').show();
        $('#callIconId').hide();
        $('#reconnectId').hide();
        $('#reconnectLiveId').show();
      } else if(state == "onHook") {
        $('#endcallIconId').hide();
        $('#callIconId').show();
        $('#reconnectId').show();
        $('#reconnectLiveId').hide();
      }
      if(event == "STARTCALL") {
        $('#endcallIconId').show();
        $('#callIconId').hide();
        $('#reconnectId').hide();
        $('#reconnectLiveId').show();
        CommApp.updateWidgetState({
          state : 'offHook',
          widgetId : widgetId,
          clientId : clientId
        });

        if(window.top.$cookies.get("accessToken") == null) {
           let mode = "CALL";
          let pttObj = {Mode:"CALL" ,isSignedIn: isSignedInflag};
          //CommApp.StartCall(pttObj,()=>{});
          openSimpliaMessageForm({mode:mode});
          let win = window.top;
          let CallPEOld = '11owner1_FFFFFFFFFFFFFF00001567790434071286_1owner1_FFFFFFFFFFFFFF00001586277513952706_';
          let CallPElastOld = "11agent1_FFFFFFFFFFFFFF00001609333769946188_1agent1_FFFFFFFFFFFFFF00001609333769946188_";
          let CallPE = "11holder1_FFFFFFFFFFFFFF00001684529560772577_1holder1_FFFFFFFFFFFFFF00001684529560772577_";
          if(toPE!="" && toPE!= undefined && toPE != "undefined") {
            CallPE = toPE;
            console.log("===inside toPE"+CallPE);
          } else {
            CallPE = "11holder1_FFFFFFFFFFFFFF00001684529560772577_1holder1_FFFFFFFFFFFFFF00001684529560772577_";
            console.log("===inside toPE default"+CallPE);
          }
          console.log("===inside toPE final"+CallPE);
        //  let InitialContext = {Caller:{Audio:true,NoShow:true,Screen:false,Video:false},Callee:{Audio:true,NoShow:true,Screen:false,Video:false},Calltype:"JOINCALL",Label:"MEETUS"};
          //let pttObj = {Mode:"CALL" ,ClientID:clientId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: isSignedInflag};
        //  CommApp2.StartCall(pttObj,()=>{});
        let InitialContext = {Caller:{Audio:true,NoShow:true,Screen:false,Video:false},Callee:{Audio:true,NoShow:true,Screen:false,Video:true},Calltype:"JOINCALL",Label:"Invite"};
        let callObj = {Mode:"STARTMEDIA" ,ClientID:clientId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: false};
        let inviteObj = {"to":{"tope":[],
                            "componentid":[],
                            "email":[],
                            "phone":[]},
                      "thread":'',
                      "subject":'',
                      "ClientID" : clientId,
                      "message":'',
                      "mode":"invite","callType":"MEETING","batchsize":'10',"dialerMode":"Meeting",Mode:"STARTMEDIA" ,"callMode":"CALLUS",ClientID:vclientId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: false};
                      (inviteObj.to.tope).push(CallPE);
                      window.BotServices.callManagerExec(inviteObj,()=>{});

        } else {
          let win = window.top;
          let CallPEOld = '11owner1_FFFFFFFFFFFFFF00001567790434071286_1owner1_FFFFFFFFFFFFFF00001586277513952706_';
          let CallPElastOld = "11agent1_FFFFFFFFFFFFFF00001609333769946188_1agent1_FFFFFFFFFFFFFF00001609333769946188_";
          let CallPE = "11holder1_FFFFFFFFFFFFFF00001684529560772577_1holder1_FFFFFFFFFFFFFF00001684529560772577_";
        //  let InitialContext = {Caller:{Audio:true,NoShow:true,Screen:false,Video:false},Callee:{Audio:true,NoShow:true,Screen:false,Video:false},Calltype:"JOINCALL",Label:"MEETUS"};
          //let pttObj = {Mode:"CALL" ,ClientID:clientId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: isSignedInflag};
        //  CommApp2.StartCall(pttObj,()=>{});
        let InitialContext = {Caller:{Audio:true,NoShow:true,Screen:false,Video:false},Callee:{Audio:true,NoShow:true,Screen:false,Video:true},Calltype:"JOINCALL",Label:"Invite"};
        let callObj = {Mode:"STARTMEDIA" ,ClientID:clientId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: false};
        let inviteObj = {"to":{"tope":[],
                            "componentid":[],
                            "email":[],
                            "phone":[]},
                      "thread":'',
                      "subject":'',
                      "ClientID" : clientId,
                      "message":'',
                      "mode":"invite","callType":"MEETING","batchsize":'10',"dialerMode":"Meeting",Mode:"STARTMEDIA" ,"callMode":"CALLUS",ClientID:vclientId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: false};
                      (inviteObj.to.tope).push(CallPE);
                      window.BotServices.callManagerExec(inviteObj,()=>{});

        }

      } else if(event == "ENDCALL") {
        console.log("call us end call client id",window.top.LivingScript_0070.context.clientNodeId);
        $('#endcallIconId').hide();
        $('#callIconId').show();
        $('#visitendcallIconId').hide();
        $('#visitIconId').show();
        $('#reconnectId').show();
        $('#reconnectLiveId').hide();
        CommApp.updateWidgetState({
          state : 'onHook',
          widgetId : widgetId,
          clientId : clientId
        });
        window.top.DevMgr.endcall(clientId);
        //CommApp.EndCall({},()=>{});
      }
    }

    function stateCallback(data) {
      if(data.state == 'offHook') {
        $('#endcallIconId').show();
        $('#callIconId').hide();
        $('#reconnectId').hide();
        $('#reconnectLiveId').show();
      } else {
        $('#endcallIconId').hide();
        $('#callIconId').show();
        $('#reconnectId').show();
        $('#reconnectLiveId').hide();
      }
    }

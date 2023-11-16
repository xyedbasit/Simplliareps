    var CommApp2 = window.top.CommApp;
    var vwidgetId  = 'VISITUS';
    var vclientId = window.top.LivingScript_0070.context.clientNodeId;
    let isSignedInflag = false;

    var state = 'offHook';
    if(window.top.CommApp) {
       CommApp2 = window.top.CommApp;
       state = CommApp2.registerWidget({
        widgetId : vwidgetId,
        clientId : vclientId
      }, stateCallback);
    } else {
      window.addEventListener('commAppLoad', (e) => {
        CommApp2 = window.top.CommApp;
        state = CommApp2.registerWidget({
          widgetId : vwidgetId,
          clientId : vclientId
        }, stateCallback);
      });
    }


    console.log("Widget State : ", state);
    function VisitAction(event,toPE) {
      console.log('Got Action:',event,toPE);

      if(state == 'offHook') {
        $('#visitendcallIconId').show();
        $('#visitIconId').hide();
        $('#reconnectId').hide();
        $('#reconnectLiveId').show();
      } else if(state == "onHook") {
        $('#endcallIconId').hide();
        $('#visitIconId').show();
        $('#reconnectId').show();
        $('#reconnectLiveId').hide();
      }
      if(event == "STARTCALL") {
        $('#visitendcallIconId').show();
        $('#visitIconId').hide();
        $('#reconnectId').hide();
        $('#reconnectLiveId').show();
        //window.top.BotIVRPlayerVue.showBotIVRPlayerModal = true;

        CommApp2.updateWidgetState({
          state : 'offHook',
          widgetId : vwidgetId,
          clientId : vclientId
        });

        /*if (window.cookies.get("accessToken") == null) {
           let mode = "MEET";
          let pttObj = {Mode:"MEET" ,isSignedIn: isSignedInflag};
          CommApp.StartCall(pttObj,()=>{});
          //openSimpliaMessageForm({mode:mode});
        } else {
          let win = window;
          let pttObj = {Mode:"MEET" ,isSignedIn: isSignedInflag};
          CommApp.StartCall(pttObj,()=>{});
        }*/
        let win = window;
        let CallPElastOld = "11agent1_FFFFFFFFFFFFFF00001609333769946188_1agent1_FFFFFFFFFFFFFF00001609333769946188_";
        let CallPE = "11holder1_FFFFFFFFFFFFFF00001684529560772577_1holder1_FFFFFFFFFFFFFF00001684529560772577_";
        let workingCallPE = "11holder1_FFFFFFFFFFFFFF00001586277513952707_1admin1_FF07609117308816607764767259353239_";
        //let CallPE = '11owner1_FFFFFFFFFFFFFF00001567790434071286_1owner1_FFFFFFFFFFFFFF00001586277513952706_';
        /*=======CallcenterPE=======*/
        if(toPE!="" && toPE!= undefined && toPE != "undefined") {
          CallPE = toPE;
          console.log("===inside toPE"+CallPE);
        } else {
          CallPE = "11holder1_FFFFFFFFFFFFFF00001684529560772577_1holder1_FFFFFFFFFFFFFF00001684529560772577_";
          console.log("===inside toPE default"+CallPE);
        }
        console.log("===inside toPE final"+CallPE);
          /*=============testGeeko============*/
        //let CallPE = "11holder1_FFFFFFFFFFFFFF00001586277513952707_1agent1_FFFFFFFFFFFFFF00001619809461138558_";
        //let InitialContext = {Caller:{Audio:true,NoShow:true,Screen:true,Video:true},Callee:{Audio:true,NoShow:true,Screen:false,Video:false},Calltype:"JOINCALL",Label:"MEETUS"};
        //let pttObj = {Mode:"MEETUS" ,ClientID:vclientId,DialTimeout:60,CallPE:CallcenterPE,InitialContext:InitialContext,isSignedIn: isSignedInflag};
        //CommApp2.StartCall(pttObj,()=>{});
        let InitialContext = {Caller:{Audio:true,NoShow:true,Screen:false,Video:false},Callee:{Audio:true,NoShow:true,Screen:false,Video:false},Calltype:"JOINCALL",Label:"Invite"};
        let callObj = {Mode:"STARTMEDIA" ,ClientID:vclientId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: false};
        let inviteObj = {"to":{"tope":[],
                            "componentid":[],
                            "email":[],
                            "phone":[]},
                      "thread":'',
                      "subject":'',
                      "ClientID" : vclientId,
                      "message":'',
                      "mode":"join","callType":"MEETING","batchsize":'10',"dialerMode":"Meeting",Mode:"STARTMEDIA" ,"callMode":"MEETUS",ClientID:vclientId,DialTimeout:60,CallPE:CallPE,isSignedIn: false,
                      "Data" : {"InitialContext":InitialContext}
                    };
                      (inviteObj.to.tope).push(CallPE);
                      window.BotServices.callManagerExec(inviteObj,()=>{});
                      let params = {"Event":{"Mode":'MEDIA',ClientID:vclientId}};
                      window.DevMgr.openMediaPlayerWC(params);
      } else if(event == "ENDCALL") {
        console.log("meet us end call client id",window.top.LivingScript_0070.context.clientNodeId);
        $('#visitendcallIconId').hide();
        $('#visitIconId').show();
        $('#reconnectId').show();
        $('#reconnectLiveId').hide();
        CommApp2.updateWidgetState({
          state : 'onHook',
          widgetId : vwidgetId,
          clientId : vclientId
        });
        window.top.DevMgr.endcall(vclientId);
        //CommApp2.EndCall({},()=>{});
        //window.top.BotIVRPlayerVue.showBotIVRPlayerModal = false;
      }
    }

    function stateCallback(data) {
      console.log("stateCallback event",data);
      if(data.state == 'offHook') {
        $('#visitendcallIconId').show();
        $('#visitIconId').hide();
        $('#reconnectId').hide();
        $('#reconnectLiveId').show();
      } else {
        $('#visitendcallIconId').hide();
        $('#visitIconId').show();
        $('#reconnectId').show();
        $('#reconnectLiveId').hide();
      }
    }

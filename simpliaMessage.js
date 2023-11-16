//import Vue from '../VueLibs/vue.esm.browser.js';
loadCSS('/CommunicationClient/Widgets/SimpliaMessage/simpliaMessage.css', ()=>{});
let modeset = "MESSAGE";
//if(window.top.$cookies.get("accessToken") == null) {
  isSignedInflag = false;
//} else {
  //isSignedInflag = true;
//}

if (typeof window.jQuery == 'undefined') {
    console.log("jQuery not loaded");
}
var requestData = {};
var simpliamodelid = "simpliaMessage"+Math.floor(Math.random()*10001);
var CommApp = window.top.CommApp;
//const widgetId  = 'MESSAGEUS';

var smclientId = window.top.LivingScript_0070.context.clientNodeId;
var smbrowserTabId = window.top.sessionStorage.getItem('browserTabId');
var smcredentialId = window.top.$cookies.get('credentialId');
console.log("==browsertab=="+smbrowserTabId+"====="+smcredentialId);
var smcredentialGrantId = window.top.$cookies.get('credentialGrantId');
var smcredentialPE = window.top.$cookies.get('credentialPE');
var smcredentialInfo = {credentialPE:smcredentialPE,credentialGrantId:smcredentialGrantId,credentialId:smcredentialId};

(function() {
    var script = document.createElement("SCRIPT");
    script.src = '/simplia/dist/jquery-1.12.4-wp.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        var serviveFormParent = `<div id="simpliaMessageForm">
        <transition name="simpliamessagemodal">
        <div class="modal-mask" v-if="showModal" id="showmodalid">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-body">
	        <button id="show-modal" @click="showModal = false" style="right:5px;padding:5px; font-size:18px;position:absolute;"><i class="far fa-times text-red-600"></i></button>
                <div class="w-full flex flex-col text-center">
                  <div class="p-2 pt-2 w-full">
                    <div class="" style="font-size: 14px">
                    <h2 class="simplia-blue" style="color: #0072c5;font-size: 18px;padding: 7px;"> Welcome to Simplia!</h2>
                    <span class="simplia-blue" v-if="!isSignedInflag">
						Thank you for contacting us, we'll get back to you right away!
                    </span>
                    <span v-else>How can we serve you? </span>
                    </div>
                  </div>
                  </div>
                  <div
					  class="w-fulls send-modal-body"
					  style="min-height: 88px"
					  v-if="!isSignedInflag"
					>
					  <div style="height: 39px; margin: 5px 0; border-bottom: 1px solid #aebac940;">
						<input
						  class="send-input"
						  type="text"
						  placeholder="Email"
						  style="width: 100%; height: 100%; padding: 0 15px"
						  v-model="email"
						  @keyup="errorMsg = ''"
						/>
					  </div>
					  <div style="height: 39px; margin: 5px 0;">
						<input
						  class="send-input"
						  type="text"
						  placeholder="Phone"
						  style="width: 100%; height: 100%; padding: 0px 15px"
						  v-model="phone"
						  @keyup="errorMsg = ''"
						/>
					  </div>
					  <div style="padding: 5px; margin: 5px">
						<div style="color: red">
						  {{ errorMsg }}
						</div>
					  </div>
					</div>
					<div style="min-height: 62px" v-else></div>
					<div class="w-full flex mt-2 border-t send-modal-msg" style="height: 48px">
					  <!-- <div class="w-full"></div> -->
					  <div class="" style="flex-grow: 1">
						<textarea
						  class="border-b w-full h-full"
						  style="outline: none; padding: 5px 15px; resize: none"
						  name=""
						  id=""
						  rows="1"
						  ref="msgBox"
						  v-model="msgText"
						  placeholder="Message"
						></textarea>
					  </div>
					  <div class="text-right">
						<button
						  class="p-2 send-btn"
						  style="
							outline: none;
							background: #0072c5;
							height: 100%;
							width: 80px;
							padding-top: 8px;
							color: white;
							font-weight: 500;
							line-height: 30px;

						  "
						  @click="oxygenChat"
						>
						SEND
						  <!-- <i class="far fa-paper-plane simplia-blue"></i> -->
						</button>
					  </div>
					</div>
			    </div>

              <div class="modal-footer" style="display:none;">
                  default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    OK
                  </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
        </div>`;
        //$('body').append(serviveFormParent);
        $('body').append('<div id="'+simpliamodelid+'" class="oxygen-home" style="width:100vw;z-index:999;">'+serviveFormParent+'</div>');
        //window.document.body.appendChild(serviveFormParent);
        window.serviceVue = new window.widgetVue({
          el: $('#' + simpliamodelid)[0],
		      data: function () {
            return {
              srcData : null,
              showModal : false,
			  window: window,
			  errorMsg: "",
			  msgText: "",
			  email: "",
			  phone: "",
              isSignedInflag: isSignedInflag,
              mode: modeset
            }
          },
		  methods: {
			oxygenChat() {
			  if (!this.isSignedInflag) {
				if (!this.email && !this.phone) {
				  this.errorMsg = "Either Email or Phone Number is Required!";
				  return;
				}
				let invalidInput = true;
				if (this.email && !this.isEmail(true, this.email)) {
				  this.errorMsg = "Invalid Email!";
				  invalidInput = false;
				}
				if (this.phone && !this.formatPhoneNumber(this.phone)) {
				  this.errorMsg = "Invalid Phone!";
				  invalidInput = false;
				}
				if (!invalidInput) {
				  return;
				}
			  }
			  if (!this.msgText) {
				//return;
			  }
			  let win = window.top;
			  /*if (
				win.LivingScript_0070.botConnector &&
				typeof win.LivingScript_0070.botConnector.oxygenChatApi === "function"
			  ) {
				win.LivingScript_0070.botConnector.oxygenChatApi({
				  message: this.msgText,
				  email: this.email,
				  phone: this.phone,
				  Mode: this.mode,
				  isSignedIn: this.isSignedIn,
				});
      }*/
        showModal = false;
        if(modeset == "MESSAGE" || modeset == "EMAIL") {
          //let menuItem = window.devStore.getRootmenuByLocalIndex(0);
          //menuItem.contactFlag = true;
          //if (menuItem) {
            //window.BotServices.PullRootMenu(menuItem);
			//let terminationUrl = {"MediaType":"WebComponent","Template":"oxygen-inbox","URL":"/simplia/serverfilepath/efs/Code/github/SimpliaV2Components/inbox-wc/dist/js/app.js"};
            //window.BotServices.openChildPanel({ClientID : window.top.LivingScript_0070.context.clientNodeId, DisplayName : 'Inbox', Termination : terminationUrl}, ()=>{});
			//window.devStore.viewPorts[0].MessageBox.selectMode("invitemodalid", "meetingMode", "message");
          //}
			let CallPE = "11holder1_FFFFFFFFFFFFFF00001586277513952707_1agent1_FFFFFFFFFFFFFF00001619809461138558_";
			let InitialContext = {Caller:{Audio:false,NoShow:true,Screen:false,Video:false,Text:true},Callee:{Audio:false,NoShow:true,Screen:false,Video:true,Text:true},Calltype:"JOINCALL",Label:"Invite"};
			let callObj = {Mode:"STARTMEDIA" ,ClientID:window.top.LivingScript_0070.context.clientNodeId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: false};
			let inviteObj = {"to":{"tope":[],
                            "componentid":[],
                            "email":[],
                            "phone":[]},
                      "thread":'',
                      "subject":'',
                      "ClientID" : window.top.LivingScript_0070.context.clientNodeId,
                      "message":'',
                      "mode":"invite","callType":"MEETING","batchsize":'10',"dialerMode":"Meeting",Mode:"STARTMEDIA" ,"callMode":"MESSAGEUS",ClientID:vclientId,DialTimeout:60,CallPE:CallPE,InitialContext:InitialContext,isSignedIn: false};
                      (inviteObj.to.tope).push(CallPE);
                      window.BotServices.callManagerExec(inviteObj,()=>{});
                      let params = {"Event":{"Mode":'MEDIA',ClientID:window.top.LivingScript_0070.context.clientNodeId}};

		 }
        /*SimpliaMessageAction({
          event:"STARTSIMPLIACHAT",
          message: this.msgText,
          email: this.email,
          phone: this.phone,
          Mode: this.mode,
          isSignedIn: isSignedInflag
        });*/
			closeSimpliaMessageForm();

			  setTimeout(() => {
				//this.$emit("closeModal", true);
				closeSimpliaMessageForm();
			  }, 1000);
			},
			msgFocus() {
			  this.$nextTick(() => {
				//this.$refs.msgBox.focus();
			  });
			},
			reset() {
			  this.msgText = "";
			},
			isEmail(noSpace, email) {
			  let regex;
			  if (noSpace) {
				regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
			  } else {
				regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+\s+$/;
			  }
			  let isEmail = regex.test(email);

			  return isEmail;
			},

			formatPhoneNumber(phoneNumberString) {
			  let numberObj = window.top.BotServices.parsePhoneNumber(
				phoneNumberString,
				"US"
			  );
			  if (numberObj && numberObj.isValid()) {
				this.phone = numberObj.format("E.164");
				return true;
			  }
			  return false;
			},
      modalClose() {
      showModal = false;
      /*SimpliaMessageAction({
        event:"STARTSIMPLIACHAT",
        Mode: this.mode,
      });*/
	  //let terminationUrl = {"MediaType":"WebComponent","Template":"oxygen-inbox","URL":"/simplia/serverfilepath/efs/Code/github/SimpliaV2Components/inbox-wc/dist/js/app.js"};
      //window.BotServices.openChildPanel({ClientID : window.top.LivingScript_0070.context.clientNodeId, DisplayName : 'Inbox', Termination : terminationUrl}, ()=>{});
      //this.$refs.msgModal.reset();
      /*let win = window.top;
      if (
        win.LivingScript_0070.botConnector &&
        typeof win.LivingScript_0070.botConnector.oxygenChatApi === "function"
      ) {
        win.LivingScript_0070.botConnector.oxygenChatApi({
          Mode: this.mode,
        });
      }*/
      }
		  }
        });
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

//window.serviceForm = serviceForm;..

function click2call() {
	window.serviceVue.showModal = true;
}

function openSimpliaMessageForm(data) {
  console.log("Open Service Form Request ", data);
  modeset = data.mode;
  window.serviceVue.showModal = true;
  window.serviceVue.$data.email = data.email
}

function closeSimpliaMessageForm() {
  window.serviceVue.showModal = false;
}

function loadCSS(src, callback) {
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", src)
    document.getElementsByTagName("head")[0].appendChild(fileref)
    callback();
}

function SimpliaMessageAction(data) {
  console.log('Got simplia message Action:',data,modeset);
  window.serviceVue.showModal = false;

  if(data.event == "STARTSIMPLIACHAT") {
    $('#messageIconId').show();
    $('#messageIconId').css('color','red');
    if(data.email || data.phone) {
      if(data.email != "" || data.phone !="") {
        data.credentialInfo = {credentialPE:smcredentialPE,credentialGrantId:smcredentialGrantId,credentialId:smcredentialId}
          window.top.CommApp.messageUs(data, (err,res) => {
            if(err) {
              console.log("===messageus error ",err);
            } else {
              console.log("===messageus res=="+JSON.stringify(res));
              //this.linkedAccount.
            }
        });
      }
    }
    if(modeset == "MESSAGE" || modeset == "EMAIL") {
        //window.devStore.clients[0].childViewports.showContacts();
        //window.devStore.viewPorts[0].MessageBox.selectMode("invitemodalid", "meetingMode", "message");
        //window.devStore.clients.find(e => e.Client === smclientId).childViewports.showContacts();
     }
    if(modeset == "TRY") {
      CommApp.TryItNow(data,()=>{});
    }
  }
  if(modeset == "CALL") {
    let pttObj = {Mode:"CALL"};
    CommApp.StartCall({},()=>{});
  } else if(modeset == "MEET") {
    let pttObj = {Mode:"MEET"};
    CommApp.StartCall({},()=>{});
  } else if(modeset == "PAGE") {
    let pttObj = {Action: "click",isSignedIn: isSignedInflag,mode:"PAGE"};
    CommApp.StartPageus(pttObj,()=>{});
  }
}

//export { openSimpliaMessageForm, closeSimpliaMessageForm };

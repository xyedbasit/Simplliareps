loadCSS("/CommunicationClient/Widgets/Agreement/serviceAgreement.css", () => {});
//loadCSS("/CommunicationClient/WidgetsV2/Agreement/bootstrap.min.css", () => {});
  
if (typeof window.jQuery == "undefined") {
  console.log("jQuery not loaded");
}
var requestData = {};
var agreementmodelid = "agreementform" + Math.floor(Math.random() * 10001);

(function () {
  var script = document.createElement("SCRIPT");
  script.src = "/simplia/dist/jquery-1.12.4-wp.js";
  script.type = "text/javascript";
  script.onload = function () {
    var $ = window.jQuery;
    var agreementFormParent = `<div id="serviceAgreementForm">
        <transition name="serviceAgreementmodal">
        <div class="modal-mask"  v-show="showAgreementModal">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header" style="height: 39px; background-color: rgb(0, 114, 197); color: white; display: flex; align-items: center;">
                <slot name="header">
                  <div>Confirm Your Request</div>
                  <button id="show-modal-agreement" style="font-weight: 600;font-size: 18px;" @click="showAgreementModal = false"><i class="far fa-times text-red-600"></i></button>
                </slot>
              </div>

              <div class="modal-body">
                <iframe id="srcid" :src="srcData" height="100%" width="100%" frameborder="0" style="margin-top:-15px;" scrolling="auto">
                        <p>Your browser does not support iframes.</p>
                      </iframe>
                      <div class="container" id="progress_bar_div" style="position: absolute;z-index: 1000;top: 50%;left: 0%;">

                      <p><span class="dhx_label-heading">Please wait while we are fetching the data.It may take some time.</span></p>
                                                            
                      <div class="spinner-border" style="position:absolute;left:35%;"></div>
                    </div>
              </div>

              <div class="modal-footer" style="display:none;">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
        </div>`;
    //$('body').append(serviveFormParent);
    $("body").append(
      '<div id="' + agreementmodelid + '">' + agreementFormParent + "</div>"
    );
    //window.document.body.appendChild(serviveFormParent);
    window.agreementVue = new window.widgetVue({
      el: $("#" + agreementmodelid)[0],
      data: function () {
        return {
          srcData: null,
          showAgreementModal: false
        };
      },
    });
  };
  document.getElementsByTagName("head")[0].appendChild(script);
})();

//window.serviceForm = serviceForm;..

function openServerForm(data) {
  console.log("Open Service Form Request ", data);
  if (data.EventData) {
    requestData = data.EventData.clientContext;
  }

  if (requestData) {
    let SearchString = data.EventData.clientContext.SearchString;
    if (SearchString) {
      window.agreementVue.showAgreementModal = true;
      let clientid = data.EventData.clientId;
      getLPAgreementInfo(SearchString,clientid);
    }
  }
}

function closeServerForm() {
  console.log("got Close ServiceForm");
  //var savePlayer = $('#serviceForm').html();
  window.agreementVue.showAgreementModal = false;
  //$('#showmodalid').remove(); // Remove player from DOM
  //$('#serviceForm').html(savePlayer); // Restore it
}

function getLPAgreementInfo(SearchString,clientid) {
  let newData = {};
  console.log("==params===" +  SearchString);
  $.ajax({
    //url: "/NikhilAPythonApp-0020/System/ServerSide/index3",
    url: "https://debianlargeserver-0050-dataapps.laxroute53.com/MarketPlaceApp/System/ServerSide/index3",
    //url: "/MarketPlaceApp/System/ServerSide/index3",
    type: "POST",
    data: { text: SearchString, ans: "Agree" },
    success: (response) => {
      console.log("got agreement data");
      console.log(response);
      newData = {
        What: response.result.service,
        When: response.result.when,
        Where: response.result.LOCATION,
        Price: response.result.QUANTITY,
      };
      console.log("New Data " + JSON.stringify(newData));
      let srcData =
        "/ProviderSearch-0026/search-form?clientid="+clientid+"&formType=search&iframeClientId=_FFFFFFFFFFFFFF00001598133142878018_&panelid=id_74148583301d71f45b79041508c9474c&what=" +
        newData.What +
        "&where=" +
        newData.Where +
        "&price=" +
        newData.Price +
        "&when=" +
        newData.When +
        "&Action=" +
        requestData.Action +
        "&ActionType=" +
        requestData.ActionType +
        "&SearchString=" +
        requestData.SearchString;
      console.log("===url==" + srcData);
      $("#srcid").attr("src", srcData);
      window.agreementVue.srcData = srcData;
      setTimeout(() => {
        document.getElementById('progress_bar_div').style.display = "none";
       }, 5000);
    },
  });
}

function loadCSS(src, callback) {
  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", src);
  document.getElementsByTagName("head")[0].appendChild(fileref);
  callback();
}

//export { openServerForm, closeServerForm };

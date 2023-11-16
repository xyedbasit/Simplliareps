loadCSS("/CommunicationClient/Widgets/BotIVRPlayer/BotIVRPlayer.css", () => {});
if (typeof window.jQuery == "undefined") {
  console.log("jQuery not loaded");
}
var requestData = {};
var BotIVRPlayermodelid = "BotIVRPlayer" + Math.floor(Math.random() * 10001);
var ivrplayersrcid = "botsrcid" + Math.floor(Math.random() * 10001);
if(document.getElementById('mediaPlayerProgress')) {
  console.log("mediaplayerprogress id already exist");
} else {
  (function () {
    var script = document.createElement("SCRIPT");
    script.src = "/simplia/dist/jquery-1.12.4-wp.js";
    script.type = "text/javascript";
    script.onload = function () {
      var $ = window.jQuery;
      var BotIVRPlayerParent = `<div id="BotIVRPlayerForm">
          <transition name="BotIVRPlayermodal">
          <div class="modal-mask"  v-show="showBotIVRPlayerModal">
            <div class="modal-wrapper">
              <div class="modal-container">

                <div class="modal-header" style="height: 39px; background-color: transparent; color: white; display: none; align-items: center;">
                  <slot name="header">

                    <button id="show-modal-agreement" style="font-weight: 600;font-size: 18px;" @click="showBotIVRPlayerModal = false"><i class="far fa-times text-red-600"></i></button>
                  </slot>
                </div>

                <div class="modal-body">
                <video style="display:'';" class="videodemo" id="mediaPlayerProgress" playsinline>
                  <source src="https://oxygencommunications.s3.amazonaws.com/recordings/ringtones/simpliademo.mp4" type="video/mp4">
                </video>
                <div class="playpausedemo" id="playpausedemo" @click="handleClickDemoPlayVideo"></div>
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
        '<div id="' + BotIVRPlayermodelid + '" class="" style="z-index:997;">' + BotIVRPlayerParent + "</div>"
      );
      //window.document.body.appendChild(serviveFormParent);
      window.BotIVRPlayerVue = new window.widgetVue({
        el: $("#" + BotIVRPlayermodelid)[0],
        data: function () {
          return {
            srcData: '/CommunicationClient/Widgets/BotIVRPlayer/BotIVRPlayer.html',
            showBotIVRPlayerModal: false
          };
        },
        mounted: function () {
          this.$nextTick(function () {
               /*let video = $(this.$el).find('video')[0];
               console.log("===video paused demo",video.paused);
               if(video.paused) {
                 video.play();
                 $(this.$el).children(".playpausedemo").fadeOut();
               } else {
                 video.pause();
                 $(this.$el).children(".playpausedemo").fadeIn();
               }*/
            });
        },
        methods: {
          handleClickDemoPlayVideo() {
            console.log("Got handle click demo play event");
            let video = $(this.$el).find('video')[0];
            console.log("===video paused demo",video.paused);
             if(video.paused) {
                 video.play();
                 //$(this.$el).find(".playpausedemo")[0].fadeOut();
                 $("#playpausedemo").fadeOut();
               } else {
                 video.pause();
                 //$(this.$el).find(".playpausedemo")[0].fadeIn();
                 $("#playpausedemo").fadeIn();
               }
          },
          playerClose() {
            console.log("Got player pause");
            showBotIVRPlayerModal = false;
            let video = $(this.$el).find('video')[0];
            video.pause();
          }
        }
      });
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  })();

}
//window.serviceForm = serviceForm;..

function openPlayerServerForm(data) {
  console.log("Open BotIVRPlayer Request ", data);
  window.BotIVRPlayerVue.showBotIVRPlayerModal = true;
}

function closePlayerServerForm() {
  console.log("got Close BotIVRPlayer");
  window.BotIVRPlayerVue.showBotIVRPlayerModal = false;
}

function loadCSS(src, callback) {
  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", src);
  document.getElementsByTagName("head")[0].appendChild(fileref);
  callback();
}

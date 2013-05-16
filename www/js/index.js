/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        //added by roopesh
        setTimeout(function(){
            parentElement.getAttribute('class'); 
             parentElement.className += " show-none";
             iframeloader("http://54.225.113.123/fetches?page=1");
        //iframeElement.className += " MyClass";
        }, 300);
         console.log('Received Event: ' + id);
         startup();
    }
};

//Added by roopesh for pricify site inapp load

function loadHTML(url, timeout) {
if (timeout == undefined)
    timeout = 10000;
var req = new XMLHttpRequest();
var timer = setTimeout(function() {
    try {
        req.abort();
    } catch(e) {}
    navigator.notification.loadingStop();
},timeout);
req.onreadystatechange = function() {
    if (req.readyState == 4) {
        if (req.status < 300) {
            clearTimeout(timer);

            var html = req.responseText;
            //just a debug print   
            alert(html);
            document.write(html);
        }
        navigator.notification.loadingStop();
        delete req;
    }       
};          
req.open('GET', url, true);
req.send();
}

function iframeloader(url) {
    var parentElement = document.getElementById("app");
    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.className ="show-none";
    iframe.id ="pricfy-web";
    document.body.appendChild(iframe);
    if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
      iframe.onreadystatechange = function(){
        if (iframe.readyState == "complete"){
          //alert("Iframe is now loaded.");
           // parentElement.getAttribute('class'); 
             parentElement.setAttribute('class'," show-none");
            var iframeElement = document.getElementById("pricfy-web");
            iframeElement.setAttribute('class', 'show');
            console.log('iframe loaded: ' + iframe.id);
        }
      };
    } else {
      iframe.onload = function(){
        //alert("Iframe is now loaded.");
           // parentElement.getAttribute('class'); 
            parentElement.setAttribute('class'," show-none");
            var iframeElement = document.getElementById("pricfy-web");
            iframeElement.setAttribute('class', 'show');
            iframeElement.setAttribute('width', screen.width+"px");
            iframeElement.setAttribute('height', screen.height+"px");
            console.log('iframe loaded: ' + iframe.id);
      };
    }   
}

var menuOpen = false;
var menuDiv = "";

function startup() {
        console.log("Business time...");
        menuDiv = document.querySelector("#menu");

        document.addEventListener("menubutton", doMenu, false);
}

function doMenu() {
        console.log("The menu was clicked...");
        if(menuOpen) {
                console.log("close the menu");
                menuDiv.style.display="none";
                menuOpen = false;
        } else {
                console.log("open the menu");
                menuDiv.style.display="block";
                menuOpen = true;
        }

}

// This function exits the app.
function onExit(){
	alert("close");
        navigator.app.exitApp();
        //return false;
}

function onMenu(){
	alert("\nscreen"+screen.height+screen.width );
        return false;
}



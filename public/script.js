var delayTime = 10000;

var customCheckbox = document.getElementById("custom-checkbox");
var realCheckbox = document.getElementById("checkbox");
var nameField = document.getElementById("name");
var submitButton = document.getElementById("submit");
var imagesPopup = document.getElementById("images");
var bag = document.getElementById("bubble-arrow-grey");
var baw = document.getElementById("bubble-arrow-white");
var tryAgain = document.getElementById("try-again");
var alertBox = document.getElementById("alert");
var checkboxAlert = document.getElementById("checkbox-alert");
var nameAlert = document.getElementById("name-alert");
var captchaContainer = document.getElementById("captcha-container");
var nameContainer = document.getElementById("name-container");

function handleRobotClick(e) {
  var inputCheckbox = document.getElementById("checkbox");
  var check = document.getElementById("check");
  if (!inputCheckbox.checked) {
    inputCheckbox.checked = true;
    check.style.display = "block";
  }
}

function handleRobotSubmit(e) {
  var checkedValue = realCheckbox.checked;
  var nameValue = nameField.value != "";
  console.log("Checked? " + checkedValue);
  console.log("Name? " + nameValue);
  if (!(checkedValue && nameValue)) {
    e.preventDefault();
    if (!checkedValue) {
      checkboxAlert.style.display = "block";
      captchaContainer.style.border = "1px solid red";
    }
    if (!nameValue) {
      nameAlert.style.display = "block";
      nameContainer.style.border = "1px solid red";
    }
  }
}

function isNotRobot() {
  customCheckbox.removeEventListener("click", handleRobotClick);
  //submitButton.removeEventListener("click", handleRobotSubmit);
  customCheckbox.addEventListener("click", handleNotRobotClick);
}

function handleNotRobotClick(e) {
  
  imagesPopup.style.display = "block";
  bag.style.display = "block";
  baw.style.display = "block";
  setTimeout(function() {
    imagesPopup.style.display = "none";
    bag.style.display = "none";
    baw.style.display = "none";
    alertBox.style.display = "block";
  }, 300);
}

function hideAlert(e) {
  alertBox.style.display = "none";
}


var images = [
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr12.jpeg?1536078146868",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr13.jpeg?1536078147042",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr18.jpeg?1536078147192",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr15.jpeg?1536078147324",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr17.jpeg?1536078147462",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr11.jpeg?1536078147582",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr9.jpeg?1536078147718",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr10.jpeg?1536078147846",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr14.jpeg?1536078147973",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr16.jpeg?1536078148097",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr8.jpeg?1536078148545",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr5.jpeg?1536078148697",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr7.jpeg?1536078148845",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr2.jpeg?1536078149020",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr6.jpeg?1536078149235",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr4.jpeg?1536078149404",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr3.jpeg?1536078149568",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr1.jpeg?1536078149731",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr20.jpeg?1536078408661",
  "https://cdn.glitch.com/a5e521be-edd4-433c-885e-f2d838d40fbf%2Fr19.jpeg?1536078410059" 
]

var thumbnailsHTML = '';
var usedImages = [];

for (var i = 0; i < 9; i++) {
  var randomIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
  if (usedImages.indexOf(randomIndex) === -1) {
    thumbnailsHTML += '<img src="' + images[randomIndex] + '" />'
    usedImages.push(randomIndex);
  } else {
    i--;
  }
  
}

document.getElementById('images-thumbnails').innerHTML = thumbnailsHTML;


customCheckbox.addEventListener("click", handleRobotClick);
submitButton.addEventListener("click", handleRobotSubmit);
tryAgain.addEventListener("click", hideAlert);
setTimeout(isNotRobot, delayTime);

var xhr = new XMLHttpRequest();
xhr.open('GET', '/get-robots');
xhr.onload = function() {
    if (xhr.status === 200) {
      var robotNameData = xhr.responseText;
      var robotNameObject = JSON.parse(robotNameData);
      console.log(robotNameObject);
      for (var i in robotNameObject) {
        robots.addNewRobot(robotNameObject[i].name);
      }
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();


var robots = new Vue({
  el: '#confirmed-robots',
  data: {
    defaultText: 'No confirmed robots',
    robots: []
  },
  methods: {
    addNewRobot: function (name) {
      this.robots.push({
        name: name
      })
    }
  }
})
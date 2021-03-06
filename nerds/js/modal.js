var link = document.querySelector(".button-writeus");
var popup = document.querySelector(".write-us-modal");
var close = popup.querySelector(".modal-close");
var yourName = popup.querySelector(".write-name");
var email = popup.querySelector(".write-email");
var letterText = popup.querySelector(".write-letter");
var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("yourName");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  if (storageName || storageEmail) {
    yourName.value = storageName;
    email.value = storageEmail;
    letterText.focus();
  } else {
    yourName.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

popup.addEventListener("submit", function (evt) {
  if (!yourName.value || !email.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("yourName", yourName.value);
      localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});

ymaps.ready(init);

function init(){
  var myMap;

  myMap = new ymaps.Map("map", {
    center: [59.939140, 30.321418],
    zoom: 17,
    controls: ["smallMapDefaultSet"]
  });

  var myPlacemark = new ymaps.Placemark([59.938667, 30.323073] , {},
    { iconLayout: "default#image",
    iconImageHref: "img/map-marker.png",
    iconImageSize: [231, 190],
    iconImageOffset: [-55, -205] });
    myMap.geoObjects.add(myPlacemark);
  }

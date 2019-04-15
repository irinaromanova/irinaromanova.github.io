(function () {
  // находим кнопки перелистывания "Следующий / предыдущий слайд"
  var btnPrev = document.querySelector(".promo-slider-arrow-prew"),
  btnNext = document.querySelector(".promo-slider-arrow-next");

  // находим коллекцию изображений (в данном случае фоновых)
  var images = document.querySelectorAll(".promo-slider-item");

  // находим нижние круглые кнопочки
  var pointsArray = document.querySelectorAll(".promo-slider-control");


  var counter = 1;   // обьявляем и инициализируем собственную переменную-счетчик
  btnNext.disabled = true;   // отключаем предыдущую кнопку

  btnPrev.addEventListener("click", function() {
    // if (counter === 0) {
    //     counter = images.lenght - 1;
    // }
    images[counter].classList.remove("shown");
    pointsArray[counter].classList.remove("promo-slider-control-current");
    counter--;
    images[counter].classList.add("shown");
    pointsArray[counter].classList.add("promo-slider-control-current");
    btnNext.disabled = false;

    // disable btnPrev if we are on the first slide
    if (counter === 0) {
      btnPrev.disabled = true;
    }
  });

  btnNext.addEventListener("click", function() {
    images[counter].classList.remove("shown");
    pointsArray[counter].classList.remove("promo-slider-control-current");
    counter++;
    images[counter].classList.add("shown");
    pointsArray[counter].classList.add("promo-slider-control-current");
    console.log(btnPrev.disabled);
    btnPrev.disabled = false;

    // disable btnNext if we are on the last slide
    if (counter === images.length - 1) {
      btnNext.disabled = true;
    }
  });

  let slideThroughPoints = function () {
    // I used this trick only for IE compatibility
    [].forEach.call(pointsArray, function(point, index) {
      point.addEventListener("click", function (evt) {
        if (index === counter) {
          evt.preventDefault();
          return;
        } else {
          // проверочки
          console.log(counter);
          console.log(pointsArray[index]);
          console.log(index);
          console.log(images[index]);

          pointsArray[counter].classList.remove("promo-slider-control-current"); // удаляем активный класс с начальной точки
          images[counter].classList.remove("shown"); // скрываем изначальную картинку
          counter = index; // приравниваем счетчик к надатому индексу
          images[index].classList.add("shown"); // добавляем класс shown соответствующей картинке
          point.classList.add("promo-slider-control-current"); // добавляем класс active точке, на которую кликнули

          if (counter === images.length - 1) {
            btnNext.disabled = true; // кнопка disabled
            btnPrev.disabled = false; // кнопка активна
          } else if (counter === 0) {
            btnNext.disabled = false; // кнопка активна
            btnPrev.disabled = true; // отключаем предыдущую кнопку
          } else {
            btnNext.disabled = false;  // обе кнопки активны
            btnPrev.disabled = false;
          }
        }
      });
    });
  };

  slideThroughPoints();

})();

/*Карта*/

var mapLink = document.querySelector(".open-map");
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (mapPopup.classList.contains("modal-show")) {
      mapPopup.classList.remove("modal-show");
    }
  }
});

/*Обратная связь*/

var link = document.querySelector(".button-write-us");
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

/*Товар добавлен в корзину*/

var buyLink = document.querySelectorAll(".button-buy"), i;
var buyPopup = document.querySelector(".added-cart");
var buyClose = document.querySelector(".modal-close");
var buyCancel = document.querySelector(".button-continue");

for (i = 0; i < buyLink.length; ++i) {
  buyLink[i].addEventListener("click", function (event) {
    event.preventDefault(event);
    buyPopup.classList.add("cart-modal-show");
  })
}

buyClose.addEventListener("click", function (event) {
  event.preventDefault(event);
  buyPopup.classList.remove("cart-modal-show");
});

buyCancel.addEventListener("click", function (event) {
  event.preventDefault(event);
  buyPopup.classList.remove("cart-modal-show");
});

window.addEventListener("keydown", function (event) {
  if (event.keyCode == 27) {
    if (buyPopup.classList.contains("cart-modal-show")) {
      buyPopup.classList.remove("cart-modal-show");
    }
  }
});

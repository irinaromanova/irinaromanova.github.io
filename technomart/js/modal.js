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



  // Another 4 ways to make it work in IE

  // 1) const naturalPointsArr = Array.from(pointsArray);
  // 2) const naturalPointsArr = Array.prototype.slice.call(pointsArray);
  // он же - const naturalPointsArr = [].slice.call(document.querySelectorAll('.promo__slider-control'), 0);
  // 3) const naturalPointsArr = [...document.querySelectorAll('.promo__slider-control')];
  // 4) using standart cycle "for";

  // console.log(naturalPointsArr);



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

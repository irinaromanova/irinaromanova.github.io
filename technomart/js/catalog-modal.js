
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

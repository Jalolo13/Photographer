// Формы модалка
const modalFormOverlay = document.querySelector(".modal-form-overlay");
const modalForm = document.querySelector(".modal-form");
const modalFormOpen = document.querySelector(".contact-me");
const form = document.querySelector(".form");
let scrollPosition = window.pageYOffset;
let emailRegex =
	"^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
let nameRegex = "[a-z, а-я]";
let userObj = window.localStorage;

// Функции валидаиии
function setErrorMessage(elem, text) {
	elem.nextElementSibling.textContent = text;
}

function removeErrorMessage(elem) {
	elem.nextElementSibling.textContent = "";
}

function setBorderColor(elem, color) {
	elem.style.border = `2px solid ${color}`;
}

function setSuccess(elem) {
	elem.dataset.success = true;
}

function removeSuccess(elem) {
	elem.dataset.success = "";
}

function validateElem(elem, condition, text) {
	if (elem.value != "" && condition) {
		setBorderColor(elem, "green");
		setSuccess(elem);
		removeErrorMessage(elem);
		userObj.setItem(elem.name, elem.value);
	} else {
		setErrorMessage(elem, text);
		setBorderColor(elem, "red");
		removeSuccess(elem);
	}
}

// Валидация
if (form) {
	const userEmail = document.querySelector('.form input[name="email"]');
	const userName = document.querySelector('.form input[name="name"]');
	userObj.clear();
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		validateElem(
			userName,
			userName.value.match(nameRegex),
			"Введите корректное имя. В имени не должно быть чисел"
		);
		validateElem(userEmail, userEmail.value.match(emailRegex), "");
		console.log(userObj);
	});
}
// Модалка формы
modalFormOpen.addEventListener("click", (e) => {
	modalFormOverlay.classList.add("active");
	e.preventDefault();
	modalForm.classList.add("active");
	document.body.style.position = "absolute";
});

document.addEventListener("click", (e) => {
	if (
		e.target == modalFormOverlay &&
		modalFormOverlay.classList.contains("active")
	) {
		modalFormOverlay.classList.remove("active");
		modalForm.classList.remove("active");
		document.body.style.position = "static";
		document.documentElement.style.top = "";
	}
});

// Переменные Зум модалки
const imgOverlay = document.querySelectorAll(".section-img-overlay");
const modalOverlay = document.querySelector(".modal-overlay");
const galleryImg = document.querySelectorAll(".gallery-img");
const imgContent = document.querySelector(".img-content");

// Зум модалка
for (let i = 0; i < imgOverlay.length; i++) {
	imgOverlay[i].addEventListener("click", (e) => {
		modalOverlay.classList.toggle("active");
		imgContent.src = galleryImg[i].src;
		document.body.style.overflow = "hidden";
	});
}
document.addEventListener("click", (e) => {
	if (e.target == modalOverlay && modalOverlay.classList.contains("active")) {
		modalOverlay.classList.remove("active");
		document.body.style.overflow = "auto";
		document.body.style.position = "static";
	}
});

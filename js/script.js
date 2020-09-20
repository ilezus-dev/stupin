window.onload = function () {
  setTimeout(function () {
    document.body.classList.remove("hide")
  }, 300)
}

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

function setCoefficient () {
	var defaultHeight = 789
	var defaultCoefficient = 0.8
	var coefficient = window.innerHeight / defaultHeight * defaultCoefficient
	var normalizedCoefficient = coefficient > 1 ? 1 : coefficient < 0.4 ? 0.4 : coefficient
	var root = document.querySelector(":root")

	root.style.setProperty("--coefficient", normalizedCoefficient)
	root.style.setProperty("--coefficient-2", normalizedCoefficient - 0.3)

	return setCoefficient
}

setCoefficient()

if (window.innerWidth > 990) {
	var instance = new fullpage("#fullpage", {
		licenseKey: "B6BC1205-0D4C4A40-B4ECE2E7-85523C97",
		easingcss3: "cubic-bezier(0.76, 0, 0.24, 1)",
		scrollingSpeed: 1000,
		absoluteSlide: {
			element: document.getElementById("section4"),
			position: 4
		}
	})
}

document.querySelector("#email").onsubmit = function (event) {
	event.preventDefault()

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {};
	xhr.open('POST', '/mail.php');
	xhr.send("email=" + document.querySelector("input[type=email]").value)
	
	document.querySelector("#email .description").textContent = "Thank you!"
	document.querySelector("input[type=email]").value = ""
}

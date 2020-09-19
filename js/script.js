window.onload = function () {
  setTimeout(function () {
    document.body.classList.remove("hide")
  }, 300)
}

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

var timeout
var delay = 901
var fullpageElement = document.getElementById("fullpage")
var sectionElement = document.getElementById("section4")

function detectMouseWheelDirection( event ) {
    var delta = null
    var direction = false

    if (!event) {
      event = window.event;
    }

    if (event.wheelDelta) {
      delta = event.wheelDelta / 60;
    } else if (event.detail) {
      delta = -e.detail / 2;
    }

    if (delta !== null) {
      direction = delta > 0 ? 'up' : 'down';
    }

    return direction;
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

function mouseWheelHandle (event) {
	var id = event.currentTarget.id
	var direction = detectMouseWheelDirection(event)

	if (window.fullpageSlide === 3 && id === "fullpage" && direction === "down") {
		event.stopPropagation()
		sectionElement.classList.remove("top")
		sectionElement.classList.add("show")
	} 

	if (id === "section4" && direction === "up") {
		event.stopPropagation()
		sectionElement.classList.remove("show")
	}
}

setCoefficient()

if (window.innerWidth > 990) {
	var instance = new fullpage("#fullpage", {
		licenseKey: "B6BC1205-0D4C4A40-B4ECE2E7-85523C97",
		easingcss3: "cubic-bezier(0.76, 0, 0.24, 1)",
		scrollingSpeed: delay,
		onLeave: function (section, destination, direction) {
			clearTimeout(timeout)
			timeout = setTimeout(function () {
				window.fullpageSlide = destination.index
			}, delay)
		}
	})

	sectionElement.classList.add("absolute", "top")

	fullpageElement.onmousewheel = mouseWheelHandle;
	fullpageElement.addEventListener('DOMMouseScroll', mouseWheelHandle)
	sectionElement.onmousewheel = mouseWheelHandle;
	sectionElement.addEventListener('DOMMouseScroll', mouseWheelHandle);
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

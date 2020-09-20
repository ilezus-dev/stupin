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

function detectMouseWheelDirection( event ) {
    var delta = null
    var direction = false

    if (!event) {
      event = window.event;
    }

    if (event.wheelDelta) {
      delta = event.wheelDelta / 60;
    } else if (event.detail) {
      delta = -event.detail / 2;
    }

    if (delta !== null) {
      direction = delta > 0 ? 'up' : 'down';
    }

    return direction;
}

var slideTimeout
var delay = 1001
var sectionElement = document.getElementById("section4")
var fullpageElement = document.getElementById("fullpage")
var wrapper = document.querySelector(".wrapper")
var isFirefox = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1

if (window.innerWidth > 990) {
	if (!isFirefox) {
		sectionElement.classList.add("absolute", "top")
	} else {
		fullpageElement.appendChild(sectionElement)
	}

	var instance = new fullpage("#fullpage", {
		licenseKey: "B6BC1205-0D4C4A40-B4ECE2E7-85523C97",
		easingcss3: "cubic-bezier(0.76, 0, 0.24, 1)",
		scrollingSpeed: delay,
		onLeave: function (section, destination, direction) {
			if (!destination.isLast) {
				setLock(false, destination.index)

				if (direction === "down") {
					section.item.classList.add("translate")
				} else {
					destination.item.classList.remove("translate")
				}
			} else {
				setLock(true, destination.index)
			}
		}
	})

	wrapper.onmousewheel = mouseWheelHandle;
	wrapper.addEventListener('DOMMouseScroll', mouseWheelHandle);
}

function setLock (isLock, slide) {
	clearTimeout(slideTimeout)
	slideTimeout = setTimeout(function () {
		window.isLock = isLock

		if (slide) {
			window.slide = slide
		}

		slideTimeout = null
	}, delay)
}

function mouseWheelHandle (event) {
	if (isFirefox) {
		return
	}

	var direction = detectMouseWheelDirection(event)
	var isFullPage = event.currentTarget.contains(sectionElement)

	if (window.slide === 3 && direction === "down") {
		event.stopPropagation()
		sectionElement.classList.remove("top")
		sectionElement.classList.add("show")

		if (!slideTimeout) {
			setLock(true)
		}
	}

	if (window.isLock) {
		event.stopPropagation()

		if (direction === "down") {
			sectionElement.classList.remove("top")
			sectionElement.classList.add("show")
			if (!slideTimeout) {
				setLock(true)
			}
		} else {
			sectionElement.classList.remove("show")
			if (!slideTimeout) {
				setLock(false)
			}
		}
	}

	if (isFullPage && direction === "up") {
		sectionElement.classList.remove("show")
		if (!slideTimeout) {
			setLock(false)
		}
	}
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

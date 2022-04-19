// namespace obj
const app = {};

// target form element
app.formEl = document.querySelector("form");

app.randomizeUserPicture = () => {
	// array containing image options from assets
	const photoArr = [
		"profile-image-1.jpg",
		"profile-image-2.jpg",
		"profile-image-3.jpg",
		"profile-image-4.jpg",
		"profile-image-5.jpg",
		"profile-image-6.jpg",
		"profile-image-7.jpg",
		"profile-image-8.jpg",
	];
	// randomize index of image
	const index = Math.floor(Math.random() * photoArr.length);
	// return image name
	return photoArr[index];
};

app.getDateString = () => {
	// generate random date
	const randDate = app.getRandomDate(new Date(2018, 9, 1), new Date());

	// extract day/month indices
	const day = randDate.getDay();
	const month = randDate.getMonth();
	const year = randDate.getFullYear();

	// weekday array
	const dayNames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	// month name array
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	// depending on day, return different string
	if (day === 3 || day === 23) {
		return `${dayNames[day]} ${monthNames[month]} ${day}rd, ${year}`;
	} else if (day === 2 || day === 22) {
		return `${dayNames[day]} ${monthNames[month]} ${day}nd, ${year}`;
	} else if (day === 1 || day === 21) {
		return `${dayNames[day]} ${monthNames[month]} ${day}st, ${year}`;
	} else {
		return `${dayNames[day]} ${monthNames[month]} ${day}th, ${year}`;
	}
};

app.getRandomDate = (start, end) => {
	// create a random date between two dates (start/end)
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
};

app.clearCommentForm = (name, email, comment) => {
	name.value = "";
	email.value = "";
	comment.value = "";
};

app.addElemStyling = (liElem, hElem, textContainerElem, imgContainerElem) => {
	// add styling to elements
	liElem.classList.add("user-profile");
	hElem.classList.add("comment-date");
	textContainerElem.classList.add("text-container");
	imgContainerElem.classList.add("image-container");
};

app.addRandomImage = (imgElem) => {
	// add random image
	const imageName = app.randomizeUserPicture();
	imgElem.setAttribute("src", `./assets/${imageName}`);
};

app.checkLength = (input, charLimit) => {
	// compare string length against character limit
	if (input.value.length > charLimit) {
		return false;
	}
	return true;
};

app.checkEmpty = (input) => {
	// check for whitespace or empty string
	const regex = /^\s+$/;
	if (regex.test(input.value) || input.value === "") {
		return false;
	}
	return true;
};

app.validateInputs = (userName, userEmail, userComment) => {
	// prevent users from entering blanks in the name, email, or comment fields
	try {
		// check character length
		if (!app.checkLength(userName, 15))
			throw "name too long (15 character limit)";
		if (!app.checkLength(userComment, 250))
			throw "comment is too long (250 character limit)";
		if (!app.checkLength(userEmail, 50))
			throw "email is too long (50 character limit)";
		// check for blank inputs
		if (!app.checkEmpty(userName))
			throw "name is blank, please enter a name";
		if (!app.checkEmpty(userEmail))
			throw "email is blank, please enter email";
		if (!app.checkEmpty(userComment))
			throw "comment is blank, please enter a comment";
	} catch (e) {
		alert(e);
		return false;
	}
	return true;
};

app.setupForm = (event) => {
	// prevent refresh on submit
	event.preventDefault();

	// get raw user input from form:
	const userName = document.querySelector("#user-name");
	const userEmail = document.querySelector("#user-email");
	const userComment = document.querySelector("#user-comment");

	// validate user input, if it passes, continue executing
	if (app.validateInputs(userName, userEmail, userComment)) {
		// target ul containing comments
		const ulElem = document.querySelector("#comment-list");

		// create elements to store input
		const pElem = document.createElement("p");
		const liElem = document.createElement("li");
		const hElem = document.createElement("h6");
		const textContainerElem = document.createElement("div");
		const imgContainerElem = document.createElement("div");
		const imgElem = document.createElement("img");

		// trim whitespace from user name
		const trimmedName = userName.value.trim();

		// add css classes to form elements
		app.addElemStyling(liElem, hElem, textContainerElem, imgContainerElem);

		// add user input to elements with random date
		hElem.textContent = `${app.getDateString()} by ${trimmedName}`;
		pElem.textContent = userComment.value;

		// add a random image to comment
		app.addRandomImage(imgElem);

		// append elements to containers
		imgContainerElem.appendChild(imgElem);
		textContainerElem.appendChild(hElem);
		textContainerElem.appendChild(pElem);

		// append containers to li
		liElem.appendChild(imgContainerElem);
		liElem.appendChild(textContainerElem);

		// append li to ul
		ulElem.appendChild(liElem);

		// clear the form content
		app.clearCommentForm(userName, userEmail, userComment);
	}
};

app.init = () => {
	// set event listener on form submit
	app.formEl.addEventListener("submit", app.setupForm);
};

// check for document ready
document.addEventListener("DOMContentLoaded", (event) => {
	app.init();
});

// Comment Feed

// Requirements:
// Take user input in comment form
// Sanitize user inputs
// Create li element in ul.comment-list
// Add user input to paragraph element
// Build a string to put in the h6.comment-date element using user name and current date
// Autofill a user photo from unsplash
// Append li element to ul.comment-list

//-------------------------
// VARIABLES
//-------------------------

// Special characters to escape for user input
const entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
	"/": "&#x2F;",
	"`": "&#x60;",
	"=": "&#x3D;",
};

//-------------------------
// TARGET ELEMENTS
//-------------------------

// Take user input in comment form
const formEl = document.querySelector("form");

//-------------------------
// FUNCTIONS
//-------------------------

// randomizes image name
function randomizeUserPicture() {
	// array containing image options
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
}

// creates a random date string (Wednesday January 10th, 2022)
function getDateString() {
	// generate random date
	const randDate = getRandomDate(new Date(2018, 9, 1), new Date());

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

	// weekday array
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
}

// creates a random date based on start/end date range
function getRandomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

// clear form inputs
function clearCommentForm(name, email, comment) {
	name.value = "";
	email.value = "";
	comment.value = "";
}

//-------------------------
// EVENT LISTENERS
//-------------------------
formEl.addEventListener("submit", function (event) {
	// prevent refresh
	event.preventDefault();

	// get raw user input from form:
	const userName = document.querySelector("#user-name");
	const userEmail = document.querySelector("#user-email");
	const userComment = document.querySelector("#user-comment");

	// target ul containing comments
	const ulElem = document.querySelector("#comment-list");

	// create elements to store input
	const pElem = document.createElement("p");
	const liElem = document.createElement("li");
	const h6Elem = document.createElement("h6");
	const textContainerElem = document.createElement("div");
	const imgContainerElem = document.createElement("div");
	const imgElem = document.createElement("img");

	// add styling to elements
	liElem.classList.add("user-profile");
	h6Elem.classList.add("comment-date");
	textContainerElem.classList.add("text-container");
	imgContainerElem.classList.add("image-container");

	// generate random date
	const commentDate = getDateString();

	// add user input to elements
	h6Elem.textContent = `${commentDate} by ${userName.value}`;
	pElem.textContent = userComment.value;

	// add random image
	const imageName = randomizeUserPicture();
	imgElem.setAttribute("src", `./assets/${imageName}`);

	// append elements to containers
	imgContainerElem.appendChild(imgElem);
	textContainerElem.appendChild(h6Elem);
	textContainerElem.appendChild(pElem);

	// append containers to li
	liElem.appendChild(imgContainerElem);
	liElem.appendChild(textContainerElem);

	// append li to ul
	ulElem.appendChild(liElem);

	// clear the form content
	clearCommentForm(userName, userEmail, userComment);
});

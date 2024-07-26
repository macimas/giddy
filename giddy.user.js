// ==UserScript==
// @name         Giddy
// @description  apply css to your github pages!
// @version      test

// @namespace    https://github.com/macimas
// @author       macimas (https://macimas.github.io)

// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com

// @run-at       document-end

// @grant        unsafeWindow
// @grant        window.onurlchange
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==

function getCookieCrumb(id) {
	return document.cookie
		.split("; ")
		.find((crumb) => crumb.startsWith(id + "="))
		?.split("=")[1];
}

function htemplate(layout) {
	let node_count = 0;

	function createNode(tag, attributes, layout) {
		const node = document.createElement(tag);

		for (const attribute in attributes) {
			const value = attributes[attribute];

			if (attribute == "it") {
				value(node);
				continue;
			}

			node[attribute] = value;
		}

		if (layout) {
			node.append(...createNodes(layout));
		}

		node_count++;

		return node;
	}

	function createNodes(layout) {
		const nodes = [];

		for (const item of layout) {
			if (typeof item == "string") {
				nodes.push(item);
			}

			if (Array.isArray(item)) {
				const node = createNode(...item);
				nodes.push(node);
			}
		}

		return nodes;
	}

	const nodes = createNodes(layout);
	const result = (nodes.length == 1)
		? nodes[0] || null
		: nodes;

	//console.log(`created ${node_count} nodes`, result);

	return result;
}

const profile_css = htemplate([
	["style", {
		id: "giddy_profile_css"
	}]
]);
const general_css = htemplate([
	["style", {
		id: "giddy_general_css",
		innerText: (`
footer.footer
{ position: relative }

footer.footer::before {
	content: "";
	z-index: -1;
	position: absolute;
	top: 14px;
	bottom: 0;
	left: 0;
	right: 0;

	background: var(--bgColor-default);
	border-top: var(--borderWidth-thin) solid var(--borderColor-default);
}

/* overview */

.graph-before-activity-overview
{ background: var(--bgColor-default) }

.graph-before-activity-overview
{ border-radius: var(--borderRadius-medium) }

.js-yearly-contributions:has(.activity-overview-box) .graph-before-activity-overview {
	border-bottom-left-radius: unset;
	border-bottom-right-radius: unset;
}

.js-profile-timeline-year-list {
	background-color: unset !important;
}

.filter-list.small {
	overflow: hidden;
	border: var(--borderWidth-thin) solid var(--borderColor-default);
	border-radius: var(--borderRadius-medium) !important;
}

.filter-list.small li:last-child .filter-item
{ border-bottom: unset !important }

.filter-list.small .filter-item {
	margin-bottom: unset !important;
	border-radius: unset;
	border-bottom: var(--borderWidth-thin) solid var(--borderColor-default);
}

.filter-list.small .filter-item:not(.selected, :hover) {
	background: var(--bgColor-default);
}

.filter-list.small .filter-item.selected {
	border-color: var(--bgColor-default);
}

.contribution-activity-listing {
	width: 100%;
	padding: 16px;
	background: var(--bgColor-default);
	border: var(--borderWidth-thin) solid var(--borderColor-default);
	border-bottom: unset;
}

.contribution-activity-listing:nth-child(3) {
	border-top-left-radius: var(--borderRadius-medium);
	border-top-right-radius: var(--borderRadius-medium);
}

.contribution-activity-listing:last-of-type {
	margin-bottom: 8px;
	border-bottom: var(--borderWidth-thin) solid var(--borderColor-default);
	border-bottom-left-radius: var(--borderRadius-medium);
	border-bottom-right-radius: var(--borderRadius-medium);
}

.contribution-activity-listing > div {
	padding: unset !important;
	padding-right: 16px !important;
}

.contribution-activity-listing > div > h3 {
	position: relative;
	border-bottom: unset !important;
	font-size: 16px !important;
	padding-left: 40px;
}

.contribution-activity-show-more {
	border-radius: var(--borderRadius-medium) !important;
}

.contribution-activity-listing > div > h3 span
{ padding: unset !important }

.TimelineItem:last-child::before
{ height: 18px }

/* repositories */

#user-profile-frame > div > div:first-child
{ border-bottom: unset !important }

#user-repositories-list {
	background: var(--bgColor-default);
	border: var(--borderWidth-thin) solid var(--borderColor-default);
	border-radius: var(--borderRadius-medium);
}

#user-repositories-list li
{ padding: 16px !important }

#user-repositories-list li:last-child
{ border-bottom: unset !important }

#user-repositories-list .paginate-container
{ display: none }

/* stars */

.blankslate-spacious {
	background: var(--bgColor-default) !important;
	border-radius: var(--borderRadius-medium) !important;
}

.col-lg-12 > div.d-block {
	padding: 16px !important;
	background: var(--bgColor-default);
	border: var(--borderWidth-thin) solid var(--borderColor-default);
}

.col-lg-12 > div.d-block:nth-child(3) {
	margin-top: 20px;
	border-top-left-radius: var(--borderRadius-medium);
	border-top-right-radius: var(--borderRadius-medium);
}

.col-lg-12 > div.d-block:last-of-type {
	border-bottom-left-radius: var(--borderRadius-medium);
	border-bottom-right-radius: var(--borderRadius-medium);
}

.col-lg-12 > div.d-block:not(:last-of-type) {
	border-bottom: unset !important;
}
		`)
	}]
]);

document.documentElement.append(profile_css);
document.documentElement.append(general_css);
//general_css.innerText = null;

let giddy_profile_css_enabled = JSON.parse(localStorage.giddy_profile_css_enabled || null) ?? true;
let last_username;

function toggleGiddy() {
	giddy_profile_css_enabled = !giddy_profile_css_enabled;
	localStorage.giddy_profile_css_enabled = giddy_profile_css_enabled;
	buildMenu();
}

function buildMenu() {
	const text = (giddy_profile_css_enabled)
		? "Disable"
		: "Enable"

	GM_unregisterMenuCommand("toggle_giddy");

	GM_registerMenuCommand(`${text} profile CSS`, toggleGiddy, {
		id: "toggle_giddy"
	});

	if (giddy_profile_css_enabled) {
		last_username = null;
		addProfileCSS();
	} else {
		profile_css.innerHTML = null;
	}
}

async function addProfileCSS(event) {
	if (!giddy_profile_css_enabled) return;

	const is_profile_page = !!document.querySelector("body.page-profile");
	const username = location.pathname.slice(1);

	if (!is_profile_page || username.includes("/")) {
		profile_css.innerHTML = null;
		last_username = null;
		return;
	}

	if (last_username == username) return;
	last_username = username;

	profile_css.innerHTML = null;

	const fetch_data_url = `https://raw.githubusercontent.com/macimas/giddy/main/index/${username}`;
	const fetch_data = await fetch(fetch_data_url).then((res) => {
		if (res.status == 404) console.log(username, "does not have profile css");
		return res;
	});

	if (!fetch_data.ok) return;
	const data = (await fetch_data.text()).split("\n");
	const hash = data[0];

	const fetch_base_url = `https://raw.githubusercontent.com/${username}/${username}/${hash}/`;
	const fetch_css = await fetch(fetch_base_url + "giddy.css").then((res) => {
		if (res.status == 404) console.log(`something stupid is going on`);
		return res;
	});

	if (!fetch_css.ok) return;
	let css = (await fetch_css.text())
		.replace(/(url\(["']?)\.\//g, "$1" + fetch_base_url);

	profile_css.innerHTML = css;
	console.log(username, "has profile css");
}

new MutationObserver(addProfileCSS)
	.observe(document.body, { attributes: true });

buildMenu();

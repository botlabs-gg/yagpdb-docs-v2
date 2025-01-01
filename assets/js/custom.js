// self-hosting view
function getSelfhost() {
	return localStorage.getItem('selfhost') || 'no';
}

function setSelfhost(enabled) {
	localStorage.setItem('selfhost', enabled);
	document.documentElement.setAttribute('data-selfhost', enabled);
}

function initSelfhostToggle() {
	setSelfhost(getSelfhost());
	document.querySelectorAll('[data-selfhost-value]').forEach((element) => {
		element.addEventListener('click', () => {
			const selfhost = element.getAttribute('data-selfhost-value');
			setSelfhost(selfhost);
		});
	});
}

if (document.readyState !== 'loading') {
	initSelfhostToggle();
} else {
	document.addEventListener('DOMContentLoaded', initSelfhostToggle);
}

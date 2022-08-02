(function () {
	'use strict';

	var
		d = document,
		w = window;


	// Helper Functions
	function inViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	function main(selector) {
		var nodes = [], nodelist, i;

		if (selector) {

			if (selector instanceof Element || selector instanceof Document) {
				// DOM Element
				nodes = [selector];
			}
			else {
				// String
				nodelist = d.querySelectorAll(selector);

				for (i = 0; i < nodelist.length; i += 1) {
					nodes[i] = nodelist[i];
				}
			}
		}

		// Public Functions
		nodes.toggle = (cl) => {
			nodes.forEach(node => {
				node.classList.toggle(cl);
			});
		}

		nodes.add = (cl) => {
			nodes.forEach(node => {
				node.classList.add(cl);
			});
		}

		nodes.remove = (cl) => {
			nodes.forEach(node => {
				node.classList.remove(cl);
			});
		}

		nodes.checkbefore = (check = false, cb = () => {}) => {
			nodes.forEach(form => {
				form.onsubmit = (e) => {
					if (!check()) {
						e.preventDefault();
						cb();
					}
				}
			});
		}

		nodes.visibilityChange = (cb, invert = false) => {
			nodes.forEach(el => {
				let visible = invert ? !inViewport(el) : inViewport(el);
				let observer = new IntersectionObserver(() => {
					cb(visible);
					visible = !visible;
				});
				observer.observe(el);
			});
		}

		nodes.hideInitAnim = () => {
			nodes.forEach(el => {
				const miliseconds = parseFloat((getComputedStyle(el).animationDuration).replace("s", "")) * 1000;

				setTimeout(() => {
					el.style.setProperty("opacity", "1", "important");
				}, miliseconds);
			});
		}

		return nodes;
	}

	w.$ = main;

}());

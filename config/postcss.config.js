import autoprefixer from 'autoprefixer';
import purgeCSSPlugin from '@fullhuman/postcss-purgecss';

const purgecss = purgeCSSPlugin({
  content: ['./hugo_stats.json'],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  },
	dynamicAttributes: [
		'aria-expanded',
		'aria-selected',
		'data-bs-popper',
		'data-bs-target',
		'data-bs-theme',
		'data-dark-mode',
		'data-global-alert',
		'data-pane', // tabs.js
		'data-popper-placement',
		'data-selfhost',
		'data-sizes',
		'data-toggle-tab', // tabs.js
		'id',
		'size',
		'type',
	],
	safelist: [
		'active',
		'btn-clipboard', // clipboards.js
		'clipboard', // clipboards.js
		'disabled',
		'hidden',
		'modal-backdrop', // search-modal.js
		'selected', // search-modal.js
		'show',
		'img-fluid',
		'blur-up',
		'lazyload',
		'lazyloaded',
		'alert-link',
		'container-fw ',
		'container-lg',
		'container-fluid',
		'offcanvas-backdrop',
		'figcaption',
		'dt',
		'dd',
		'showing',
		'hiding',
		'page-item',
		'page-link',
	],
});

export default {
  plugins: [
    autoprefixer(),
    purgecss,
  ],
};

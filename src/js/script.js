// *** LIGHTBOX ***
document.addEventListener('DOMContentLoaded', () => {
	const dialog = document.querySelector('#lightbox');
	if (!dialog) return;

	const dialogImg = dialog.querySelector('img');

	// Select all thumbnails that have a data-full-img attribute
	const thumbs = document.querySelectorAll('img[data-full-img]');

	thumbs.forEach((thumb) => {
		thumb.addEventListener('click', (e) => {
			const full = thumb.dataset.fullImg;
			if (!full) return;

			// Update dialog image and show modal
			dialogImg.src = full;
			dialogImg.alt = thumb.alt || '';
			if (typeof dialog.showModal === 'function') {
				dialog.showModal();
				document.body.classList.add('dialog-open');
			} else {
				// Fallback: make visible if dialog not supported
				dialog.setAttribute('open', '');
				document.body.classList.add('dialog-open');
			}
		});
	});

	// Close when clicking on the backdrop / dialog itself (but not when clicking the image)
	dialog.addEventListener('click', (e) => {
		if (e.target === dialog) {
			if (typeof dialog.close === 'function') {
				dialog.close();
				document.body.classList.remove('dialog-open');
			} else {
				dialog.removeAttribute('open');
				document.body.classList.remove('dialog-open');
			}
		}
	});

	// Close on Escape key as well
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && dialog.hasAttribute('open')) {
			if (typeof dialog.close === 'function') dialog.close();
			else dialog.removeAttribute('open');
			document.body.classList.remove('dialog-open');
		}
	});

	// Ensure body class is removed when dialog fires the close event (native dialogs)
	dialog.addEventListener('close', () => {
		document.body.classList.remove('dialog-open');
	});
});

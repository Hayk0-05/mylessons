window.addEventListener('DOMContentLoaded', function() {
	const geoSpan = document.querySelector('.header-geo');
	if (!geoSpan) return;
	const iconHTML = geoSpan.innerHTML;
	function setCity(city) {
		geoSpan.innerHTML = iconHTML + ' ' + (city ? `<a>${city}</a>` : 'Не разрешено');
	}
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			// Используем бесплатный API Nominatim для обратного геокодирования
			fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ru`)
				.then(response => response.json())
				.then(data => {
					let city = data.address.city || data.address.town || data.address.village || data.address.settlement || data.address.state;
					setCity(city);
				})
				.catch(() => setCity(null));
		}, function(error) {
			setCity(null);
		});
	} else {
		setCity(null);
	}
});
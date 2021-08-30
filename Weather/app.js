const ui = new UI();
const storage = new Storage();
const weather = new Weather(storage.getLocation().city, storage.getLocation().state);
document.addEventListener('DOMContentLoaded', getWeather);
document.getElementById('w-change-btn').addEventListener('click',(e) => {
	const city = document.getElementById('city').value;
	const state = document.getElementById('state').value;
	storage.setLocation(city,state);
	getWeather();

	$('#loc-modal').modal('hide');

})	

function getWeather() {
	weather.changeLocation(storage.getLocation().city,storage.getLocation().state);
	weather.getWeather().then(data => {
		ui.display(data);
	}).catch(err => {
		storage.setDefaultLocation();
		getWeather();
		console.log(err);
	})	
}

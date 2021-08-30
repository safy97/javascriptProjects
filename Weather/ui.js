class UI{
	constructor(){
		this.location = document.getElementById('w-location');
		this.desc = document.getElementById('w-desc');
		this.string = document.getElementById('w-string');
		this.details = document.getElementById('w-details');
		this.icon = document.getElementById('w-icon');
		this.humidity = document.getElementById('w-humidity');
		this.temp = document.getElementById('w-temp');
		this.feelsLike = document.getElementById('w-feels-like');
		this.pressure = document.getElementById('w-pressure');
	}

	display(data){
		this.location.textContent = data.name + " , " + data.sys.country;
		this.desc.textContent = data.weather[0].main;
		this.string.textContent = data.weather[0].description;
		this.icon.setAttribute('src','https://openweathermap.org/img/wn/'+data.weather[0].icon+'.png');
		this.humidity.textContent = `Relative Humidty: ${data.main.humidity}`;
		this.temp.textContent = `Temperature: ${data.main.temp}`;
		this.feelsLike.textContent = `Feels Like: ${data.main.feels_like}`;
		this.pressure.textContent = `Pressure: ${data.main.pressure}`;
	}
}
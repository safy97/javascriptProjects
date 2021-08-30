class Weather{
	constructor(city, state){
		this.key = '06cb76c0f65a2534b357f0d673cdbaae';
		this.city = city;
		this.state = state;
	}

	async getWeather(){
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.key}`)
		const reponseData = await response.json();
		return reponseData;
	}

	changeLocation(city,state){
		this.city = city;
		this.state = state;
	}

}
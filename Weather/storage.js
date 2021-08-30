class Storage{
	constructor(){
		this.city;
		this.state;
		this.defaultCity = 'Alexandria';
		this.defaultState = 'EG'
	}

	setLocation(city , state){
		localStorage.setItem('city',city);
		localStorage.setItem('state',state);
	}

	getLocation(){
		if(localStorage.getItem('city') === null){
			this.city = this.defaultCity;
		}else{
			this.city = localStorage.getItem('city');
		}

		if(localStorage.getItem('state') === null){
			this.state = this.defaultState;
		}else{
			this.state = localStorage.getItem('state');
		}
		return {
			city: this.city,
			state: this.state
		}


	}

	setDefaultLocation(){
		localStorage.setItem('city', this.defaultCity);
		localStorage.setItem('state',this.defaultState)
	}
}
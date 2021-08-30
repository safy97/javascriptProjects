document.addEventListener('DOMContentLoaded',function () {
	document.getElementById('results').style.display = 'none';
	document.getElementById('loading').style.display = 'none';
});
document.getElementById('loan-form').addEventListener('submit',function (e) {
	document.getElementById('results').style.display = 'none';
	document.getElementById('loading').style.display = 'block';
	setTimeout(calculateResults, 2000);
	e.preventDefault();
});

function calculateResults() {
	const UIamount = document.getElementById('amount');
	const UIinterest = document.getElementById('interest');
	const UIyears = document.getElementById('years');

	const UImonthlyPayment = document.getElementById('monthly-payment');
	const UItotalPayment = document.getElementById('total-payment');
	const UItotalInterest = document.getElementById('total-interest');

	const principal = parseFloat(UIamount.value);
	const calculatedInterset = parseFloat(UIinterest.value) / 100 /12;
	const calculatedPayments = parseFloat(UIyears.value) * 12;

	const x = Math.pow(1 + calculatedInterset, calculatedPayments);
	const monthly = (principal*x*calculatedInterset)/(x-1);

	if(isFinite(monthly)){
		UImonthlyPayment.value = monthly.toFixed(2);
		UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
		UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
		document.getElementById('results').style.display = 'block';
		document.getElementById('loading').style.display = 'none';
	
	}else{
		showError('please check your numbers');
	}
}

function showError(error) {
	document.getElementById('results').style.display = 'none';
	document.getElementById('loading').style.display = 'none';
	
	const errorDiv = document.createElement('div');

	errorDiv.className = 'alert alert-danger';

	errorDiv.appendChild(document.createTextNode(error));

	const card = document.querySelector('.card');

	const heading = document.querySelector('.heading');

	card.insertBefore(errorDiv,heading);

	setTimeout(clearError, 3000);

}

function clearError() {
	document.querySelector('.alert').remove();
}
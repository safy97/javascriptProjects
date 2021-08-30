let min = 1,
	max = 10,
	answer = getRandom(min,max),
	guessLeft = 3;

const UIgame = document.getElementById('game');
const UIminNum = document.getElementById('min-num');
const UImaxNum = document.getElementById('max-num');
const UIguessInput = document.getElementById('guess-input');
const UIguessValue = document.getElementById('guess-value');
const UImessage = document.getElementById('message');

UIminNum.textContent = min;
UImaxNum.textContent = max;

UIguessValue.addEventListener('click', function (e) {
	let guess = parseInt(UIguessInput.value);
	if(isNaN(guess)|| guess < min || guess > max){
		setMessage(`Please enter a number between ${min} and ${max}`,'red');
	}else {
		if(guess === answer){
			// Disable input
			gameOver(true,`${answer} is correct! , you win`);
		}else{
			guessLeft -=1;
			if(guessLeft === 0){
				gameOver(false,`Game over, you lost, the correct number was ${answer}`);
			}else{
				UIguessInput.value= '';
				setMessage(`${guess} is not correct, ${guessLeft} guesses left`, 'red');
			}
		}
	}

});

function gameOver(won,msg){
	let color ;
	color = (won === true)? 'green':'red';
	UIguessInput.disabled = true;
	setMessage(msg,color);
	UIguessValue.value = "play again";
	UIguessValue.addEventListener('click',function(e){
		window.location.reload();
	})

}
function setMessage(msg,color){
	UIguessInput.style.borderColor = color;
	message.style.color = color;
	message.textContent = msg;
}

function getRandom(min,max) {
	 let random = Math.floor(Math.random()*(max-min+1) + min);
	 return random;
}
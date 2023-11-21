//I made this, now I do not know how it works.


let inputs = document.querySelectorAll('.button.input');

let operators = Array.from(inputs).filter(e=>e.classList.contains('operator')).map(e=>e.innerText)

let clear = document.querySelector('.button.clear')
let del = document.querySelector('.button.delete')

let dipSmall = document.querySelector('.display.small').firstChild;
let dipBig = document.querySelector('.display.big').firstChild;

let op = ''

inputs.forEach(e=>e.addEventListener('click', i=>{
	let wholeEx = dipBig.innerText;
	let append = i.target.innerText;
	let curPart = ''
	let newEx = ''
	
	if((append==='=' && !wholeEx.length) || (operators.includes(append) && !wholeEx.length) || (append === '0' && !wholeEx.length)) return;
	
	if(append === '.' ){
		if(wholeEx.length > 9) return;
		
		if(wholeEx.includes(operators.filter(o=>wholeEx.includes(o))[0])){
			curPart = wholeEx.split(operators.filter(i=>wholeEx.includes(i))[0])[1]
			if(curPart.includes(append)) return;
			newEx = wholeEx + append;
		}else {
			curPart = wholeEx
			if(curPart.includes(append)) return;
			newEx = wholeEx + append;
		}
	}
	else if(append === '='){
		if(op.length != 0){
			 if(wholeEx.split(op).every(i=>i.length > 0) && wholeEx.split(op).length > 1){
				newEx = equals(wholeEx);
			}else {
				return;
			}
		}else return;
	}
	else if(operators.includes(append)){
		if(wholeEx.length > 9) return;
		
		if(operators.includes(wholeEx.slice(-1))){
			newEx = wholeEx.slice(0,-1) + append;
		}else if(wholeEx.includes(operators.filter(o=>wholeEx.includes(o))[0])){
			console.log(wholeEx);
			newEx = equals(wholeEx) + append;
			
		}else {
			newEx = wholeEx + append;
		}
		op = append;
		console.log(op)
		//default
	}else{
		if(wholeEx.length > 9) return;
		newEx = wholeEx + append;
	}
	
	dipBig.innerText = newEx;
}))

function equals(curr){
	let results = 0;
	dipSmall.innerText = curr;
	let nums = curr.split(op).map(n=>parseFloat(n));
	console.log(nums)
	switch (op) {
		case operators[0]:
			results = nums[0]/nums[1]
			break;
		case operators[1]:
			results = nums[0]*nums[1]
			break;
		case operators[2]:
			results = nums[0]-nums[1]
			break;
		case operators[3]:
			results = nums[0]+nums[1]
			break;
	}
	return Math.round((results + Number.EPSILON) * 100) / 100;
}

// clear button
clear.addEventListener('click', e=>{
	dipBig.innerText = '';
	dipSmall.innerText = '0';
	op = '';
});
// delete button
del.addEventListener('click', e=>{
	dipBig.innerText = dipBig.innerText.slice(0,-1);
});
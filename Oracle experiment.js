function runOracle(f){
	let numTests = 20; // Change this to some reasonably large value
	for (let i = 0; i < numTests; ++i) {
		let n = 3; // Change this to some reasonable size
		let compPref = generateInput(n);
		let candPref = generateInput(n);
		console.log(candPref);
		console.log(compPref);

		let trace = f(compPref, candPref);
		//for(let i = 0; i < trace.trace.length; ++i){
			//trace.trace[i].fromCo = false;
		//}

		console.log(trace);
		test('Test Track', function() {
			assert(traceTest(trace, compPref, candPref));

		});

		test('Length', function() {
			assert(trace.out.length <= n);


	});
	}
	
}

function traceTest(t, comp, cand){
	let compMatchings  = [];
	let candMatchings = [];
	let offerArray = t.trace;
	let hireArray = t.out;
	for(let i = 0; i < comp.length; ++i){ 
		compMatchings.push(-1);
		candMatchings.push(-1);
	}

	for(let i = 0; i < offerArray.length; ++i){
		console.log(candMatchings);
		console.log(compMatchings);

		let curr = offerArray[i];

		if(curr.fromCo){
				let company = curr.from;
				let candidate = curr.to;

			//check if company is already matched
			if(compMatchings[company] !== -1){
				//invaid trace
				return false;
			}
			//if both unmatched
			if(compMatchings[company] === -1 && candMatchings[candidate] === -1){
				compMatchings[company] = candidate;
				candMatchings[candidate] = company;

				continue;
			}
			//if candidate is already matched
			if(candMatchings[candidate] !== -1){
				let candCurr = candMatchings[candidate];
				let currRank = cand[candidate].indexOf(candCurr);
				let offerRank = cand[candidate].indexOf(company);
				if(offerRank < currRank){
					compMatchings[candCurr] = -1;
					compMatchings[company] = candidate;
					candMatchings[candidate] = company;


				}else{
					continue;
				}
			}
		
		}

	if(!curr.fromCo){
			let candidate = curr.from;
			let company = curr.to;
		//check if company is already matched
		if(candMatchings[candidate] !== -1){
			//invaid trace
			return false;
		}
		//if both unmatched
		if(compMatchings[company] === -1){
			candMatchings[candidate] = company;
			compMatchings[company] = candidate;

			continue;
		}

		if(compMatchings[company] !== -1){
			let compCurr = compMatchings[company];
			let currRank = comp[company].indexOf(compCurr);
			console.log(currRank);
			let offerRank = comp[company].indexOf(candidate);
			console.log(offerRank);
			if(offerRank < currRank){
				candMatchings[compCurr] = -1;
				candMatchings[candidate] = company;
				compMatchings[company] = candidate;


			}else{
				continue;
			}
		}
		
	}


}
	
	let isSame = true;
	console.log(candMatchings);
	console.log(compMatchings);

	

	for(let i = 0; i < hireArray.length; ++i){
		let currentOut = hireArray[i];
		if(compMatchings[currentOut.company] !== currentOut.candidate){
			isSame = false;
			break;
		}
		if(candMatchings[currentOut.candidate] !== currentOut.company){
			isSame = false;
			break;
	  }


	}
	
	return isSame;


}


//const oracleLib = require('oracle');
//runOracle(oracleLib.traceWheat1);
//runOracle(oracleLib.traceChaff1);





function generateInput(n) {
	let array = [];
	while (array.length !== n) {
		let basic = [];
		for (let i = 0; i < n; ++i) {
			basic.push(i);
		}
		array.push(shuffle(basic));

	}
	return array;

}

function shuffle(array) {
	let randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;


	let copy = array.splice(0, array.length);
	let i = copy.length;
	let newArray = [];

	while (i !== 0) {
		let randomNum = randomInt(0, i);
		newArray.push(copy.splice(randomNum, 1)[0]);
		--i;
	}
	return newArray;
}
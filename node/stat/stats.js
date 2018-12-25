const quickSort = (l) => {
	if (l.length <= 1) return l;
	return quickSort(l.slice(1).filter(e => e <= l[0])) + [l[0]] + quickSort(l.slice(1).filter(e => e > l[0])) 
}

class StatSet {
	constructor(set) {
		this.set = set;
	}

	toNumbers() {
		// Convert each symbolic value in a set to numerical value.
		for (let i = 0; i < this.set.length; i++) {
			let setValue = this.set[i];
			this.set[i] = Number(setValue);
		}
	}

	toSymbols() {
		// Convert each numerical value in a set to symbolic value.
		for (let i = 0; i < this.set.length; i++) {
			let setValue = this.set[i];
			this.set[i] = setValue.toString();
		}
	}

	// Recursive function stored in a class function.
	sorted() {
		return this.set.sort((a, b) => a - b)
	}

	// To find the maximum value:
	max() {
		// Sort the set and return the last value.
		const sortedSet = this.sorted();
		return sortedSet[sortedSet.length - 1];
	}

	// To find the minimum value:
	min() {
		// Sort the set and return the first value.
		const sortedSet = this.sorted();
		return sortedSet[0];
	}
	
	range() {
		const min = this.min();
		const max = this.max();
		
		console.log(`${max} - ${min} = ${max - min}`);
		return max - min;
	}

	mean() {
		let sum = 0; // Start at zero...
		let sumString = '';
		for (let n = 0; n < this.set.length; n++) {
			sum += this.set[n]; // And then add each value in the set. 
			sumString += (n === 0 ? `${this.set[n]}` : ` + ${this.set[n]}`);
		}
		console.log(sumString + ` = ${sum}`);
		console.log(`${sum} / ${this.set.length} = ${sum / this.set.length}`);
		return sum / this.set.length; // Divide sum by the number of values. 
	}

	median() {
		// First, sort the set from least to greatest.
		let set = this.sorted();
		console.log(`Sorted: ${set}`);
		console.log(`Length: ${this.set.length}`)
		// If number of values is even:
		if (set.length % 2 == 0) {
			// Return the average of the two medians
			const finalSet = new StatSet([set[set.length/2 - 1], set[set.length/2]]);
			return finalSet.mean();
		}
		else {
			// Return the median
			return set[Math.floor(set.length/2)]
		}
	}

	getQuartiles() {
		let lowerHalf;
		let upperHalf;
		if (this.set.length % 2 !== 0) {
			// Split list in half, not including median
			lowerHalf = this.set.slice(0, Math.round(this.set.length / 2));
			upperHalf = this.set.slice(Math.round(this.set.length / 2) + 1, this.set.length)
		} else {
			// Split list exactly in half
			lowerHalf = this.set.slice(0, this.set.length / 2);
			upperHalf = this.set.slice(this.set.length / 2 - 1, this.set.length);
		}

		return {
			lower: new StatSet(lowerHalf).median(),
			upper: new StatSet(upperHalf).median()
		}
	}	

	getFrequency() { // ROUNDS TO LOWER 10
		// "Frequency table" object:
		let frequencies = {};
		// Iterate through each value in set and check:
		for (let i = 0; i < this.set.length; i++) {
			let roundValue = Math.floor((this.set[i]/10))*10
			
			// If the value's frequency has not yet been recorded: 
			if (!(roundValue in frequencies)) { 
				// Start it off at 1.
				frequencies[roundValue] = 1;
			}
			else { // Otherwise:
				// Value has occured before. Increment frequency.
				frequencies[roundValue]++;
			}
		}
		// Return complete frequency table.
		return frequencies;
	}

	mode() {
		// Convert set to symbols...
		// this.toSymbols();
		// Then generate the frequency table...
		let freq = this.getFrequency();
		console.log(freq);
		// Then convert it back to numbers.
		// this.toNumbers();

		// Assume the first key is the greatest.
		let greatest = Object.keys(freq)[0];
		// The "greatest" is added to the list of modes. 
		let modes = [greatest];
		// Iterate through each key in freq. table.
		for (let key = 1; key < Object.keys(freq).length; key++) {
			// Check if freq. value is greater than greatest.
			console.log(`freq[${key.toString()}] === ${freq[key]}`);
			console.log(`freq[greatest] === ${freq[greatest]}`);
			if (freq[key.toString()] === freq[greatest]) {
				// If it is, then it is the new greatest.
				modes.push(key);
			}	
			if (freq[key.toString()] > freq[greatest]) {
				greatest = key;
				modes = [key]
			}
			console.log(modes)
		}
		
		// If there are multiple modes, return an array. 
		if (modes.length > 1) {
			return modes;
		}

		// Otherwise, return greatest, converted to a number.
		return Number(greatest);
	}

	sd() {
		const average = this.mean();
		console.log(`Mean: ${average}`);
		let sum = 0;
		for (let i = 0; i < this.set.length; i++) {
			sum += Math.pow(this.set[i] - average, 2)
		}
		console.log(`Total: ${sum}`);
		const variance = sum / (this.set.length - 1);
		return Math.sqrt(variance);
	}

	analyze() {
		console.log(`MEAN: ${this.mean()}`);
		console.log(" ");
		
		console.log(`MEDIAN: ${this.median()}`);
		console.log(" ");
		
		const quartiles = this.getQuartiles();
		console.log(`LOWER QUARTILE: ${quartiles.lower}`);
		console.log(`UPPER QUARTILE: ${quartiles.upper}`);
		console.log(" ");

		console.log('FREQUENCY TABLE')
		console.log(this.getFrequency())
		console.log(" ");
		
		console.log(`RANGE: ${this.range()}`);
		console.log(" ");

		console.log(`Sorted list: ${this.sorted()}`)
		
		console.log(`STANDARD DEVIATION: ${this.sd()}`);
		console.log(" ");
	}
}

module.exports = {
	StatSet: StatSet
}
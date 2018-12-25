const randomNumbers = [73,74,92,33,47,65,03];

const isBetween = (n, a, b) => {
    return (n >= a && n <= b) ? true: false;
}

const radioContest = {
    trial: () => {
        let iterator = 0;
        let totalAwarded = 0;
        let awardsGiven = 0;
        while (totalAwarded < 300) {
            let randomNumber = randomNumbers[iterator];
            if (isBetween(randomNumber, 1, 5)) {
                totalAwarded += 200;
                awardsGiven++;
            } else if (isBetween(randomNumber, 6, 20)) {
                totalAwarded += 100;
                awardsGiven++;
            } else if (isBetween(randomNumber, 21, 50)) {
                totalAwarded += 50;
                awardsGiven++;
            }
            // Otherwise (number is 0 or greater than 50): 
            // do nothing and skip. 
            iterator++;
        }
        return awardsGiven;
    }
}

const trial = () => {
    let wins = 0;
    for (let friend = 1; friend <= 7; friend++) {
        let bottleValue = randomNumbers[friend];
        if (isBetween(bottleValue, 0, 1)) {
            wins++;
        }
    }
    return (wins >= 3 ? true : false);
}

const runTrials = n => {
    let responses = [];
    for (let t = 1; t < n; t++) {
        let response = trial();
        console.log(`Trial ${t}: ${response}`);
        responses.append(response);
    }
    console.log('Mean: ' + Math.mean(responses));
    console.log('Median: ' + Math.median(responses));
    // console.log('Standard deviation: ' + Math.std(responses));
}
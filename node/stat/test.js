const StatSet = require('./stats').StatSet; 

const d = new StatSet([19, 15, 22, 10, 37, 21, 37, 12, 5, 38, 19, 24, 10, 34, 16, 24, 8])

console.log(d.analyze());
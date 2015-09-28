var terms = [];
var NUM_TERMS = 10000;

var first_letter = ['a','c','d','b','w','p','m'];
var second_letter = ['a','i','e','o','u'];
var third_letter = ['n','k','c','r','s','w','z'];

for(var i = 0; i < NUM_TERMS; i++) {
    var fst = first_letter[Math.floor(Math.random()*first_letter.length)];
    var mid = second_letter[Math.floor(Math.random()*second_letter.length)];
    var lst = third_letter[Math.floor(Math.random()*third_letter.length)];
    terms.push(fst + mid + lst);
}

module.exports = terms;

const log = console.log

//L O O P I N G  A  T R I A N G L E

for (let hash = '#'; hash.length < 8; hash+='#') {
	log(hash);
}

// #
// ##
// ###
// ####
// #####
// ######
// #######


//F I Z Z B U Z Z

let i = 1;
while (i <= 100) {
  if (i % 15 == 0) log('FizzBuzz');
  else if (i % 3 == 0) log('Fizz');
  else if (i % 5 == 0) log('Buzz');
  else log(i);
  i++;
}

// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
//...


//C H E S S B O A R D

let size = 8;
let board = ''
for (let x = 1; x <= size; x++) {
	for (let y = 1; y <= size; y++) {
    	if ((x + y) % 2 == 0) board += ' ';
      	else board += '#';
    }
  board += '\n';
}
log(board);

//  # # # #
// # # # # 
//  # # # #
// # # # # 
//  # # # #
// # # # # 
//  # # # #
// # # # # 
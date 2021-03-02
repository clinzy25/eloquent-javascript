// R E G E X P  G O L F

//1. car and cat
/ca[rt]/g

//2. pop and prop
/pr?op/g

//3. ferret, ferry, and ferrari
/ferr(et|y|ari)/g

//4. Any word ending in ious
/\w*ious\w*/g

//5. A whitespace character followed by a period, comma, colon, or semicolon
/\s[.,:;]/g

//6. A word longer than six letters
/\w{7}/g

//7. A word without the letter e (or E)
/\b([^\We]+)\b/gi


// Q U O T I N G  S T Y L E

console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));

// N U M B E R S  A G A I N 

let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/
const viewer = require('./util/viewer.js');
const nearley = require('nearley');
const grammar = require('./grammar/grammar.js');
const moo = require('moo');

const fs = require('fs');
console.log(process.argv[2])
const programText = fs.readFileSync(process.argv[2]).toString();

const lexer = require('./grammar/lexer.js');
lexer.reset(programText);
for(let token of lexer){
    console.log([
        token.type, token.value, token.text
    ]);
}

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
parser.feed(programText);

console.log(parser.results.length);
const output = new viewer.Viewer('program', parser.results[0])
output.render();
console.log(parser.results.length);
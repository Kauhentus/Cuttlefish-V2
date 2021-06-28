const moo = require('moo');

module.exports = moo.compile({
    ws:      /[ \t]+/,
    comment: /\/\/.*?$/,
    number:  /0|[1-9][0-9]*/,
    string:  /"(?:\\["\\]|[^\n"\\])*"/,
    endstop: ';',
    lparen:  '(',
    rparen:  ')',
    lbracket:  '{',
    rbracket:  '}',

    func_arrow: '=>',
    comma: ',',

    equals: '=',
    var_init: ['let', 'const'],

    op_as: ['+', '-'],
    op_mdm: ['*', '/', '%'],
    op_exp: '^',

    keyword: ['while', 'if', 'else', 'moo', 'cows'],
    variable: /[_a-zA-Z][_a-zA-Z0-9]*/,
    nl:      { match: /\n/, lineBreaks: true },
});
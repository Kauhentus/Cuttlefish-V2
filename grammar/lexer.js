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
    lsbracket:  '[',
    rsbracket:  ']',

    op_eq: ['==', '!=', '<', '>', '<=', '>='],
    op_bool: ['&&', '||'],
    op_neg: '!',

    func_arrow: '=>',
    comma: ',',
    dot: '.',

    assign_eq: ['+=', '-=', '*=', '/='],
    equals: '=',
    var_init: ['let', 'const'],

    op_a: '+',
    op_s: '-',
    op_mdm: ['*', '/', '%'],
    op_exp: '^',

    return_stop: 'return',
    if_stop: 'if',
    else_stop: 'else',
    elif_stop: 'elif',

    for_stop: 'for',
    while_stop: 'while',

    variable: /[_a-zA-Z][_a-zA-Z0-9]*/,
    nl:      { match: /(?:\r\n?|\n)+/, lineBreaks: true },
});
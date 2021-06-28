// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require('./lexer.js');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program$ebnf$1", "symbols": []},
    {"name": "program$ebnf$1$subexpression$1", "symbols": ["_", "statement"]},
    {"name": "program$ebnf$1", "symbols": ["program$ebnf$1", "program$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "program", "symbols": ["program$ebnf$1", "_"], "postprocess":  (data) => {
            return {
                label: 'program',
                statements: data[0].map(line => line[1])
            }
        }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess":  (data) => {
            return "uwu";
        }},
    {"name": "statement", "symbols": ["exp", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop)], "postprocess":  (data) => {
            return {
                label: 'statement',
                content: data[0]
            }
        }},
    {"name": "statement", "symbols": [(lexer.has("var_init") ? {type: "var_init"} : var_init), "_", (lexer.has("variable") ? {type: "variable"} : variable), "_", (lexer.has("equals") ? {type: "equals"} : equals), "_", "exp", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop)], "postprocess":  (data) => {
            return {
                label: 'action', 
                type: 'assignment-variable',
                name: data[2].value,
                value: data[6],
                kind: data[0].value
            }
        }},
    {"name": "scope$ebnf$1", "symbols": []},
    {"name": "scope$ebnf$1$subexpression$1", "symbols": ["_", "statement", "_"]},
    {"name": "scope$ebnf$1", "symbols": ["scope$ebnf$1", "scope$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "scope", "symbols": [(lexer.has("lbracket") ? {type: "lbracket"} : lbracket), "scope$ebnf$1", (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess":  data => {
            return {
                label: 'scope',
                statements: data[1].map(v => v[1])
            }
        }},
    {"name": "exp", "symbols": ["exp_as"], "postprocess": data => data[0]},
    {"name": "exp", "symbols": ["exp_func"], "postprocess": data => data[0]},
    {"name": "exp_func_params$ebnf$1", "symbols": []},
    {"name": "exp_func_params$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", (lexer.has("variable") ? {type: "variable"} : variable), "_"]},
    {"name": "exp_func_params$ebnf$1", "symbols": ["exp_func_params$ebnf$1", "exp_func_params$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "exp_func_params", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", (lexer.has("variable") ? {type: "variable"} : variable), "_", "exp_func_params$ebnf$1", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  data => {
            return {
                label: 'function-params', 
                variables: [data[2], ...data[4].map(v => v[2])].map(v => v.value)
            }
        }},
    {"name": "exp_func", "symbols": ["exp_func_params", "_", (lexer.has("func_arrow") ? {type: "func_arrow"} : func_arrow), "_", "scope"], "postprocess":  data => {
            return {
                label: 'function', 
                params: data[0],
                body: data[4]
            }   
        }},
    {"name": "exp_as", "symbols": ["exp_as", "_", (lexer.has("op_as") ? {type: "op_as"} : op_as), "_", "exp_mdm"], "postprocess":  (data) => {
            return {
                label: 'expression', type: 'binary',
                LHS: data[0], RHS: data[4], 
                op: data[2].value
            }
        }},
    {"name": "exp_as", "symbols": ["exp_mdm"], "postprocess": data => data[0]},
    {"name": "exp_mdm", "symbols": ["atom", "_", (lexer.has("op_mdm") ? {type: "op_mdm"} : op_mdm), "_", "atom"], "postprocess":  (data) => {
            return {
                label: 'expression', type: 'binary',
                LHS: data[0], RHS: data[4], 
                op: data[2].value
            }
        }},
    {"name": "exp_mdm", "symbols": ["atom"], "postprocess": data => data[0]},
    {"name": "variable", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable)], "postprocess":  (data) => {
            return {
                label: 'atom',
                type: data[0].type, value: data[0].value
            }
        }},
    {"name": "atom", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess":  (data) => {
            return {
                label: 'atom',
                type: data[0].type, value: data[0].value
            }
        }},
    {"name": "atom", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess":  (data) => {
            return {
                label: 'atom',
                type: data[0].type, value: data[0].value
            }
        }},
    {"name": "atom", "symbols": ["variable"], "postprocess": data => data[0]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

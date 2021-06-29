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
    {"name": "statement", "symbols": ["var_creation", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop)], "postprocess": id},
    {"name": "statement", "symbols": ["var_assignment", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop)], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("return_stop") ? {type: "return_stop"} : return_stop), "_", "exp", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop)], "postprocess":  data => {
            return {
                label: 'action',
                type: 'func_return',
                value: data[2]
            }        
        }},
    {"name": "statement", "symbols": ["cond_statement", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop)], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("for_stop") ? {type: "for_stop"} : for_stop), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "var_creation", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop), "_", "exp", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop), "_", "var_assignment", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "scope", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop)], "postprocess":  data => {
            return {
                label: 'action',
                type: 'for_loop',
                variable: data[4],
                cond: data[8],
                every: data[12], 
                scope: data[16]
            }
        }},
    {"name": "statement", "symbols": [(lexer.has("while_stop") ? {type: "while_stop"} : while_stop), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "exp", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "scope", "_", (lexer.has("endstop") ? {type: "endstop"} : endstop)], "postprocess":  data => {
            return {
                label: 'action', 
                type: 'while_loop',
                cond: data[4],
                scope: data[8]
            }
        }},
    {"name": "var_assignment$subexpression$1", "symbols": [(lexer.has("assign_eq") ? {type: "assign_eq"} : assign_eq)]},
    {"name": "var_assignment$subexpression$1", "symbols": [(lexer.has("equals") ? {type: "equals"} : equals)]},
    {"name": "var_assignment", "symbols": ["exp", "_", "var_assignment$subexpression$1", "_", "exp"], "postprocess":  data => {
            return {
                label: 'action',
                type: 'variable_assignment',
                name: data[0],
                value: data[4],
                kind: data[2][0].value
            }   
        }},
    {"name": "var_creation", "symbols": [(lexer.has("var_init") ? {type: "var_init"} : var_init), "_", (lexer.has("variable") ? {type: "variable"} : variable), "_", (lexer.has("equals") ? {type: "equals"} : equals), "_", "exp"], "postprocess":  data => {
            return {
                label: 'action', 
                type: 'variable_creation',
                name: data[2].value,
                value: data[6],
                kind: data[0].value
            }
        }},
    {"name": "cond_statement", "symbols": [(lexer.has("if_stop") ? {type: "if_stop"} : if_stop), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "exp", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "scope"], "postprocess":  data => {
            return {
                label: 'action',
                type: 'conditional',
                condition: data[4],
                pass_scope: data[8],
                fail_scope: {
                    label: 'scope',
                    statements: []
                },
                chain: []
            }      
        }},
    {"name": "cond_statement", "symbols": [(lexer.has("if_stop") ? {type: "if_stop"} : if_stop), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "exp", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "scope", "_", (lexer.has("else_stop") ? {type: "else_stop"} : else_stop), "_", "scope"], "postprocess":  data => {
            return {
                label: 'action',
                type: 'conditional',
                condition: data[4],
                pass_scope: data[8],
                fail_scope: data[12],
                chain: []
            }      
        }},
    {"name": "cond_statement$ebnf$1$subexpression$1", "symbols": [(lexer.has("elif_stop") ? {type: "elif_stop"} : elif_stop), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "exp", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "scope", "_"]},
    {"name": "cond_statement$ebnf$1", "symbols": ["cond_statement$ebnf$1$subexpression$1"]},
    {"name": "cond_statement$ebnf$1$subexpression$2", "symbols": [(lexer.has("elif_stop") ? {type: "elif_stop"} : elif_stop), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "exp", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "scope", "_"]},
    {"name": "cond_statement$ebnf$1", "symbols": ["cond_statement$ebnf$1", "cond_statement$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cond_statement", "symbols": [(lexer.has("if_stop") ? {type: "if_stop"} : if_stop), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "exp", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "scope", "_", "cond_statement$ebnf$1", (lexer.has("else_stop") ? {type: "else_stop"} : else_stop), "_", "scope"], "postprocess":  data => {
            return {
                label: 'action',
                type: 'conditional',
                condition: data[4],
                pass_scope: data[8],
                fail_scope: data[13],
                chain: data[10].map(v => {
                    return {
                        condition: v[4],
                        pass_scope: v[8]
                    }
                })
            }      
        }},
    {"name": "scope$ebnf$1", "symbols": []},
    {"name": "scope$ebnf$1$subexpression$1", "symbols": ["_", "statement"]},
    {"name": "scope$ebnf$1", "symbols": ["scope$ebnf$1", "scope$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "scope", "symbols": [(lexer.has("lbracket") ? {type: "lbracket"} : lbracket), "scope$ebnf$1", "_", (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess":  data => {
            return {
                label: 'scope',
                statements: data[1].map(v => v[1])
            }
        }},
    {"name": "exp", "symbols": ["exp_bool"], "postprocess": id},
    {"name": "exp", "symbols": ["exp_func"], "postprocess": id},
    {"name": "exp_func_params$ebnf$1", "symbols": []},
    {"name": "exp_func_params$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", (lexer.has("variable") ? {type: "variable"} : variable), "_"]},
    {"name": "exp_func_params$ebnf$1", "symbols": ["exp_func_params$ebnf$1", "exp_func_params$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "exp_func_params", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", (lexer.has("variable") ? {type: "variable"} : variable), "_", "exp_func_params$ebnf$1", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  data => {
            return {
                label: 'function-params', 
                args: [data[2], ...data[4].map(v => v[2])].map(v => v.value)
            }
        }},
    {"name": "exp_func", "symbols": ["exp_func_params", "_", (lexer.has("func_arrow") ? {type: "func_arrow"} : func_arrow), "_", "scope"], "postprocess":  data => {
            return {
                label: 'function', 
                params: data[0],
                body: data[4]
            }   
        }},
    {"name": "exp_func", "symbols": ["exp_func_params", "_", (lexer.has("func_arrow") ? {type: "func_arrow"} : func_arrow), "_", "exp"], "postprocess":  data => {
            return {
                label: 'function', 
                params: data[0],
                body: data[4]
            }   
        }},
    {"name": "exp_bool", "symbols": ["exp_bool", "_", (lexer.has("op_bool") ? {type: "op_bool"} : op_bool), "_", "exp_eq"], "postprocess":  data => {
            return {
               label: 'expression', type: 'binary',
                LHS: data[0], RHS: data[4], 
                op: data[2].value 
            }
        }},
    {"name": "exp_bool", "symbols": ["exp_eq"], "postprocess": id},
    {"name": "exp_eq", "symbols": ["exp_eq", "_", (lexer.has("op_eq") ? {type: "op_eq"} : op_eq), "_", "exp_as"], "postprocess":  data => {
            return {
               label: 'expression', type: 'binary',
                LHS: data[0], RHS: data[4], 
                op: data[2].value 
            }
        }},
    {"name": "exp_eq", "symbols": ["exp_as"], "postprocess": id},
    {"name": "exp_as$subexpression$1", "symbols": [(lexer.has("op_a") ? {type: "op_a"} : op_a)]},
    {"name": "exp_as$subexpression$1", "symbols": [(lexer.has("op_s") ? {type: "op_s"} : op_s)]},
    {"name": "exp_as", "symbols": ["exp_as", "_", "exp_as$subexpression$1", "_", "exp_mdm"], "postprocess":  (data) => {
            return {
                label: 'expression', type: 'binary',
                LHS: data[0], RHS: data[4], 
                op: data[2][0].value
            }
        }},
    {"name": "exp_as", "symbols": ["exp_mdm"], "postprocess": id},
    {"name": "exp_mdm", "symbols": ["exp_mdm", "_", (lexer.has("op_mdm") ? {type: "op_mdm"} : op_mdm), "_", "exp_pow"], "postprocess":  (data) => {
            return {
                label: 'expression', type: 'binary',
                LHS: data[0], RHS: data[4], 
                op: data[2].value
            }
        }},
    {"name": "exp_mdm", "symbols": ["exp_pow"], "postprocess": id},
    {"name": "exp_pow", "symbols": ["exp_pow", "_", (lexer.has("op_exp") ? {type: "op_exp"} : op_exp), "_", "exp_neg"], "postprocess":  (data) => {
            return {
                label: 'expression', type: 'binary',
                LHS: data[0], RHS: data[4], 
                op: data[2].value
            }
        }},
    {"name": "exp_pow", "symbols": ["exp_neg"], "postprocess": id},
    {"name": "exp_neg", "symbols": [(lexer.has("op_s") ? {type: "op_s"} : op_s), "exp_func_call"], "postprocess":  data => {
            return {
                label: 'expression', type: 'unary',
                value: data[1],
                op: '-',
            }
        }},
    {"name": "exp_neg", "symbols": [(lexer.has("op_neg") ? {type: "op_neg"} : op_neg), "exp_func_call"], "postprocess":  data => {
            return {
                label: 'expression', type: 'unary',
                value: data[1],
                op: '!',
            }
        }},
    {"name": "exp_neg", "symbols": ["exp_func_call"], "postprocess": id},
    {"name": "exp_func_call$ebnf$1", "symbols": []},
    {"name": "exp_func_call$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "exp", "_"]},
    {"name": "exp_func_call$ebnf$1", "symbols": ["exp_func_call$ebnf$1", "exp_func_call$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "exp_func_call", "symbols": ["exp_func_call", "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "exp", "_", "exp_func_call$ebnf$1", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  data => {
            return {
                label: 'expression', type: 'func_call',
                func: data[0],
                args: [data[4], ...data[6].map(v => v[2])]
            } 
        }},
    {"name": "exp_func_call", "symbols": ["exp_func_call", "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  data => {
            return {
                label: 'expression', type: 'func_call',
                func: data[0],
                args: []
            } 
        }},
    {"name": "exp_func_call", "symbols": ["exp_func_call", "_", (lexer.has("lsbracket") ? {type: "lsbracket"} : lsbracket), "_", "exp", "_", (lexer.has("rsbracket") ? {type: "rsbracket"} : rsbracket)], "postprocess":  data => {
            return {
                label: 'expression', type: 'array_access',
                array: data[0], index: data[4]
            }
        }},
    {"name": "exp_func_call", "symbols": ["exp_mem_access"], "postprocess": id},
    {"name": "exp_mem_access", "symbols": ["paren", "_", (lexer.has("dot") ? {type: "dot"} : dot), "_", "atom"], "postprocess":  data => {
            return {
                label: 'expression', type: 'member_access',
                parent: data[0],
                child: data[4],
            } 
        }},
    {"name": "exp_mem_access", "symbols": ["paren"], "postprocess": id},
    {"name": "paren", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "exp", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  data => {
            return data[2]
        }},
    {"name": "paren", "symbols": ["atom"], "postprocess": id},
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
    {"name": "atom", "symbols": ["variable"], "postprocess": id}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

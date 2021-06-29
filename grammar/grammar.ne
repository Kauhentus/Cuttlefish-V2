@{%
const lexer = require('./lexer.js');
%}

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# Structure
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@lexer lexer

program -> (_ statement):* _ {% (data) => {
    return {
        label: 'program',
        statements: data[0].map(line => line[1])
    }
}%}

_ -> (%ws | %nl):* {% (data) => {
    return "uwu";
}%}

statement -> 
      exp _ %endstop {% (data) => {
    return {
        label: 'statement',
        content: data[0]
    }
}%}
    | var_creation _ %endstop {% id %}
    | var_assignment _ %endstop {% id %}
    | %return_stop _ exp _ %endstop {% data => {
    return {
        label: 'action',
        type: 'func_return',
        value: data[2]
    }        
}%}
    | cond_statement _ %endstop {% id %}
    | %for_stop _ %lparen _ var_creation _ %endstop _ exp _ %endstop _ var_assignment _ %rparen _ scope _ %endstop {% data => {
    return {
        label: 'action',
        type: 'for_loop',
        variable: data[4],
        cond: data[8],
        every: data[12], 
        scope: data[16]
    }
}%}
    | %while_stop _ %lparen _ exp _ %rparen _ scope _ %endstop {% data => {
    return {
        label: 'action', 
        type: 'while_loop',
        cond: data[4],
        scope: data[8]
    }
}%}

var_assignment -> exp _ (%assign_eq | %equals) _ exp {% data => {
    return {
        label: 'action',
        type: 'variable_assignment',
        name: data[0],
        value: data[4],
        kind: data[2][0].value
    }   
}%}

var_creation -> %var_init _ %variable _ %equals _ exp  {% data => {
    return {
        label: 'action', 
        type: 'variable_creation',
        name: data[2].value,
        value: data[6],
        kind: data[0].value
    }
}%}

cond_statement -> 
      %if_stop _ %lparen _ exp _ %rparen _ scope {% data => {
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
}%}
    | %if_stop _ %lparen _ exp _ %rparen _ scope _ %else_stop _ scope {% data => {
    return {
        label: 'action',
        type: 'conditional',
        condition: data[4],
        pass_scope: data[8],
        fail_scope: data[12],
        chain: []
    }      
}%}
    | %if_stop _ %lparen _ exp _ %rparen _ scope _ (%elif_stop _ %lparen _ exp _ %rparen _ scope _):+ %else_stop _ scope {% data => {
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
}%}


scope -> %lbracket (_ statement):* _ %rbracket {% data => {
    return {
        label: 'scope',
        statements: data[1].map(v => v[1])
    }
}%}

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# Expressions
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

exp -> 
      exp_bool {% id %}
    | exp_func {% id %}

exp_func_params ->
      %lparen _ %variable _ (%comma _ %variable _):* %rparen {% data => {
    return {
        label: 'function-params', 
        args: [data[2], ...data[4].map(v => v[2])].map(v => v.value)
    }
}%}

exp_func -> 
      exp_func_params _ %func_arrow _ scope {% data => {
    return {
        label: 'function', 
        params: data[0],
        body: data[4]
    }   
}%}
    | exp_func_params _ %func_arrow _ exp {% data => {
    return {
        label: 'function', 
        params: data[0],
        body: data[4]
    }   
}%}

# # # # # # # # # # # # # # # # 
# Operator expressions
# # # # # # # # # # # # # # # # 

exp_bool -> 
      exp_bool _ %op_bool _ exp_eq {% data => {
    return {
       label: 'expression', type: 'binary',
        LHS: data[0], RHS: data[4], 
        op: data[2].value 
    }
}%}
    | exp_eq {% id %}


exp_eq -> 
      exp_eq _ %op_eq _ exp_as {% data => {
    return {
       label: 'expression', type: 'binary',
        LHS: data[0], RHS: data[4], 
        op: data[2].value 
    }
}%}
    | exp_as {% id %}

exp_as -> 
      exp_as _ (%op_a | %op_s) _ exp_mdm {% (data) => {
    return {
        label: 'expression', type: 'binary',
        LHS: data[0], RHS: data[4], 
        op: data[2][0].value
    }
}%}
    | exp_mdm {% id %}

exp_mdm -> 
      exp_mdm _ %op_mdm _ exp_pow {% (data) => {
    return {
        label: 'expression', type: 'binary',
        LHS: data[0], RHS: data[4], 
        op: data[2].value
    }
}%}
    | exp_pow {% id %}

exp_pow -> 
      exp_pow _ %op_exp _ exp_neg {% (data) => {
    return {
        label: 'expression', type: 'binary',
        LHS: data[0], RHS: data[4], 
        op: data[2].value
    }
}%}
    | exp_neg {% id %}

# # # # # # # # # # # # # # # # 
# Unary expressions
# # # # # # # # # # # # # # # # 

exp_neg -> 
      %op_s exp_func_call {% data => {
    return {
        label: 'expression', type: 'unary',
        value: data[1],
        op: '-',
    }
}%}
    | %op_neg exp_func_call {% data => {
    return {
        label: 'expression', type: 'unary',
        value: data[1],
        op: '!',
    }
}%}
    | exp_func_call {% id %}

# # # # # # # # # # # # # # # # 
# Spceial expressions
# # # # # # # # # # # # # # # # 

exp_func_call -> 
      exp_func_call _ %lparen _ exp _ (%comma _ exp _):* %rparen {% data => {
    return {
        label: 'expression', type: 'func_call',
        func: data[0],
        args: [data[4], ...data[6].map(v => v[2])]
    } 
}%}
    | exp_func_call _ %lparen _ %rparen {% data => {
    return {
        label: 'expression', type: 'func_call',
        func: data[0],
        args: []
    } 
}%}
    | exp_func_call _ %lsbracket _ exp _ %rsbracket {% data => {
    return {
        label: 'expression', type: 'array_access',
        array: data[0], index: data[4]
    }
}%}
    | exp_mem_access {% id %}
    
exp_mem_access -> 
    paren _ %dot _ atom {% data => {
    return {
        label: 'expression', type: 'member_access',
        parent: data[0],
        child: data[4],
    } 
}%}
    | paren {% id %}

paren -> 
      %lparen _ exp _ %rparen {% data => {
    return data[2]
}%}
    | atom {% id %}

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# Primitives
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
  
variable -> %variable {% (data) => {
    return {
        label: 'atom',
        type: data[0].type, value: data[0].value
    }
}%}

atom -> 
      %number {% (data) => {
    return {
        label: 'atom',
        type: data[0].type, value: data[0].value
    }
}%}
    | %string {% (data) => {
    return {
        label: 'atom',
        type: data[0].type, value: data[0].value
    }
}%}
    | variable {% id %}
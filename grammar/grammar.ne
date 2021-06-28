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
    | %var_init _ %variable _ %equals _ exp _ %endstop {% (data) => {
    return {
        label: 'action', 
        type: 'assignment-variable',
        name: data[2].value,
        value: data[6],
        kind: data[0].value
    }
}%}

scope -> %lbracket (_ statement _):* %rbracket {% data => {
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
      exp_as {% data => data[0] %}
    | exp_func {% data => data[0] %}

exp_func_params ->
      %lparen _ %variable _ (%comma _ %variable _):* %rparen {% data => {
    return {
        label: 'function-params', 
        variables: [data[2], ...data[4].map(v => v[2])].map(v => v.value)
    }
}%}

exp_func -> exp_func_params _ %func_arrow _ scope {% data => {
    return {
        label: 'function', 
        params: data[0],
        body: data[4]
    }   
}%}

# # # # # # # # # # # # # # # # 
# Operator expressions
# # # # # # # # # # # # # # # # 

exp_as -> 
      exp_as _ %op_as _ exp_mdm {% (data) => {
    return {
        label: 'expression', type: 'binary',
        LHS: data[0], RHS: data[4], 
        op: data[2].value
    }
}%}
    | exp_mdm {% data => data[0] %}

exp_mdm -> 
      atom _ %op_mdm _ atom {% (data) => {
    return {
        label: 'expression', type: 'binary',
        LHS: data[0], RHS: data[4], 
        op: data[2].value
    }
}%}
    | atom {% data => data[0] %}

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
    | variable {% data => data[0] %}
%
% Rate class. A Rate is a string representation of a rate law involving
% compositors, constants, and potentially other functions (including of time).
%

classdef Rate < handle

    properties
        string;         % Actual rate equation stored as a string
        symb;            % Rate eqn stored as a symbolic expression
    end

    methods
        function rate = Rate(rate_string)
            rate.string = rate_string;
            rate.symb = rate.generateSymb(rate_string);
        end
        
        function rate_sym = generateSymb(~, rate_string)
            % This function uses the list of compositors to convert a rate
            % string into a valid symbolic input that will not throw a warning
            
            % Split on operators to find variables and parameters (terms)
            [terms, operators] = strsplit(rate_string, ...
                {'+', '-', '/', '*', '^', '.', '%', '(', ')', '[', '}', ' '});
                        
            % Figure out which terms are parameters and variables. 
            %   Variables need to be replaced with compositor.name
            %   Parameters need to be replaced with ''parameter''
            fixed_rate_string = '';
            for i = 1:numel(terms)
                if isempty(terms{i})
                    term = '';
                elseif isempty(str2num(terms{i})) %#ok<ST2NM>
                    % Handle parameters and variables - turn into syms
                    term = ['sym(''', terms{i}, ''')'];
                else
                    % Numbers are kept as-are
                    term = terms{i};
                end
                
                fixed_rate_string = [fixed_rate_string, term]; %#ok<*AGROW>
                if i <= numel(operators)
                    fixed_rate_string = [fixed_rate_string, operators{i}];
                end
            end
            
            % Generate rate sym expression
            rate_sym = eval(fixed_rate_string);
                
        end
    end
end

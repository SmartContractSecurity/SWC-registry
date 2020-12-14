# Title 
Tautology or Contradiction

## Relationships 
[CWE-570: Expression is Always False](https://cwe.mitre.org/data/definitions/570.html)
[CWE-571: Expression is Always True](https://cwe.mitre.org/data/definitions/571.html)

## Description 
Detection of expressions that are tautologies or contradiction, which means the expressions are always true or always false. This may happen when there are pure logic issues or the checking conditions is limited by the variable types.

## Remediation
Fix the incorrect comparison/condition/return by changing the value type or the logic.

## References 
* [Tautology](https://en.wikipedia.org/wiki/Tautology_(logic))

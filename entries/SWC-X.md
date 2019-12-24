# Title
Non-Scoped Admin Privileges

## Relationships
[ 		
CWE-798: Use of Hard-coded Credentials](https://cwe.mitre.org/data/definitions/798.html)

## Description
It is a common practice in the Ethereum development community to use a system of access controls which use msg.sender and stored addresses as validation. Particularly prevalent are usage of owner accounts which have very high levels of control over the contract. A SWC-130 vulnerability occurs when these privileges allow an owner account to preform actions which are not scoped to be inline with intent of the contract.
A system with non-scoped admin privileges assumes that non-one except the true owner will be able to access the admin key. However there are a myriad of situations in which offchain security problems will reveal the private key. For example in an improperly secured production server a side channel attack may leak the cryptographic key. A system with improperly scoped admin privileges depends on perfect offchain security to remain secure, which is a hard feat to accomplish.
An example of such a problem would be a mintable ERC20-token which allows the admin address to mint as many tokens as desired. In this case a malicious party who gains access to the token's admin account can give themselves as many tokens as desired, sell them all at once, and thus drive the token price down. A real world example of this is the [PRL token hack](https://beincrypto.com/prl-coin-oyster-pearl-exit-scam/), though this case is slightly more complex.

## Remediation
Remediation of this issue is difficult as it strikes a balance between the functionality of having powerful admin accounts and the risk of having powerful admin accounts. It is often only possible to reduce the impact of an attack by introducing more rules on the admin's behavior. For example in the case of a token contract which is mintable by an admin the code can be changed to have rate limits and periods of minting which are predefined.
Additionally a project can define different sets of admin addresses for different functionalities and lock them after they are not needed or change levels of offchain security for them. For example a project could have a development admin server address which has limited abilities compared to a company wide threshold multisig address which requires action from 4 out of 5 board members to produce a transaction.
The best rule of thumb for remediation is ask: If the general public could call this function how bad would it be? If the answer is catastrophic you need more rules.
## References
[PRL token hack](https://beincrypto.com/prl-coin-oyster-pearl-exit-scam/) 

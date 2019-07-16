contract SimpleDSChief {
    mapping(bytes32=>address) public slates; // mapping hash(addess) -> address
    mapping(address=>bytes32) public votes; // who has voted for vat slate
    mapping(address=>uint256) public approvals; // approval weight per slate
    mapping(address=>uint256) public deposits; // voter deposits

    // Deposit and vote for slate
    // 0xdd467064
    function lock(uint wad) public {
        deposits[msg.sender] = add(deposits[msg.sender], wad);
        addWeight(wad, votes[msg.sender]);
    }

    // Undeposit and remove voting weight from wad
    // 0xd8ccd0f3
    function free(uint wad) public {
        deposits[msg.sender] = sub(deposits[msg.sender], wad);
        subWeight(wad, votes[msg.sender]);
    }

    // Vote for a slate which is a hash to address mapping
    // 0x30d6c575
    function voteYays(address yay) public returns (bytes32){
        bytes32 slate = etch(yay);
        voteSlate(slate);

        return slate;
    }

    // Create a new slate (hash(address) -> address)
    // 0x77c243eb
    function etch(address yay) public returns (bytes32 slate) {
        bytes32 hash = keccak256(abi.encodePacked(yay));

        slates[hash] = yay;

        return hash;
    }

    // Move weight from one slate to another
    // 0xed337208
    function voteSlate(bytes32 slate) public {
        uint weight = deposits[msg.sender];
        subWeight(weight, votes[msg.sender]);
        votes[msg.sender] = slate;
        addWeight(weight, votes[msg.sender]);
    }

    // Assign weight to slate
    function addWeight(uint weight, bytes32 slate) internal {
        address yay = slates[slate];
        approvals[yay] = add(approvals[yay], weight);
    }

    // Remove weight from slate
    function subWeight(uint weight, bytes32 slate) internal {
        address yay = slates[slate];
        approvals[yay] = sub(approvals[yay], weight);
    }

    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x);
    }

    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x);
    }

    constructor() public {
        lock(1);
        etch(0x1111111111111111111111111111111111111111);
    }

    // 0x5b143948
   function checkAnInvariant() public {
        bytes32 senderSlate = votes[msg.sender]; // Slate the sender has voted for
        address option = slates[senderSlate];    // Address in 
        uint256 senderDeposit = deposits[msg.sender];
        
        assert(approvals[option] >= senderDeposit); // Verify that the sender deposit was not abused
    }
}
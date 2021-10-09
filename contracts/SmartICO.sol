// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
One of the major problems for ICOs is their lack of trust.
It is difficult for investors to trust a new project with an unknown team.
Using this method, capital is allocated to the best project.
**/
contract SmartICO {

        // State variables
        // Owner, ID,  enrolled, projects, States and ...

        // Events
        // LogEnrolled, LogWithdraw, LogDeposit and ...

        // modifiers
        // onlyOwner, isDeveloper and ...

        modifier onlyOwner(){
                // msg.sender == owner.
                _;
        }

        modifier isDeveloper(){
                // enrolled[msg.sender] == True.
                _;
        }

        // functions
        // Deposit, Withdraw, Enroll, Create, Buy, Delete and ...

        constructor(){
                // Setup variables: owner and ...
                // owner == msg.sender;
        }

        function Enroll() public payable returns(bool){ // True.
                // Developers must enroll before registering a project.
                // They need to send some ether to be recognized as a developer.
                // Event: LogEnrolled.
        }

        function Deposit() public payable returns(bool){ //True.
                // Deposit funds to vote on the project
        }

        function Withdraw() public returns(bool){ //True.
                // Withdrawal of account balance.
                // This action has a fee that motivates the user to invest (very little fee that is spent on protocol development).
        }

        function Buy(uint _projectId) public payable returns(bool){ //True.
                // Invest (vote) in the project.
                // Reduces the user account balance and adds one vote to the project
        }

        function Create(string memory _title, string memory _webSiteURL, uint _Cap /*and other*/) public isDeveloper returns(bool){ //True.
                // Create project and append to Projects.
                // Owner can remove some dangerous projects.
                // Event: LogCreated.
        }

        function Delete(uint _Id) public onlyOwner returns(bool){ //True.
                // remove some dangerous projects.
        }

//This is just a draft to build this contract.
//There will definitely be more changes in the project.
}
//AmiraliZiyaei |amirali414
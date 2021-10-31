const SmartICO = artifacts.require('SmartICO');
const { catchRevert } = require("./err.js");
const { items: ItemStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract("SmartICO", async accounts => {
        const con;
        const eth1;
        const [contractOwner, alice, bob] = accounts;

        before(async () => {
                con = await SmartICO.new();
                eth1 = 1e18;
        });
        it("Ready", async () => { //1
                assert.equal(await web3.eth.getBalance(alice), 100e18.toString());
        });
        describe("variables", async () => {
                it("Owned by owner", async () => { //2
                        var ownedBy = await con.owner.call();
                        assert.equal(ownedBy, contractOwner);
                });
                it("Sku count (Id)", async () => { //3
                        var startId = con.Id;
                        assert.equal(typeof startId, 'function');
                });
        });
        describe("Enums", async () => {
                var enumState;
                before(() => {
                        enumState = SmartICO.enums.State;
                        assert(
                                enumState,
                                "Err, State enum undefined"
                        );
                });
                it("Enum -> Open", async () => { //4
                        assert(
                                enumState.hasOwnProperty('Open'),
                                "Err, State enum -> 'Open' undefined"
                        );
                });
                it("Enum -> Finished", async () => { //5
                        assert(
                                enumState.hasOwnProperty('Finished'),
                                "Err, State enum -> 'Finished' undefined"
                        );
                });
                it("Enum -> Winner", async () => { //6
                        assert(
                                enumState.hasOwnProperty('Winner'),
                                "Err, State enum -> 'Winner' undefined"
                        );
                });
        });
        describe("deposit", async () => {
                it("Deposit Success", async () => { //7
                        await con.deposit({from: alice, value: eth1});
                        var balance = await con.getBalance.call({from: alice});
                        assert.equal(balance, eth1.toString());
                });
                it("Emit Deposit event", async () => { //8
                        const result = await con.deposit({from: alice, value: eth1});
                        const ok = {
                                address: alice,
                                amount: eth1
                        };
                        const address = result.logs[0].args.address;
                        const amount = result.logs[0].args.amount.toNumber();
                        assert.equal(ok.address, address);
                        assert.equal(ok.amount, amount);
                });
        });
        describe("withdraw", async () => { //9
                it("Withdraw Success", async () => {
                        await con.deposit({from: alice, value: eth1});
                        const balance1 = await con.getBalance.call({from: alice});
                        await con.withdeaw(eth1, {from: alice});
                        const balance2 = await con.getBalance.call({from: alice});
                        assert.equal(balance1 - eth1, balance2);
                });
                it("should not be able to withdraw more than has been deposited", async () => {
                        await con.deposit({ from: alice, value: eth1});
                        await catchRevert(c.withdraw(eth1 + 1, { from: alice }));
                });
                it("Emit withfraw event", async () => { //10
                        await con.deposit({from: alice, value: eth1});
                        const result = await con.withdraw(eth1, {from: alice});
                        const ok = {
                                address: alice,
                                amount: eth1
                        }
                        const address = result.logs[0].args.address;
                        const amount = result.logs[0].args.amount.toNumber();
                        assert.equal(
                                address,
                                ok.address
                        );
                        assert.equal(
                                amount,
                                ok.amount
                        );
                });
        })
});

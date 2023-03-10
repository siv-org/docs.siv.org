---
part: Further Areas of Study
title: Automated Reward For Lost Votes
---

Imagine that once your election provider confirmed that your vote was received, you have the confidence that it will be in the final tally, and their claim is backed by automatic financial guarantees. This means if you vote on Day 6 of a 30 day voting period, you can have strong confidence that once your vote has been confirmed (on Day 6), you don’t need to return back again two weeks later when the voting period ends (on Day 30).

Here's how it works at a high level: After you cast your vote, you receive a signed vote submission receipt via email. If for any reason your vote does not make it into the final tally, you can automatically claim a pot of money from a smart contract.

This can create a strong incentive for voters to report any issues and can fund technical assistance for those who need it. And, if no claims are made within 30 days, the money is returned to the voting system.

If the pot is large enough and well advertised, the lack of any valid reports serves as further indication that voters did not have trouble finding their vote in the final tally.

This system can be implemented by posting full Merkle Tree of all submitted votes to blockchain and using a smart contract to hold bounty money in escrow. You can send your signed submission receipt to the smart contract. If the submission receipt is validly signed, and the vote doesn’t appear in the final Merkle Tree, you can automatically collect the bounty. If no one claims the bounty in 30 days, the bounty is returned to SIV.

### Technical details:

Requires 3 transactions:

#### #1. At the start of the election, SIV posts:

An initial transaction with:

a) the election_id  
b) the committed bounty claim amount (in a USD stablecoin like USDC)  
c) the public key that will sign submission receipts of accepted votes

#### #2. At the end of the election, SIV posts:

a) election_id (should match 1a)  
b) a Merkle Tree of all the accepted votes.

- Size estimate: 256 bits for each hash \* num of votes \* 2 (for Merkle Tree height)
- So for an election with 100k voters => ~51 megabits or 6MB.

#### #3. Anyone can then post a "bounty claim transaction":

This requires their signed vote confirmation receipt.

In response to Transaction 3, the smart contract checks:

1. Does the election_id match 1a?

2. Does this confirmation receipt have a valid signature, from the key in 1c?

3. Is the hash of the vote in the confirmation receipt truly missing from the Merkle tree posted in 2b?

If all 3 checks pass, send the bounty from 1b to the address that posted transaction 3.

#### Anti-MEV

To prevent front-running, separate transaction #3 into 2 separate blocks:

- 3a is a hash of the signed receipt
- then 3b is a post of the full signed receipt.

#### Expirations

If it's been x days (e.g. 45) since Transaction 1 was posted without a matching Transaction 2 (Merkle tree), any transaction can automatically claim.

If it's been y days (e.g. 45) since Transaction 2 was posted without any successful claims, the money is returned back to the address who posted Transaction 1.

---

Based on preliminary research and feedback, this seems to be a promising solution. However, this model is currently under further study. We are open to feedback and collaboration.

---
part: Security Requirements → Verifiability
title: Verify Others Have Verified Their Vote — Automated Reward For Lost Votes
---

Imagine that once your election provider confirmed that your vote was received, you have the confidence that it will be in the final tally, and their claim is backed by automatic financial guarantees. This means if you vote on Day 6 of a 30 day voting period, you can have strong confidence that once your vote has been confirmed (on Day 6), you don’t need to return back again two weeks later when the voting period ends (on Day 30).

Here's how it works at a high level: After you cast your vote, you receive a signed vote submission receipt via email. If for any reason your vote does not make it into the final tally, you can automatically claim a pot of money from a smart contract.

This can create a strong incentive for voters to report any issues and can fund technical assistance for those who need it. And, if no claims are made within 30 days, the money is returned to the voting system.

The lack of any valid reports serves as strong indication that voters found their vote in the final tally.

This system can be implemented by posting full Merkle Tree of all submitted votes to blockchain and using a smart contract to hold bounty money in escrow. You can send your signed submission receipt to the smart contract. If the submission receipt is validly signed, and the vote doesn’t appear in the final Merkle Tree, you can automatically collect the bounty. If no one claims the bounty in 30 days, the bounty is returned to SIV. Based on preliminary research and feedback, this seems to be a promising solution, however this model is currently under further study. We are open to feedback and collaboration.

Technical details:

```
 #1. At the end of the election, SIV posts:
 a) Merkle Tree of all the votes. Size estimate: 256 bits for each hash _ num of votes _ 2 (for Merkle Tree height) So for an election with 100k voters, approx 51 megabits.
 b) election_id
 c) sends some money to the contract as the bounty (in a USD stablecoin like USDC) Initially, maybe $500, over time we would increase up to $50k or higher.

#2. Anyone can post a "bounty claim transaction"
 a) signed vote confirmation receipt

In response to Transaction 2, the smart contract checks =>
1. Does this confirmation receipt have a valid signature?
2. Does the election_id match 1b ?
3. Is the hash of the vote in the confirmation receipt truly missing from the Merkle tree posted in 1a?

If all 3 checks pass, send the bounty from 1c to the address that posted transaction 2.

To prevent front-running, separate transaction #2 into 2 separate blocks.
2a is they post the hash of the signed receipt
2b is they post the full signed receipt.

If it's been x days (e.g. 45) since Transaction 1 was posted without any successful claims, the money gets returned back to the address from Transaction 1.

```

Based on preliminary research and feedback, this seems to be a promising solution. However, this model is currently under further study. We are open to feedback and collaboration.

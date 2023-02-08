---
part: Security Requirements
title: Verifiable Results
---

For widely accepted results, vote totals must be independently auditable for accuracy. The more tallying that is restricted behind closed doors, the less everyone can trust the results.

For voters choosing Secure Internet Voting, there are powerful verification methods available.

### Personally Verify _Your Vote_ Is In The Final Tally

When a voter submits their vote, their device generates a unique, randomly-generated, secret Verification Number. This number allows the voter to personally confirm that their vote was accurately recorded and included in the final tally.

This method provides a higher level of assurance than paper elections, where voters have limited opportunities for first-hand verification after casting their ballot. This is sometimes referred to as “End-to-End Voter Verifiability”.

<span style={{color: "red"}}>INSERT ILLUSTRATION</span>

### Personally Verify _Total Vote_ Count

In contrast to traditional paper elections, SIV enables independent recounts at any time by providing the full list of anonymized votes. In fact, every device that accesses the public election status page automatically conducts its own recount, providing thousands of independent verifications at no additional cost. These counts can also be quickly and easily redone by voters’ or auditors themselves using freely available spreadsheet tools.

<span style={{color: "red"}}>INSERT ILLUSTRATION</span>

In order to verify the correctness of the two stages in which votes get shuffled for anonymization and when they get unlocked, SIV allows for Cryptographic Universal Verifiability by providing Zero-Knowledge Proofs of a Valid Shuffle. These proofs are automatically run by the SIV admin software used by election administrators and all Verifying Observers. They can also be run by voters and independent auditors. These proofs verify vote accuracy, providing the ability to retrace the election steps from encrypted submissions to final results.

### Verifying that _Other Voters Verify_ Their Vote

A common question is “Are other voters sufficiently verifying their votes were counted properly?”.

There are four ways to become confident about it:

1. Aside from the Verification #, the voter’s device also has the Randomizer.

<span style={{color: "red"}}>INSERT ILLUSTRATION</span>

Any voter can check their vote, and would have clear proof only if there was truly a problem — it’s difficult to convincingly fake proof. The absence of reports is itself a huge step towards creating confidence.

2. Although voters may not take the time to manually verify before election results are finalized, the supporters of the losing candidates have a strong incentive to check after they learn the outcome did not go their preferred way. All necessary verification material is automatically stored on voter’s device to enable these later checks, with no ahead-of-time preparatory work necessary.

3. Risk-Limiting Audit Sampling can be used to independently check with only a small statistical sample % of the total votes cast, providing a very strong — e.g. > 99.9% confidence — that the election winners wouldn’t change. Check detailed information under section “Post Election Verification”.

4. SIV can provide significant financial guarantees, even backed cryptographically by smart-contracts for automatic enforcement, that put significant reward for reporting if a submitted encrypted vote that was confirmed received at the time of vote is no longer present in the final results. See Section “Further Study” > “Using Smart Contracts for Additional Financial Guarantees of Vote Integrity”. This creates a strong incentive for reports to be filed, and can fund any required technical assistance for voters less familiar with these advanced tools. With such a system in place, the lack of any valid reports provides a very strong signal that all votes were tallied as intended.

<span style={{color: "red"}}>INSERT ILLUSTRATION</span>

For more detailed examples and information check section Post Election Election Verification.

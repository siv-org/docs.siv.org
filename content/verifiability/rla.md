---
part: Security Requirements → Verifiability
title: Verify Others Have Verified Their Vote — Risk Limiting Audit
---

## Introduction

Imagine participating in an election where you had the chance to cast your vote for one of two presidential candidates: George Washington or Abraham Lincoln. The final results show that George Washington received 10 votes and Abraham Lincoln received 5. But what if your preferred candidate didn't win? How can you be confident that the election results are accurate?

Even if you personally used your Verification # and confirmed your vote was accurate in the final tally, you might also want to see confirmation from enough other voters that they too checked their votes. Therefore, how many confirmations do you need to see to be sure?

We can conduct a SIV Risk-Limiting Audit (RLA) which allows for an independent check of only a small statistical sample % of the total votes cast, providing a very high level of confidence — e.g. >99.9% confidence — that the election winners would not change.

In this scenario, a Risk-Limiting Audit can be performed as follows:

- Because there were 15 votes, 8 is the majority needed to win.
- Considering the outcome was 10-to-5, any 3 of the Washington votes could have been flipped to change the winner.
- Thus, the margin of error is: 2 votes could have been flipped without changing the winner.
- Therefore, I can be completely sure if I see confirmation from at least 15 - 2 = 13 voters.

The power of an RLA is that you don't need to check all 15 votes. The RLA math shows that just 3 random checks alone give you over 51% confidence, 6 checks give you over 81% confidence, and 8 checks give you over 91% confidence.

<span style={{color: "red"}}>INSERT MATH & FORMULAS</span>

Risk-Limiting Audits can provide a safeguard for election results, giving you the confidence that election results are accurate.

## How to Conduct a SIV RLA

A SIV Risk-Limiting Audit has the power to greatly reduce the likelihood of suspected fraud and increase voter satisfaction.

The mathematical principles underlying Risk Limiting Audits allow for efficient sampling. A small sample size can be selected and reviewed by independent 3rd party civil groups and official representatives, who can confirm with voters the integrity of the votes, without compromising the privacy of individual voters.

The SIV Risk-Limiting Audit resembles a Ballot-level RLA, however, unlike the latter, it does not involve the election department conducting a self-examination of their own machines.

Conducting an RLA is a redundant step, as voters have the ability to personally verify the accuracy of their own vote and results. However, an RLA can be a prudent measure in cases where it is not desired to rely solely on individual voter’s self-verification. This audit can be an additional anti-malware test, as all other stages of a SIV election already provide 100% verification.

The underlying method behind the Risk-Limiting Audit is one of statistical confidence, which poses the question of how many individuals must be audited in order to achieve a satisfactory level of assurance in the results.

**Principles of a SIV RLA:**

1. The voter must agree to participate

Considering that only a small proportion of the total number of votes need to be audited in order to achieve a high level of confidence, this is not a major obstacle.

2. Voter’s selections must remain private

**Protocol to carry out the audit:**

1. The official conducting the audit should establish contact with the voter through an appropriate channel, usually a phone-call

2. The voter will be asked to self-verify the accuracy of their vote Using the necessary tools — Verification # and if wanted a 2nd Device check — the voter will be guided through the process.

3. Upon completion of the verification process, the voter should inform the election official of the outcome, without disclosing the specifics of their vote. A statement such as "I have verified and confirmed that there are/are not any discrepancies" would suffice.

It is crucial that the protocol adopted does not compromise the sanctity of the secret ballot. In particular, the following approach should be avoided — the election official must not inquire about the specifics of the voter's choice, and the voter must not be asked to show evidence or otherwise disclose the candidate they voted for.

## Proving the integrity of an RLA

_Zero-Knowledge Proof that a device cast a SIV vote_

If any particular device casts a vote in a SIV election, and that vote was accepted by the admin, the encrypted vote itself can now serve as a sort of public key for the device, with any of the Randomizers generated on device as private keys.

This allows a device to prove to anyone else that it has the key material that successfully voted in a particular election (e.g. already vetted by the election admin), and without revealing the underlying randomizers: i.e. create a signature to prove in Zero Knowledge.

For example, the voters participating in the Risk Limiting Audit will have clear proof that they are authenticated voters in that election and can show proof to the auditor who then can prove the integrity of the audit.

Technical Specification:

```
The encrypted vote is a series of ciphertexts, one for each votable item (e.g. Governor, mayor, Prop_2), each made up of two sub-parts.One of those two sub parts is named “lock”:

Lock = (Generator * randomizer)

Where:

- generator is the publicly known generator of the Ristretto group,
- randomizer is the random key material the device created, and
- * is elliptic curve point multiplication (a one way function)

This is enough of a public key to use for EdDSA or ECDSA signatures.

```

## 2020 US Presidential Election in Georgia

In the Georgia election the difference between the two candidates was only 0.12%, meaning that if a small number of votes had been compromised, the outcome of the election could have been different.

If SIV was to be used in this case, the following Risk Limiting Audit could have been conducted to verify the accuracy of results.

<span style={{color: "red"}}>INSERT MATH & FORMULAS</span>

As shown above, despite the razor thin margin, examining only 5,000 randomly sampled votes out of the 4,999,958 total cast (about 1 in 700) can provide 99.72% confidence that the final winner was correct. Doubling the amount checked to 10,000 out of the approximately 5,000,000 total votes results in 99.9992% confidence in correct outcomes.

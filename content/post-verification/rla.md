---
part: Post Election Verification
title: Risk Limiting Audit
---

Next, we assume that all 4 of the previous checks have passed, but I, the voter, am still not satisfied.

The checks done tell me that Protocol Steps 4 and 5 were valid, but there are still risks that:

- There might have been ballot stuffing in step 1— human admins of the election cheated
- Votes (other than mine) might have been modified in step 2— malware on voters’ devices
- SIV might have swapped votes (other than mine) in step 3— the SIV server software cheated

## Voter Registration List Can Be Audited

Continuing with the hypothetical election already mentioned, I, the voter, would be satisfied if I could see confirmation from enough other voters that they checked their votes.

How many confirmations do I need to see to be sure?

- Because there were 15 votes, 8 is the majority needed to win.
- Considering the outcome was 10-to-5, any 3 of the Washington votes could have been flipped to change the winner.
- Thus, the margin of error is: 2 votes could have been flipped without changing the winner.
- Therefore, I can be completely sure if I see confirmation from at least 15 - 2 = 13 voters.

<span style={{color: "red"}}>INSERT TABLE WITH MATH</span>

As showcase above, using RLA Math we can probabilistically catch fraud with far fewer checks:

- 3 random checks alone gives >51% confidence
- 6 checks gives >81% confidence
- 8 checks gives >91% confidence

## 2020 US Presidential Election in Georgia

Another example of the power of a Risk-Limiting Audit is the Georgia election where the difference between the two candidates was only 0.12%, meaning that if a small number of votes had been compromised, the outcome of the election could have been different.

<span style={{color: "red"}}>INSERT TABLES WITH MATH</span>

As shown above, despite the razor thin margin, examining only 5,000 randomly sampled votes out of the 4,999,958 total cast (about 1 in 700) can provide 99.72% confidence that the final winner was correct. Doubling the amount checked to 10,000 out of the approximately 5,000,000 total votes results in 99.9992% confidence in correct outcomes.

The mathematical principles underlying Risk Limiting Audits allow for efficient sampling. A small sample size can be selected and reviewed by official representatives, who can confirm the integrity of the votes with voters, without compromising the privacy of individual voters.

The SIV Risk-Limiting Audit resembles a Ballot-level RLA, however, unlike the latter, it does not involve the election department conducting a self-examination of their own machines.

There are two possibilities where RLA are helpful (all other steps already provide 100% verification):

a) anti-malware test & SIV software would switch out votes

b) auditing voter role

**a) RLA for Anti-malware test & SIV software would switch out votes**

Conducting an RLA is a redundant step, as voters have the ability to personally verify the accuracy of their own vote and results. However, an RLA can be a prudent measure in cases where it is not desired to rely solely on individual voter’s self-verification.

The underlying method behind the Risk-Limiting Audit is one of statistical confidence, which poses the question of how many individuals must be audited in order to achieve a satisfactory level of assurance in the results.

When conducting a Risk-Limiting Audit, it is important to consider the following points:

1. The voter has to agree to participate Considering that only a small proportion of the total number of votes need to be audited in order to achieve a high level of confidence, this is not a major obstacle.

2. Voter’s selections must remain private When carrying out a RLA, the following protocol should be observed:

   - The election official conducting the audit should establish contact with the voter through an appropriate channel, usually a phone-call
   - The voter is asked to self-verify the accuracy of their vote
   - The necessary tools and guidance are provided to the voter to facilitate the verification process
   - Upon completion of the verification process, the voter should inform the election official of the outcome, without disclosing the specifics of their vote. A statement such as "I have verified and confirmed that there are/are not any discrepancies" would suffice.

It is crucial that the protocol adopted does not compromise the sanctity of the secret ballot. In particular, the following approach should be avoided — the election official must not inquire about the specifics of the voter's choice, and the voter should not be asked to show evidence or otherwise disclose the candidate they voted for.

**b) Auditing voter role**

The examination of voter rolls is a standard procedure that election officials typically undertake in the context of paper voting. This process does not necessitate the participation of voters and thus no modifications are required in the case of Secure Internet Voting (SIV).

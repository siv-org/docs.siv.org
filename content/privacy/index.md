---
part: Security Requirements
title: Private Voting
---

## What is "Private Voting"?

For a truly "Free and Fair Election," voters must be able to make their choices freely, without anyone learning how they voted, including election officials and technology providers.

Strong security comes from independently verifiable privacy design, not just unverifiable promises to delete data without looking. It is not simply a question of ethics or ill-intent, but also resistance from vendors' systems being compromised.

Some people advocate an even more rigorous definition of voter privacy, prohibiting voters from possibly sharing how they voted, in order to prevent vote selling or other coercion attempts. While this is mostly out-of-scope for SIV itself, this topic is addressed in further detail in [Mitigating Attacks → Vote Selling](/mitigating-attacks/vote-selling).

The goal of SIV is to ensure that the privacy of the voter is upheld, and that only the voter should be aware of how they voted.

## How Privacy is Achieved

### Cryptographic Privacy

Using [Threshold Key Cryptography](https://en.wikipedia.org/wiki/Threshold_cryptosystem), the SIV system does not allow anyone, including the election administrators and the SIV infrastructure, to see how anyone else voted.

Once a voter makes their selections, all their choices are encrypted on their voting device using Elliptic Curve Cryptography, which is infeasible to brute-force computationally. The plaintext of how they vote never leaves their device.

<img src="/images/encrypted-vote.png" style= {{width: "75%", margin: "left"}} />

This scrambled vote can only be unlocked by a single private key, which is infeasible to guess (only one out of 10^77 possibilities — takes more energy than the sun will produce in its lifetime). The private key itself is split among multiple parties: each one adding an additional layer of privacy against compromise.

Once all votes are received, all votes undergo a thorough anonymization stage, based upon a cryptographic shuffle (see Further Reading for details). Finally all anonymized votes are securely unlocked from their encryption so their contents can be tallied up.

This matches the expectations of paper ballot anonymization, where voters are confirmed, but voters' identification is separated from the submitted ballots. The SIV system offers even more rigorous privacy, so nobody has the ability to connect vote contents to voters' identities, while maintaining complete auditability of who voted and verifiability of final results.

### Air-gapping

The SIV design also allows voters to prepare their encrypted vote submission on an “air-gapped” device for extreme assurance that even their device cannot snoop on their selections. This protects against voter’s own devices being compromised by spyware, as well as the SIV Voting client software being compromised for surveillance. This is an advanced feature that is strictly optional for voters to use.

## Further Reading

This page is a high-level summary of how SIV privacy is achieved. For detailed explanations, see:

- 15 Minute Overview —> Verifiable Shuffle, Votes Unlocked and Tallied
- Technical Specifications —> Before Election: Registering Verifying Observers, Election Begins, Voting Period Ends
- Mitigating Attacks: Vote Selling
- Mitigating Attacks: Privacy Violations

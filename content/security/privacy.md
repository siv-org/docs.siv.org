---
part: Security Requirements
title: Private Voting
---

For a truly "Free and Fair Election," voters must be able to make their choices freely, without anyone learning how they voted, including election officials and technology providers.

Strong security comes from independently verifiable privacy design, not just unverifiable promises. It is not simply a question of ethics or ill-intent, but also resistance from the vendor’s systems being compromised. The goal of SIV is to ensure that the privacy of the voter is upheld, and that only the voter should be aware of how they voted.

Using [Threshold Key Cryptography](https://en.wikipedia.org/wiki/Threshold_cryptosystem), the SIV system doesn't allow anyone, including the election administrators and the SIV infrastructure, to see how anyone else voted.

Once a voter makes their selections, all their options get encrypted on their voting device using elliptic curve cryptography, infeasible to brute-force computationally. The plaintext of how they vote never leaves their device.

<span style={{color: "red"}}>INSERT ILLUSTRATION</span>

Once all votes are received, the Election’s Verifying Observers each perform their own cryptographic shuffle of all the votes, for thorough anonymization, before working together to unlock the votes for tallying. This matches the expectations of paper ballot anonymization, where voters are confirmed, but voters' identification is separated from submitted ballots. The SIV system offers even more rigorous privacy, so nobody has the ability to connect votes to voter's identities, while maintaining complete auditability of who voted and verifiability of final results.

The SIV design also allows voters to prepare their encrypted vote submission on an “air-gapped” device” for extreme assurance that even their device cannot snoop on their selections. This protects against voter’s own devices being compromised by spyware, as well as the SIV Voting client software being compromised for surveillance.

Some people advocate for an even more rigorous voter privacy, prohibiting voters from willingly sharing how they voted in order to prevent them from selling their vote. From a strictly technical point of view, this is outside of the scope of the SIV Protocol, but we address this topic and defenses later in section “Mitigating Attacks” —> “Vote Selling”.

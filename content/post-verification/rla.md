---
part: Post Election Verification
title: Risk Limiting Audit
---

### Step 4. Votes Are Anonymized

Although the anonymization step is conceptually simple, it involves some strong cryptography.

Conceptually, we're simply going to shuffle the list of encrypted votes.

If we just shuffled the encrypted votes, people could see where they were permuted, so the person shuffling them is also going to re-encrypt each vote in such a way that it cannot be matched with the original, and yet decrypts to the same value.

However, this still allows the shuffler to know where the votes went, so we will have each Verifying Observer perform a shuffle sequentially. This way, no single Verifying Observer will know how the votes were shuffled, and neither will anyone else.

To accomplish this step, we need an operation that takes a list of encrypted votes as input, and outputs a shuffled list of re-encrypted votes, in such a way that external observers can verify that this is what happened, i.e., a zero-knowledge proof that the output list is a re-encrypted shuffle of the input list.

We use an algorithm based on Dr. Andrew Neff's 2004 paper "Verifiable Mixing (Shuffling) of ElGamal Pairs", with the only difference being that we replace modular exponentiation with Elliptic Curve Point Multiplication.

The proofs of completeness, soundness and zero-knowledge remain the same in the case of Elliptic Curve Point Multiplication, and we get the benefit of a higher ratio of encryption strength to key-size.

### Step 5. Encrypted Votes Are Unlocked and Tallied

Now that the encrypted votes have been shuffled and re-encrypted, it is ok to decrypt them without anyone knowing whose vote is whose.

We need to decrypt them without leaking the secret key, because then it could be used to decrypt the original encrypted votes, before they were shuffled.

This decryption is done in another decentralized ceremony, involving a sufficient threshold number of Verifying Observers, whereby each Verifying Observer submits a partial decryption of each vote, but the information is useless beyond that.

Note that this decryption is also provable -- meaning parties cannot cheat in such a way as to make the vote decrypt to something else without people knowing. These ZK Proofs of a Valid Shuffle are verifiable by everyone, and automatically checked by all the other Verifying Observers & SIV Admin Server.

Once the votes are decrypted, their complete contents are shown to everyone, and it is trivial to tally them. The tally totals can be independently recounted, for confirmation.

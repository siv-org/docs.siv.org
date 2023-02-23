---
part: Security Requirements
title: Authenticated Voters
---

## What is "Authentication"?

Authentication ensures that only legitimately registered voters are able to cast a ballot, and that each voter can only vote once. This process must also be independently auditable to provide assurance of its accuracy and integrity.

## How SIV Authentication Works

SIV conforms and can exceed the standards of the paper-based voting system.

In a SIV election, every voter receives a unique Voter Authentication Token (Auth Token), prior to the beginning of the election. The Auth Token is a short hexadecimal number.

<div class="text-xs">
Please note, "[Authentication tokens](https://en.wikipedia.org/wiki/Access_token)" are standard in computer security, and should not be confused with blockchains or cryptocurrencies.
</div>

<div class="text-xs">
<img src="/images/auth-token.png" width="250px" class="border border-gray-600 " />
Example of a Voter Authentication Token from an invitation email
</div>

The Voter Authentication Token serves to ensure the integrity of the election process by ensuring that each voter is only able to submit a single vote. The token can be revoked, reissued, and audited, as needed. Additionally, tokens can be invalidated when a vote is recorded from another channel, to prevent voters from casting two ballots.

## Authentication Methods

The SIV system is designed to be highly adaptable in terms of voter authentication methods. While it is capable of replicating traditional voting protocols, such as the distribution of Auth Tokens via postal mail or provided in person, it also allows for the incorporation of additional authentication measures. This flexibility enables SIV to accommodate a wide range of security needs and requirements.

Election Administrators can layer these methods on top of each other as needed, to achieve a strictly higher standard than paper methods currently use.

Authentication methods supported:

1. Unique codes sent to email addresses
2. Unique codes sent to SMS numbers
3. Unique codes sent over secure digital channels, such as Signal Messenger
4. Unique codes sent to physical mail addresses
5. Unique codes given in-person
6. Drawn signature verification
7. ID + selfie photos
8. IP address geolocation
9. Time-based One-Time Passwords
10. Pre-distributed Cryptographic Public Key Pairs

The specifics of the voter authentication process used are determined by the jurisdiction and requirements of each election.

## Audit

It is worth noting that the entire SIV process is subject to audit, ensuring transparency and accountability.

**1. Auditing the List of Eligible Voters: "The Voter Roll"**

Ensuring the Voter Roll is well-maintained is required no matter what system is used to cast votes: In Person, Vote by Mail, or Electronic. Voter Rolls will continue to need to be audited by the government and independent civic society groups.

**2. Auditing the Use of Voter Authentication Tokens**

Before an election begins, unique Authentication Tokens are created, one for each eligible voter. SIV handles this automatically for Election Administrators, ensuring strong cryptographic randomness.

Whenever an encrypted vote is submitted by a voter's device, the voter's Auth Token is checked against the election's Voter Roll to ensure that it is valid and has not already been used. In this way, while all submitted votes' contents are protected by strong cryptography, the author of the encrypted vote is still identifiable. An analogy is how Vote by Mail votes are submitted within a Sealed Envelope, but with the Voter's Name, Address, and Signature visible on the outside.

To perform this audit, the voter corresponding to each used auth token can be published. SIV does not automatically publish this list, but it is up to each election administrator and jurisdiction's requirements whether this is published, shared with a select group (such as the candidates & their political parties), or not at all.

When a voter's device takes part in a SIV election, it generates & stores new private cryptographic key material, which can later be verified by independent auditors without compromising vote privacy.

Using random statistical sampling, as part of a "Risk Limiting Audit", only a small number of submitted votes need to be individually audited to achieve overwhelmingly high confidence in the outcome of the election.

## Remediation Capabilities

When using SIV, a new more powerful, precise, and flexible level of remediation is possible.

The election administrator has the ability to revoke voter credentials at any stage of the election, including after voting and tallying. This process leaves an extensive written trail and cannot be secretly abused.

This is possible because encrypted votes — still linked to voter's identities — can be corrected at any point. The then updated set can continue to be re-anonymized and re-tallied as necessary.

One analogy is the difference between writing on a classical typewriter vs. modern digital writing tools, which offer a simple `Backspace` key.

## Further Reading

This page is an overview of SIV Authentication. For more detailed information on Auth Tokens and processes:

- 15 Min Overview: [Voter Registration](https://siv.org/protocol#pre-a) & [Invitation To Vote](https://siv.org/protocol#1)
- Technical Specification: [Registration](/spec/before-election) & [Invitations Sent To Voters](/spec/election-begins)

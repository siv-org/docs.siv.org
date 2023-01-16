---
part: Security Requirements
title: Authenticated Voters
---

Authentication ensures that only legitimately registered voters are able to cast a ballot, and that each voter can only vote once. This process must also be independently auditable to provide assurance of its accuracy and integrity.

SIV (Secure Internet Voting) conforms to the standards of the paper-based voting system.

In an election having SIV as one of the voting options, every voter choosing SIV receives a random Voter Authorization Token, prior to the beginning of the election. This token serves to ensure that each voter is only able to submit a single vote. Should the need arise, these tokens can be revoked, reissued, and audited to ensure the integrity of the election process.

The SIV system is designed to be highly adaptable in terms of voter authentication methods. While it is capable of replicating traditional voting protocols, such as the distribution of Auth Tokens via postal mail or provided in person, it also allows for the incorporation of additional authentication measures. This flexibility enables SIV to accommodate a wide range of security needs and requirements.

Additional methods provided:

1. Unique codes sent to email addresses
2. Unique codes sent to SMS numbers
3. Unique codes sent to physical mail addresses
4. Signature verification
5. ID + selfie photos
6. IP address geolocation
7. Unique codes given in-person
8. Time-based One-Time Passwords

The specifics of the voter authentication process used are determined by the specific jurisdiction and requirements of each election.

It is worth noting that the entire SIV process is subject to audit, ensuring transparency and accountability. The following two main processes are required to be audited:

1. Voter Roll This is a requirement applicable to no matter what system is used. Currently, voter-rolls are audited by the government. This will remain true in the case of SIV as well.

2. “One Person, One Vote” Auditing that only one person received and cast only one vote accurately can be done via Risk Limiting Audits. For the exact math and examples, please see the section “Post Election Verification” —> “Voter Registration List Can Be Audited”.

Furthermore, the ability to revoke voter credentials at any stage of the election, including after voting and tallying, affords election administrators a new more powerful, precise, and flexible level of remediation.

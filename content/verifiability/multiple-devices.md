---
part: Security Requirements → Verifiability
title: Using Multiple Devices to Detect Malware
---

As an additional layer of security, SIV enables a voter to easily use multiple devices to verify their vote was submitted as intended. Separate devices with independent malware profiles, such as a different operating system, provide extra layers of defense.

These checks can be done in seconds, as quickly as scanning a QR code and with as many additional devices as desired. No special knowledge is needed.

Significantly, these checks can be initiated right at the time of vote, rather than waiting until the end of an election for votes to unlocked, which [checking Verification #'s](/verifiability/personal-vote) requires. The ideal time is immediately after a voter submits their encrypted ballot. Checking just before submission can also work, but sophisticated malware might notice a 2nd Device Check is being initiated, and thus _not cheat_. It would stopped, but harder to catch red-handed.

## Technical Implementation Details

After the voter submitted their selections, they can scan a QR code, which opens a link like this:

```
siv.org/malware-check/$election_id/$auth_token/#url_encoded_vote_data

where encoded vote data is derived from the JSON object:
{verification number, selections: [question_id]: { plaintext, randomizers } }
```

**When that page loads on the new device, it:**

- moves private vote data into document memory, and use window.history.replace() to overwrite it so later browser users won't accidentally see it
- it recalculates encrypted vote given plaintext, randomizers, & verification \# from `url_encoded_vote_data`
- sends recalculated encrypted vote to server, with election_id and auth_token
- server stores a record of this 2nd devices submission, along with a timestamp and user agent
- server sends back whether the re-calculated encrypted vote matches or not. If they don't — alert the user in the user interface, tell them to contact election admin, send SIV admin a notification about it
- if the server reports there was a match, show the client the vote selections again, and ask them to confirm they are correct. Example:

| Confirm your selections: |                  |
| ------------------------ | ---------------- |
| President:               | Abraham Lincoln  |
| Governor:                | Grover Cleveland |
| State Rep:               | Jane Samson      |
| Local Rep:               | Alex Smith       |
| Proposition A:           | Against          |
| Proposition B: Against   | Against          |
| Proposition C:           | For              |

**If voters confirms _"Yes"_:**

- store in DB with timestamp
- update the original vote confirmation page with "checked with 1 separate device - iPhone iOS 15.3, Safari 11.3"
- invite voter to SMS confirm, to ensure a live human is doing the 2nd device check, not malware from the original device. Alternatively invite voters to provide their Anti-malware Confirmation Code, if provided on their physical voter invitation.
- tell voter they can now close the 2nd device's window.

**If voter says _"No”_:**

They write a description of the problem, and send SIV admin a notification about it.

## Protocol for detected attack

If a voter detects a tampered vote, election administrators can invalidate the vote and allow the voter to submit another.

This process requires written documentation, clearly stating the voter wants their vote revoked, and leaves a full audit trail. This remediation can happen in-person, by mail, or through another communication channel.

## Proofs of malware checks

Whenever voters use this Multiple Device Check, SIV can record its results — Clean vs. Corrupted — and the details of the devices, such as device type and software versions. This can provide election-wide overviews of the number & percentage of tests performed and their results, and help to immediately detect broader trends about high-risk device profiles.

If desired, election administrators can even mandate a 2nd-Device Check before submitted votes are accepted.

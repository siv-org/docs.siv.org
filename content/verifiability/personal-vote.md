---
part: Security Requirements → Verifiability
title: Personally Verify Your Vote Is Accurately Submitted & Counted In The Final Tally
---

## Verification Number

When you submit your vote, your device generates a unique, randomly generated secret Verification Number. This number acts as a personal tool that allows you to confirm, with complete certainty, that your vote was properly recorded and counted.

This method provides a higher level of assurance than paper elections, where you have limited opportunities for first-hand verification after casting your ballot. This is sometimes referred to as “End-to-End Voter Verifiability”.

After casting your ballot, your device continues to store your personal Verification \# in the browser memory: <img src="/images/verification-num.png" style={{width: "50%" }} class="ml-5 shadow-lg shadow-sky-900/30 my-7"/>

At the end of the election when the list of votes is published, you can use your Verification \# to verify if your vote is in the list and if it accurately reflects your choices:

<img src="/images/verification-num-list.png" style={{width: "50%" }} class="ml-5 shadow-lg shadow-sky-900/30 my-7"/>

## This Check Doesn't Require Any Computation

This check can be made without requiring any correct computation from your device.

It works with other people's devices, which have little ability to know which vote is yours, which provides additional resistance to malware.

It also works with paper printouts of the election's votes, which can be made accessible in public locations such as at the Department of Elections, a local library, or brought to voters by people conducting Risk Limiting Audits. Although this may appear to require more effort, only a small number of people verifying in this analog way can be used to calibrate the much more accessible digital verification methods.

## Quicker Multi-Device Checks for Malware

In order to provide another layer of security against malware threats, SIV also provides a process you can quickly use on a second device to confirm your selections, which can be initiated right at the time of vote, without waiting for election results to be unlocked. See: [Using Multiple Devices to Detect Malware](/verifiability/multiple-devices).

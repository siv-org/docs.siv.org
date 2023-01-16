---
part: Introduction
title: SIV
---

## Why

The election system is the foundation of our democracy, and the decisions we make when voting are one of our most impactful collective actions.

Therefore, it is vital that our election infrastructure is as strong and reliable as it can be.

Currently, millions of voters lack trust in election results as vote-counting occurs behind closed doors, leading to demands for greater verification. Low voter turnout, accessibility issues, and exorbitant costs are additional weaknesses. All while a handful number of corporations run all elections without providing access to their source-code.

These factors result in unverifiable processes, undetected attacks, and an overall poor experience for voters.

## How

Establishing a voter-verifiable election system that is easily accessible to every citizen.

## What

Secure Internet Voting (SIV) offers citizens the power of nearly instantaneous, personally verifiable, and private voting, on any preferred devices, at a fraction of the cost of current election systems.

Strong cryptography, the same kind used to safeguard national secrets and armaments, is used to create a secure election system with no single point of vulnerability, and with methods in place to easily detect and remediate any attempts of attack.

## Goals

1. Easily Accessible For All
2. Fast Voting Process & Tallying
3. Voter Verifiable Results
4. Universally Auditable Processes and Tallies
5. Authenticated Voters
6. Private Voting
7. Detectable Attacks
8. Easy Remediation Abilities

## Implementation With The Paper System

SIV can operate as an addition to existing approaches, not a replacement. Any voter who prefers traditional methods can still use them.

Voter Authorization Tokens can be invalidated as soon as a vote is recorded from another channel, or during later deduplication stages. This ensures no voter can cast two ballots by using multiple methods.

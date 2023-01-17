---
part: Mitigating Attacks
title: Vote Selling
---

Despite common misconceptions, vote selling is already feasible with paper voting. For example, it is trivially easy to sign a blank vote-by-mail ballot and hand it over to a vote buyer. But this concern is magnified by internet voting because potential vote buyers can now more easily be located far away, outside law enforcement’s jurisdiction, and automated.

In the context of public government elections, vote selling is already a serious crime and has been in the US criminal code for over 70 years [18 U.S.C. §597](https://www.google.com/url?q=https://www.govinfo.gov/content/pkg/USCODE-2020-title18/html/USCODE-2020-title18-partI-chap29-sec597.htm&sa=D&source=docs&ust=1673928068116540&usg=AOvVaw1-AAyNYclRb7Bj1iYXTVbb), carrying up to 2 years jail time and a $10k fine for a single willful instance, for both buyer & seller.

With that said, although vote selling is illegal, it is hard to detect without one of the two parties revealing the scheme, and therefore hard to enforce laws against it.

If we can make vote selling easier to detect, we can enforce accountability and deter it in the first place. One key insight we can leverage is from Game Theory, specifically based on the two-party Prisoner’s Dilemma:

<img src="/images/prisoner-dilemma.png" style={{width: "50%", margin: "auto"}} />

The Prisoner’s Dilemma illustrates how each player’s individual interest — the “Nash equilibrium” — can be to always defect, no matter what action the other party takes. As in Prisoner’s Dilemma, our two sides, vote buyer and vote seller, do not know if they can trust each other. Either side can defect, blowing the whistle on the existence of the vote selling arrangement.

We propose to leverage significant criminal penalties to create a strong incentive for either side to defect. In addition to jail time if caught, governments can establish a fine of 100x the agreed-upon vote sale price. This creates outsized risk to any would-be vote buyer or seller.

Additionally, some of the collected fine can be offered as a bounty reward to the defecting party. For example, if buyer & seller agree to a price of $100, the fine could be $10,000, and the bounty could be $500.

**One Proposal:**

    _Agreed price = X_

    _Fine if Caught = X \* 100_

    _Bounty for Reporting = X \* 5_

<img src="/images/voter-dilemma.png" style= {{width: "90%", margin: "auto"}} />

As with Prisoner’s Dilemma, it is always better for each side to defect. Each side knows it is always better for the other side to defect against them too. This disrupts the two sides’ ability to trust each other.

Any voter who may be hopeful about selling their vote now faces large risks to be caught in a honeypot.

Even if the buyer is outside the jurisdiction, and so harder to catch, the seller does not necessarily know this for sure: it could still be a honeypot operation. Even if the buyer can prove they are outside the jurisdiction, they may still want to simply collect the bounty reward. Therefore, it is always better for the seller to defect than to risk getting defected upon.

The SIV Voting software itself can warn voters about the criminal consequences for participating in a vote-selling scheme, and instruct participants how to report any solicitations:

<img src="/images/mockup-vote-selling.png" style= {{width: "90%", margin: "auto"}} />

In conclusion, we propose a combination of a strong legal framework — incentivizing both parties to defect, alongside a voting interface that educates all voters about the consequences, rewards for reporting, and how to take action. Together, this can strongly disrupt vote-selling attempts and increase trust in SIV election outcomes.

The above covers the core of the proposal. Below we explore a number of deeper implications.

**1. Government Elections Only**

This Game Theoretic defense against Vote Buying is specifically designed for government elections with a criminal justice mechanism to enforce these rules and collect fines. For non-government elections, it may be possible to recreate a Nash equilibrium towards defecting if voters are required to make a large financial deposit in order to vote, which can be confiscated if vote selling is caught.

export type Score = number | [number, { adv?: string; disadv: string }]

type Row = {
  d_name: string
  desc: string
  scores: [Score, Score, Score]
  scores_with_bounty?: [Score, Score, Score]
}
type Category = { name: string; rows: Row[] }

export const tableData: Category[] = [
  {
    name: 'Accurate Results',
    rows: [
      {
        d_name: 'Auditable Voter Authentication',
        desc: 'How sure are we that only legitimate voters are voting, and only once each?',
        scores: [
          [
            7,
            {
              adv: `Allows for a combination of auth methods: verified email delivery, SMS, drawn e-signatures, time-based one-time passwords, IP address geolocation, government ID photos, and cryptographic key pairs.
Strong remediation process allowing admins to revoke voter credentials at any stage of the election, including post-voting and tallying phases.`,

              disadv: ``
            }
          ],
          [
            5,
            {
              adv: `We confirm that the voter is in control of their mailbox. Or that the person casting a vote has access to the voter's mailbox.
              Election administrators can require signatures that are verified against the signatures on file.`,

              disadv: `Anyone with access to the mailbox, including children, spouses, roommates, can also access the blank ballot.
              Forging signatures especially with a reference is not that difficult. Schoolchildren sometimes do it for their parents.
              Verifying a lot of signatures is a relatively costly manual process.
              Depends on the postal mail system working quickly and without errors.
              Because of slowness, everything needs to be done and executed far in advance. And registration errors cannot quickly be remediated.
              Many mail boxes are not locked.
              Postage costs to send custom ballots ~$1/voter.
              Voters sometimes fail to update their mailing address when they move.
              How easy is it to create a bunch of fake votes and add them, without anyone noticing? It is hard to know.`
            }
          ],
          [
            7,
            {
              adv: `Have to show up in person
Can limit to resident's unique precinct
Can require photo ID`,
              disadv: `Vulnerable to ballot stuffing: all ballot boxes must be watched at all times by multiple observers
Limited post-election auditability
Once ballots accepted, limited remediation options`
            }
          ]
        ]
      },
      {
        d_name: 'Verifiable results',
        desc: 'How sure are we that the votes were tallied up correctly, without any votes lost or modified?',
        scores: [
          [
            9,
            {
              adv: `Voters and independent parties are able to verify results through various straightforward to complex methods, eliminating reliance on servers or election officials.
              In SIV elections, all votes are anonymously published after the election, which allows voters to use their unique Verification # to check if their vote was recorded correctly. 
              As everyone has access to the votes list, everyone is enable to perform recounts using simple spreadsheet tools. In addition, every device that views the election results page instantly performs its own recount, allowing thousands of automatic checks and quickly spotting any errors.
              To detect malware on device, voters can use multiple devices to make sure their vote was submitted correctly, much like scanning a QR code. This quick check can be done at the time of voting and it helps identify any errors immediately. 
              Anti-Malware Codes allow voters to check their vote via a secondary device using unique codes provided in a mailed invitation. This system not only offers protection against catching malware on the primary device, but also tracks and validates the number of voters performing secondary device checks, improving the overall integrity of voting results.
              Zero-Knowledge Proofs provide mathematical evidence that SIV's anonymization techniques did not modify or tamper with any of the submitted votes.
              SIV RLAs can be performed after results are published. Official and independent parties can gain very high statistical confidence in election outcomes by only sampling a small number of random voters and ask them to confirm their votes. 
              SIV votes can be printed onto paper to be  verified manually without depending on any digital computations for accuracy.`,
              disadv: ``
            }
          ],
          [
            3,
            {
              adv: `n/a`,
              disadv: `Inherits all the disadvantages of safely verifying tallying of in-person voting, plus introduces new risks:
              It is hard to know what happens with the ballot once you put your ballot into a mailbox. There are lots of opportunities for it to get tampered with or lost.
              Because mailboxes are so geographically spread out, it is very difficult to comprehensively monitor.
              Limited ability to audit after the fact.`
            }
          ],
          [
            5,
            {
              adv: `There is a process to get votes to the final tallying without  tampering. That process is not perfect, but it is relatively good. It usually requires a lot of people to be corrupt to facilitate errors.
              My preferred candidate ideally can send election observers. But there is often so many polling locations and times to vote that is very difficult to get anything close to complete coverage.
              Electronic tallying machines themselves can be audited using powerful post-election RLA techniques.`,
              disadv: `I cast a vote but have little-to-no direct evidence whether my vote counted.
              People carrying out the process are usually strangers, with little way for the vast majority of voters to tell if they're trustworthy.
              The process is fundamentally an imperfect system that can try its best to mitigate attacks & errors, but at the end of the day can never provide "proof" of correctness, only absence of uncovered attacks. As Carl Sagan famously noted, "Absence of Evidence does not mean Evidence of Absence".`
            }
          ]
        ]
      }
    ]
  },
  {
    name: 'Honest Vote Selections',
    rows: [
      {
        d_name: 'Vote privacy',
        desc: 'How confident can individual voters be that no one else will learn their ballot selections?',
        scores: [
          [
            8,
            {
              adv: `Using a cryptographic mixnet, the SIV system does not allow anyone, including the election administrators and the SIV infrastructure, to see how anyone else voted.
              Votes get encrypted on the voter's device and the plain text never leaves their device. 
              SIV's privacy architecture and implementation is fully inspectable by the voters, at their own pace.`,
              disadv: ``
            }
          ],
          [
            4,
            {
              adv: `There is at least of small amount of effort for vote privacy — vote selections are sealed within an envelope.
              Because it is a spread-out paper process, it is relatively hard to compromise on a huge scale without whistleblowers.`,
              disadv: `You're sending your name & vote selections side-by-side through this relatively opaque process. 
              It is trivially easy to open a letter, read its contents, and reseal it. There have been centuries worth of examples of governments doing this on an industrial scale. E.g. the French "cabinet noir".`
            }
          ],
          [
            6,
            {
              adv: `Ballots themselves usually don't have names on them.
              Voters are provided a private cubicle to mark their ballots.`,
              disadv: `Many ballots include unique tracking numbers, which can make vote selections linkable back to voter's identity.
              Voters are not in control of the space they vote in, and have limited time to inspect or test security, such as against cameras watching from overhead.`
            }
          ]
        ]
      },
      {
        d_name: 'Coercion resistance',
        desc: 'How protected are voters against attempts to threaten or purchase their vote selections?',
        scores: [
          [
            4,
            {
              adv: `Vote selling is a serious crime with a hefty financial penalty and jail time.
              Vote seller loses their right to vote for life.
              As the vote seller, if you sent your verification number to a smart contract, everyone can see what your Verification # is. Then thanks to SIV's architecture, all SIV Privacy Protectors can work together and can selectively de-anonymize your vote. Then your vote can be cancelled. So if your  sold Verification # gets leaked easily, your vote can be cancelled.
              Voter Selling is hypothetical, not observed.`,
              disadv: `Using SIV makes it easier to prove to remote coercers how you voted, because of the Verification # and the vote receipt.
              The proof also makes it easier to share with someone who's outside of the law enforcement's jurisdiction.`
            }
          ],
          [
            5,
            {
              adv: `Challenging to definitively prove how one voted to a remote coercer, although not impossible, e.g. over a video call or recording.
              Main deterrent is heavy criminal penalties.`,
              disadv: `Trivially easy for a voter to sign a blank ballot and hand it to a coercer, or fill it out in front of them.`
            }
          ],
          [
            7,
            {
              adv: ` Main deterrent is heavy criminal penalties.`,
              disadv: `A coercer such as a family member can stand in neighboring voting booth and peek to see how the victim votes.
            Voters can record a video to show it to their coercer as proof.
            Many voters, including high-profile celebrities, have taken pictures of their filled-in ballots and posted it on their social media profiles.`
            }
          ]
        ],
        scores_with_bounty: [
          [
            7,
            {
              adv: `With the bounty reward system in place, the proofs that SIV creates turn into benefits. People now have way easier and stronger proof of illegal activity.
              It is in the best interest of both the seller & buyer to defect. The trust between them diminishes significantly.
              Vote selling is already serious crime with a hefty financial penalty and jail time. And if caught, vote seller loses their right to vote for life.
              As the vote seller, if you sent your verification number to a smart contract, everyone can see what your Verification # is. Then thanks to SIV's architecture, all SIV Privacy Protectors can work together and can selectively de-anonymize your vote. Then your vote can be cancelled. So if your  sold Verification # gets leaked easily, your vote can be cancelled.
              Voter Selling is hypothetical, not observed.`,
              disadv: `The buyer might be able to stay anonymous, hence it might be hard to prosecute.
              Using SIV makes it easier to prove to remote coercers how you voted, because of the Verification # and the vote receipt.
              The proof also makes it easier to share with someone who's outside of the law enforcement's jurisdiction.`
            }
          ],
          [
            6,
            {
              adv: `Challenging though not impossible for remote vote buyers to automatically verify if the proof is legitimate.
              Main deterrent is heavy criminal penalties.
              Also benefits from Vote Seller's bounty reward.`,
              disadv: `Trivially easy for a voter to sign a blank ballot and hand it to a coercer, or fill it out in front of them.`
            }
          ],
          [
            8,
            {
              adv: ` Main deterrent is heavy criminal penalties.
              With Vote Seller's bounty rewards in place, taking photos or videos of how one voted becomes far less attractive.`,
              disadv: `A coercer such as a family member can stand in neighboring voting booth and peek to see how the victim votes.`
            }
          ]
        ]
      }
    ]
  },
  {
    name: 'Voter Experience',
    rows: [
      {
        d_name: 'Accessibility',
        desc: 'How accessible is the voting process for all members of the electorate, especially those with disabilities?',
        scores: [
          [
            8,
            {
              adv: `No need to visit polling stations or drop boxes.
              By utilizing their own devices in the comfort of their homes, voters with disabilities can benefit from customized accessibility features such as text-to-speech, larger font sizes, high contrast mode, and various other options tailored to their needs.
              Allows voters to research and fill in their ballot at their own pace, without feeling rushed.
              Offers convenience as voters can take their time to complete the ballot.`,
              disadv: `Not everyone is familiar and comfortable with using digital devices such as laptop, tablet, or phone.`
            }
          ],
          [
            6,
            {
              adv: `Beneficial for elderly, disabled, or remote/rural voters who find it hard to reach polling stations.
              Offers convenience as voters can take their time to complete the ballot.
              Reduction in In-Person Voting Issues: Issues such as long lines, malfunctioning machines, or polling place closures can impact the results of in-person voting. Mail-in voting helps alleviate these issues.
              Allows voters to research and fill in their ballot at their own pace, without feeling rushed.`,
              disadv: ` Some people might not receive their mail-in ballot due to issues with their registration status, incorrect mailing address, or other administrative errors. This could unintentionally disenfranchise certain voters. This is especially an issue for vote-by-mail because the process takes a while to get the ballot both out to and back from the voter.
              It is not great for vision impaired people.
              Requires getting to a mail drop-off location.
              Filling the ballot and drawing a signature can be a challenge if they are motor impaired.`
            }
          ],
          [
            5,
            {
              adv: `In-person assistance is available for those who need it.`,
              disadv: `May be difficult for individuals with mobility issues or remote/rural voters to reach polling stations.
            Limited voting hours may restrict some people from being able to vote.
            Long lines make it harder for people to vote.`
            }
          ]
        ]
      },
      {
        d_name: 'Speed of voting',
        desc: 'How quickly can individual voters participate?',
        scores: [
          [
            8,
            {
              adv: ` If the person knows how they want to vote, it takes seconds to vote.
              Voters don't need to travel or wait in line at polling stations.
              Easier to click a button, than have to use a pen and maybe make a mistake and then it's messier and harder to fix. `,
              disadv: `Election administrators have the option to send the unique Authentication codes that allow a voter to vote via mail. This can be slow or encounter issues such as incorrect mailing address.`
            }
          ],
          [
            7,
            {
              adv: `Voter does not need to travel or wait in line at polling stations.`,
              disadv: `Dependent on the postal service speed and reliability.
              Voter needs to find and travel to ballot drop-off location. 
            Requires voters to plan ahead to ensure their ballot is accepted in time. Different jurisdictions have different postmarked vs delivery deadlines.`
            }
          ],
          [
            2,
            {
              adv: `No need to worry about postal delays.`,
              disadv: `You have to get to the polling station, you might need to go through security such as a metal detector, wait in line, check in, and only then you can go into the booth and vote. Then you have to get back home.
          Efficiency depends on staffing and organization of the polling station.`
            }
          ]
        ]
      },
      {
        d_name: 'Speed of tallying',
        desc: 'How quickly can results be tallied?',
        scores: [
          [
            9,
            {
              adv: `SIV facilitates the swift and efficient tabulation and publication of voting results. Outcomes can be accessible within mere seconds of the voting period's conclusion.`,
              disadv: ``
            }
          ],
          [
            2,
            {
              adv: `n/a`,
              disadv: `Counting mail-in ballots is typically slower due to the verification process for each ballot, which includes signature verification. The ballots need to be unfolded and uncreased, and sometimes they get rejected by the voting machine. For example, some 2020 results took 3 weeks to count all the mail-in votes. 
            Results can be delayed if there's a large volume of mail-in ballots.`
            }
          ],
          [
            4,
            {
              adv: `n/a`,
              disadv: ` If using a tallying machine, votes need to be manually fed through the machine. 
              Longer wait times for results if manual recounting is required.`
            }
          ]
        ]
      }
    ]
  },
  {
    name: 'Costs',
    rows: [
      {
        d_name: 'Affordability to administer',
        desc: 'How affordable are the total costs to administer a secure election?',
        scores: [
          [
            8,
            {
              adv: `The current average government elections budget is ~$20/voter, no matter if the person votes or not. SIV can reduce that cost to ~$3/voter.
              SIV is priced so there is no charge for voters who opt not to use it.
              Governments can pilot SIV for free.`,
              disadv: `During initial years when SIV is first being offered, election administrators may want to continue providing the same levels of vote-by-mail and in-person infrastructure. So cost savings will take a few transition years to realize.`
            }
          ],
          [
            4,
            {
              adv: `Can be less expensive as it requires fewer polling stations, and less staff on election day.`,
              disadv: `The cost of printing, distributing, and returning the mail-in ballots can be high. And are paid even if voter opts for a different method.
            Increased cost for verification and handling of mail-in ballots.`
            }
          ],
          [
            2,
            {
              adv: `n/a`,
              disadv: `Requires significant staffing for polling stations.
            Cost of printing and handling physical ballots.`
            }
          ]
        ]
      }
    ]
  }
]

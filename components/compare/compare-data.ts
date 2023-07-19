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
              adv: `Sending out ballots can ensure that only registered voters receive a ballot.`,
              disadv: `Errors in the voter registry or delivery process can lead to legitimate voters not receiving their ballots.`
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
          9,
          [
            3,
            {
              disadv: `Zero ability to verify if votes were counted and counted as cast
            More susceptible to mistakes in filling out the ballots which can lead to a higher rate of rejected votes.

            Ballots can be intercepted, lost, or delivered to the wrong address, which could lead to fraudulent votes.`
            }
          ],
          [
            5,
            {
              adv: `You deliver the vote yourself to the ballot box.
              There are lots of people around at the polling station.`,
              disadv: `Voters have no insight if their vote was counted or not.
              Voters do not know if their vote was recorded as they chose to.
              Reliant on manual counting which can be error-prone
              Miscounts or fraud can occur at the ballot box
              Unable to trace errors`
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
          8,
          [
            4,
            {
              adv: ``,
              disadv: ``
            }
          ],
          [
            6,
            {
              adv: `Voters are alone in the booth, which gives the perception of privacy`,
              disadv: `Many elections often give ballot unique tracking numbers, making voter selections linkable back to voter's identity by administrators
              Voters are not in control of the space they vote in, and have limited time to inspect or test security`
            }
          ]
        ]
      },
      {
        d_name: 'Coercion resistance',
        desc: 'How protected are voters against attempts to threaten or purchase their vote selections?',
        scores: [4, 5, 7],
        scores_with_bounty: [
          7,
          [
            6,
            {
              disadv: `Potential for vote-by-mail fraud where someone intercepts and alters the ballots.
            Voter signs the blank ballot and gives it to the buyer.`
            }
          ],
          [
            8,
            {
              disadv: `Voters could potentially be coerced before arriving at the polling station.
            Voters can record a video to show it to their coercer as proof`
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
          8,
          [
            6,
            {
              adv: `Beneficial for elderly, disabled, or remote/rural voters who find it hard to reach polling stations.,
              Offers convenience as voters can take their time to complete the ballot.`,
              disadv: ``
            }
          ],
          [
            5,
            {
              adv: `In-person assistance is available for those who need it.`,
              disadv: `May be difficult for individuals with mobility issues or remote/rural voters to reach polling stations.
            Limited voting hours may restrict some people from being able to vote.`
            }
          ]
        ]
      },
      {
        d_name: 'Speed of voting',
        desc: 'How quickly can individual voters participate?',
        scores: [
          8,
          [
            7,
            {
              adv: `Allows voters to vote at their own pace without feeling rushed.
            Eliminates wait times at polling stations.`,
              disadv: `Dependent on the postal service speed and reliability.
            Requires voters to plan ahead to ensure their ballot is postmarked in time.
            `
            }
          ],
          [
            2,
            {
              adv: `No need to worry about postal delays`,
              disadv: `Long lines and wait times can occur.
          Efficiency depends on staffing and organization of the polling station.`
            }
          ]
        ]
      },
      {
        d_name: 'Speed of tallying',
        desc: 'How quickly can results be tallied?',
        scores: [
          9,
          [
            2,
            {
              adv: `Early voting results can be counted before the day of the election, which can speed up the overall results.`,
              disadv: `Counting mail-in ballots is typically slower due to the verification process for each ballot.
            Results can be delayed if there's a large volume of mail-in ballots.
            `
            }
          ],
          [
            4,
            {
              adv: `No need to worry about postal delays`,
              disadv: `Manual counting can be slow and error-prone.
              Longer wait times for results if recounting is required.`
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
          8,
          [
            4,
            {
              adv: `Can be less expensive as it requires fewer polling stations, less staff on election day, and less security for in-person voting.`,
              disadv: `The cost of printing, distributing, and returning the mail-in ballots can be high.
            Increased cost for verification and handling of mail-in ballots.
            Risk of increased expenditure on dealing with legal disputes over mail-in ballot validity.
            `
            }
          ],
          [
            2,
            {
              disadv: `Requires significant staffing for polling stations.
            Cost of printing and handling physical ballots.
            Higher costs due to the need for transportation and storage of physical ballots.`
            }
          ]
        ]
      }
    ]
  }
]

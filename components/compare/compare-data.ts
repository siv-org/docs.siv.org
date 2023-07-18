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
          7,
          5,
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
        scores: [9, 3, 5]
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
          4,
          [
            6,
            {
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
        scores_with_bounty: [7, 6, 8]
      }
    ]
  },
  {
    name: 'Voter Experience',
    rows: [
      {
        d_name: 'Accessibility',
        desc: 'How accessible is the voting process for all members of the electorate, especially those with disabilities?',
        scores: [8, 6, 5]
      },
      {
        d_name: 'Speed of voting',
        desc: 'How quickly can individual voters participate?',
        scores: [8, 7, 2]
      },
      {
        d_name: 'Speed of tallying',
        desc: 'How quickly can results be tallied?',
        scores: [9, 2, 4]
      }
    ]
  },
  {
    name: 'Costs',
    rows: [
      {
        d_name: 'Affordability to administer',
        desc: 'How affordable are the total costs to administer a secure election?',
        scores: [8, 4, 2]
      }
    ]
  }
]

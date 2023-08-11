import { Switch } from './Switch'

export const BountyRewardsSwitch = ({
  bountyEnabled,
  toggleBounty
}: {
  bountyEnabled: boolean
  toggleBounty: () => void
}) => {
  return (
    <span className='pl-4 text-base italic font-light'>
      <Switch checked={bountyEnabled} onClick={toggleBounty} label='with' />{' '}
      <a
        className='text-blue-500 hover:underline'
        href='/research-in-progress/vote-sellers-dilemma'
        target='_blank'
      >
        bounty
      </a>
    </span>
  )
}

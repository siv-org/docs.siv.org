import { Switch } from './Switch'

export const BountyRewardsSwitch = ({
  bountyEnabled,
  toggleBounty
}: {
  bountyEnabled: boolean
  toggleBounty: () => void
}) => {
  return (
    <div className='mt-1.5 text-base italic font-light sm:pl-4 sm:inline'>
      <Switch checked={bountyEnabled} onClick={toggleBounty} label='' />{' '}
      <a
        className='text-blue-500 dark:text-blue-400 hover:underline relative bottom-0.5'
        href='/research-in-progress/vote-sellers-dilemma'
        target='_blank'
      >
        bounty
      </a>
      <span className='relative bottom-0.5 dark:opacity-80'>{' & '}</span>
      <a
        className='text-blue-500 dark:text-blue-400 hover:underline relative bottom-0.5'
        href='https://blog.siv.org/2025/08/overrides'
        target='_blank'
      >
        overrides
      </a>
    </div>
  )
}

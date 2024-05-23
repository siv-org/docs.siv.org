import { useRef, useState } from 'react'

export const UkraineSignup = () => {
  const $input = useRef(null)
  const [buttonText, setButtonText] = useState('Submit')
  return (
    <div>
      <label>Get updates:</label>
      <input
        className='px-1 mx-2 border rounded border-black/30'
        placeholder='you@email.com'
        type='email'
        ref={$input}
        onChange={() => {
          if (buttonText !== 'Submit') setButtonText('Submit')
        }}
      />
      <button
        className={`px-2 py-1 text-sm border rounded-lg border-black/40 ${
          buttonText === 'Submit' ? 'active:bg-black/10' : 'cursor-not-allowed '
        }`}
        disabled={buttonText !== 'Submit'}
        onClick={async () => {
          setButtonText('Submitting...')

          const resp = await fetch(
            `https://siv.org/api/ukraine-updates-subscribe`,
            {
              body: JSON.stringify({ email: $input.current.value }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }
          )
          if (!resp.ok) {
            setButtonText('Submit')
            return alert((await resp.json()).error)
          }

          setButtonText('Done.')
        }}
      >
        {buttonText}
      </button>
    </div>
  )
}

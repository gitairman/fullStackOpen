import { memo } from 'react'

const Home = memo(() => {
  return (
    <div>
      <h2>
        Welcome to this site made by Aaron Hopkins with guidance from{' '}
        <a target="_blank" rel="noreferrer" href="https://fullstackopen.com/">fullstackopen.com</a>
      </h2>
    </div>
  )
})

Home.displayName = 'Home'

export default Home

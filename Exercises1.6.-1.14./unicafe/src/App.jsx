import { useState } from 'react'

const StatisticLine = ({ text, stat }) => {
  return (
    <p>{text} {stat}</p>
  )
}

const Statistics = ({ stats }) => {
  const [good, neutral, bad, all, average, percentGood] = stats

  // if no buttons have been pressed yet
  if (!all) {
    return (
      <>
        <p>No feedback given yet!</p>
      </>
    )
  }

  return (
    <>
      <StatisticLine text="good" stat={good} />
      <StatisticLine text="neutral" stat={neutral} />
      <StatisticLine text="bad" stat={bad} />
      <StatisticLine text="all" stat={all} />
      <StatisticLine text="average" stat={average.toFixed(2)} />
      <StatisticLine text="positive" stat={"%" + percentGood.toFixed(2)} />
    </>
  )
}

const Button = ({ label, handleClick }) => {
  return (
    <button onClick={handleClick}>{label}</button>
  )

}

const App = () => {
  // save clicks of each buttons to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all || 0
  const percentGood = (good / all) * 100 || 0

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <section>
        <h2>Give Feedback</h2>
        <Button label="good" handleClick={handleClickGood} />
        <Button label="neutral" handleClick={handleClickNeutral} />
        <Button label="bad" handleClick={handleClickBad} />
      </section>
      <section>
        <h2>Statistics</h2>
        <Statistics stats={[good, neutral, bad, all, average, percentGood]} />
      </section>
    </div>
  )
}

export default App

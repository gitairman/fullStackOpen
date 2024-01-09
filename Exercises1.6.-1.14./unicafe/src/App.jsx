import { useState } from 'react'

const Statistics = ({ stats }) => {
  const [good, neutral, bad, all, average, percentGood] = stats

  if (!all) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given yet!</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average.toFixed(2)}</p>
      <p>positive %{percentGood.toFixed(2)}</p>
    </div>
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
        <button onClick={handleClickGood}>good</button>
        <button onClick={handleClickNeutral}>neutral</button>
        <button onClick={handleClickBad}>bad</button>
      </section>
      <Statistics stats={[good, neutral, bad, all, average, percentGood]} />
    </div>
  )
}

export default App

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part1={props.content[0]} exercises1={props.content[1]} />
      <Part part2={props.content[2]} exercises2={props.content[3]} />
      <Part part3={props.content[4]} exercises3={props.content[5]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content content={[part1, exercises1, part2, exercises2, part3, exercises3]} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App

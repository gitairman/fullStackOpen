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
  console.log(props)
  return (
    <>
      <Part part1={props.parts[0].name} exercises1={props.parts[0].exercise} />
      <Part part2={props.parts[1].name} exercises2={props.parts[1].exercise} />
      <Part part3={props.parts[2].name} exercises3={props.parts[2].exercise} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    exercise: 10
  },
  {
    name: 'Using props to pass data',
    exercise: 7
  },
  {
    name: 'State of a component',
    exercise: 14
  }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App

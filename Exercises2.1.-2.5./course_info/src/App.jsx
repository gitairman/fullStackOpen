const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = ({ parts }) => {
  console.log(parts)
  return (
    <>
      {parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id} />)}
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Total = ({ parts }) => {
  console.log(parts)

  let sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0,)

  return (
    <>
      <p><strong>Total number of exercises is {sum}</strong></p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      id: 1,
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      id: 2,
      name: 'Using props to pass data',
      exercises: 50
    },
    {
      id: 3,
      name: 'State of a component',
      exercises: 20
    },
    {
      id: 4,
      name: 'test Course',
      exercises: 30
    }
    ]
  }

  return <Course course={course} />
}

export default App

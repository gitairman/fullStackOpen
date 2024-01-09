const Courses = ({courses}) => {
    return (
      <>
      {courses.map(course => <Course course={course} key={course.id}/>)}
      </>
    )
  }
  
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

  export default Courses
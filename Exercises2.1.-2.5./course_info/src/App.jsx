import Courses from "./Components/Courses"

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 10,
          id: 2
        }
      ]
    },
    {
      name: 'Test Course',
      id: 3,
      parts: [
        {
          name: 'Testing stuff',
          exercises: 100,
          id: 1
        },
        {
          name: 'Testing even More stuff',
          exercises: 5,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App

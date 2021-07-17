import { useState, useEffect } from 'react'
import axios from 'axios'
import CourseCard from '../components/cards/CourseCard'

const IndexPage = ({ courses }) => {
  // const [courses, setCourses] = useState([])

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get('api/courses')
  //     setCourses(data)
  //   }
  //   fetchCourses()
  // }, [])

  return (
    <>
      <h1 className="jumbotron bg-primary text-center">
        学ぶ人たちがつながるためのプラットフォーム
      </h1>
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => {
            return (
              <div key={course._id} className="col-md-4">
                <CourseCard course={course} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${process.env.API}/courses`)
  return {
    props: {
      courses: data,
    },
  }
}

export default IndexPage

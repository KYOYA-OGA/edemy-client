import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context'
import UserRoute from '../../components/routes/UserRoute'
import axios from 'axios'
import { Avatar } from 'antd'
import Link from 'next/link'
import { SyncOutlined, PlayCircleOutlined } from '@ant-design/icons'

const UserIndexPage = () => {
  // state
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const {
    state: { user },
  } = useContext(Context)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/user-courses')
      setCourses(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      )}
      <h1 className="jumbotron text-center square">ダッシュボード</h1>

      {/* show list of courses */}
      {courses &&
        courses.map((course, index) => {
          return (
            <div className="media mt-3 pt-2 pb-1" key={index}>
              <Avatar
                size={80}
                shape="square"
                src={course.image ? course.image.Location : '/course.png'}
              />
              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <Link href={`/user/course/${course.slug}`}>
                      <a>
                        <h5 className="mt-2 text-primary">{course.name}</h5>
                      </a>
                    </Link>
                    <p className="mt-n2">{course.lessons.length} レッスン</p>
                    <p className="text-muted mt-n2">
                      By {course.instructor.name}
                    </p>
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    <Link href={`/user/course/${course.slug}`}>
                      <a>
                        <PlayCircleOutlined className="h2 text-primary" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </UserRoute>
  )
}

export default UserIndexPage

import { useState, useEffect } from 'react'
import axios from 'axios'
import InstructorRoute from '../../components/routes/InstructorRoute'
import { Avatar, Tooltip } from 'antd'
import Link from 'next/link'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const InstructorIndex = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    const { data } = await axios.get('/api/instructor-courses')
    setCourses(data)
  }

  const myStyle = { marginTop: '-15px', fontSize: '12px' }

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">先生用ダッシュボード</h1>
      {courses &&
        courses.map((course) => {
          return (
            <article key={course._id} className="mt-3">
              <div className="media pt-2">
                <Avatar
                  size={80}
                  src={course.image ? course.image.Location : '/course.jpeg'}
                />

                <div className="media-body pl-2">
                  <div className="row">
                    <div className="col">
                      <Link
                        href={`/instructor/course/view/${course.slug}`}
                        className="pointer"
                      >
                        <a className="mt-2 text-primary">
                          <h5 className="pt-2">{course.name}</h5>
                        </a>
                      </Link>
                      <p style={{ marginTop: '-10px' }}>
                        {course.lessons.length} レッスン
                      </p>
                      {course.lessons.length < 5 ? (
                        <p style={myStyle} className="text-warning">
                          講座を公開するためには最低でも5レッスンが必要です。
                        </p>
                      ) : course.published ? (
                        <p style={myStyle} className="text-success">
                          講座は公開中です。
                        </p>
                      ) : (
                        <p style={myStyle} className="text-success">
                          講座を公開する準備ができました。
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 mt-3 text-center">
                      {course.published ? (
                        <Tooltip title="Published">
                          <CheckCircleOutlined className="h5 pointer text-success" />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Unpublished">
                          <CloseCircleOutlined className="h5 pointer text-warning" />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
    </InstructorRoute>
  )
}

export default InstructorIndex

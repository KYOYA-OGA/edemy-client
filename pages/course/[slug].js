import { useState } from 'react'
import axios from 'axios'
import PreviewModal from '../../components/modal/PreviewModal'
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron'

const SingleCourse = ({ course }) => {
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState('')
  return (
    <article className="container-fluid">
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
      />
      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
    </article>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`)

  return {
    props: { course: data },
  }
}

export default SingleCourse

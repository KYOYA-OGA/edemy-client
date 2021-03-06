import axios from 'axios'
import InstructorRoute from '../../../components/routes/InstructorRoute'
import { useState } from 'react'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const CourseCreate = () => {
  // state
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '9.99',
    uploading: false,
    paid: true,
    category: '',
    loading: false,
  })
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')
  const [uploadButtonText, setUploadButtonText] =
    useState('画像をアップロードする')

  const router = useRouter()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    let file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    setUploadButtonText(file.name)
    setValues({ ...values, loading: true })

    // resize images
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        const { data } = await axios.post('/api/course/upload-image', {
          image: uri,
        })
        console.log('IMAGE UPLOADED', data)
        // set image in the state
        setImage(data)
        setValues({ ...values, loading: false })
      } catch (err) {
        console.log(err)
        setValues({ ...values, loading: false })
        toast('Image upload failed. Try later.')
      }
    })
  }
  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true })
      const res = await axios.post('/api/course/remove-image', { image })
      setImage({})
      setPreview('')
      setUploadButtonText('Upload Image')
      setValues({ ...values, loading: false })
    } catch (err) {
      console.log(err)
      setValues({ ...values, loading: false })
      toast('Image delete failed. Try later.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(values)
    try {
      const { data } = await axios.post('/api/course', { ...values, image })
      toast('素晴らしい！続いてレッスンを追加しましょう！')
      router.push('/instructor')
    } catch (err) {
      toast(err.response.data)
    }
  }

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">講座を開設する</h1>
      <div className="py-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          handleImageRemove={handleImageRemove}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
        />
      </div>
    </InstructorRoute>
  )
}

export default CourseCreate

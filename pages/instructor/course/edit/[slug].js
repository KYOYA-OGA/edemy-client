import axios from 'axios'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import { useState, useEffect } from 'react'
import CourseCreateForm from '../../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Item from 'antd/lib/list/Item'
import { Avatar, List, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import UpdateLessonForm from '../../../../components/forms/UpdateLessonForm'

const CourseEdit = () => {
  // state
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '500',
    uploading: false,
    paid: true,
    category: '',
    loading: false,
    lessons: [],
  })
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')
  const [uploadButtonText, setUploadButtonText] =
    useState('画像をアップロードする')

  // state for lessons update
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState({})
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState('ビデオをアップロードする')
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    loadCourse()
  }, [slug])

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`)
    if (data) setValues(data)
    // console.log('data', data)
    if (data && data.image) setImage(data.image)
  }

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
        // console.log('IMAGE UPLOADED', data)
        // set image in the state
        setImage(data)
        setValues({ ...values, loading: false })
      } catch (err) {
        console.log(err)
        setValues({ ...values, loading: false })
        toast('画像のアップロードに失敗しました。もう一度お試しください')
      }
    })
  }
  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true })
      const res = await axios.post('/api/course/remove-image', { image })
      setImage({})
      setPreview('')
      setUploadButtonText('画像をアップロードする')
      setValues({ ...values, loading: false })
    } catch (err) {
      console.log(err)
      setValues({ ...values, loading: false })
      toast('画像の消去に失敗しました。もう一度お試しください')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(values)
    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      })
      toast('アップロードに成功しました!')
      // router.push('/instructor')
    } catch (err) {
      toast(err.response.data)
    }
  }

  const handleDrag = (e, index) => {
    // console.log('ON DRAG', index)
    e.dataTransfer.setData('itemIndex', index)
  }

  const handleDrop = async (e, index) => {
    // console.log('ON DROP', index)
    const movingItemIndex = e.dataTransfer.getData('itemIndex')
    const targetItemIndex = index

    let allLessons = values.lessons
    let movingItem = allLessons[movingItemIndex] // clicked/dragged item to re-order
    allLessons.splice(movingItemIndex, 1) // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem) // push item after target item index
    // console.log(allLessons)

    setValues({ ...values, lessons: allLessons })

    // save the new lessons order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    })
    toast('レッスンの編集に成功しました')
  }

  const handleDelete = async (index) => {
    const answer = window.confirm('本当に消してよろしいですか？')
    if (!answer) return

    let allLessons = values.lessons
    const removed = allLessons.splice(index, 1)
    setValues({ ...values, lessons: allLessons })

    // send request to backend
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`)
    console.log('LESSON DELETE', data)
  }

  // lesson update functions

  const handleVideo = async (e) => {
    // remove previous video
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/video-remove/${values.instructor._id}`,
        current.video
      )
      console.log('REMOVE', res)
    }

    // upload new video
    const file = e.target.files[0]
    setUploadVideoButtonText(file.name)
    setUploading(true)
    // send video as form data
    const videoData = new FormData()
    videoData.append('video', file)
    videoData.append('courseId', values._id)

    //save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    )
    console.log(data)
    setCurrent({ ...current, video: data })
    setUploading(false)
  }

  const handleUpdateLesson = async (e) => {
    e.preventDefault()
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    )
    setUploadButtonText('Upload Video')
    setVisible(false)

    if (data.ok) {
      let arr = values.lessons
      const index = arr.findIndex((el) => el._id === current.id)
      arr[index] = current
      setValues({ ...values, lessons: arr })
      toast('Lesson updated')
    }
  }

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">コースをアップデートする</h1>
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
          editPage={true}
        />
      </div>
      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} レッスン</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => {
              return (
                <Item
                  key={index}
                  draggable
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className="pointer"
                >
                  <Item.Meta
                    onClick={() => {
                      setVisible(true)
                      setCurrent(item)
                    }}
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                  ></Item.Meta>

                  <DeleteOutlined
                    onClick={() => handleDelete(index)}
                    className="text-danger float-right"
                  />
                </Item>
              )
            }}
          ></List>
        </div>
      </div>

      <Modal
        title="Update Lesson"
        center
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
        />
        {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      </Modal>
    </InstructorRoute>
  )
}

export default CourseEdit

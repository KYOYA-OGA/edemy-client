import { Badge, Modal, Button } from 'antd'
import currencyFormatter from '../../utils/helpers'
import ReactPlayer from 'react-player'
import { LoadingOutlined, SafetyOutlined } from '@ant-design/icons'

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}) => {
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course
  return (
    <div className="jumbotron bg-primary square">
      <div className="row">
        <div className="col-md-8">
          <h1 className="text-light font-weight-bold">{name}</h1>
          <p className="lead">
            {description && description.substring(0, 160)}...
          </p>
          <Badge
            style={{ backgroundColor: '#03a9f4' }}
            className="pb-4 mr-2"
            count={category}
          />
          <p>講師名： {instructor.name}</p>
          <p>最終更新日： {new Date(updatedAt).toLocaleDateString()}</p>
          <h4 className="text-light">
            {paid
              ? currencyFormatter({ amount: price, currency: 'jpy' })
              : 'Free'}
          </h4>
        </div>
        <div className="col-md-4">
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location)
                setShowModal(!showModal)
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.Location}
                light={image.Location}
                width="100%"
                height="250px"
              />
            </div>
          ) : (
            <>
              <img src={image.Location} alt={name} className="img img-fluid" />
            </>
          )}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mb-3 mt-3"
              type="danger"
              block
              shape="round"
              icon={<SafetyOutlined />}
              size="large"
              disabled={loading}
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            >
              {user
                ? enrolled.status
                  ? 'コースへ'
                  : '登録する'
                : '登録するためにログインする'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleCourseJumbotron

import { useContext, useState } from 'react'
import { Context } from '../../context/'
import { Button } from 'antd'
import axios from 'axios'
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { toast } from 'react-toastify'
import UserRoute from '../../components/routes/UserRoute'

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false)
  const {
    state: { user },
  } = useContext(Context)

  const becomeInstructor = () => {
    setLoading(true)
    axios
      .post('/api/make-instructor')
      .then((res) => {
        console.log(res)
        window.location.href = res.data
      })
      .catch((err) => {
        console.log(err.response.status)
        toast.error('Stripe onboarding failed. Try again.')
        setLoading(false)
      })
  }

  return (
    <>
      <h1 className="jumbotron text-center square">
        先生になって稼ぎましょう！
      </h1>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Edemy上で講座を公開するための支払い設定をする</h2>
              <p className="lead text-warning">
                EdemyではStripeを通じてあなたの銀行口座に収入を送金します
              </p>

              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes('Instructor')) ||
                  loading
                }
              >
                {loading ? '読込中...' : '支払い設定'}
              </Button>

              <p className="lead">
                設定をするためにStripeにリダイレクトされます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BecomeInstructor

import { useState, useEffect } from 'react'
import { Context } from '../../context'
import InstructorRoute from '../../components/routes/InstructorRoute'
import axios from 'axios'
import {
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import stripeCurrencyFormatter from '../../utils/helpers'

const Revenue = () => {
  const [balance, setBalance] = useState({ pending: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    sendBalanceRequest()
  }, [])

  const sendBalanceRequest = async () => {
    const { data } = await axios.get('/api/instructor/balance')
    // console.log(data)
    setBalance(data)
  }

  const handlePayoutSettings = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/instructor/payout-settings')
      // console.log(data)
      window.location.href = data
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      alert('Unable to access payout settings. Try later.')
    }
  }

  return (
    <InstructorRoute>
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-8 offset-md-2 bg-light p-5">
            <h2>
              Revenue report <DollarOutlined className="float-right" />
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hour
            </small>
            <hr />
            <h4>
              Pending balance{' '}
              {balance.pending &&
                balance.pending.map((item, index) => {
                  return (
                    <span key={index} className="float-right">
                      {stripeCurrencyFormatter(item)}
                    </span>
                  )
                })}
            </h4>
            <small>For last 48 hours</small>
            <hr />
            <h4>
              Payouts{' '}
              {!loading ? (
                <SettingOutlined
                  className="float-right pointer"
                  onClick={handlePayoutSettings}
                />
              ) : (
                <SyncOutlined spin className="float-right" />
              )}
              <small>
                Update your stripe account details or view previous payouts
              </small>
            </h4>
          </div>
        </div>
      </div>
    </InstructorRoute>
  )
}

export default Revenue

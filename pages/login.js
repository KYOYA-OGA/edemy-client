import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // global state
  const { state, dispatch } = useContext(Context)
  const { user } = state

  // router
  const router = useRouter()

  useEffect(() => {
    if (user !== null) {
      router.push('/')
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      })
      // console.log('login response', data)
      // setLoading(false)
      dispatch({
        type: 'LOGIN',
        payload: data,
      })
      // save in localstorage
      window.localStorage.setItem('user', JSON.stringify(data))
      // redirect
      router.push('/user')
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="jumbotron bg-primary text-center">ログイン</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder="メールアドレス"
            required
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder="パスワード"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary p-2"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : 'ログイン'}
          </button>
        </form>

        <p className="text-center pt-3">
          まだ登録していませんか？
          <Link href="/register">
            <a className="ml-2">登録</a>
          </Link>
        </p>

        <p className="text-center ">
          <Link href="/forgot-password">
            <a className="text-danger">パスワードをお忘れですか?</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default LoginPage

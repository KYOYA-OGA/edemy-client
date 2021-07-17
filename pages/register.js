import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'
import { useRouter } from 'next/router'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // global state
  const { state } = useContext(Context)
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
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      })
      toast.success('登録成功です！ログインしてください。')
      setName('')
      setEmail('')
      setPassword('')
      setLoading(false)
      router.push('/login')
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  }
  return (
    <>
      <h1 className="jumbotron bg-primary text-center">ユーザー登録</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            placeholder="お名前"
            required
          />

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
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : '登録する'}
          </button>
        </form>

        <p className="text-center p-3">
          すでに登録済みですか？
          <Link href="/login">
            <a>ログイン</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default RegisterPage

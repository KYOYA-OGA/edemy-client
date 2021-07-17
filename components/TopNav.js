import { useState, useEffect, useContext } from 'react'
import { Menu } from 'antd'
import Link from 'next/link'
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Context } from '../context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const { Item, SubMenu, ItemGroup } = Menu

const TopNav = () => {
  const [current, setCurrent] = useState('')

  const { state, dispatch } = useContext(Context)
  const { user } = state

  const router = useRouter()

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname)
  }, [process.browser && window.location.pathname])

  const logout = async () => {
    dispatch({ type: 'logout' })
    window.localStorage.removeItem('user')
    const { data } = await axios.get('/api/logout')
    toast(data.message)
    setTimeout('location.reload()', 3000)
  }

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2">
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>ホーム</a>
        </Link>
      </Item>

      {user && user.role && user.role.includes('Instructor') ? (
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">
            <a>講座を開設する</a>
          </Link>
        </Item>
      ) : (
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">
            <a>先生になる</a>
          </Link>
        </Item>
      )}

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>ログイン</a>
            </Link>
          </Item>

          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a>ユーザー登録</a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">
                <a>ダッシュボード</a>
              </Link>
            </Item>
            <Item onClick={logout}>ログアウト</Item>
          </ItemGroup>
        </SubMenu>
      )}

      {user && user.role && user.role.includes('Instructor') && (
        <Item
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className="float-right"
        >
          <Link href="/instructor">
            <a>先生</a>
          </Link>
        </Item>
      )}
    </Menu>
  )
}

export default TopNav

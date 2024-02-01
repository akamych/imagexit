import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectUser } from '../store/reducers/AuthReducer'
import { authAction } from '../store/actions/AuthActions'
import { AppDispatch } from '../store/Store'

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (user === null) {
      dispatch(authAction())
    }
    const { pathname } = location
    if (!['/login', '/sign-up'].includes(pathname) && user === null) {
      navigate('/login')
    } else if (['/login', '/sign-up'].includes(pathname) && user !== null) {
      navigate('/')
    }
  }, [location, user])
}

export default useAuth

import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageMain } from '../layout/pages/pageMain'
import { PageNotFound } from '../layout/pages/page404/page404'
import { PageLogin } from '../layout/pages/pageLogin'
import { PageSignUp } from '../layout/pages/pageSignUp'
import { PageProfile } from '../layout/pages/pageProfile/pageProfile'
import { PageGame } from '../layout/pages/pageGame'
import { PageLeaderboard } from '../layout/pages/pageLeaderboard'
import { PageForum } from '../layout/pages/pageForum'
import { PageForumTopic } from '../layout/pages/pageForumTopic'

export const usePagesRoutes = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false)

  useEffect(() => {
    setisAuthenticated(true) // ! убрать после внедрения аутентификации
  }, [])

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<PageMain />} />
        {/* ! убрать после внедрения аутентификации on */}
        <Route path="/login" element={<PageLogin />} />
        <Route path="/sign-up" element={<PageSignUp />} />
        {/* off */}
        <Route path="/profile" element={<PageProfile />} />
        <Route path="/play" element={<PageGame />} />
        <Route path="/leaderboard" element={<PageLeaderboard />} />
        <Route path="/forum">
          <Route index element={<PageForum />} />
          <Route path=":id" element={<PageForumTopic />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<PageMain />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/sign-up" element={<PageSignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    )
  }
}

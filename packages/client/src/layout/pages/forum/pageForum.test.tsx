import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { PageForum } from './pageForum'
import { BrowserRouter } from 'react-router-dom' // Импортируйте BrowserRouter
import { create } from 'match-media-mock'

describe('PageForum component', () => {
  beforeEach(() => {
    window.matchMedia = create()
  })

  it('Компонент рендерится', () => {
    const { container } = render(
      <BrowserRouter>
        <PageForum />
      </BrowserRouter>
    )
    expect(container).toBeInTheDocument()
  })

  it('В компоненте присутствуют: breadcrumb, title, forumListTopics', () => {
    const { container } = render(
      <BrowserRouter>
        <PageForum />
      </BrowserRouter>
    )

    const breadcrumb = container.getElementsByClassName('ant-breadcrumb-link')
    expect(breadcrumb.length).toBeGreaterThan(0)

    const title = container.getElementsByClassName('title')
    expect(title.length).toBeGreaterThan(0)

    const forumListTopics = container.getElementsByClassName('forum-topic-list')
    expect(forumListTopics.length).toBeGreaterThan(0)
  })
})

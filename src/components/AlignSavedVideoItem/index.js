import './index.css'

const AlignSavedVideoItem = props => {
  const {getItem} = props
  const {
    videoUrl,
    description,
    publishedAt,
    channel,
    viewCount,
    title,
  } = getItem
  return <li className="saved-video-item">Hello</li>
}

export default AlignSavedVideoItem

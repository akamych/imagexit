import express from 'express'
import { getTopics, getTopicById, createTopic, updateTopic, deleteTopic } from './topics'
import { getComments, getCommentById, createComment, updateComment, deleteComment } from './comments'
import { getReplies, getReplyById, createReply, updateReply, deleteReply } from './replies'
import onlyAuth from '../../utils/auth'
import { addTopicEmoji, getEmojisByTopicId } from './emoji'

const router = express.Router()

/** Forum Topics */
router.get('/topics', getTopics)
router.get('/topics/:id', getTopicById)
router.post('/topics', onlyAuth, createTopic)
router.put('/topics/:id', onlyAuth, updateTopic)
router.delete('/topics/:id', onlyAuth, deleteTopic)
/** Forum Comment */
router.get('/comments', getComments)
router.get('/comments/:id', getCommentById)
router.post('/comments', onlyAuth, createComment)
router.put('/comments/:id', onlyAuth, updateComment)
router.delete('/comments/:id', onlyAuth, deleteComment)
/** Forum Comment Replies */
router.get('/replies', getReplies)
router.get('/replies/:id', getReplyById)
router.post('/replies', onlyAuth, createReply)
router.put('/replies/:id', onlyAuth, updateReply)
router.delete('/replies/:id', onlyAuth, deleteReply)
/** Forum Topic Emojis */
router.post('/emojis', addTopicEmoji)
router.get('/emojis/:id', getEmojisByTopicId)

export default router

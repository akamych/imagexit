import express from 'express'
import { getTopics, getTopicById, createTopic, updateTopic, deleteTopic } from './topics'
import { getComments, getCommentById, createComment, updateComment, deleteComment } from './comments'
import { getReplies, getReplyById, createReply, updateReply, deleteReply } from './replies'

const router = express.Router()

/** Forum Topics */
router.get('/topics', getTopics)
router.get('/topics/:id', getTopicById)
router.post('/topics', createTopic)
router.put('/topics/:id', updateTopic)
router.delete('/topics/:id', deleteTopic)
/** Forum Comment */
router.get('/comments', getComments)
router.get('/comments/:id', getCommentById)
router.post('/comments', createComment)
router.put('/comments/:id', updateComment)
router.delete('/comments/:id', deleteComment)
/** Forum Comment Replies */
router.get('/replies', getReplies)
router.get('/replies/:id', getReplyById)
router.post('/replies', createReply)
router.put('/replies/:id', updateReply)
router.delete('/replies/:id', deleteReply)

export default router

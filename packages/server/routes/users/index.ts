import express from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './users'
import onlyAuth from '../../utils/auth'

const router = express.Router()

/**   */
router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser) // onlyAuth
router.put('/:id', onlyAuth, updateUser)
router.delete('/:id', onlyAuth, deleteUser)

export default router

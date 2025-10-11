import express from "express"

import { addTodo } from "../controllers/todoController"

const router= express.Router()

router.post("/add",addTodo)

export default router
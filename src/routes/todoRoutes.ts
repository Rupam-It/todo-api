import express from "express"

import { addTodo } from "../controllers/todoController.js"

const router= express.Router()

router.get("/add",addTodo)

export default router
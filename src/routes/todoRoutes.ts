import express from "express"

import { addTodo, getTodo } from "../controllers/todoController"

const router= express.Router()

router.post("/add",addTodo)
router.get("/",getTodo)

export default router
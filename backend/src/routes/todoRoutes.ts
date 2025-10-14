import express from "express"

import { addTodo, getTodo,updateTodo,deleteTodo } from "../controllers/todoController"

const router= express.Router()

router.post("/add",addTodo)
router.get("/",getTodo)
router.put("/update/:id",updateTodo)
router.delete("/delete/:id", deleteTodo);


export default router
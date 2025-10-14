import { Request , Response} from "express";
import  Todo  from "../models/todoModel";


export const addTodo= async (req:Request, res: Response)=>{
try{
    const {title} =req.body
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.status(201).json({ message: "Todo added successfully", todo: newTodo });
}catch(error){
    res.status(500).json({ message: "Error adding todo", error });
}
}


export const getTodo = async (req: Request, res: Response) => {
    try {
      const todos = await Todo.find(); // fetch all todos
      res.status(200).json(todos);     // send them as JSON
    } catch (error) {
      res.status(500).json({ message: "Error fetching todos", error });
    }
  };

export const updateTodo= async (req: Request, res: Response) =>{
    try {
        const { id } = req.params;         
        const { title, completed } = req.body; 
    
        const updatedTodo = await Todo.findByIdAndUpdate(
          id,
          { title, completed },
          { new: true } 
        );
    
        if (!updatedTodo) {
          return res.status(404).json({ message: "Todo not found" });
        }
    
        res.status(200).json(updatedTodo);
      } catch (error) {
        res.status(500).json({ message: "Error updating todo", error });
      }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await Todo.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Todo not found" });
      res.status(200).json({ message: "Todo deleted", todo: deleted });
    } catch (error) {
      res.status(500).json({ message: "Error deleting todo", error });
    }
  };
  
  
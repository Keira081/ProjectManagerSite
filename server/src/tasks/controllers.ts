import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  const { id, projectId } = req.query;

  try {
    if (id) {
      const task = await prisma.task.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          author: true,
          assignee: true,
          comments: true,
          attachments: true,
        },
      });
      res.json(task);
    } else {
      const allTasks = await prisma.task.findMany({
        where: {
          projectId: Number(projectId),
        },
        include: {
          author: true,
          assignee: true,
          comments: true,
          attachments: true,
        },
      });
      res.json(allTasks);
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving tasks: ${error}` });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const {
    name,
    description,
    status,
    priority,
    tags,
    creationDate,
    startDate,
    dueDate,
    dateFinished,
    datePostponed,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        name,
        description,
        status,
        priority,
        tags,
        creationDate,
        startDate,
        dueDate,
        dateFinished,
        datePostponed,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating a task: ${error}` });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error}` });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(taskId) },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error deleting task: ${error}` });
  }
};

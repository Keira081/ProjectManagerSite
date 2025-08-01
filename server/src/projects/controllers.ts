import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); //to use prisma and grab data from database

export const getProjects = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (id) {
      const project = await prisma.project.findFirst({
        where: {
          id: Number(id),
        },
      });
      res.json(project);
    } else {
      //gets all the rows in the project table
      const allProjects = await prisma.project.findMany();
      //Gives the data back as a json response
      res.json(allProjects);
    }
  } catch (error) {
    res.status(500).json({ message: `Error retrieving projects: ${error}` });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const {
    name,
    description,
    creationDate,
    startDate,
    dueDate,
    dateFinished,
    datePostponed,
    status,
  } = req.body; //data collected from the frontend

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        creationDate,
        startDate,
        dueDate,
        dateFinished,
        datePostponed,
        status,
      },
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: `Error creating projects: ${error}` });
  }
};

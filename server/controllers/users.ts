import type { Request, Response } from 'express';
import type { UserList, User } from './types';
import fs from 'fs/promises';

const dataPath = 'data/users.json';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });

    res.status(200).send(JSON.parse(data));
  } catch (error) {
    res.status(500).send('An error occurred when fetching the users');
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    let user = {};
    const userId = req.params.id;
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });

    if (data.length > 0) {
      const allUsers: UserList = JSON.parse(data);
      user = {
        ...allUsers.users.find((user) => user.id === Number(userId)),
      };
    }

    res.status(200).send(user);
  } catch (error) {
    res
      .status(500)
      .send(
        'An error occurred when fetching the user with id ' + req.params.id
      );
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });
    const allUsers: UserList = JSON.parse(data);
    const newUser: User = req.body;

    // Note: this isn't ideal for production use.
    // ideally, use something like a UUID or other GUID for a unique ID value
    const newUserId = Date.now();

    newUser.id = newUserId;
    allUsers.users.push(newUser);

    await fs.writeFile(dataPath, JSON.stringify(allUsers, null, 2), {
      encoding: 'utf8',
    });

    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send('An error occurred when adding the new user');
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });
    const allUsers: UserList = JSON.parse(data);
    const userId: number = Number(req.params.id);
    const userToUpdate: User = req.body;

    allUsers.users = allUsers.users.map((user) =>
      user.id === userId ? { ...user, ...userToUpdate } : user
    );

    console.log(allUsers);

    await fs.writeFile(dataPath, JSON.stringify(allUsers, null, 2), {
      encoding: 'utf8',
    });

    res.status(200).send(allUsers);
  } catch (error) {
    res
      .status(500)
      .send('An error occurred when updating the user with id' + req.params.id);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });
    const allUsers: UserList = JSON.parse(data);
    const userId: number = Number(req.params.id);

    allUsers.users = allUsers.users.filter((user) => user.id !== userId);

    await fs.writeFile(dataPath, JSON.stringify(allUsers, null, 2), {
      encoding: 'utf8',
    });

    res.status(200).send(allUsers);
  } catch (error) {
    res
      .status(500)
      .send('An error occurred when deleting the user with id' + req.params.id);
  }
};

export default {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};

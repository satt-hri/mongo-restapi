import express from 'express'
import { deleteUserById, getUserById, getUsers } from '../db/users';

export const getAllUsers = async (req:express.Request,res:express.Response) => {
    try {
        const users = await getUsers()
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export const deleteUser = async (req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.sendStatus(500)
        }
        const user = await deleteUserById(id)
        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export const  updateUser = async (req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params;
        const {username} =  req.body;
        if (!username || !id) {
            return res.sendStatus(500)
        }
        const user = await getUserById(id)
        user.username =  username;
        await user.save()
        
        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}
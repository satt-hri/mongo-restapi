import expres from 'express'
import { createUser, getUserByMail } from '../db/users';
import { authentication, random } from '../helpers';


export const login = async (req: expres.Request, res: expres.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400)
        }
        const user = await getUserByMail(email).select("+authentication.salt +authentication.password")
        if (!user) {
            return res.sendStatus(400)
        }

        const expectHash = authentication(user.authentication.salt, password)
        if (expectHash != user.authentication.password) {
            return res.sendStatus(403)
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save()
        res.cookie('DAOCAOREN-AUTh', user.authentication.sessionToken, { domain: "localhost", path: "/" })

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.status(500).end()
    }
}


export const register = async (req: expres.Request, res: expres.Response) => {

    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400)
        }

        const existingUser = await getUserByMail(email);
        if (existingUser) {
            return res.sendStatus(400)
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).json(user).end()

    } catch (error) {
        console.log(error);
        return res.status(500).end()
    }

} 
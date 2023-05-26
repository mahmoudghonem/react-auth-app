import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../modules/db";
import { Request, Response } from "express";

export class UserController {
    private userRepository: Repository<User>;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    getUserData = async (req: Request, res: Response) => {
        try {
            const { sub } = req.user;
            const user = await this.userRepository.findOneBy({ id: Number(sub) });
            res.status(200).json({ message: "Successful Operation", data: user });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });

        }
    }

}

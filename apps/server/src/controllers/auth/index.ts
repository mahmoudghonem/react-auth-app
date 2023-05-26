import { Repository } from 'typeorm';
import { AppDataSource } from '../../modules/db';
import { User, Auth } from '../../entities';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export class AuthController {
    private authRepository: Repository<Auth>;
    private userRepository: Repository<User>;
    constructor() {
        this.authRepository = AppDataSource.getRepository(Auth);
        this.userRepository = AppDataSource.getRepository(User);
    }

    loginController = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;


            const user = await this.userRepository.findOne({
                where: { email: email.toString() },
                relations: { auth: true },
            });

            if (!user) return res.status(404).json({ message: 'User not found' });

            const isValidPassword = await this.compareHashPassword(
                password,
                user?.auth.password!
            );
            if (!isValidPassword)
                return res.status(404).json({ message: 'Invalid credentials' });

            const generatedToken = await this.generateJWTToken({
                sub: user?.id,
                email: user?.email,
            });

            return res
                .status(200)
                .json({ message: 'Successful Operation', token: generatedToken });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };

    registerController = async (req: Request, res: Response) => {
        try {
            const { first_name, last_name, email, password } = req.body;


            const exitedUser = await this.userRepository.findOne({
                where: { email: email.toString() },
            });
            if (exitedUser) return res.status(400).json({ message: 'Email Already Registered' });


            const authEntity = (this.authRepository.create({
                password: password
            }));
            await this.authRepository.save(authEntity);
            const newUser = (this.userRepository.create({
                first_name,
                last_name,
                email,
                auth: authEntity
            }));
            await this.userRepository.save(newUser);

            const generatedToken = await this.generateJWTToken({
                sub: newUser?.id,
                email: newUser?.email,
            });

            return res
                .status(200)
                .json({ message: 'Successful Operation', token: generatedToken });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };

    private async compareHashPassword(password: string, hashPassword: string) {
        return await bcrypt.compare(password, hashPassword);
    }

    private async generateJWTToken(payload: any) {
        return await jwt.sign(payload, process.env['SECRET_KEY'] as string, {
            expiresIn: '24h',
        });
    }
}

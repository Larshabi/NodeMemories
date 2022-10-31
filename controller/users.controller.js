import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'


const UserController = {
    async signup(req, res) {
        const { email, password, confirmPassword, firstName, lastName } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: 'User alreadt exists' })
            if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' })
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
            const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: '1h' });
            return res.status(200).json({ user, token })

        } catch (error) {
            res.status(500).json({ error })
        }
    },
    async signin(req, res) {
        const { email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' })
            }
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
            return res.status(200).json({ resuslt: existingUser, token })
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
export default UserController;
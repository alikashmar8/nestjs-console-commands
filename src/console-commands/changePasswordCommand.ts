import { Command, CommandRunner, Option } from 'nest-commander';
import * as inquirer from 'inquirer';
import { UserType } from 'src/enums/userTypes';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';


@Command({ name: 'changeuserpassword', description: 'Change user password' })
export class ChangePasswordCommand implements CommandRunner {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async run(passedParam: string[],): Promise<void> {
        console.log(passedParam[0])
        let passedEmail = passedParam[0]
        if (this.ValidateEmail(passedEmail)) {
            const user = await this.userRepository.findOne({ where: { email: passedParam[0] } })
            if (user) {
                const newPassword = await inquirer.prompt([{
                    type: 'input',
                    name: 'password',
                    message: "Enter new password",
                    validate: this.ValidatePassword
                },
                {
                    type: 'input',
                    name: 'confirmPassword',
                    message: "Confirm new password",
                    validate: this.ValidatePassword
                }
                ]
                )
                if (newPassword.password == newPassword.confirmPassword) {
                    try {
                        await this.userRepository.update({ email: passedEmail }, {password: newPassword.password})
                        console.log('Password updated successfully')
                    } catch (err) {
                        console.log(err.detail)
                    }
                } else {
                    console.log("Passwords does not match, Please try again")
                    return
                }

            } else {
                console.log("No user with the entered email address found in our records")
                return
            }
        } else {
            console.log('Please enter a valid email address!')
            return
        }

    }

    ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return true
        }
        return  false
    }

    ValidatePassword(string) {
        if (string.length > 6) return true
        return `Password length should be greater than 6`
    }

    IsNotEmpty(string) {
        if (string.length) return true
        return `Input length should not be empty`
    }

}
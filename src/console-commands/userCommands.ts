import { Command, CommandRunner, Option } from 'nest-commander';
import * as inquirer from 'inquirer';
import { UserType } from 'src/enums/userTypes';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';


@Command({ name: 'createuser', description: 'Create a new user' })
export class UserCommand implements CommandRunner {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async run(): Promise<void> {
    const userData = await inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: "Enter name",
      validate: this.IsNotEmpty
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter user email",
      validate: this.ValidateEmail,
    },
    {
      type: 'password',
      name: 'password',
      mask: '*',
      message: "Enter user password",
      validate: this.ValidatePassword
    },
    {
      type: 'list',
      name: 'type',
      message: 'What size do you need?',
      choices: [{
        name:
          'ADMIN',
        value: UserType.ADMIN,
      }, {
        name:
          'USER',
        value: UserType.USER,
      }],
    },
    ]
    )
    try {
      const user = await this.userRepository.save(userData)
      console.log('user created successfully', user)
    } catch (err) {
      console.log(err.detail)
    }
  }

  ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      return true
    }
    return 'Enter a valid email address'
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
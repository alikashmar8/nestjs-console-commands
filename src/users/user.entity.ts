
import { UserType } from "src/enums/userTypes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true  })
    name: string

    @Column({ type: 'text', nullable: false, unique: true  })
    email: string

    @Column({ type: 'text', nullable: false })
    password: string

    @Column({ type: 'integer', nullable: false, default: 1 })
    type: UserType;

}
import { Pqr } from "src/pqr/entities/pqr.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Auth {

    @PrimaryGeneratedColumn('uuid')
    idUser: string;
    
    @Column('int', { unique: true } )
    idNumber: number;

    @Column('text')
    idType: string;

    @Column('text')
    names: string;

    @Column('text')
    lastname: string;

    @Column('text')
    mobilePhone: string;

    @Column('text')
    landline: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    //PQRS
    @OneToMany(
        () => Pqr,
        pqr => pqr.user
    )
    pqr: Pqr;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
        this.names = this.names.toLowerCase().trim();
        this.lastname = this.lastname.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
}

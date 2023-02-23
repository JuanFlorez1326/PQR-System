import { Auth } from "src/auth/entities/auth.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pqrs' })
export class Pqr {

    @PrimaryGeneratedColumn('uuid')
    idTicket: string;

    @Column('text')
    titlePqr: string;

    @Column('text')
    typePqr: string;

    @Column('text')
    description: string;

    @Column('text', {
        default: 'pending'
    })
    status: string;

    @CreateDateColumn()
    createdAt?: Date;

    //User
    @ManyToOne(
        () => Auth,
        user => user.pqr,
        { eager: true }
    )
    user: Auth;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.titlePqr = this.titlePqr.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
}
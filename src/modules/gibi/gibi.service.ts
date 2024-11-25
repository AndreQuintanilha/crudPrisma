import { Injectable } from '@nestjs/common';
import { GibiDTO } from './gibi.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GibiService {
    
    constructor(private prisma: PrismaService){}
    
    async create(data: GibiDTO){
    const gibiExists = await this.prisma.gibi.findFirst({
            where:{
                title: data.title
            },
        });

        if(gibiExists){
            throw new Error('Gibi already exists')
        }
        const gibi = await this.prisma.gibi.create({
            data,
        });
        return gibi;
    }

    async findAll() {
        return this.prisma.gibi.findMany();
    }

    async update(id: string, data: GibiDTO) {
        const gibiExists = await this.prisma.gibi.findUnique({
            where:{
                id,
            },
        });

        if(!gibiExists) {
            throw new Error('Gibi does not exists!');
        }

        return await this.prisma.gibi.update({
            data,
            where: {
                id,
            }
        });
    }

    async delete(id: string){
        const gibiExists = await this.prisma.gibi.findUnique({
            where:{
                id,
            },
        });

        if(!gibiExists) {
            throw new Error('Gibi does not exists!');
        }

        return await this.prisma.gibi.delete({
            where:{
                id,
            },
        });
    }
}

import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('/users')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  createUser(@Body() user: any) {
    // Corrigido: O Prisma requer o uso de 'data' para passar os dados ao método create
    return this.prisma.user.create({
      data: {
        ...user,
        id: user.id ?? undefined, // Se o id for fornecido, usa, caso contrário, não fornece (auto-increment ou UUID será usado)
      },
    });
  }

  @Get()
  findUsers() {
    return this.prisma.user.findMany();
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.prisma.user.delete({
      where: { id: id }, // Corrigido: Agora passamos o 'id' corretamente em 'where'
    });
  }
}

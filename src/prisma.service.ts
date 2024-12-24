import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // Criação genérica de um novo registro
  create<T extends keyof PrismaClient>(model: T, data: Prisma[T]['CreateInput']) {
    return this[model].create({
      data,
    });
  }

  // Busca múltiplos registros
  findMany<T extends keyof PrismaClient>(model: T) {
    return this[model].findMany();
  }

  // Deleta um registro específico por id
  delete<T extends keyof PrismaClient>(model: T, id: string) {
    return this[model].delete({
      where: { id },
    });
  }
}

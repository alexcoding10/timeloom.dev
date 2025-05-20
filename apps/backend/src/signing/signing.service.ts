import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, TimeBreak } from '@prisma/client';

@Injectable()
export class SigningService {
  constructor(
    private readonly prismaService: PrismaService, //conexion a la base de datos
  ) { }

  async start(userId: number, data: Prisma.TimeEntryCreateInput) {
    // existe ya un fichaje?
    const dateFilter = this.buildDateFilter();

    const signing = await this.prismaService.timeEntry.findFirst({
      where: { userId, ...dateFilter },
    });
    if (signing) {
      //Existe un fichaje por lo que devolvemos un error
      throw new Error('Este usuario ya ha iniciado su jornada hoy.');
    }
    //Genera el comienzo de un fichaje para un usuario
    return await this.prismaService.timeEntry.create({ data });
  }

  async createPause(data: Prisma.TimeBreakCreateInput) {
    // Verificar si timeEntry está presente y contiene el id
    if (!data.timeEntry || !data.timeEntry.connect || !data.timeEntry.connect.id) {
      throw new Error('Faltan datos de timeEntry o su ID no está presente.');
    }

    //Tiene una pausa ya activa?
    const lastPause = await this.prismaService.timeBreak.findFirst({
      where: { timeEntryId: data.timeEntry.connect?.id },
      orderBy: { clockIn: 'desc' },
    });

    if (
      lastPause &&
      !lastPause.clockOut //si es nullable significa que la ultima pausa esta activa por lo que no se puede crear una nueva
    ) {
      throw new Error(
        'Este fichaje ya tiene una pausa activa por lo que no se puede crear una nueva pausa.',
      );
    }

    //comienza una pausa
    const newPause = await this.prismaService.timeBreak.create({ data });

    return { pause: newPause };
  }

  async stopPause(timeBreakId: number, clockOut: Date) {
    //para una pausa activa
    return await this.prismaService.timeBreak.update({
      where: { id: timeBreakId },
      data: { clockOut },
    });
  }

  async finish(timeEntryId: number, clockOut: Date) {
    //Verifica si no esta cerrada el fichaje
    const timeEntry = await this.prismaService.timeEntry.findFirst({
      where: { id: timeEntryId },
    });
    if (timeEntry && timeEntry.clockOut) {
      throw new Error('Este fichaje ya esta cerrado.');
    }
    //finaliza el fichaje y si hay alguna pausa activa tambien
    const signing = await this.prismaService.timeEntry.update({
      where: { id: timeEntryId },
      data: { clockOut },
    });
    await this.prismaService.timeBreak.updateMany({
      where: { timeEntryId, clockOut: null },
      data: { clockOut },
    });

    return signing; //lo devuelve correctamente
  }

  async getSignigsByUser(userId: number, from?: Date, to?: Date) {
    const dateFilter = this.buildDateFilter(from, to);
    return await this.prismaService.timeEntry.findMany({
      where: {
        userId,
        ...dateFilter,
      },
      include: {
        timebreaks: true
      },
      orderBy: { clockIn: 'asc' },
    });
  }

  async getSigningsByCompany(companyId: number, from?: Date, to?: Date, skip = 0, take = 50) {
    const dateFilter = this.buildDateFilter(from, to);
    return await this.prismaService.timeEntry.findMany({
      where: {
        user: {
          companyId,
        },
        ...dateFilter,
      },
      orderBy: { clockIn: 'asc' },
      skip,
      take
    });
  }

  async getTypePause(companyId: number) {
    try {
      return await this.prismaService.pauseType.findMany({
        where: {
          OR: [
            { companyId: 1 },
            { companyId }
          ]
        }, omit: {
          companyId: true
        }
      });
    } catch (error) {
      console.error("Error al obtener los tipos de pausa:", error);
      throw new Error("No se pudieron obtener los tipos de pausa.");
    }
  }


  buildDateFilter(from?: Date, to?: Date) {
    if (from && to) {
      return { clockIn: { gte: from, lte: to } };
    } else if (from) {
      return { clockIn: { gte: from } };
    } else if (to) {
      return { clockIn: { lte: to } };
    } else {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      return { clockIn: { gte: startOfDay, lte: endOfDay } };
    }
  }
}

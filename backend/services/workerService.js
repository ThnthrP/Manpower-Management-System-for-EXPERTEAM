import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getWorkers() {
  return prisma.employee.findMany({
    include: {
      position: true,
    },

    orderBy: {
      fullName: "asc",
    },
  });
}

export async function createWorker(data) {
  return prisma.employee.create({
    data: {
      empCode: data.empCode,
      fullName: data.fullName,

      positionId: data.positionId || null,

      division: data.division || null,

      startWorkDate: data.startWorkDate
        ? new Date(data.startWorkDate)
        : null,

      status: data.status,

      availabilityStatus: data.availabilityStatus,

      mobilizationStatus: data.mobilizationStatus,

      isOffshore: data.isOffshore,
    },
  });
}

export async function createPassport(employeeId, data) {
  return prisma.passport.create({
    data: {
      employeeId,

      passportNo: data.passportNo || null,

      expiryDate: data.expiryDate
        ? new Date(data.expiryDate)
        : null,
    },
  });
}
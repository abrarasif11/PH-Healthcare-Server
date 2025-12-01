import { addHours } from "date-fns";

const insertIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const startDateTime = addHours(
      new Date(currentDate),
      Number(startTime.split(":")[0])
    );
    console.log(startDateTime);

    const endDateTime = addHours(
      new Date(lastDate),
      Number(endTime.split(":")[0])
    );

    while (startDateTime <= endDateTime) {}
  }
};

export const ScheduleService = {
  insertIntoDB,
};

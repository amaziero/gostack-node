interface IDateProvider {
  comparInHours(start_date: Date, end_date: Date): number;
  comparInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
}

export { IDateProvider };

export class DateConversor{
    public dateConverter(date: string): Date{
        date = date.split("/").join("-");
        let birthdayDate: Date = new Date();
        birthdayDate.setMonth(parseInt(date.split('-')[0]))
        birthdayDate.setDate(parseInt(date.split('-')[1]))
        birthdayDate.setFullYear(parseInt(date.split('-')[2]))
        birthdayDate.setHours(new Date().getHours());
        birthdayDate.setMinutes(new Date().getMinutes());
        birthdayDate.setSeconds(new Date().getSeconds());
        console.log(birthdayDate)
        return birthdayDate;
    }
}
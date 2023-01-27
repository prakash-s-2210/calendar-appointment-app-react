import moment from "moment";
export function getTimeSlotsDayView(fromTime, toTime){
        let startTime = moment(fromTime, 'hh:mm:A');
        let endTime = moment(toTime, 'hh:mm: A');
        let array = [];
        while (startTime <= endTime) {
            var hour = new moment(startTime).format('h');
            var Hour = new moment(startTime).format('HH');
            var amAndPm = new moment(startTime).format('a');
            const time = new Object();
             time.data = hour;
             time.am = amAndPm;
             time.startTime = Hour;
             array.push(time);
            startTime.add(1, 'hour');
        }
        return array;   
}
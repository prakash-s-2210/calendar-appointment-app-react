import moment from "moment";
export function getTimeSlots(fromTime, toTime){
        let startTime = moment(fromTime, 'hh:mm:A');
        let endTime = moment(toTime, 'hh:mm: A');
        let array = [];
        while (startTime <= endTime) {
            array.push(new moment(startTime));
            startTime.add(15, 'minutes');
        }
        return array;   
}
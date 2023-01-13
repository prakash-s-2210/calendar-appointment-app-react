import moment from "moment";
export function getTimeSlotsDayView(fromTime, toTime){
        let startTime = moment(fromTime, 'hh:mm:A');
        let endTime = moment(toTime, 'hh:mm: A');
        let array = [];
        while (startTime <= endTime) {
            // array.push(new moment(startTime).format('h'));
            var hour = new moment(startTime).format('h');
            var amAndPm = new moment(startTime).format('a');
            const time = new Object();
             time.data = hour;
             time.am = amAndPm;
             array.push(time);
            // array.push(new moment(startTime).format('A'));
            // array
            startTime.add(1, 'hour');
        }
        return array;   
}
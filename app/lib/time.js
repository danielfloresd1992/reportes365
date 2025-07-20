export default class TimeOperator {



    static returnTimeExceding(time, timelimit) {

        const hour = Number(time.split(':')[0]);
        const minute = Number(time.split(':')[1]);
        const second = Number(time.split(':')[2]);

        let hourLimit = Number(timelimit.split(':')[0]);
        let minuteLimit = Number(timelimit.split(':')[1]);
        let secondLimit = Number(timelimit.split(':')[2]);

        let timeDecimal = hour + (minute / 60) + (second / 3600);
        let timeLimitDecimal = hourLimit + (minuteLimit / 60) + (secondLimit / 3600);

        const result = timeDecimal - timeLimitDecimal;

        let hourResult = Math.floor(result);
        let minuteResultDecimal = (result - Number(hourResult)) * 60;
        let minuteResult = Math.floor(minuteResultDecimal);
        let secondResult = Math.round((minuteResultDecimal - Math.floor(minuteResultDecimal)) * 60);


        if (Number(secondResult) === 60) {
            secondResult = 0;
            minuteResult = minuteResult + 1;
        }

        return `${isNaN(hourResult) ? '00' : `0${hourResult}`.substr(-2)}:${isNaN(minuteResult) ? '00' : `0${minuteResult}`.substr(-2)}:${isNaN(secondResult) ? '00' : `0${secondResult}`.substr(-2)}`;
    }



    static calculateTime(time1, time2) {
        if (time1 === 'N/A' || time2 === 'N/A') return 'N/A';
        if (time1 === '')
            if (!time1 && !time2) return '00:00:00';
        if (!/^\d+:\d{2}:\d{2}$/.test(time1) || !/^\d+:\d{2}:\d{2}$/.test(time2)) return '...:...:...';



        let hourTotal = time2.split(':')[0] - time1.split(':')[0];
        let minuteTotal = time2.split(':')[1] - time1.split(':')[1];
        let secondTotal = time2.split(':')[2] - time1.split(':')[2];

        if (secondTotal < 0) {
            secondTotal = 60 - Math.abs(secondTotal)
            --minuteTotal;
        }
        if (minuteTotal < 0) {
            minuteTotal = 60 - Math.abs(minuteTotal);
            --hourTotal
        }
        if (minuteTotal < 10) minuteTotal = `0${minuteTotal}`
        if (secondTotal < 10) secondTotal = `0${secondTotal}`
        if (hourTotal < 9) hourTotal = `0${hourTotal}`;

        let housExceed = '00';
        let minuteExceed = (`0${minuteTotal - 3}`).substr(-2);
        let secondExceed = (`0${secondTotal - 0}`).substr(-2);

        if (secondExceed < 0) {
            secondExceed = 60 - Math.abs(secondExceed);
            --minuteExceed;
        }
        if (minuteExceed < 0) {
            minuteExceed = 60 - Math.abs(minuteExceed);
            --housExceed;
        }

        return ` ${isNaN(hourTotal) ? '❌' : hourTotal}:${isNaN(minuteTotal) ? '❌' : minuteTotal}:${isNaN(secondTotal) ? '❌' : secondTotal}`;
    }




    static calculateAverageTime(timeArray) {
        if (timeArray.length === 0) return '00:00:00';
        let totalSeconds = 0

        timeArray.forEach((timeStr) => {
            if (!/^\d+:\d{2}:\d{2}$/.test(timeStr)) {
                //throw new Error(`Invalid time format: ${timeStr}`);
            }
            const [hours, minutes, seconds] = timeStr.split(':').map(Number);
            totalSeconds += hours * 3600 + minutes * 60 + seconds;
        });

        // Calculate average in seconds
        const averageSeconds = totalSeconds / timeArray.length;

        // Convert average to hours, minutes, and seconds
        const averageHours = Math.floor(averageSeconds / 3600);
        const averageMinutes = Math.floor((averageSeconds % 3600) / 60);
        const averageSecondsFinal = Math.floor(averageSeconds % 60);

        // Format as H:MM:SS
        return `${averageHours}:${String(averageMinutes).padStart(2, "0")}:${String(averageSecondsFinal).padStart(2, "0")}`;
    }


    static conveTime(time) {  ///  EXAPLE:   2025-02-18T20:42:23.552Z  RETURN:  Ejemplo de salida: "18/2/2025, 9:42:23 PM
        const isoDate = time;
        const date = new Date(isoDate);

        // Convertir a una cadena legible en el formato local
        return date.toLocaleString();
    }


    static returnTimeIso() {
        const date = new Date(Date.UTC(2025, 1, 18, 20, 42, 23, 552));

        // Convertir la fecha a una cadena en formato ISO 8601
        return date.toISOString();
    }


    static timePeriod(time) { // 00:00:00  RETURN: 00 horas 00 minutos
        const timeClean = time.split(':')[0] === '00' ? `${time.split(':')[1][1]}${time.split(':')[2] === '00' ? '' : `:${time.split(':')[2]}`} minutos`
            : `${time.split(':')[0]} horas ${timesplit(':')[1]} minutos`;
        return timeClean
    }


    static americanDateFormat(date, americanFormat = false) { // * DD/MM/AAAA | * MM/DD/AAAA (USA)

        if (date === null || date === undefined) return 'N/A';

        const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        if (!regexDate.test(date)) return 'N/A';

        const dateSplit = date.split('-');
        return americanFormat ? `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}` : `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
    }



    static changueTimeMiliSecond = (time) => { // in 00:00:00 output milisecound
        const [h, m, s] = time.split(":").map(Number);
        return h * 3600 + m * 60 + s; // Operador corregido aquí
    };


    static calculateDuration(init, end) {
        return this.changueTimeMiliSecond(end) - this.changueTimeMiliSecond(init);
    }

}
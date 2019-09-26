/*global startRun*/
/*eslint no-undef: "error"*/

const moment = require("moment-timezone")
module.exports = {
    uptime: async (up) => {
        let upDays = Math.floor(moment.duration(up - startRun).asDays())
        let upHours = moment.duration(up - startRun).hours()
        let upMin = moment.duration(up - startRun).minutes()

        if (upDays !== 0) return upDays + 'D ' + upHours + 'H ' + upMin + 'M'
        else if (upHours !== 0) return upHours + 'H ' + upMin + 'M'
        else return upMin + 'M'
    }
}
/*global startRun*/
/*eslint no-undef: "error"*/

const moment = require("moment-timezone")
module.exports = {
    uptime: async () => {
        let upDays = Math.floor(moment.duration(Date.now() - startRun).asDays())
        let upHours = moment.duration(Date.now() - startRun).hours()
        let upMin = moment.duration(Date.now() - startRun).minutes()

        if (upDays !== 0) return upDays + 'D ' + upHours + 'H ' + upMin + 'M'
        else if (upHours !== 0) return upHours + 'H ' + upMin + 'M'
        else return upMin + 'M'
    }
}
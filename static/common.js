function getDate () {
    const nowDate = new Date();
    const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
    }
    const newmonth = date.month>10?date.month:'0'+date.month
    const day = date.date>10?date.date:'0'+date.date
    let today = date.year + '-' + newmonth + '-' + day
    return today
}

function setCookie (key, value, expires_days) {
    let d = new Date()
    d.setTime(d.getTime()+(expires_days*24*60*60*1000))
    let expires = "expires="+d.toGMTString()
    document.cookie = key + "=" + value + "; " + expires;
}

function getCookie (key) {
    let reg = new RegExp("(^| )" + key + "=([^';]*)(;|$)")
    let arr = document.cookie.match(reg)
    if (arr) {
        return arr[2]
    }else {
        return null
    }
}



export { getDate, setCookie, getCookie }
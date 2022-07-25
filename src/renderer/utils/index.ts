/**
 * 图片后缀 iOS使用.jpg Android使用webp
 */
export function getPicSuffix(): string {
    const terminal = {
        isIOS: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
        isAndroid: /(Android)/i.test(navigator.userAgent)
    }
    let suffix = ".webp";
    if (terminal.isIOS === true) {
        suffix = ".jpg";
    } else if (terminal.isAndroid === true) {
        suffix = ".webp";
    } else {
        suffix = ".jpg";
    }
    return suffix;
}




export function calcNumber(value: number): number {
    let result
    if (value >= 10000) {
        result = (value / 10000).toFixed(0) + 'W'
    } else if (value < 10000 && value >= 1000) {
        result = (value / 1000).toFixed(0) + 'K'
    } else {
        result = (value / 1000).toFixed(0)
    }

    return result
}


export const getPubdate = (timestamp) => {
    let time = new Date(timestamp*1000)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let hours = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()

    if (month < 10) { month = 0 + month }
    if (date < 10) { date =0 + date }
    if (hours < 10) { hours = 0 + hours }
    if (minute < 10) { minute = 0 + minute }
    if (second < 10) { second = 0 + second }
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
  }
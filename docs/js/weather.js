export class Weather{
    constructor(
        area,
        date,
        weather_code,
        weather,
        temperature_max,
        detail,
    ){
        this.area = area;
        this.date = date;
        this.weather_code = weather_code;
        this.weather = weather;
        this.temperature_max = temperature_max;
        this.temperature_min = temperature_min;
        this.detail = detail;
    }
    get area() {
        return this.area;
    }
    get date() {
        return this.date;
    }
    get weather_code() {
        this.weather_code;
    }
    get weather() {
        this.weather;
    }
    get temperature() {
        this.temperature;
    }
    get detail() {
        this.detail;
    }
}
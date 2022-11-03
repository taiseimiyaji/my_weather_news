class Weather{
    constructor(
        area,
        date,
        weather_code,
        weather,
        temperature_max,
        temperature_min,
        detail,
    ){
        let tmp_date = new Date(date);
        this.area = area;
        this.date = tmp_date.getFullYear().toString() + '/' + tmp_date.getMonth().toString() + '/' + tmp_date.getDate().toString();
        this.weather_code = weather_code;
        this.weather = weather;
        this.temperature_max = temperature_max;
        this.temperature_min = temperature_min;
        this.detail = detail;
    }
    area() {
        return this.area;
    }
    date() {
        return this.date;
    }
    weather_code() {
        return this.weather_code;
    }
    weather() {
        return this.weather;
    }
    temperature_max() {
        return this.temperature_max;
    }
    temperature_min() {
        return this.temperature_min;
    }
    detail() {
        return this.detail;
    }
}

// 選んだ場所の天気を表示する
// 表示期間は現在の天気 + 今日の最高気温、最低気温

async function submit() {
    const prefecture = document.getElementById("prefecture").value;
    const today = formatDate(new Date());
    const prefecture_list = {
        tokyo: {
            name: '東京',
            code: 130000,
        },
        nagoya: {
            name: '名古屋',
            code: 230000,
        },
        osaka: {
            name: '大阪',
            code: 270000,
        },
        kochi: {
            name: '高知',
            code: 390000,
        },
        okinawa: {
            name: '沖縄',
            code: 471000,
        }
    };

    let weather_api_url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/' + prefecture_list[prefecture].code +'.json';
    let weather_detail_url = 'https://www.jma.go.jp/bosai/forecast/data/overview_forecast/' + prefecture_list[prefecture].code +'.json?__time__=' + today;

    const res = await fetch(weather_api_url);
    let weather_json = await res.json();

    const weather_detail = await fetch(weather_detail_url);
    let weather_detail_json = await weather_detail.json();
    let todayWeather;  // 背景画像は現在の天気に応じて変更する。

    let dayWeather;
    //直近三日分を取得
    for(i = 0; i < 3; i++){
        const area = weather_json[0].timeSeries[0].areas[0].area.name;
        const date = weather_json[0].timeSeries[0].timeDefines[i];
        const weather_code = weather_json[0].timeSeries[0].areas[0].weatherCodes[i];
        const weather = weather_json[0].timeSeries[0].areas[0].weathers[i];
        const temperature_max = weather_json[1].tempAverage.areas[0].max;
        const temperature_min = weather_json[1].tempAverage.areas[0].min;
        const detail = weather_detail_json.text;

        if(i === 0){
            todayWeather = weather;
        }
        dayWeather = new Weather(
            area,
            date,
            weather_code,
            weather, // '晴れ'
            temperature_max, // '25'
            temperature_min,// '10'
            detail,
        );

        // HTML要素へ反映
        document.getElementById('area_' + i).textContent = dayWeather.area;
        document.getElementById('date_' + i).textContent = dayWeather.date;
        document.getElementById('weather_' + i).textContent = dayWeather.weather;
        document.getElementById('temperature_max_0').textContent = dayWeather.temperature_max;
        document.getElementById('temperature_min_0').textContent = dayWeather.temperature_min;
        document.getElementById('temperature_table_0').className = "visible";
    }
    document.getElementById('detail_0').textContent = dayWeather.detail;

    // 背景画像の設定
    document.body.style.backgroundImage = "url(" + judge_images(todayWeather) + ")";
    document.getElementById("detailWrapper").className = 'text-center visible';

}

function judge_images(weather) {
    const sunny_image_1 = 'images/sunny_1.jpg';
    const sunny_image_2 = 'images/sunny_2.jpg';
    const cloudy_image_1 = 'images/cloudy_1.jpg';
    const cloudy_image_2 = 'images/cloudy_2.jpg';
    const rainy_image_1 = 'images/rainy_2.jpg';
    const rainy_image_2 = 'images/rainy_2.jpg';
    const time = new Date().getSeconds();

    if(weather.includes('晴れ')) {
        if(time % 2 === 0){
            return sunny_image_1;
        }else{
            return sunny_image_2;
        }
    }
    else if(weather.includes('曇り')) {
        if(time % 2 === 0){
            return cloudy_image_1;
        }else{
            return cloudy_image_2;
        }
    }
    else if(weather.includes('雨')){
        if(time % 2 === 0){
            return rainy_image_1;
        }else{
            return rainy_image_2;
        }
    }
    else {
        return rainy_image_2;
    }
}

function clickDetail(){
    if(document.getElementById('detail').className !== 'detail visible m-5'){
        document.getElementById('detailButton').value = 'Close';
        document.getElementById('detail').className = 'detail visible m-5';
    }else{
        document.getElementById('detailButton').value = 'Detail and Tommorow';
        document.getElementById('detail').className = 'invisible';
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = ("00" + (date.getMonth()+1)).slice(-2);
    const day = ("00" + date.getDate()).slice(-2);
    return year + month + day;
}
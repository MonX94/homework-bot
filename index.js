var TelegramBot = require('node-telegram-bot-api');

var token = "337074446:AAFNWmEQllLolWcB1RxRyfJtKu2XE4k-iU4";
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});
//Коннект и настройка Firebase
var firebase = require('firebase');

var config = {
	apiKey: "AIzaSyBmuR6sMrJ0_zlZmStH4TG4TqtvFUU6tN4",
	authDomain: "homeworkbot-ad325.firebaseapp.com",
	databaseURL: "https://homeworkbot-ad325.firebaseio.com",
	projectId: "homeworkbot-ad325",
	storageBucket: "homeworkbot-ad325.appspot.com",
	messagingSenderId: "1096315655949"
};
firebase.initializeApp(config);
//Ссылка на Database
var database = firebase.database();

firebase.database().ref().once('value', (snapshot) => {
	bot.onText(/\/расписание (.+)/, function(msg, match) {
		var fromId = msg.from.id;
		var data = snapshot.val(); //Данные из Firebase
		inputDay = match[1].toLowerCase(); //День введёный пользователем
		botResponse = [];
		for (day in data) {
			if (data[day].DayData.name == inputDay) { //сравнение дня введённым пользователем и того, что есть в текущей итерации
				for (arrayInformation in data[day]) { //каждый массив урока в дне
					if (Array.isArray(data[day][arrayInformation])) { //Проверка на массив, что бы не напороться на DayData (объект)
						botResponse.push([data[day][arrayInformation], "\n"]);
					}
				}
				botResponse.sort((a, b) => {
					return a[0][3] - b[0][3]
				})
				botResponseString = ''
				for (var i = 0; i < botResponse.length; i++) {
					botResponseString += botResponse[i][0][0];
					botResponseString += ", "
					botResponseString += botResponse[i][0][1];
					botResponseString += ", ДЗ: "
					if (botResponse[i][0][2] != "") {
						botResponseString += botResponse[i][0][2];
					} else {
						botResponseString += "Нету, напишите в ВК - vk.com/monx94"
					}
					botResponseString += "\n";
				}
				bot.sendMessage(fromId, botResponseString)
			}
		}
	})
	bot.onText(/\/start/, function (msg, match) {
		var fromId = msg.from.id;
		bot.sendMessage(fromId, 'Привет! Я ДЗбот, скину тебе дз. Просто напиши "/расписание" и после него напиши день, на который ты хочешь получить дз. \n Например, "/расписание вторник"')
	});
});

// /расписание %день% - расписание на день

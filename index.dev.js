var firebase = require('firebase');
var TelegramBot = require('node-telegram-bot-api');

var app = firebase.initializeApp({
	apiKey: '<your-api-key>',
	authDomain: '<your-auth-domain>',
	databaseURL: '<your-database-url>',
	storageBucket: '<your-storage-bucket>',
	messagingSenderId: '<your-sender-id>'
});

var token = "337074446:AAFNWmEQllLolWcB1RxRyfJtKu2XE4k-iU4";
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

console.log('Works?')

bot.onText(/(.+)/, function(msg, match) {
	var fromId = msg.from.id;
	var resp = match[1];
	bot.sendMessage(fromId, resp);
	console.log(resp + ' sent.')
});

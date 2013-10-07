/**
 * Передает в HTML время
 *
 * @example
 * display_countdown_timer([12, 13, 55, 18]);
 *
 * @param {Array} broken_data числа, которые необходимо показать (например, [12, 13, 55, 18])
 * Функция не возвращает никаких данных
 */
var display_countdown_timer = function(days, hours, minutes, seconds){
  var text = "";
  for (i = 0;i < arguments.length;i++) {
    text = text + "<span>" + arguments[i] + "</span> " + choose_in_case(arguments[i], config.names_interval[i]) + " ";
  }
  document.getElementById("watch").innerHTML = text;
}

/**
 * Передает в HTML сообщение о том, что время истекло
 *
 * @example
 * display_timeout(); // Передаст в HTML сообщение
 *
 * Не получает и не отдает данные
 */
var display_timeout = function(){
  document.getElementById("watch").innerHTML = "<p>Ваше обучение окончено</p>";
}
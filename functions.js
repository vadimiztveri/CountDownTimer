/**
 * Возвращает сколько секунд от данного момента до указанной даты
 *
 * @example
 * get_seconds_before_end("30-10-2013 12:00:00"); // returns 3097659 (если дата примерно 23 сентября 2013)
 *
 * @param {String} time_strong дата в стандартном формате (например, "30-10-2013 12:00:00")
 * @returns {Number} число секунд до завершения (например, 3097659)
 */
var get_seconds_before_end = function(date_end) {
  var date_end = new Date(date_end.substring(6, 11), (date_end.substring(3, 5) - 1), date_end.substring(0, 2), date_end.substring(11, 13), date_end.substring(14, 16), date_end.substring(17, 19));
  var time_to_end = Math.round((date_end / 1000) - (new Date()).getTime() / 1000);
  return time_to_end;
}

/**
 * Контруктор, получает количество секунд до завершения
 *
 * @example
 * calculator = new TimeCalculator(3097659);
 *
 * @param {Number} time число секунд до завершения (например, 3097659)
 * @constructor
 */
function TimeCalculator(seconds_to_end) {
  this.seconds_to_end = seconds_to_end;
}

/**
 * Возвращает количество дней.
 *
 * @this {TimeCalculator}
 * @return {number} количество целых дней.
*/
TimeCalculator.prototype.days = function () {
  return Math.floor(this.seconds_to_end / 86480);
};

/**
 * Возвращает количество часов.
 *
 * @this {TimeCalculator}
 * @return {number} количество целых часов (в остатке от дней).
*/
TimeCalculator.prototype.hours = function () {
  return Math.floor(this.seconds_to_end % 86480 / 3600);
};

/**
 * Возвращает количество минут.
 *
 * @this {TimeCalculator}
 * @return {number} количество целых минут (в остатке от часов).
*/
TimeCalculator.prototype.minutes = function () {
  return Math.floor(this.seconds_to_end % 3600 / 60);
};

/**
 * Возвращает количество секунд.
 *
 * @this {TimeCalculator}
 * @return {number} количество целых секунд (в остатке от минут).
*/
TimeCalculator.prototype.seconds = function () {
  return Math.floor(this.seconds_to_end % 60);
};

/**
 * Запускает счетчик времени, с интервалом, записанном в config.interval
 *
 * @example
 * start_countdown_to('30-10-2013 12:00:00');
 *
 * @param {String} time_string строка даты в стандартном представлении (например, '30-10-2013 12:00:00')
 * Функция не возвращает никаких данных, а вызывает функции display_countdown_timer или display_timeout, которые отвечают за отображение
 */
var start_countdown_to = function(date) {
  var time_to_end = get_seconds_before_end(date);
  if (time_to_end < 0) {
    display_timeout();
  } else {
    var interval = setInterval( function() {
	  var calculator = new TimeCalculator(time_to_end);
      display_countdown_timer(calculator.days(), calculator.hours(), calculator.minutes(), calculator.seconds());
      time_to_end--;
      if (time_to_end <0) {
        display_timeout();
        clearInterval(interval);
      }
    }, config.interval)
  }
}

/**
 * Выбирает слово в нужном падеже по числу
 *
 * @example
 * choose_in_case(105, ["секунда", "секунды", "секунд"]); // returns "секунд"
 *
 * @param {Number} number число для выбора падежа (например, 105)
 * @param {Array} words слово в разных падежах (например, ["секунда", "секунды", "секунд"])
 * @returns {String} слово в падеже от числа (например, "секунд")
 */
var choose_in_case = function(number, words) {
  var cases = [2, 0, 1, 1, 1],
      number_of_words;
  if (number % 100 > 4 && number % 100 < 20) {
    number_of_words = 2;
  } else {
    if (number % 10 < 5) {
      number_of_words = cases[number % 10];
    } else {
      number_of_words = 2;
    }
  }
  return words[number_of_words];
}
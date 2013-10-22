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

var config = new Configuration();
  
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
  var time_to_end = config.get_seconds_before_end(date);
  if (time_to_end < 0) {
    config.display_timeout();
  } else {
    var interval = setInterval( function() {
	  var calculator = new TimeCalculator(time_to_end);
      config.display_countdown_timer(calculator.days(), calculator.hours(), calculator.minutes(), calculator.seconds());
      time_to_end--;
      if (time_to_end <0) {
        config.display_timeout();
        clearInterval(interval);
      }
    }, config.interval)
  }
}
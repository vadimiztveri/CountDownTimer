/**
 * @example
 * new Configuration();
 * @constructor
 */
var Configuration = function() {
	this.names_interval = [["день", "дня", "дней"], ["час", "часа", "часов"], ["минута", "минуты", "минут"], ["секунда", "секунды", "секунд"]];
	this.interval = 1000;
};

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
Configuration.prototype.choose_in_case = function(number, words) {
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

/**
 * Возвращает сколько секунд от данного момента до указанной даты
 *
 * @example
 * get_seconds_before_end("30-10-2013 12:00:00"); // returns 3097659 (если дата примерно 23 сентября 2013)
 *
 * @param {String} time_strong дата в стандартном формате (например, "30-10-2013 12:00:00")
 * @returns {Number} число секунд до завершения (например, 3097659)
 */
Configuration.prototype.get_seconds_before_end = function(date_end) {
  var date_end = new Date(date_end.substring(6, 11), (date_end.substring(3, 5) - 1), date_end.substring(0, 2), date_end.substring(11, 13), date_end.substring(14, 16), date_end.substring(17, 19));
  var time_to_end = Math.round((date_end / 1000) - (new Date()).getTime() / 1000);
  return time_to_end;
}
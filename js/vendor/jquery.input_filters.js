/**
 * jQuery Input filters (multiple) plugin
 *
 * @copyright Rinat Mukhtarov, rin-nas@ya.ru
 * @version 2.4
 */
(function($) {
	$.fn.inputFilter = function(settings) {
		var KEY_CARRIAGE_RETURN = 0x0D, //[Enter] button
			inFilters = function(value, filters, skipKey, index) {
				for (k in filters) {
					if (k !== skipKey && getRegExp(filters[k], index).test(value)) return k;
				}
				return false;
			},
			getRegExp = function(filter, index) {
				if ($.isEmptyObject(filter)) return filter; //RegExp
				if ($.isArray(filter)) {
					if (typeof index !== 'number') index = 1;
					if ($.inArray(index, [0, 1]) === -1) throw new RangeError('2-nd parameter must be 0 or 1');
					return filter[index];
				}
				throw new TypeError('In 1-st parameter a RegExp object or Array type expected, ' + (typeof filter) + ' given');
			};
		options = $.extend({
			filters : {},
			classes : {
				input : 'filter',
				inputError : 'filter-error',
				indicator : 'filter-indicator',
				indicatorError : 'filter-indicator-error'
			}
		}, settings);
		return this.each(function() {
			var filters = options.filters,
				classes = options.classes,
				count = $.map(filters, function() {return 1;}).length; //workaround, Object.keys() doesn't work < IE9
			if (count > 1) $(this).addClass(classes.input).after('<span class="' + classes.indicator + '"></span>');
			$(this).on('keypress keyup', function(event) {
				var char = String.fromCharCode(event.which);
				if (event.which === KEY_CARRIAGE_RETURN) return true;
				if (this.value.length) {
					for (var k in filters) {
						if (! getRegExp(filters[k]).test(this.value) || inFilters(this.value, filters, k)) continue;
	   					if (event.type == 'keypress') {
   							if (getRegExp(filters[k]).test(char)) return true;
   							$(this).addClass(classes.inputError);
							if (count > 1) $(this).nextAll('.' + classes.indicator).text(inFilters(char, filters, k) || 'xx').addClass(classes.indicatorError);
   							return false;
   						}
   						$(this).removeClass(classes.inputError);
						if (count > 1) $(this).nextAll('.' + classes.indicator).text(k).removeClass(classes.indicatorError);
   						return true;
					}
				}
				if (event.type == 'keypress') {
					if (this.value.length && inFilters(char, filters, null, 1)) return true;
					if (! this.value.length && inFilters(char, filters, null, 0)) return true;
					$(this).addClass(classes.inputError);
					if (count > 1) $(this).nextAll('.' + classes.indicator).text('xx').addClass(classes.indicatorError);
					return false;
				}
				$(this).removeClass(classes.inputError);
				if (count > 1) $(this).nextAll('.' + classes.indicator).text('').removeClass(classes.indicatorError);
				return true;
			}).trigger('keyup');
		});
	};
}(jQuery));
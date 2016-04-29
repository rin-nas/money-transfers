$(document).ready(function() {
	$('a.extra-fields-toggle-group').on('click', function() {
		$(this).closest('table').find('.extra-fields-group').toggle();
		return false;
	});
	$('.search-group a.result-found').on('click', function() {
		alert('Результаты поиска появляются в модальном окне и выглядят так же, как на отдельной странице поиска');
		return false;
	});
	$('.search-group button.search').on('click', function() {
		var searchButton = $(this),
			searchResultFunc = function() {
				var foundTotal = Math.floor(Math.random() * 20) + 1,
					isFound = Math.floor(Math.random() * 2), //dummy
					isCancelButtonFocus = searchButton.next('button.cancel').is(':focus'),
					result = 	searchButton.prop('disabled', false).text('Найти').trigger('propchange')
											.next('button.cancel').hide()
											.nextAll(isFound ? '.result-found' : '.result-not-found');
				if (isFound) result.prop('href', '#found' + foundTotal).text('найдено (' + foundTotal + ')').show();
				else result.show();
				if (isCancelButtonFocus) isFound ? result.focus() : searchButton.focus();
				searchButton.parent('.search-group').siblings('input').prop('readOnly', false).trigger('propchange');
			};
		searchButton.parent('.search-group').siblings('input').prop('readOnly', true).trigger('propchange');
		searchButton.prop('disabled', true).trigger('propchange').text('Ищем…')
					.next('button.cancel').data('searchId', setTimeout(searchResultFunc, 1000)).show().focus()
					.nextAll('.result-found, .result-not-found').hide();
	});
	$('.search-group button.cancel').on('click', function() {
		var cancelButton = $(this);
		clearTimeout(cancelButton.data('searchId'));
		cancelButton.parent('.search-group').siblings('input').prop('readOnly', false).trigger('propchange');
		cancelButton.hide()
					.prev('button.search').prop('disabled', false).trigger('propchange').text('Найти').focus()
					.nextAll('.result-found, .result-not-found').hide();
	});
	$('.mt input.country').on('change keyup', function() {
		var isDisabled = (this.value === 'Россия');
		$('.mt input.partner-system').prop('disabled', isDisabled).trigger('propchange');
		if (isDisabled) $('.mt .partner-system-group').hide();
		else $('.mt .partner-system-group').show();
	}).change();
	$('.mt input.recive-where').on('change', function() {
		var val = $(this).filter(':checked').val();
		if (val == 'cash')
			$('.mt .bank-account-group').hide(),
			$('.mt .restrictions-group, .recipient .main-doc-group').show(),
			$('.recipient input.resident').change();
		if (val == 'account')
			$('.mt .restrictions-group, .mt .bank-account-group, .recipient .location-group').show(),
			$('.recipient .main-doc-group').hide();
	});
	$('.mt input.dynamic-discount').on('change', function() {
		if (this.checked) $('.mt .discount-group').show();
		else $('.mt .discount-group').hide();
	});
	$('.mt input.address-know').on('change', function() {
		var val = $(this).filter(':checked').val();
		if (val == 1) $('.mt .point-location-group').hide();
		if (val == 0) $('.mt .point-location-group').show();
	});
	$('.mt input.recive-currency, .mt input.send-currency').on('change', function(){
		var className = $(this).attr('name');
		var elems = $('span.' + className);
		var oldCurrency = elems.first().text().toLowerCase();
		var newCurrency = $(this).val();
		elems.removeClass(oldCurrency).addClass(newCurrency).text(newCurrency.toUpperCase());
		dynamicSumField();
	});
	$('.mt input.calc-method').on('change', function(){
		$('.mt .method-caption').text($(this).next().text());
		dynamicSumField();
	});
	$('.mt input.partner-system').on('change', function(){
		var val = $(this).filter(':checked').val();
		if (typeof(val) != "string") return;
		if (/\bPoint$/i.test(val)) $('.mt .point-location-group').show();
		else $('.mt .point-location-group').hide();
		if (/\bAny$/i.test(val)) $('.mt .address-know-group').show();
		else $('.mt .address-know-group').hide();
	});
	$('.sender input.identify-full').on('change', function() {
		if (this.checked)
			$('.sender .identify-full-group').show(),
			$('.sender input.resident').change();
		else $('.sender .identify-full-group, .sender .extra-doc-group').hide();
	});
	$('.sender input.resident').on('change', function() {
		var val = $(this).filter(':checked').val();
		if (val == 1) $('.sender .extra-doc-group').hide();
		if (val == 0 && $('.sender input.identify-full').prop('checked')) $('.sender .extra-doc-group').show();
	});
	$('.recipient input.resident').on('change', function() {
		var val = $(this).filter(':checked').val();
		if (val == 1) $('.recipient .location-group').show();
		if (val == 0) $('.recipient .location-group').hide();
	});
	$('.recipient a.copy-from-sender').on('click', function() {
		confirm('Скопировать данные из отправителя?');
		return false;
	});
	function dynamicSumField() {
		var reciveCurrency = $('input.recive-currency:checked').val(),
			sendCurrency   = $('input.send-currency:checked').val();
		if (reciveCurrency && sendCurrency)	{
			$('input.calc-method').prop('disabled', false).trigger('propchange');
			if (reciveCurrency == sendCurrency) {
				$('input.calc-method[value=recive]').prop({'disabled': true, 'checked': false}).trigger('propchange');
				$('#currency-rate').hide();
			}
			else $('#currency-rate').show();
		}
		var calcMethod = $('input.calc-method:checked').val();
		if (reciveCurrency && sendCurrency && calcMethod) {
			$('input.address-know').prop('disabled', false).trigger('propchange');
			$('input.point-location').prop('disabled', false).trigger('propchange');
			$('#mt-dynamic-sum').val('').prop('disabled', false).trigger('propchange');
			var map = {
				'recive': 'recive-currency',
				'send': 'send-currency',
				'pay': 'send-currency'
			};
			var oldCurrency = $('#mt-dynamic-currency').text().toLowerCase();
			var newCurrency = $('input.' + map[calcMethod] + ':checked').val();
			$('#mt-dynamic-currency').removeClass(oldCurrency).addClass(newCurrency).text(newCurrency.toUpperCase());
			$('.mt .dynamic-discount-group, .mt .calc-result-group').show();
		}
		else {
			$('#mt-dynamic-sum').val('').prop('disabled', true).trigger('propchange');
			$('#mt-dynamic-currency').text('');
			$('.mt .dynamic-discount-group, .mt .calc-result-group').hide();
		}
	}
});

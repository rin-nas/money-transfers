$(function() {
	$('form.search input').on('keyup', function() {
		var isDisabled = $(this).closest('td').find('input').map(function() {
			return $(this).val();
		}).get().join('').replace(/^\s+/,'').replace(/\s+$/,'').length == 0;
		$(this).closest('td').next().find('button.search').prop('disabled', isDisabled);
	});
	$('button.search').on('click', function() {
		$(this).closest('form.search').find('input, button.search').prop('disabled', true);
		$(this).text('Ищем…').next().css('visibility', 'visible').focus();
		return false;
	});
	$('button.cancel').on('click', function() {
		$(this).closest('form.search').find('button.search').each(function() {
			$(this).closest('td').prev().find('input').prop('disabled', false).trigger('keyup');
		});
		$(this).css('visibility', 'hidden').prev('button.search').text('Найти').focus();
		return false;
	});
});

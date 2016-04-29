$(function() {
	$('form.search input').on('keyup', function() {
		if ($(this).prop('readonly')) return;
		var isFilled = $.trim($(this).closest('td').find('input').map(function() {
			return $(this).val();
		}).get().join('')).length == 0;
		$(this).closest('td').next().find('button.search').prop('disabled', isFilled);
	});
	/*
	$('button.mt-send').on('click', function() {
		$(this).prop('disabled', true).text('Ожидайте загрузки страницы…').closest('form.search').find('button').prop('disabled', true);
		location.href = '/pages/viewpage.action?pageId=622775';
	});
	*/
	$('button.search').on('click', function() {
		var $form = $(this).closest('form.search');
		$form.find('input').prop('readonly', true);
		$form.find('button.search').prop('disabled', true);
		$(this).text('Ищем…').next().css('visibility', 'visible').focus();
		return false;
	});
	$('button.cancel').on('click', function() {
		$(this).closest('form.search').find('button.search').each(function() {
			$(this).closest('td').prev().find('input').prop('readonly', false).trigger('keyup');
		});
		$(this).css('visibility', 'hidden').prev('button.search').text('Найти').focus();
		return false;
	});
	$('table.confluenceTable > tbody').each(function() {
		$(this).find('tr').filter(':even').addClass('even');
	});
});

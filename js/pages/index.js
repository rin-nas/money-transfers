$(function() {
	$('button').on('click', function() {
		$(this).closest('.block-content').find('i.fa-spinner').each(function() {
			$(this).removeClass().addClass($(this).data('oldClass'))
				.parent('button').prop('disabled', false).trigger('propchange');
		});
		if ($(this).data('url')) {
			$(this).prop('disabled', true).trigger('propchange');
			var buttonIcon = $(this).find('i.fa');
			buttonIcon.data('oldClass', buttonIcon.attr('class')).removeClass().addClass('fa fa-spinner fa-spin fa-fw fa-lg');
			location.href = $(this).data('url');
		}
	});
});

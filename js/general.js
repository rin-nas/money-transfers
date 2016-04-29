//выполняем нижеследующее после построения браузером DOM
$(function() {
	// даём IE7 на слабых компах проснуться из комы и "пропукаться", используя маленькую задержку setTimeout()
	setTimeout(function() {

		//костыли для IE < 9
		if ($('html').is('.lt-ie9')) {

			if ($('html').is('.lt-ie7')) {
				var IE6_message = 'Вы используете устаревший, медленный и небезопасный браузер IE6!\r\nМинимально возможная версия — IE7.';
				$('body').text(IE6_message);
				alert(IE6_message);
			}

			//Автофокус.
			//Селектор "*[autofocus]:first" использовать нельзя, т.к. будет очень медленно.
			//Перечисляем все элементы на которые возможно поставить фокус.
			$('input[autofocus]:first,\
				textarea[autofocus]:first,\
				select[autofocus]:first,\
				button[autofocus]:first,\
				a[autofocus]:first').first().focus();

			//Вкладки - переключение
			/*Закомментировал, т.к прописал классы в теги HTML!
			for (var i = 1; i < 10; i++) {
				$('.tab-caption:nth-of-type(' + i + ')').addClass('nth-of-type-' + i);
				$('.tab-content:nth-of-type(' + i + ')').addClass('nth-of-type-' + i);
			}
			*/

			//Радиокнопки и чекбоксы - закругление уголков
			var radios = $('label.radio, label.checkbox');
			if (radios.length) {
				//Кэшируем загрузку фонового изображения в IE7, чтобы он не грузил его при каждом запросе
				/*
				//способ 1 - не работает :(
				if ('execCommand' in document) document.execCommand('BackgroundImageCache', false, true);

				//способ 2 - не работает :(
				if ($('label.radio').length {
					(new Image()).src = '/img/radio-corner.png';
					(new Image()).src = '/img/radio-corner-hover.png';
					(new Image()).src = '/img/radio-corner-focus.png';
				}
				*/

				//способ 3 - работает!
				$('body')
					.append('<div style="display: none;">\
								<img src="/img/radio-corner.png">\
								<img src="/img/radio-corner-hover.png">\
								<img src="/img/radio-corner-focus.png">\
							</div>');

				radios
					.filter(':first-of-type')
					.addClass('first-of-type')
					.prepend('<span class="corner top-left offset-1"></span><span class="corner bottom-left offset-1"></span>');
				radios
					.filter(':last-of-type')
					.addClass('last-of-type')
					.prepend('<span class="corner top-right offset-1"></span><span class="corner bottom-right offset-1"></span>');
			}
		}//костыли для IE < 9

		//горячие клавиши - TODO - https://github.com/jeresig/jquery.hotkeys
		/*
		$([document, 'input, select']).on('keydown', null, 'alt+s', function() {
			location.href = '/Transfers/Send/';
		});
		*/

		//поля ввода и ссылки в блоке в фокусе делает сам блок в фокусе
		$('.block')
			.on('focusin focusout', function(event) {
				$(this).toggleClass('focusin', event.type === 'focusin');
			});

		//обработка фокуса пунктов меню для управления с клавиатуры
		$('.dd-menu, .dd-menu li')
			.on('focusin focusout', function(event) {
				$(this).toggleClass('focusin', event.type === 'focusin');
			});

		//всплывающие подсказки при наведении указателя мыши
		$('.icon-hint').tooltip({
			placement: 'top',
			animation: false
		});

		//автоматический подгон высоты поля <textarea> в зависимости от кол-ва введённого текста
		$('textarea').autoResize({
			animate: false,
			extraSpace : 0
		});

		$('footer .debug').append('UserAgent: ' + navigator.userAgent + '<br>Support ActiveX: ' + (!!window.ActiveXObject));

	}, 10);
});
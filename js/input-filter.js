//выполняем нижеследующее после построения браузером DOM
$(function() {
	$('input.person-name').inputFilter({
		filters : {
			en: [/^[a-zA-Z]+$/, /^[a-zA-Z\-']+$/],
			ru: [/^[\u0410-\u044F\u0401\u0451]+$/, /^[\u0410-\u044F\u0401\u0451\-']+$/]
		}
	});
	$('input.doc-serial, input.doc-number').inputFilter({
		filters : {
			en: [/^[\da-zA-Z]+$/, /^[\da-zA-Z\- ]+$/],
			ru: [/^[\d\u0410-\u044F\u0401\u0451]+$/, /^[\d\u0410-\u044F\u0401\u0451\- ]+$/]
		}
	});
	$('input.mt-number').inputFilter({
		filters : {
			xx: [/^[\da-zA-Z]+$/, /^[\da-zA-Z ]+$/]
		}
	});
	$('input[type=tel]').inputFilter({
		filters : {
			dd: [/^\d+$/, /^[\d\.\-() ]+$/]
		}
	});
	$('input.client-card, input.doc-issue-code').inputFilter({
		filters : {
			dd: [/^\d+$/, /^[\d\- ]+$/]
		}
	});
	$('input[type=email]').inputFilter({
		filters : {
			en: /^[\x21-\x7e]+$/  //printable ASCII
		}
	});
	$('input[type=search]').inputFilter({
		filters : {
			en: [/^[\da-zA-Z]+$/, /^[\da-zA-Z\-' ]+$/],
			ru: [/^[\d\u0410-\u044F\u0401\u0451]+$/, /^[\d\u0410-\u044F\u0401\u0451\-' ]+$/]
		}
	});
	$('input[type=date]').inputFilter({
		filters : {
			dd: [/^\d+$/, /^[\d\.\-]+$/]
		}
	});
	$('input.country, input.city').inputFilter({
		filters : {
			en: [/^[a-zA-Z]+$/, /^[a-zA-Z\-'()\., ]+$/],
			ru: [/^[\u0410-\u044F\u0401\u0451]+$/, /^[\u0410-\u044F\u0401\u0451\-'()\., ]+$/]
		}
	});
	$('input.money').inputFilter({
		filters : {
			dd: [/^\d+$/, /^[\d\.]+$/]
		}
	});
});
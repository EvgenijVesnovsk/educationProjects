$(function () {

	$('.jcarousel').jcarousel({
		wrap: 'circular'
	});

	$('.jcarousel-prev').on('jcarouselcontrol:active', function () {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function () {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '-=1'
		});

	$('.jcarousel-next').on('jcarouselcontrol:active', function () {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function () {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '+=1'
		});

	$('.jcarousel-pagination').on('jcarouselpagination:active', 'a', function () {
			$(this).addClass('active');
		})
		.on('jcarouselpagination:inactive', 'a', function () {
			$(this).removeClass('active');
		})
		.jcarouselPagination({
			item: function (page) {
				return '<a href="#' + page + '">' + page + '</a>';
			}
		});

	$('.jcarousel').jcarouselAutoscroll({
		interval: 3000,
		target: '+=1',
		autostart: true
	});

});

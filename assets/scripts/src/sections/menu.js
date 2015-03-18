require(['jquery', 'dom/toggler', 'util/unitNumber'], function($, Toggler, UN)
{
	var menu = $('#menu');
	var site = $('#site');
	var header = $('#header');

	var menuWidth = new UN(menu[0].offsetWidth, 'px').toEm().toString();

	var menuToggler = new Toggler(menu[0], false);
	var siteToggler = new Toggler(site[0], false);
	var headerToggler = new Toggler(header[0], false);

	var states = {
		open: {
			transform: 'translateX(-' + menuWidth + ')'
		}
	};

	var duration = '0.35s';

	menuToggler.setAnimate(states, duration);
	siteToggler.setAnimate(states, duration);
	headerToggler.setAnimate({
		open: {
			width: 'calc(100% - ' + menuWidth + ')',
			paddingRight: '0.4em'
		}
	}, duration);

	menuToggler.setDisplayToggle(false);
	siteToggler.setDisplayToggle(false);
	headerToggler.setDisplayToggle(false);

	$('#menu-button').on('click', function(e)
	{
		menuToggler.toggle();
		siteToggler.toggle();
		headerToggler.toggle();
	});
});
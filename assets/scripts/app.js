define('jquery.checked', ['jquery'], function($)
{
	/**
	 * Checked
	 * A simple wrapper for checking
	 *
	 * @param value
	 * @returns {*}
	 */
	$.fn.checked = function(value)
	{
		var returnValue = (typeof value != 'boolean');
		var value;

		this.each(function()
		{
			var $this = $(this);
			if($this.is('input[type="checkbox"], input[type="radio"]'))
			{
				if(returnValue)
				{
					value = this.checked;
					return false;
				}

				this.checked = value;
				$this.trigger('check');
			}
		});

		if(returnValue)
		{
			return value;
		}

		return this;
	};
});

require(['jquery', 'util/prefixClass'], function($, prefix)
{
	require('jquery.checked');

	var clsChecked = prefix('state', 'checked');

	var inputs = $('input[type="checkbox"]:not([data-ignore]), input[type="radio"]:not([data-ignore])')
		.each(function(i)
		{
			var input = $(this);

			var labelParent = input.parent('label');

			var checker = input.parent('button');
			var label = this.id ? $('label[for="' + this.id + '"]') : labelParent;
			var isRadio = input.is('[type="radio"]');

			// Check if the checker hasn't already been initialised
			if(!checker.length)
			{
				checker = $(document.createElement(labelParent.length ? 'span' : 'button'));

				input.before(checker);
				checker.append(input);
				checker.addClass(input.attr('class'));
			}

			function click(e)
			{
				e.stopPropagation();
				e.preventDefault();

				if(isRadio)
				{
					$('input[type="radio"][name="' + input.prop('name') + '"]').checked(false);
					input.checked(true);
				}
				else
				{
					input.checked(!input.checked());
				}
			}

			checker.on('click', click);

			if(label.length)
			{
				label.on('click', click);
			}

			function check()
			{
				label.toggleClass(clsChecked, this.checked);
				checker.toggleClass(clsChecked, this.checked);
			}

			input.on('check', check);
			check.call(input[0]);
		});
});
require(['jquery', 'util/prefixClass', 'util/support'], function($, prefix, support)
{
	var hasTransform = support.cssProperty('transform');

	var clsTransform = prefix(hasTransform ? 'feature' : 'featureless', 'transform');

	var clsFocused = prefix('state', 'focused');
	var clsBlurred = prefix('state', 'blurred');
	var clsEmpty = prefix('state', 'empty');
	var clsFilled = prefix('state', 'filled');

	function setState(e)
	{
		var input = $(this);

		var focused = (e.type == 'focus') || input.is(':focus');
		var empty = !input.val();

		input.parent()
			.toggleClass(clsFocused, focused)
			.toggleClass(clsBlurred, !focused)
			.toggleClass(clsEmpty, empty)
			.toggleClass(clsFilled, !empty);
	}

	var floatLabel = $('.float-label')
		.addClass(clsTransform);

	var input = floatLabel.children('input')
		.on('focus blur change keyup', setState)
		.on('keydown', function(e)
		{
			var that = this;
			setTimeout(function() { setState.call(that, e) }, 4);
		})
		.each(setState);

	// Pass events from label to input
	var label = floatLabel.children('label')
		.on('click mousedown mouseup focus', function()
		{
			input.trigger('focus');
		});
});
require(['jquery', 'util/prefixClass'], function($, prefix)
{
	var clsReady = prefix('state', 'ready');

	$('img').each(function()
	{
		var $this = $(this);
		var src = $this.prop('src');

		var img = new Image();
		img.onload = function()
		{
			$this.addClass(clsReady);
		};
		img.src = src;
	});
});
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
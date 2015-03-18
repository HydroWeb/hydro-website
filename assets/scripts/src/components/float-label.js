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
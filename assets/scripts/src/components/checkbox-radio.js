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
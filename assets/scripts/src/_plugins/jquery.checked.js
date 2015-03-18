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
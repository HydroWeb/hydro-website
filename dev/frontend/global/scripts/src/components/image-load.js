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
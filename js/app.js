$(document).ready(function()
{
	const initValue = 20;

	var menuButs = [['Рестораны', '#restaurants'], ['Меню', '#menu']];


	var construct = function(w)
	{
		var sidebar = {};
		sidebar.width = w;

		$('#sidebar').width(sidebar.width + "%");

		w = 100 - parseInt(w);
		$('#content').css({'width':w + '%', 'left':sidebar.width + '%'});

		w = parseInt(sidebar.width)*$('#wrapper').width()/100;
		$('.logo').width(w).height(w);

		$('.logo div').width(.8*w).height(.8*w);

		w = $('#sidebar').width() / $('#wrapper').width()*100;
		$('.menu').css({'left':w + "%"});


		$('.menu').html('');

		menuButs.forEach(function(element, index)
		{
			$('.menu').append('<a href="' + element[1] +'">' + element[0] +'</a>');
		});

		/*w = parseInt(sidebar.width);
		$('#sidebar').hover(function()
		{

		});*/

	}

	construct(initValue);

	$(document).resize(function()
	{
		construct(initValue);
	});

	$(window).resize(function()
	{
		construct(initValue);
	});

	$('.logo').click(function()
	{
		window.location.hash = '';
	});


	function updateRoute()
	{
		var url;

		switch(window.location.hash)
		{
			case '#' || '':
				url = 'main.html';
			break;
			case '#restaurants':
				url = 'restaurant.html';
			break;
			case '#menu':
				url = 'menu.html';
			break;
			default:
				url = 'main.html';
			break;
		}

		//alert(url);

		$.ajax({
			url:'blocks/'+url,
			dataType:'html',
			beforeSend:function()
			{
				$('#content').addClass('fadeOut');
			},
			success:function(data)
			{
				setTimeout(function()
					{
						$('#content').removeClass('fadeOut').html(data);
					}, 300);
			}
		});

	}

	updateRoute();


	$(window).bind('hashchange', function()
	{
		updateRoute();
	});


});
$(document).ready(function()
{
	const initValue = 20; //Ширина sidebar'a

	var menuButs = [['Корзина', '#cart'], ['Рестораны', '#restaurants'], ['Отзывы', '#references']]; //Кнопки меню

	//Настройка резинового представления сайта
	var construct = function(w)
	{
		//Настройка ширина sidebar'a
		var sidebarWidth = w;
		$('#sidebar').width(sidebarWidth + "%");

		//Настройка ширина и позиции основного контента
		w = 100 - parseInt(w);
		$('#content').css({'width':w + '%', 'left':sidebarWidth + '%'});

		//Настройка логотипа
		w = parseInt(sidebarWidth)*$('#wrapper').width()/100;
		$('.logo').width(w).height(w);
		$('.logo div').width(.8*w).height(.8*w);

		//Настройка меню
		w = $('#sidebar').width() / $('#wrapper').width()*100;
		$('.menu').css({'left':w + "%"});
		$('.menu').html('');

		//Добавление пунктов меню
		menuButs.forEach(function(element, index)
		{
			$('.menu').append('<a href="' + element[1] +'">' + element[0] +'</a>');
		});

		//Добавление кнопки личного кабинета
		$('.menu').append('<a href="#" id="cab">Личный кабинет</a>');
		$('.menu').height($('#sidebar').height() - $('.logo').height());

		$('#cab').css({'width':$('.menu a').eq(0).width() + 25 + 'px' ,"left":(-25/$('#sidebar').width()*100 - w) + "%"});

		//Наведение на sidebar
		w = parseInt(sidebarWidth);

		$('#sidebar').hover(function()
		{
			$('#content').css({'left':(parseInt(sidebarWidth) + 25/$('#wrapper').width()*100) + '%'});
		}, function()
		{
			$('#content').css({'left':sidebarWidth + '%'});
		});


	}

	//Вызываем функцию при загрузке страницы
	construct(initValue);

	//И при изменении размеров документа или окна
	$(document).resize(function()
	{
		construct(initValue);
	});

	$(window).resize(function()
	{
		construct(initValue);
	});

	//При нажатии на логотип возвращаемся на начальную страницу
	$('.logo').click(function()
	{
		window.location.hash = '';
	});

	//Обновление блока content и подгрузка данных с помощью Ajax
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
			case '#cart':
				url = 'cart.html';
			break;
			case '#references':
				url = 'references.html';
			break;
			default:
				url = 'main.html';
			break;
		}

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

	//Вызываем при загрузке страницы и при изменении hash'a
	updateRoute();


	$(window).bind('hashchange', function()
	{
		updateRoute();
	});

	//Анимация появления личного кабинета
	$('#cab').click(function()
	{
		$('#modal').animate({'bottom':0});
	});

	$('#x').click(function()
	{
		$('#modal').animate({'bottom':'-100%'});
	});


	$(document).on('change', '#searchText', function()
	{
		var val = $('#searchText').val();
		var arr = val.split('');

		if(val == "")
		{
			$('#results').html('');
		}

		if(arr.length >= 3)
		{
			$('#results').html('');

			$.ajax({
				url:"./db/db.json",
				dataType:"json",
				success:function(data)
				{
					data["users"].forEach(function(element, index)
					{
						var resArr = element.name.split('');
						var counter = 0;

						resArr.forEach(function(item, j)
						{
							if(item == arr[j])
							{
								counter++;
							}
						});

						if(counter > 1)
						{
							$('#results').append('<div class="result"><div class="resultImg" style="background-image:url(' + element.img +')"></div><h2>' +  element.name + '</h2></div>');
						}
					});
				}
			});
		}
	});


});
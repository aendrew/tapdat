var orientation = 'portrait';
var heart = {
	'labour': 0,
	'tory': 0,
	'libdem': 0,
	'ukip': 0,
	'green': 0,
	'snp': 0,
	'plaid': 0
};
var hate = {
	'labour': 0,
	'tory': 0,
	'libdem': 0,
	'ukip': 0,
	'green': 0,
	'snp': 0,
	'plaid': 0
};
var score = {
	'labour': 0,
	'tory': 0,
	'libdem': 0,
	'ukip': 0,
	'green': 0,
	'snp': 0,
	'plaid': 0
};
var faceScore = {
	'labour': 0,
	'tory': 0,
	'libdem': 0,
	'ukip': 0,
	'green': 0,
	'snp': 0,
	'plaid': 0
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function() {

	setInterval(function() {
		var number = parseInt($('.data-section .data-block:first-child h1').text().replace(",",""));
		number++;
		number = numberWithCommas(number);
		$('.data-section .data-block:first-child h1').text(number);
	}, 3000);

	adjust();

	$(window).on('resize', function() {
		adjust();
	});

	calcScore();
	setInterval(function() {faceDrop();}, 15000);

	$('.face-box').on('click', function() {
		if($(this).find('div').hasClass('worm')) {
			//go to graph
		} else {
			var party = $(this).find('div').attr('class').replace('face ','');
			heart[party]++;
			if(faceScore[party] > -2 && faceScore[party] < 2) {
				faceScore[party]++;
			}
			$(this).append('<div class="heart"></div>')
			setTimeout(function() {
				$('.heart').fadeOut(400, function() {
					$(this).remove();
				});
			}, 300);
			calcScore();
		}
	});

	$('.face-box').on('', function() {
		var party = $(this).find('div').attr('class').replace('face ','');
		hate[party]++;
		if(faceScore[party] > -2 && faceScore[party] < 2) {
			faceScore[party]--;
		}
		$(this).append('<div class="hate"></div>')
		setTimeout(function() {
			$('.hate').fadeOut(400, function() {
				$(this).remove();
			});
		}, 300);
		calcScore();
	});

	$('#nav .button').on('click', function() {
		if($(this).find('p').text() == 'Info') {
			$('#info').show();
		}
	});

	$('.exit').on('click', function() {
		$('#info').hide();
	});

});

function adjust() {
	$('#faces').height($(window).height()*0.93);
	$('#nav').height($(window).height()*0.07);
	if(Modernizr.mq('(orientation: landscape)')) {
		$('.face-box').css({
			'width': $(window).width()/4,
			'height': $('#faces').height()/2
		});
	} else {
		$('.face-box').css({
			'width': $(window).width()/2,
			'height': $('#faces').height()/4
		});
	}
}

function calcScore() {
	var scoreArray = [];
	var max;
	var min;
	$.each(score, function(i, object) {
		score[i] = heart[i]-hate[i];
	});
	//get face according to score
	$.each($('.face'), function(i, object) {
		var party = $(object).attr('class').replace('face ','');
		if(party != 'worm') {
			var index = faceScore[party];
			var image = 'url(assets/'+party+index+'.jpg)';
			$(object).css('background-image', image);
		} else {
			$(object).css('background-image', 'url(assets/worm.jpg)');
		};
	});
}

function faceDrop() {
	$.each($('.face'), function(i, object) {
		var party = $(object).attr('class').replace('face ','');
		if(faceScore[party] < 0 && faceScore[party] >= -2) {
			faceScore[party]++;
		};
		if(faceScore[party] > 0 && faceScore[party] <= 2) {
			faceScore[party]--;
		};
		calcScore();
	});
}


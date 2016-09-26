var nextmove
var n = 3

var create_board = function () {
	var s = ''
	for (var j = 1; j <= n; j++) {
		s = s + '<tr>'
		for (var i = 1; i <= n; i++) {
			s = s + '<td id="cell_' + i + j + '"></td>'
		}
		s = s + '</tr>'
	}
	$('.gametable').html(s)
}

var resetgame = function (){
	$('.gametable tr>td').html('')
	$('#msg').html('')
	$('#restart').hide()
	nextmove = 'X'
	$('#nextmove').html(nextmove)
	$('#nextmovemsg').show()
}

// verificam daca s-a castigat pe orizontala sau pe verticala
var verifyline = function (direction) {
	for (var j = 1; j <= n; j++) {
		for(var i = 1; i < n; i++) {
			var v1
			var v2
			if (direction == 'horizontal') {
				v1 = $('#cell_' + i + j).html()
				v2 = $('#cell_' + (i + 1) + j).html()
			}
			else {
				v1 = $('#cell_' + j + i).html()
				v2 = $('#cell_' + j + (i + 1)).html()
			}
			if (v1 == '' || v2 == '') {
				break
			}
			if (v1 != v2) {
				break
			}
			else {
				if (i == n-1) { // ultima comparatie
					return j
				}
			}	
		} 
	}
}

var verifydiagonal = function(direction) {
	for (var i = 1; i < n; i++) {
		var v1, v2
		if (direction == '1st') {
			v1 = $('#cell_' + i + i).html()
			v2 = $('#cell_' + (i + 1) + (i + 1)).html()
		}
		else {
			var j = n-i+1
			v1 = $('#cell_' + i + j).html()
			v2 = $('#cell_' + (i + 1) + (j - 1)).html()					
		}
		if (v1 == '' || v2 == '') {
			break
		}
		if (v1 != v2) {
			break
		}
		else {
			if (i == n-1) { // ultima comparatie
				return true
			}
		}	

	}
}

var verify_draw = function() {
	for (var j = 1; j <= n; j++) 
		for (var i = 1; i <= n; i++) {
			if ($('#cell_' + i + j).html() == '') 
				return false 
		}
	return true
}

$(function() {
	
	create_board()
	resetgame()

	$('#restart').click(function() {
		resetgame()
	})
	
	$('.gametable tr>td').click(function() {
		if($(this).html() != '') return
		if($('#msg').html() != '') return		

		$(this).html(nextmove)	
		nextmove = (nextmove=='X'?'0':'X')
		$('#nextmove').html(nextmove)
		$(this).html()
		
		if (
			verifyline('horizontal') || 
			verifyline('vertical') ||
			verifydiagonal('1st') ||
			verifydiagonal('2nd')
			) 
			$('#msg').html((nextmove == 'X'? '0':'X') + ' WINS!')		

		else if (verify_draw())
			$('#msg').html('Remiza')

		if ($('#msg').html() != '') {
			$('#restart').show()
			$('#nextmovemsg').hide()
		}
		else {
			$('#restart').hide()
			$('#nextmovemsg').show()
		}
	})
})

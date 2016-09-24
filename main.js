var nextmove = 'X'
var n = 3

var resetgame = function (){
	$('.gametable tr>td').html('')
	$('#msg').html('')
	nextmove = 'X'
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
					$('#msg').html('Ai $$$')
					alert(i + '' + j)
					return
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
				$('#msg').html('Ai $$$')
				
				return
			}
		}	

	}
}

$(function() {
	
	$('#restart').click(function() {
		resetgame()
	})
	
	$('.gametable tr>td').click(function() {
		if($(this).html() != '') return
		if($('#msg').html() != '') return		

		$(this).html(nextmove)	
		nextmove = (nextmove=='X'?'0':'X')
		$(this).html()
		
		verifyline('horizontal')
		verifyline('vertical')

		verifydiagonal('1st')
		verifydiagonal('2nd')		
	})
})

var n = 3
var nextmove // '0' or 'X'
var score={'X': 0, '0': 0}
// utility function to return the other move 
var othermove = function(move) {
	return move == 'X' ? '0' : 'X'
}

// create all the cells of the board table
var create_board = function() {
	var s = ''
	for (var j = 1; j <= n; j++) { // row iteration
		s = s + '<tr>'
		for (var i = 1; i <= n; i++) { // column iteration
			s = s + '<td id="cell_' + i + j + '"></td>'
		}
		s = s + '</tr>'
	}
	$('.gametable').html(s)
}

var resetgame = function() {
	$('.gametable tr>td').html('') // empty all the cells of the game board
	$('#msg').html('') // empty the message element
	$('#restart').hide() // hide the restart button
	nextmove = 'X' // initialize the value of nextmove 
	$('#nextmove').html(nextmove) // show the next move
	$('#nextmovemsg').show() // unhide the "who's turn is" message
	$('.winningline').hide()
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
				if (i == n-1) { // last comparison
					// return the winning row/column
					return [direction, j] 
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
				return [direction]
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
	return ['draw']
}

// returns [winning_way, row/column] | false
var verify_game = function() {
	return  verifyline('horizontal') ||
			verifyline('vertical') ||
			verifydiagonal('1st') ||
			verifydiagonal('2nd') ||
			verify_draw()
}

// $(function) runs a function after the document (html) is loaded 
// and all its elements are available.
$(function() {
	
	create_board()
	resetgame()

	// add a click handler to the restart button
	$('#restart').click(function() {
		resetgame()
	})
	
	// add click handler to each board cell
	$('.gametable tr>td').click(function() {
		
		// fast exit paths
		if($(this).html() != '') return // no clicking on non-empty cells
		if($('#msg').html() != '') return // no clicking if there's a message

		$(this).html(nextmove) // puts an 'X' or '0' on the cell's html	
		nextmove = othermove(nextmove) // set nextmove to the other move
		$('#nextmove').html(nextmove) // show the next move in the UI
		
		var r = verify_game()
		if (r) {
			var winning_way = r[0]
			var winning_line = r[1]
			if (winning_way == 'draw') {
				$('#msg').html('Draw')
			} 
			else {
				var winmove = othermove(nextmove)
				score[winmove]++
				$('#score_' + winmove).html(score[winmove])

				if (winning_way == 'horizontal') {
					$('.winningline')
						.show()
						.css({
							'top': (winning_line*100-50) +'px', 
							'left': '0px',
							'width': 300 + 'px',
							'-ms-transform': 'rotate(0deg)', /* IE 9 */
   							'-webkit-transform': 'rotate(0deg)', /* Safari */
							'transform': 'rotate(0deg)'								
						})

				} 

				else if (winning_way == 'vertical') {
					$('.winningline')
						.show()
						.css({
							'top': (150) +'px',
							'left': (winning_line*100-200) +'px',
							'width': 300 + 'px',
							'-ms-transform': 'rotate(90deg)', /* IE 9 */
   							'-webkit-transform': 'rotate(90deg)', /* Safari */
							'transform': 'rotate(90deg)'
						})
				}
				else if (winning_way == '1st') {
					$('.winningline')
						.show()
						.css({
							'top': '150px',
							'left': '-55px',
							'width': (300*Math.sqrt(2)) + 'px',
							'-ms-transform': 'rotate(45deg)', /* IE 9 */
   							'-webkit-transform': 'rotate(45deg)', /* Safari */
							'transform': 'rotate(45deg)'								
						})
				}
				else if (winning_way == '2nd') {
					$('.winningline')
						.show()
						.css({
							'top': '150px',
							'left': '-65px',
							'width': (300*Math.sqrt(2)) + 'px',
							'-ms-transform': 'rotate(-45deg)', /* IE 9 */
   							'-webkit-transform': 'rotate(-45deg)', /* Safari */
							'transform': 'rotate(-45deg)'								
						})


				}
				$('#msg').html(othermove(nextmove) + ' WINS!')
			}
		}

		// update the UI based on game state which might have just changed
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

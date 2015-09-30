//file name enginegamebase.js

function engineGame(options)
		loadPgn: (pgn)                  --pgn file unshina
		reset: ()												--table reset hiine
		setAggressiveness: (value)			--
		setContempt: (contempt)					--
		setDepth: (depth)								--
		setDisplayScore: (flag)					--
		setNodes: (nodes)								--
		setPlayerColor: (color)					--
		setSkillLevel: (skill)					--
		setTime: (baseTime, inc)				--	
		start: ()												--
		undo: ()												--


	uciCmd()   --ruu buh messagee ywuulaad uciCmd() n stockfish-n postMessage-r haruuldag

	onDragStart            --shatariin neg piece barih uyd duudagdah listener   
	displayStatus    
	displayClock
	updateClock
	clockTick
	stopClock
	startClock
	prepareMove

	stockfishengine.onmessage = function(event)

	onDrop								--piece tawih uyd duudagdah listener nuuh bolomjgui gazarluu nuusen ch duudagdna
	onSnapEnd							--nuudeliig amjilta nuuj duussan uyd duudagdah listener

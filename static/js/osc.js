var osc = {
	paths: {
		absolutes: '/muse/elements/',
		raw: '/muse/eeg'
	},
	references: {
		delta: 'delta_absolute',
		theta: 'theta_absolute',
		alpha: 'alpha_absolute',
		beta: 'beta_absolute',
		gamma: 'gamma_absolute'
	},
	data: {
		delta: null,
		theta: null,
		alpha: null,
		beta: null,
		gamma: null
	}
};

function runSocket() {

	var socket = io('http://localhost:3000');

	socket.on('connect', function(){
		console.log('Back-end is connected!');
	});

	socket.on('osc-test', function(msg){
		console.log(msg);
	});

	socket.on('osc', function(msg){

		if (msg.elements[0].address == osc.paths.absolutes + osc.references.delta) {
			osc.data.delta = msg.elements[0].args[0].value;
		}

		if (msg.elements[0].address == osc.paths.absolutes + osc.references.theta) {
			osc.data.theta = msg.elements[0].args[0].value;
		}

		if (msg.elements[0].address == osc.paths.absolutes + osc.references.alpha) {
			osc.data.alpha = msg.elements[0].args[0].value;
		}

		if (msg.elements[0].address == osc.paths.absolutes + osc.references.beta) {
			osc.data.beta = msg.elements[0].args[0].value;
		}

		if (msg.elements[0].address == osc.paths.absolutes + osc.references.gamma) {
			osc.data.gamma = msg.elements[0].args[0].value;
		}

	});
}

runSocket()

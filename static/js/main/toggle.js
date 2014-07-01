function toggleDisplay(e) {
  document.getElementById(e).style.visibility = "visible";
  if(document.getElementById(e).style.display == "none" ) {
    document.getElementById(e).style.display = "";
  }
  else {
    document.getElementById(e).style.display = "none";
  }
  if(e == "bandselect") {
  	if ($("#special").attr('src') == "/static/images/collapse.png") {
  		$("#special").attr("src","/static/images/expand.png");
  	}
  	else {
  		$("#special").attr("src","/static/images/collapse.png");
  	}
  }
}
function toggleVisibility(e) {
  document.getElementById(e).style.display = "";
  if(document.getElementById(e).style.visibility == "hidden" ) {
    document.getElementById(e).style.visibility = "visible";
  }
  else {
  document.getElementById(e).style.visibility = "hidden";
  }
}
var zoomed = false;

function toggle(button) {

	x3d_element = document.getElementById('x3d_element');
	container  = document.getElementById('x3d');
	slider  = document.getElementsByClassName('values');

	if (zoomed) {
	  new_width = '700px';
	  new_height = '645px';
	  button.innerHTML = "FULLSCREEN";
	  container.style.top = ''
	  container.style.left = ''
	  container.style.height = ''
	  container.style.width = ''
	  slider[4].style.width = ''
	} else {
	  new_height = ($(window).height()-115)+'px';
	  new_width = ($(window).width()-25)+'px';
	  button.innerHTML = "MINIMIZE";
	  container.style.top = '0px'
	  container.style.left = '0px'
	  container.style.height = ($(window).height()-20)+'px'
	  container.style.width = ($(window).width()-20)+'px'
	  slider[4].style.width = ($(window).width()-35)+'px'
	}

	zoomed = !zoomed;

	x3d_element.style.width = new_width;
	x3d_element.style.height = new_height;
}

function toggle2(button) {

	chartPlace = document.getElementById('chartPlace');
	histPlace  = document.getElementById('histPlace');
	crossPlace  = document.getElementById('crossPlace');
	spectrum =  document.getElementById('spectra');

	if (zoomed) {
	  new_width = ($(window).width() * 0.25) + 'px';
	  new_height = ($(window).height() * 0.45) + 'px';
	  button.innerHTML = "ZOOM";
	  spectrum.style.top = ''
	  spectrum.style.left = ''
	  spectrum.style.width = ($(window).width() * 0.255) + 'px'

	} else {
	  new_height = ($(window).height()-100)+'px';
	  new_width = ($(window).width()-65)+'px';
	  button.innerHTML = "UNZOOM";
	  spectrum.style.top = '0'
	  spectrum.style.left = '0'
	  spectrum.style.width = ($(window).width()-45) + 'px'
	}

	zoomed = !zoomed;

	chartPlace.style.width = new_width;
	chartPlace.style.height = new_height;
	histPlace.style.width = new_width;
	histPlace.style.height = new_height;
	crossPlace.style.width = new_width;
	crossPlace.style.height = new_height;
	if (typeof spectra != 'undefined') spectra.replot();
	if (typeof hist != 'undefined') hist.replot();
	if (typeof cross != 'undefined') cross.replot();
}

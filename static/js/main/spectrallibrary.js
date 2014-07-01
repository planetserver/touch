function initspectrallibrary()
    {
    $('#loadlibrary').click(function(e) {
        var library = $('#spectrallibrary').val();
        if (library == "selectlibrary") {
            alert("Please select one of the libraries before clicking on the load button.");
        }
        else
            {
            var libspectra = $('#selectspectra[name=' + library + ']').val();
            if(libspectra == undefined)
                {
                // first load the corresponding js file
                var file = '/static/js/speclib/' + library+'.js';
                $.getScript(file)
                .done(function(){
                    eval('data = ' + library + ';');
                    var html = '';
                    for (var key in data)
                        {
                        if(key != "Wavelength")
                            {
                            html += '<option value="' + key + '">' + key + '</option>';
                            }
                        }
                    var libraryselect = '<select name="' + library + '" id="selectspectra" size=1>' + html + '</select>';
                    $("#afterload").html(libraryselect);
                })
                .fail(function(){
                alert("Error loading the file.");
                });
                }
            else
                {
                var numbers = [];
                eval('data = ' + library + ';');
                wavelength = data["Wavelength"];
                values = data[libspectra];
                for(var i = 0; i < wavelength.length; i++){
                    numbers.push([wavelength[i], values[i]]);
                }
                var output = [];
                var tempcolors = [];
                for (i=0; i < pos; i++) {
                    output.push(hsdataset.point[i].spectrum);
                    tempcolors.push(colors[i]);
                }
                tempcolors.push("Black");
                output.push(numbers);
                spectrum_load(output,tempcolors,libspectra);
                }
            }
     });
    }

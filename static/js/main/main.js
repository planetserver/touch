jQuery(document).ready(function(){
        //initloader(); //main_loader.js
        // initdownloadify(); //downloadify.js
        //initspectrallibrary(); //spectrallibrary.js   
        initloadhs(); //loadhs.js
        initloadregion(); //loadregion.js
        // initconsole(); //wcpsconsole.js
        //inittabs(); //gui.js
        //resizecss(); //gui.js
        resizeMap(); //gui.js
        //initdragwindows(); //gui.js
        initmap(); //planetmap.js
        //inittoc(); //toc.js
        initmapevents(); //planetmap.events.js
        //initguievents(); //gui.js
        //initpanels(); //planetmap.js
        initvectors(); //planetmap.js

        initMobileUI();
        checksinglecollection(); //urlquery.js
        checkregion(); //urlquery.js
        checkmrdr(); //urlquery.js
        checklonlat(); //urlquery.js
        initSpectralAnalysis();
      });
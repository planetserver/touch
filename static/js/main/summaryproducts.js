var sp;
function checkpredef(string) {
    if(string == sp.olindex)
        {
        return "OLINDEX";
        }
    else if(string == sp.olindex2)
        {
        return "OLINDEX2";
        }
    else if(string == sp.lcpindex)
        {
        return "LCPINDEX";
        }
    else if(string == sp.hcpindex)
        {
        return "HCPINDEX";
        }
    else if(string == sp.bd530)
        {
        return "BD530";
        }
    else if(string == sp.bd860)
        {
        return "BD860";
        }
    else if(string == sp.bd920)
        {
        return "BD920";
        }
    else if(string == sp.bd2100)
        {
        return "BD2100";
        }
    else if(string == sp.bd2200)
        {
        return "BD2200";
        }
    else if(string == sp.bd1900r)
        {
        return "BD1900R";
        }
    else if(string == sp.d2300)
        {
        return "D2300";
        }
    else if(string == sp.sindex)
        {
        return "SINDEX";
        }
    else if(string == sp.bd1980)
        {
        return "BD1980";
        }
    else if(string == sp.doub2200)
        {
        return "DOUB2200";
        }
    else if(string == sp.bd2230)
        {
        return "BD2230";
        }
    else if(string == sp.bd2500)
        {
        return "BD2500";
        }
    else if(string == sp.irr3)
        {
        return "IRR3";
        }
    else if(string == sp.bd2700)
        {
        return "BD2700";
        }
    else if(string == sp.r2700)
        {
        return "R2700";
        }
    else if(string == sp.irr2)
        {
        return "IRR2";
        }
    else if(string == sp.bd2600)
        {
        return "BD2600";
        }
    else if(string == sp.bd2350)
        {
        return "BD2350";
        }
    else if(string == sp.bd2000co2)
        {
        return "BD2000CO2";
        }
    else if(string == sp.bd1400h2o)
        {
        return "BD1400H2O";
        }
    else if(string == sp.bd1270o2)
        {
        return "BD1270O2";
        }
    else if(string == sp.cindex)
        {
        return "CINDEX";
        }
    else if(string == sp.bd3400)
        {
        return "BD3400";
        }
    else if(string == sp.bd3200)
        {
        return "BD3200";
        }
    else if(string == sp.bd3100)
        {
        return "BD3100";
        }
    else if(string == sp.bd3000)
        {
        return "BD3000";
        }
    else if(string == sp.bdcarb)
        {
        return "BDCARB";
        }
    else if(string == sp.icer2)
        {
        return "ICER2";
        }
    else if(string == sp.bd1900)
        {
        return "BD1900";
        }
    else if(string == sp.bd1750)
        {
        return "BD1750";
        }
    else if(string == sp.icer1)
        {
        return "ICER1";
        }
    else if(string == sp.bd1500)
        {
        return "BD1500";
        }
    else if(string == sp.bd1435)
        {
        return "BD1435";
        }
    else if(string == sp.islope1)
        {
        return "ISLOPE1";
        }
    else if(string == sp.ira)
        {
        return "IRA";
        }
    else if(string == sp.r770)
        {
        return "R770";
        }
    else if(string == sp.rbr)
        {
        return "RBR";
        }
    else if(string == sp.sh600)
        {
        return "SH600";
        }
    else if(string == sp.bd640)
        {
        return "BD640";
        }
    else
        {
        return string;
        }
}
function nm2band(nm, nr)
    {
    nr = (typeof nr === "undefined") ? 0 : nr;
    // Similar as mro_crism_lookupwv.pro
    data = hsdataset.metadata.wavelength;
    bandnr = 0;
    j = 0;
    mm = nm / 1000;
    for(var j = 0; j < data.length; j++)
        {
        if(data[j] >= mm)
            {
            if(bandnr == 0)
                {
                bandnr = j;
                }
            }
        }
    // Take band with minimum distance from mm:
    if(Math.abs(data[(bandnr - 1)] - mm) <= Math.abs(data[bandnr] - mm))
        {
        bandnr = (bandnr - 1);
        }
    if(nr == 1)
        {
        return bandnr
        }
    else
        {
        return 'data.' + bandnr;
        }
    }
function nm2wavelength(nm) {
    // Similar as mro_crism_lookupwv.pro
    data = hsdataset.metadata.wavelength;
    bandnr = 0;
    j = 0;
    mm = nm / 1000;
    for(var j = 0; j < data.length; j++)
        {
        if(data[j] >= mm)
            {
            if(bandnr == 0)
                {
                bandnr = j;
                }
            }
        }
    // $.each(data, function(i, item){
        // if(data[i] >= mm)
            // {
            // if(bandnr == 0) {
                // bandnr = j;
            // }
            // }
        // j++
    // });
    // Take band with minimum distance from mm:
    if(Math.abs(data[(bandnr - 1)] - mm) <= Math.abs(data[bandnr] - mm))
        {
        //band = "band" + bandnr
        return hsdataset.metadata.wavelength[bandnr - 1];
        }
    else
        {
        //band = "band" + (bandnr + 1);
        return hsdataset.metadata.wavelength[bandnr];
        }                
}
// rgbolh
// function rgbolh()
    // {
    // var R1330 = nm2band(1330);
    // var R1695 = nm2band(1695);
    // var R1080 = nm2band(1080);
    // var R1210 = nm2band(1210);
    // var R1470 = nm2band(1470);
    // red = '(' + R1695 + ' / (0.1*' + R1080 + ' + 0.1*' + R1210 + ' + 0.4*' + R1330 + ' + 0.4*' + R1470 + ' ) ) - 1';
    // var R1815 = nm2band(1815);
    // green = '100 * ( ( ' + R1330 + ' - ' + R1080 + ' ) / ( ' + R1330 + ' + ' + R1080 + ' )) * ( ( ' + R1330 + ' - ' + R1815 + ' ) / ( ' + R1330 + ' + ' + R1815 + ' ) )';
    // var R2067 = nm2band(2067);
    // blue = '100 * ( ( ' + R1470 + ' - ' + R1080 + ' ) / ( ' + R1470 + ' + ' + R1080 + ' )) * ( ( ' + R1470 + ' - ' + R2067 + ' ) / ( ' + R1470 + ' + ' + R2067 + ' ) )';
    // rgbimage(red,green,blue);
    // }

// simple band depth
function banddepth(low, center, high)
    {
    var RLow = nm2band(low);
    var WL = nm2wavelength(low);
    var RCenter = nm2band(center);
    var WC = nm2wavelength(center);
    var RHigh = nm2band(high);
    var WH = nm2wavelength(high);
    a = (WC-WL)/(WH-WL);
    b = 1 - a;
    string = '(1 - (' + RCenter + ' / ((' + b + ' * ' + RLow + ') + (' + a + ' * ' + RHigh + '))))';
    return string;
    }

function initsp()
    {
    // olindex
    var R1080 = nm2band(1080);
    var R1210 = nm2band(1210);
    var R1330 = nm2band(1330);
    var R1470 = nm2band(1470);
    var R1695 = nm2band(1695);
    var olindex = '(' + R1695 + ' / (0.1*' + R1080 + ' + 0.1*' + R1210 + ' + 0.4*' + R1330 + ' + 0.4*' + R1470 + ' ) ) - 1';

    // olindex2
    var R2404 = nm2band(2404);
    var R2397 = nm2band(2397);
    var R2410 = nm2band(2410);

    var R1750 = nm2band(1750);
    var R1744 = nm2band(1744);
    var R1757 = nm2band(1757);

    var R1054 = nm2band(1054);
    var R1047 = nm2band(1047);
    var R1060 = nm2band(1060);

    var R1211 = nm2band(1211);
    var R1204 = nm2band(1204);
    var R1218 = nm2band(1218);

    var R1329 = nm2band(1329);
    var R1326 = nm2band(1326);
    var R1336 = nm2band(1336);

    var R1474 = nm2band(1474);
    var R1467 = nm2band(1467);
    var R1480 = nm2band(1480);

    var AVG2404 = '((' + R2404 + ' + ' + R2397 + ' + ' + R2410 + ') / 3)';
    var AVG1750 = '((' + R1750 + ' + ' + R1744 + ' + ' + R1757 + ') / 3)';
    var AVG1054 = '((' + R1054 + ' + ' + R1047 + ' + ' + R1060 + ') / 3)';
    var AVG1211 = '((' + R1211 + ' + ' + R1204 + ' + ' + R1218 + ') / 3)';
    var AVG1329 = '((' + R1329 + ' + ' + R1326 + ' + ' + R1336 + ') / 3)';
    var AVG1474 = '((' + R1474 + ' + ' + R1467 + ' + ' + R1480 + ') / 3)';

    ////Slope of the continuum
    var contm = '((' + AVG2404 + ' - ' + AVG1750 + ') / (2.404 - 1.750))';

    ////y-intercept of the continuum
    var yint = '(' + AVG2404 + ' - (2.404 * ' + contm + '))';

    ////Expected values at 1.054, 1.211, 1.329, and 1.474 microns, respectively
    var ex1054 = '((' + contm + ' * 1.054) + ' + yint + ')';
    var ex1211 = '((' + contm + ' * 1.211) + ' + yint + ')';
    var ex1329 = '((' + contm + ' * 1.329) + ' + yint + ')';
    var ex1474 = '((' + contm + ' * 1.474) + ' + yint + ')';

    ////Calculated band depths at 1.054, 1.211, 1.329, and 1.474 microns, respectively, with weights
    var olindex2 = '(((' + ex1054 + ' - ' + AVG1054 + ') / ' + ex1054 + ') * 0.1) + (((' + ex1211 + ' - ' + AVG1211 + ') / ' + ex1211 + ') * 0.1) + (((' + ex1329 + ' - ' + AVG1329 + ') / ' + ex1329 + ') * 0.4) + (((' + ex1474 + ' - ' + AVG1474 + ') / ' + ex1474 + ') * 0.4)';

    // lcpindex
    var R1080 = nm2band(1080);
    var R1330 = nm2band(1330);
    var R1815 = nm2band(1815);
    var lcpindex = '100 * ( ( ' + R1330 + ' - ' + R1080 + ' ) / ( ' + R1330 + ' + ' + R1080 + ' )) * ( ( ' + R1330 + ' - ' + R1815 + ' ) / ( ' + R1330 + ' + ' + R1815 + ' ) )';

    //hcpindex
    var R1080 = nm2band(1080);
    var R1470 = nm2band(1470);
    var R2067 = nm2band(2067);
    var hcpindex = '100 * ( ( ' + R1470 + ' - ' + R1080 + ' ) / ( ' + R1470 + ' + ' + R1080 + ' )) * ( ( ' + R1470 + ' - ' + R2067 + ' ) / ( ' + R1470 + ' + ' + R2067 + ' ) )';

    // bd530
    var bd530 = banddepth(440, 530, 709);

    // bd860
    var bd860 = banddepth(800, 860, 984);

    // bd920
    var bd920 = banddepth(800, 920, 984);

    // bd2100
    R1930 = nm2band(1930);
    R2120 = nm2band(2120);
    R2140 = nm2band(2140);
    R2250 = nm2band(2250);
    WL = nm2wavelength(1930);
    WC = (nm2wavelength(2120) + nm2wavelength(2140))*0.5;
    WH = nm2wavelength(2250);
    a2100 = (WC-WL)/(WH-WL);
    b2100 = 1 - a2100;
    var bd2100 = '(1 - ( ( (' + R2120 + ' + ' + R2140 + ' ) * 0.5 ) / ( (' + b2100 + ' * ' + R1930 + ') + (' + a2100 + ' * ' + R2250 + ') ) ))';

    // bd2200
    R2132 = nm2band(2132);
    R2146 = nm2band(2146);
    R2199 = nm2band(2199);
    R2205 = nm2band(2205);
    R2252 = nm2band(2252);
    R2258 = nm2band(2258);
    var bd2200 = '(1 - (((' + R2199 + ' + ' + R2205 + ') * 2.0 ) / (' + R2132 + ' + ' + R2146 + ' + ' + R2252 + ' + ' + R2258 + ' ) ))';

    //bd1900r
    R1908 = nm2band(1908);
    R1914 = nm2band(1914);
    R1921 = nm2band(1921);
    R1928 = nm2band(1928);
    R1934 = nm2band(1934);
    R1941 = nm2band(1941);
    R1862 = nm2band(1862);
    R1869 = nm2band(1869);
    R1875 = nm2band(1875);
    R2112 = nm2band(2112);
    R2120 = nm2band(2120);
    R2126 = nm2band(2126);
    var bd1900r = '(1 -(((' + R1908 + ' + ' + R1914 + ' + ' + R1921 + ' + ' + R1928 + ' + ' + R1934 + ' + ' + R1941 + ')) / (' + R1862 + ' + ' + R1869 + ' + ' + R1875 + ' + ' + R2112 + ' + ' + R2120 + ' + ' + R2126 + ' ) ))';

    //sindex
    R2100 = nm2band(2100);
    R2400 = nm2band(2400);
    R2290 = nm2band(2290);
    var sindex = '(1 - ( (' + R2100 + ' + ' + R2400 + ') / ( 2 * ' + R2290 + ') ))';

    //d2300
    R1815 = nm2band(1815);
    R2530 = nm2band(2530);
    R2320 = nm2band(2320);
    W2320 = nm2wavelength(2320);
    R2170 = nm2band(2170);
    W2170 = nm2wavelength(2170);
    R2120 = nm2band(2120);
    R2290 = nm2band(2290);
    R2350 = nm2band(2350);
    R2330 = nm2band(2330);
    R2210 = nm2band(2210);
    a2300 = nm2wavelength(2530);
    b2300 = nm2wavelength(1815);
    slope = '((' + R2530 + ' - ' + R1815 + ') / (' + a2300 + ' - ' + b2300 + '))';
    CR2290 = '(' + R1815 + ' + ' + slope + ' * (' + nm2wavelength(2290) + ' - ' + b2300 + '))';
    CR2320 = '(' + R1815 + ' + ' + slope + ' * (' + nm2wavelength(2320) + ' - ' + b2300 + '))';
    CR2330 = '(' + R1815 + ' + ' + slope + ' * (' + nm2wavelength(2330) + ' - ' + b2300 + '))';
    CR2120 = '(' + R1815 + ' + ' + slope + ' * (' + nm2wavelength(2120) + ' - ' + b2300 + '))';
    CR2170 = '(' + R1815 + ' + ' + slope + ' * (' + nm2wavelength(2170) + ' - ' + b2300 + '))';
    CR2210 = '(' + R1815 + ' + ' + slope + ' * (' + nm2wavelength(2210) + ' - ' + b2300 + '))';
    var d2300 = '(1 - ( ((' + R2290 + ' / ' + CR2290 + ') + (' + R2320 + ' / ' + CR2320 + ') + (' + R2330 + ' / ' + CR2330 + ')) / ((' + R2120 + ' / ' + CR2120 + ') + (' + R2170 + ' / ' + CR2170 + ') + (' + R2210 + ' / ' + CR2210 + ')) ))';

    // bd1980
    R1921 = nm2band(1921);
    R1980 = nm2band(1980);
    R1987 = nm2band(1987);
    R2040 = nm2band(2040);
    var bd1980 = '(1 - (((' + R1980 + ' + ' + R1987 + ')) / (' + R1921 + ' + ' + R2040 + ' ) ))';
        
    // Doub2200
    R2172 = nm2band(2172);
    R2205 = nm2band(2205);
    R2258 = nm2band(2258);
    R2311 = nm2band(2311);
    var doub2200 = '(1 - ((' + R2205 + ' + ' + R2258 + ') / (' + R2172 + ' + ' + R2311 + ') ))';

    // bd2230
    R2231 = nm2band(2231);
    R2258 = nm2band(2258);
    R2251 = nm2band(2251);
    R2212 = nm2band(2212);
    R2198 = nm2band(2198);
    WL1 = nm2wavelength(2212);
    WL2 = nm2wavelength(2198);
    WC = nm2wavelength(2231);
    WH1 = nm2wavelength(2258);
    WH2 = nm2wavelength(2251);
    b = (WC-(WL1+WL2)/2)/((WH1+WH2)/2-(WL1+WL2)/2);
    a = 1 - b;
    var bd2230 = '(1 - ( ' + R2231 + ' / ( ' + a + ' * (' + R2212 + ' + ' + R2198 + ') / 2 + ' + b + ' * (' + R2258 + '+ ' + R2251 + ') / 2 ) ))';

    // bd2500
    R2380 = nm2band(2380);
    R2500 = nm2band(2500);
    R2510 = nm2band(2510);
    R2540 = nm2band(2540);
    var bd2500 = '(1 - ( (' + R2500 + ' + ' + R2510 + ') / ( ' + R2540 + ' + ' + R2380 + ' ) ))';

    // CINDEX
    R3630 = nm2band(3630);
    a = nm2wavelength(3630)/1000;
    b = nm2wavelength(3750);
    c = nm2wavelength(3920);
    R3750 = nm2band(3750);
    R3920 = nm2band(3920);
    var cindex = '(((' + R3750 + ' + ((' + R3750 + '-' + R3630 + ')/(' + b + ' - ' + a + ')) * (' + c + ' - ' + b + ')) / ' + R3920 + ') - 1)';

    // BD3400
    R3250 = nm2band(3250);
    R3390 = nm2band(3390);
    R3500 = nm2band(3500);
    R3630 = nm2band(3630);
    WL = nm2wavelength(3250);
    WC = (nm2wavelength(3390) + nm2wavelength(3500)) * 0.5;
    WH = nm2wavelength(3630);
    c = (WC-WL)/(WH-WL);
    d = 1-c;
    var bd3400 = '(1 - ( ( ' + R3390 + ' + ' + R3500 + ' ) * 0.5 / ( ' + d + ' * ' + R3250 + ' + ' + c + ' * ' + R3630 + ' ) ))';

    // BD3200
    R3250 = nm2band(3250);
    R3320 = nm2band(3320);
    R3390 = nm2band(3390);
    WL = nm2wavelength(3250);
    WC = nm2wavelength(3320);
    WH = nm2wavelength(3390);
    a = (WC-WL)/(WH-WL);
    b = 1-a;
    var bd3200 = '(1 - ( ' + R3320 + ' / ( ' + b + ' * ' + R3250 + ' + ' + a + ' * ' + R3390 + ' ) ))';

    // BD3100
    R3000 = nm2band(3000);
    R3120 = nm2band(3120);
    R3250 = nm2band(3250);
    WL = nm2wavelength(3000);
    WC = nm2wavelength(3120);
    WH = nm2wavelength(3250);
    a = (WC-WL)/(WH-WL);
    b = 1-a;
    var bd3100 = '(1 - ( ' + R3120 + ' / ( ' + b + ' * ' + R3000 + ' + ' + a + ' * ' + R3250 + ' ) ))';

    // BD3000
    R2210 = nm2band(2210);
    R2530 = nm2band(2530);
    R3000 = nm2band(3000);
    var bd3000 = '(1 - ( ' + R3000 + ' / ( ' + R2530 + ' * ( ' + R2530 + ' / ' + R2210 + ' ) ) ))';

    // BDCARB
    R2330 = nm2band(2330);
    R2390 = nm2band(2390);
    R2530 = nm2band(2530);
    R2600 = nm2band(2600);
    R2230 = nm2band(2230);
    WL1 = nm2wavelength(2230);
    WC1 = (nm2wavelength(2330)+nm2wavelength(2120))*0.5;
    WH1 = nm2wavelength(2390);
    a = (WC1-WL1)/(WH1-WL1);
    b = 1-a;
    WL2 = nm2wavelength(2390);
    WC2 = (nm2wavelength(2530)+nm2wavelength(2120))*0.5;
    WH2 = nm2wavelength(2600);
    c = (WC2-WL2)/(WH2-WL2);
    d = 1-c;
    var bdcarb = '(1 - ( sqrt( ( ' + R2330 + ' / ( ' + b + ' * ' + R2230 + ' + ' + a + ' * ' + R2390 + ' ) ) * ( ' + R2530 + ' / ( ' + d + ' * ' + R2230 + ' + ' + c + ' * ' + R2600 + ' ) ) ) ))';

    // ICER2
    R2530 = nm2band(2530);
    R2600 = nm2band(2600);
    var icer2 = '(' + R2530 + ' / ' + R2600 + ')';

    // BD1900
    R1973 = nm2band(1973);
    R1927 = nm2band(1927);
    R2006 = nm2band(2006);
    R1874 = nm2band(1874);
    var bd1900 = '(1 - (' + R1973 + ' + ' + R1927 + ') / (' + R2006 + ' + ' + R1874 + '))';

    // BD1750
    R1815 = nm2band(1815);
    R1750 = nm2band(1750);
    R1557 = nm2band(1557);		
    WL = nm2wavelength(1557);
    WC = nm2wavelength(1750);
    WH = nm2wavelength(1815);
    a = (WC-WL)/(WH-WL);
    b = 1-a;
    var bd1750 = '(1 - ( ' + R1750 + ' / ( ' + b + ' * ' + R1557 + ' + ' + a + ' * ' + R1815 + ' ) ))';

    // ICER1
    R1430 = nm2band(1430);
    R1510 = nm2band(1510);
    var icer1 = '(' + R1510 + ' / ' + R1430 + ')';

    // BD1500
    R1558 = nm2band(1558);
    R1505 = nm2band(1505);
    R1808 = nm2band(1808);
    R1367 = nm2band(1367);
    var bd1500 = '(1 - (' + R1558 + ' + ' + R1505 + ') / (' + R1808 + ' + ' + R1367 + '))';

    // BD1435
    R1470 = nm2band(1470);
    R1430 = nm2band(1430);
    R1370 = nm2band(1370);
    WL = nm2wavelength(1370);
    WC = nm2wavelength(1430);
    WH = nm2wavelength(1470);
    a = (WC-WL)/(WH-WL);
    b = 1-a;
    var bd1435 = '(1 - ( ' + R1430 + ' / ( ' + b + ' * ' + R1370 + ' + ' + a + ' * ' + R1470 + ' ) ))';

    // ISLOPE1
    R1815 = nm2band(1815);
    R2530 = nm2band(2530);
    W2530 = nm2wavelength(2530)/1000;
    W1815 = nm2wavelength(1815)/1000;
    var islope1 = '(( ' + R1815 + ' - ' + R2530 + ' ) /  ( ' + W2530 + ' - ' + W1815 + ' ))';

    // IRA
    R1330 = nm2band(1330);
    var ira = '(' + R1330 + ')';

    // BD640
    R600 = nm2band(600);
    R709 = nm2band(709);
    R648 = nm2band(648);
    WL = nm2wavelength(600);
    WC = nm2wavelength(648);
    WH = nm2wavelength(709);
    a = (WC-WL)/(WH-WL);
    b = 1-a;
    var bd640 = '(1 - ( ' + R648 + ' /  (' + b + ' * ' + R600 + ' + ' + a + ' * ' + R709 + ' ) ))';

    // SH600
    R533 = nm2band(533);
    R600 = nm2band(600);
    R710 = nm2band(710);
    WL = nm2wavelength(533);
    WC = nm2wavelength(600);
    WH = nm2wavelength(710);
    a = (WC-WL)/(WH-WL);
    b = 1-a;
    var sh600 = '(1 - ((' + b + ' * ' + R533 + ' + ' + a + ' * ' + R710 + ') / ' + R600 + '))';

    // RBR
    R770 = nm2band(770);
    R440 = nm2band(440);
    var rbr = '(' + R770 + ' / ' + R440 + ')';

    // R770
    R770 = nm2band(770);
    var r770 = '(' + R770 + ')';

    //
    // PARAMETERS FOR IR NON-ATMOSPHERICALLY-CORRECTED CALIBRATED DATA
    //

    // IRR3
    R3500 = nm2band(3500);
    R3390 = nm2band(3390);
    var irr3 = '(' + R3500 + ' / ' + R3390 + ')';

    // BD2700
    R2694 = nm2band(2694);
    R2530 = nm2band(2530);
    R2350 = nm2band(2350);
    var bd2700 = '(1 - ( ' + R2694 + ' / ( ' + R2530 + ' * ( ' + R2530 + ' / ' + R2350 + ' ) ) ))';

    // R2700
    R2694 = nm2band(2694);
    var r2700 = '(' + R2694 + ')';

    // IRR2
    R2210 = nm2band(2210);
    R2530 = nm2band(2530);
    var irr2 = '(' + R2530 + ' / ' + R2210 + ')';

    // BD2600
    R2530 = nm2band(2530);
    R2600 = nm2band(2600);
    R2630 = nm2band(2630);
    WL = nm2wavelength(2530);
    WC = nm2wavelength(2600);
    WH = nm2wavelength(2630);
    a = (WC-WL)/(WH-WL)
    b = 1-a
    var bd2600 = '(1 - ( ' + R2600 + ' / ( ' + b + ' * ' + R2530 + ' + ' + a + ' * ' + R2630 + ' ) ))';

    // BD2350
    LAMB = 2320
    R2320 = nm2band(LAMB);
    R2330 = nm2band(2330);
    R2350 = nm2band(2350);
    R2290 = nm2band(2290);
    R2430 = nm2band(2430);
    WL = nm2wavelength(2290);
    WC = (nm2wavelength(2320) + nm2wavelength(2330) + nm2wavelength(2350))*0.33333
    WH = nm2wavelength(2430);
    a = 0.33333
    b = 0.33333
    c = 0.33333
    d = (WC-WL)/(WH-WL)
    ee = 1-d
    var bd2350 = '(1-( ( ' + a + ' * ' + R2320 + ' + ' + b + ' * ' + R2330 + ' + ' + c + ' * ' + R2350 + ' ) / ( ' + ee + ' * ' + R2290 + ' + ' + d + ' * ' + R2430 + ' ) ))';

    // BD2000CO2
    R1815 = nm2band(1815);
    LAMB = 2170
    R2170 = nm2band(LAMB);
    R2010 = nm2band(2010);
    WL = nm2wavelength(1815);
    WC = nm2wavelength(2010);
    WH = nm2wavelength(LAMB);
    a = (WC-WL)/(WH-WL)
    b = 1-a
    var bd2000co2 = '(1 - ( ' + R2010 + ' / ( ' + b + ' * ' + R1815 + ' + ' + a + ' * ' + R2170 + ' ) ))';

    // BD1400H2O
    R1330 = nm2band(1330);
    R1370 = nm2band(1370);
    R1510 = nm2band(1510);
    R1400 = nm2band(1400);
    WL = nm2wavelength(1330);
    WC = (nm2wavelength(1370)+nm2wavelength(1400))*0.5
    WH = nm2wavelength(1510);
    a = 0.5
    b = 0.5
    c = (WC-WL)/(WH-WL)
    d = 1-c
    var bd1400h2o = '(1-( ( ' + a + ' * ' + R1370 + ' + ' + b + ' * ' + R1400 + ' ) / ( ' + d + ' * ' + R1330 + ' + ' + c + ' * ' + R1510 + ' ) ))';

    // BD1270O2
    R1250 = nm2band(1250);
    R1261 = nm2band(1261);
    R1268 = nm2band(1268);
    R1280 = nm2band(1280);
    WL = nm2wavelength(1250);
    WC = (nm2wavelength(1261)+nm2wavelength(1268))*0.5
    WH = nm2wavelength(1280);
    a = 0.5
    b = 0.5
    c = (WC-WL)/(WH-WL)
    d = 1-c
    var bd1270o2 = '(1-( ( ' + a + ' * ' + R1261 + ' + ' + b + ' * ' + R1268 + ' ) / ( ' + d + ' * ' + R1250 + ' + ' + c + ' * ' + R1280 + ' ) ))';
    //
    // END
    //

    sp = {"olindex":olindex,"olindex2":olindex2,"lcpindex":lcpindex,"hcpindex":hcpindex,"bd530":bd530,"bd860":bd860,"bd920":bd920,"bd2100":bd2100,"bd2200":bd2200,"bd1900r":bd1900r,"d2300":d2300,"sindex":sindex,"bd1980":bd1980,"doub2200":doub2200,"bd2230":bd2230,"bd2500":bd2500,"irr3":irr3,"bd2700":bd2700,"r2700":r2700,"irr2":irr2,"bd2600":bd2600,"bd2350":bd2350,"bd2000co2":bd2000co2,"bd1400h2o":bd1400h2o,"bd1270o2":bd1270o2,"cindex":cindex,"bd3400":bd3400,"bd3200":bd3200,"bd3100":bd3100,"bd3000":bd3000,"bdcarb":bdcarb,"icer2":icer2,"bd1900":bd1900,"bd1750":bd1750,"icer1":icer1,"bd1500":bd1500,"bd1435":bd1435,"islope1":islope1,"ira":ira,"r770":r770,"rbr":rbr,"sh600":sh600,"bd640":bd640}
    }
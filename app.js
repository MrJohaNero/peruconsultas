var scraper = require("sunat-ruc-scraper2");
var express = require('express');
var app = express();
var jsdom = require("jsdom");

app.get('/ruc/consulta/:ruc', function (req, res) {
    res.setHeader("Content-Type", "text/json; charset=UTF-8;");
    var rucs = req.params.ruc.split(".");
    offlineruc(rucs[0], function (resr) {
        if (resr === "1") {
            scraper.getInformation(rucs, function (err, data) {
                if (err) {
                    res.end(JSON.stringify(err));
                } else {
                    res.end(JSON.stringify(data));
                }
            });
        } else {
            var a = {};
             
            if (resr === "-1") a.error = "RUC con tama\u00F1o inv\u00E1lido";
            if (resr === "0") a.error = "RUC no es v\u00E1lido";

            res.end(JSON.stringify(a));
        }
    });
});

app.get('/tipocambio/mes/:year/:month', function (req, res) {
    res.setHeader("Content-Type", "text/json; charset=UTF-8");
    var year = req.params.year;
    var month = req.params.month;

    url = 'http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias?mes=' + month + '&anho=' + year;
    var jsonred = [];

    jsdom.env(url, function (err, window) {
        var dias = window.document.getElementsByClassName("H3");
        var cambios = window.document.getElementsByClassName("tne10");

        var c = 0;
        for (var i = 0; i < dias.length; ++i) {
            jsonred.push({ dia: parseInt(dias[i].textContent.trim()), compra: cambios[c].textContent.trim(), venta: cambios[c + 1].textContent.trim() });
            c += 2;
        }
        res.end(JSON.stringify(jsonred));
    });
});

app.get('/tipocambio/actual', function (req, res) {
    res.setHeader("Content-Type", "text/json; charset=UTF-8");
    url = 'http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias';
    var jsonred = {};
    jsonred.dias = "";
    jsonred.compra = "";
    jsonred.venta = "";

    jsdom.env(url, function (err, window) {
        var dias = window.document.getElementsByClassName("H3");
        var cambios = window.document.getElementsByClassName("tne10");

        var c = 0;
        if (dias.length > 0) {
            jsonred.dias = (dias[dias.length - 1].textContent.trim());
            jsonred.compra = (cambios[cambios.length - 2].textContent.trim());
            jsonred.venta = (cambios[cambios.length - 1].textContent.trim());
            res.end(JSON.stringify(jsonred));
        } else {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;
            var year = dateObj.getUTCFullYear();
            url = 'http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias?mes=' + month + '&anho=' + year;
            jsdom.env(url, function (errr, windoww) {

                dias = windoww.document.getElementsByClassName("H3");
                cambios = windoww.document.getElementsByClassName("tne10");

                c = 0;
                for (var i = 0; i < dias.length; ++i) {
                    jsonred.dia = (dias[dias.length - 1].textContent.trim());
                    jsonred.compra = (cambios[cambios.length - 2].textContent.trim());
                    jsonred.venta = (cambios[cambios.length - 1].textContent.trim());
                    c += 2;
                }
                res.end(JSON.stringify(jsonred));
            });

        }
    });
});

app.get('/tipocambio/dia/:fecha', function (req, res) {
    res.setHeader("Content-Type", "text/json; charset=UTF-8");
    var fecha = req.params.fecha;
    var fechadet = [];
    fechadet = fecha.split('-');

    if (fechadet.length !== 3) {
        res.end('0|Fecha Incorrecta');
        return;
    }

    var year = fechadet[0];
    var month = fechadet[1];
    var day = (parseFloat(fechadet[2]) + 0) + '';

    url = 'http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias?mes=' + month + '&anho=' + year;
    var jsonred = {};
    jsonred.dias = "";
    jsonred.compra = "";
    jsonred.venta = "";

    jsdom.env(url, function (err, window) {
        var dias = window.document.getElementsByClassName("H3");
        var cambios = window.document.getElementsByClassName("tne10");
        var pos = -1;
        var c = 0;
        var adias = [],
            acompra = [],
            aventa = [];

        if (dias.length > 0) {

            for (var i = 0; i < dias.length; ++i) {
                adias.push(dias[i].textContent.trim())
                acompra.push(cambios[c].textContent.trim())
                aventa.push(cambios[c + 1].textContent.trim())
                c += 2;
            }

            pos = adias.indexOf(day);
            if (pos !== -1) {
                jsonred.dias = adias[pos];
                jsonred.compra = acompra[pos];
                jsonred.venta = aventa[pos];
                res.end(JSON.stringify(jsonred));
            } else {
                for (var j = 0; j < adias.length; ++j) {
                    if (parseFloat(adias[j]) < parseFloat(day)) {
                        pos = j;
                    } else {
                        j = adias.length + 1;
                    }
                }
                jsonred.dias = adias[pos];
                jsonred.compra = acompra[pos];
                jsonred.venta = aventa[pos];
                res.end(JSON.stringify(jsonred));
            }
        } else {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;
            var year = dateObj.getUTCFullYear();
            url = 'http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias?mes=' + month + '&anho=' + year;
            jsdom.env(url, function (errr, windoww) {

                dias = windoww.document.getElementsByClassName("H3");
                cambios = windoww.document.getElementsByClassName("tne10");

                c = 0;
                for (var i = 0; i < dias.length; ++i) {
                    jsonred.dias = (dias[dias.length - 1].textContent.trim());
                    jsonred.compra = (cambios[cambios.length - 2].textContent.trim());
                    jsonred.venta = (cambios[cambios.length - 1].textContent.trim());
                    c += 2;
                }
                res.end(JSON.stringify(jsonred));
            });

        }
    });
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Consuma el servicio en -> http://%s:%s", host, port);

});

function offlineruc(ruc, cb) {
    if (ruc.length === 11) {
        var d = ruc.substring(0, 2);
        var vt = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        var at = 0,
            f = 0,
            t = 0,
            r = 0,
            i = 0;
        if (d === '10' || d === '15' || d === '17' || d === '20') {
            for (i = 0; i < 10; ++i) {
                at = at + parseFloat(ruc.substring(i, i + 1)) * vt[i];
            }
            t = Math.trunc(at / 11);
            r = 11 - (at - (t * 11));
            f = String(r).substr(-1);
            if (f === ruc.substr(-1)) {
                cb("1");
            } else {
                cb("0");
            }
        } else {
            cb("0");
        }
    } else {
        cb("-1");
    }
}
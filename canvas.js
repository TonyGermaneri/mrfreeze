
function getData(rows, columns) {
    var data = [], x, y;
    for (x = 0; x < rows; x += 1) {
        data[x] = {};
        for (y = 0; y < columns; y += 1) {
            data[x][y] = x + ":" + y;
            //data[x][y] = '';
        }
    }
    return data;
}

document.addEventListener('DOMContentLoaded', function () {
    var timeP = document.getElementById('time');
    var controls = document.getElementById('controls');
    var tableContainer = document.getElementById('table');
    var cssAnimation = document.getElementById('cssanimation');
    function pollTimer() {
        setTimeout(function () {
            var d = Date.now();
            var p = (Date.now() % 100) / 10;
            timeP.innerHTML = d;
            cssanimation.style.left = p + '%';
            pollTimer();
        }, 1);
    }
    pollTimer();

    /// ADD BUTTONS
    [2, 3, 4, 5,  6, 6.5, 7, 7.25].forEach(function (n) {
        var button = document.createElement('div');
        button.innerHTML = ' 10^' + n + ' x 10 records';
        button.className = 'button';
        button.onclick = function () {
            tableContainer.innerHTML = '';
            var perf = performance.now();
            button.style.background = 'red';
            // allow the red button to get drawn
            setTimeout(function () {
                window.data = getData(Math.pow(10, n), 10);
                button.innerHTML = ' 10^' + n + ' x 10 records. ' + (performance.now() - perf - 10).toFixed(4) + 'ms';
                button.style.background = 'white';
            }, 10);
        }
        controls.appendChild(button);
    });

    var button = document.createElement('div');
    button.className = 'button';
    button.innerHTML = 'Set data';
    button.onclick = function ( ){
        tableContainer.innerHTML = '';
        var perf = performance.now();
        button.style.background = 'red';
        setTimeout(function () {
            var grid = canvasDatagrid();
            tableContainer.appendChild(grid);
            grid.style.height = '80%';
            grid.style.width = '80%';
            grid.data = window.data;
            button.innerHTML = 'Set data ' + (performance.now() - perf - 10).toFixed(4) + 'ms';
            button.style.background = 'white';
        }, 10);
    };
    controls.appendChild(button);

});
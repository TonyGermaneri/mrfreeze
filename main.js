
function freezeTheWorld(pow, o) {
    var i = [];
    i.length = Math.pow(10, pow);
    var complexities = {
        "O(1)": function () {
            i[382184] = 'blah';
        },
        "O(n)": function () {
            for (var x = 0; x < i.length; x += 1) {
                i[x] = 'blah';
            }
        },
        "O(n2)": function () {
            for (var x = 0; x < i.length; x += 1) {
                for (var y = 0; y < i.length; y += 1) {
                    if (x === y) { continue; }
                    i[x] === i[y];
                }
            }
        }
    }[o]();

    // example of an O(2n), meaning, exponential growth.
    // Each iteration causes the set to grow exponentially.
    function fibonacciRec(number)
    {
        if (number <= 1) return number;
        return fibonacciRec(number - 2) + fibonacciRec(number - 1);
    }

    // example of an O(n), meaning linear growth
    // this function outputs the same number, but is not recursive
    function fibonacci(num){
        var a = 1, b = 0, temp;
        while (num >= 0){
            temp = a;
            a = a + b;
            b = temp;
            num -= 1;
        }
        return b;
    }

    // example of an O(log n).  Each iteration the causes the set to be cut in half.
    // d=data, t=target, s=start, e=end, m=middle
    function binarySearch(d, t, s, e) {
        var m = Math.floor((s + e) / 2);
        if (t === d[m].svgX) {
            return d[m];
        }
        if (e - 1 === s) {
            return Math.abs(d[s].svgX - t) > Math.abs(d[e].svgX - t) ? d[e] : d[s];
        }
        if (t > d[m].svgX) {
            return binarySearch(d,t,m,e);
        }
        if (t < d[m].svgX) {
            return binarySearch(d,t,s,m);
        }
    }
}

function getData(rows, columns) {
    var data = [], x, y;
    for (x = 0; x < rows; x += 1) {
        data[x] = {};
        for (y = 0; y < columns; y += 1) {
            data[x][y] = x + ":" + y;
        }
    }
    return data;
}

function createDataTable(data) {
    var table = document.createElement('table');
    data.forEach(function (row) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        Object.keys(row).forEach(function (key) {
            var td = document.createElement('td');
            td.innerHTML = row[key];
            tr.appendChild(td);
        });
    });
    return table;
}

document.addEventListener('DOMContentLoaded', function () {
    var timeP = document.getElementById('time');
    var tableContainer = document.getElementById('table');
    var controls = document.getElementById('controls');
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
    ['O(1)', 'O(n)', 'O(n2)'].forEach(function (comp) {
        [2, 3, 4, 5,  6, 7, 8, 9].forEach(function (n) {
            var button = document.createElement('div');
            button.innerHTML = comp + ' 10^' + n + ' x 10 records';
            button.className = 'button';
            button.onclick = function () {
                var perf = performance.now();
                button.style.background = 'red';
                // allow the red button to get drawn
                setTimeout(function () {
                    freezeTheWorld(n, comp);
                    button.innerHTML = comp + ' 10^' + n + ' x 10 records. ' + (performance.now() - perf - 10).toFixed(4) + 'ms';
                    button.style.background = 'white';
                }, 10);
                
            }
            controls.appendChild(button);
        });
    });


    [2, 4, 5, 6, 7, 8, 9, 10].forEach(function (n) {
        var button = document.createElement('div');
        button.innerHTML = 'Create 10^' + n + ' x 10 records';
        button.className = 'button';
        button.onclick = function () {
            tableContainer.innerHTML = '';
            var perf = performance.now();
            button.style.background = 'red';
            // allow the red button to get drawn
            setTimeout(function () {
                tableContainer.appendChild(createDataTable(getData(Math.pow(10, n), 10)));
                button.innerHTML = 'Create 10^' + n + ' x 10 records. ' + (performance.now() - perf - 10).toFixed(4) + 'ms';
                button.style.background = 'white';
            }, 10);
        }
        controls.appendChild(button);
    });


});

var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];

app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
        var labelOption = {
            normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            }
        };
        myChart.setOption({
            series: [{
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }, {
                label: labelOption
            }]
        });
    }
};


var labelOption = {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
        name: {
        }
    }
};

option = {
    title: {
        text: '阶梯瀑布图',
        subtext: 'From ExcelHome',
        sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
    },
   tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: ['satu', 'dua','tiga']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        axisTick: {show: false},
        splitLine: {show: false},
        data: ['satu', 'dua','tiga','empat','lima']
        /*data: function () {
            var list = [];
            for (var i = 1; i <= 11; i++) {
                list.push('11月' + i + '日');
            }
            return list;
        }()*/
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'hijau',
            type: 'bar',
            stack: 'stack',
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            },
            emphasis: {
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)',
                },
                focus: 'series'
            },
            data: [0,  1367, 1000, 153, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
        },
        {
            name: 'base',
            type: 'bar',
            stack: 'stack',
            label: {
                show: true,
                label: labelOption,
                position: 'top'
            },
            emphasis: {
                focus: 'series'
            },
            data: [ 1367, '-',  '-', 100, '-', 135, 178, 286, '-', '-', '-']
        },
        {
            name: 'merah',
            type: 'bar',
            stack: 'stack',
            color:'#f34',
            label: {
                show: true,
                label: labelOption,
                position: 'bottom',
                color:'#f34'
            },
            emphasis: {
                focus: 'series'
            },
            data: ['-', '-', 300, 1208, 154, '-', '-', '-', 119, 361, 203]
        },
        {
            name: 'Kuning',
            type: 'bar',
            stack: 'stack',
            color:'#6e5',
            label: {
                show: true,
                label: labelOption,
                position: 'top'
            },
            emphasis: {
                focus: 'series'
            },
            data: [ '-', 320,'-', 200, 200, 335, 178, 286, '-', '-', '-']
        },
        
    ]
};
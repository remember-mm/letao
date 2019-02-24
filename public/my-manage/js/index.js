  // 基于准备好的dom，初始化echarts实例
  var table1 = echarts.init(document.querySelector('.table1'));

  // 指定图表的配置项和数据
  var option1 = {
      title: {
          text: '2019年注册人数'
      },
      tooltip: {},
      legend: {
          data: ['人数']
      },
      xAxis: {
          data: ["1月", "2月", "3月", "4月", "5月", "6月"]
      },
      yAxis: {},
      series: [{
              name: '人数',
              type: 'bar',
              data: [178, 123, 336, 676, 235, 200]
          },
          {
            name:'销量',
            type:'bar',
            data:[244,553,112,667,765,446]
          }
      ]
  };

  // 使用刚指定的配置项和数据显示图表。
  table1.setOption(option1);



  var table2 = echarts.init(document.querySelector('.table2'));
  option2 = {
      title: {
          text: '热门品牌销售',
          subtext: '2019年2月',
          x: 'center',
          textStyle: {
              color: '#990000',
              fontSize: 22
          }
      },
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['耐克', '阿迪', '新百伦', '乔丹', '李宁']
      },
      series: [{
          name: '品牌',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [{
                  value: 335,
                  name: '耐克'
              },
              {
                  value: 310,
                  name: '阿迪'
              },
              {
                  value: 234,
                  name: '新百伦'
              },
              {
                  value: 135,
                  name: '乔丹'
              },
              {
                  value: 1548,
                  name: '李宁'
              }
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }]
  };

  table2.setOption(option2);
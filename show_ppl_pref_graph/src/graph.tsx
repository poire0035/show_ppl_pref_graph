import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Styles: { [key: string]: React.CSSProperties } = {
  graph: {
    padding: '12px',
  },
};

type Props = {
  populationdata: {
    prefName: string;
    data: { year: number; value: number }[];
  }[];
};

// 選んだ都道府県の人口推移グラフを表示するコンポーネント
const Graph: React.FC<Props> = ({ populationdata }) => {
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories = [];

  for (let p of populationdata) {
    let data = [];
    for (let pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }

    series.push({
      type: 'line',
      name: p.prefName,
      data: data,
    });
  }

  const options: Highcharts.Options = {
    title: {
      text: '総人口推移グラフ',
      style: {
        fontSize: '20px',
      },
    },
    xAxis: {
      title: {
        text: '年度',
        style: {
          fontSize: '15px',
        },
      },
      categories: categories,
    },
    yAxis: {
      lineWidth: 1,
      title: {
        text: '人口数',
        align: 'high',
        rotation: 0,
        y: -20,
        style: {
          fontSize: '15px',
        },
      },
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series: series.length === 0 ? [{ type: 'line', name: '', data: [] }] : series,
  };

  return (
    <div style={Styles.graph}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;

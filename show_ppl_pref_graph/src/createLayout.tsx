import React, { useEffect, useState } from 'react';
import CheckField from './checkField';
import Graph from './graph';
import * as resasApi from './resasApi';

const Styles: { [key: string]: React.CSSProperties } = {
  label: {
    fontSize: '20px',
    marginLeft: '10pt',
  },
};

const CreateLayout: React.FC = () => {
  const [prefectures, setPreFectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);
  const [prefPopulation, setPrefPopulation] = useState<{ prefName: string; data: { year: number; value: number }[] }[]>([]);
  //Reactのレンダリング完了後の処理
  useEffect(() => {
    // 都道府県一覧を取得する
    const getPreFectures = async () => {
      let preFecturesData = await resasApi.getPreFectures();
      setPreFectures(preFecturesData);
    };
    getPreFectures();
  }, []);

  // チェックボックスをクリックした際の処理
  const handleClickCheck = async (prefName: string, prefCode: number, check: boolean) => {
    let c_prefPopulation = prefPopulation.slice();
    if (check) {
      if (c_prefPopulation.findIndex((value) => value.prefName === prefName) !== -1) {
        return;
      }
      let preFecturePplData = await resasApi.getPreFecturePpl(String(prefCode));
      c_prefPopulation.push({
        prefName: prefName,
        data: preFecturePplData,
      });
    } else {
      const deleteIndex = c_prefPopulation.findIndex((value) => value.prefName === prefName);
      if (deleteIndex === -1) return;
      c_prefPopulation.splice(deleteIndex, 1);
    }
    setPrefPopulation(c_prefPopulation);
  };

  return (
    <main>
      <h2 style={Styles.label}>都道府県</h2>
      {prefectures && <CheckField prefectures={prefectures.result} onChange={handleClickCheck} />}
      <h2 style={Styles.label}>総人口推移グラフ</h2>
      <Graph populationdata={prefPopulation} />
    </main>
  );
};

export default CreateLayout;

import axios from 'axios';

const REACT_APP_API_KEY: string = '5g8vKlZ1cKxQTSsCcUaGgBRW68vBUZDKMYAhgxOp';
export const getPreFectures: any = async () => {
  // 都道府県一覧を取得する
  let results = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', { headers: { 'X-API-KEY': REACT_APP_API_KEY } });
  return results.data;
};

export const getPreFecturePpl: any = async (prefCode: string) => {
  // 都道府県の各年度の人口構成を取得する
  let results = await axios.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=' + prefCode, {
    headers: { 'X-API-KEY': REACT_APP_API_KEY },
  });
  return results.data.result.data[0].data;
};

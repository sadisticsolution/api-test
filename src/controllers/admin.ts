import Axios from 'axios';
import { Response, Request } from 'express';
import { Document, Model } from 'mongoose';
import { MstSvt } from '../models/MstSvt';
import { MstSvtTreasureDevice } from '../models/MstSvtTreasureDevice';
import { MstTreasureDevice } from '../models/MstTreasureDevice';

export const doImport = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  await importGameData(res, 'mstSvt', MstSvt);
  await importGameData(res, 'mstSvtTreasureDevice', MstSvtTreasureDevice);
  await importGameData(res, 'mstTreasureDevice', MstTreasureDevice);

  res.write('DONE\n');
  res.end();

  return;
};

async function importGameData<T extends Document>(res: Response, name: string, model: Model<T>): Promise<void> {
  await importRegionGameData(res, 'jp', name, model);
  await importRegionGameData(res, 'na', name, model);

  return;
}

async function importRegionGameData<T extends Document>(res: Response, region: string, name: string, model: Model<T>): Promise<void> {
  res.write(`Downloading ${name}(${region}) ...\n`);

  let url = `https://assets.atlasacademy.io/GameData/${region.toUpperCase()}/master/${name}.json`,
    response = await Axios.get(url);

  await model.deleteMany({ region });
  // @ts-ignore
  await model.collection.insertMany(response.data.map(dataRow => {
    return {
      region,
      ...dataRow,
    };
  }));

  return;
}

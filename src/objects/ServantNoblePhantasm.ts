import { MstSvtTreasureDevice } from '../models/MstSvtTreasureDevice';
import { MstTreasureDevice } from '../models/MstTreasureDevice';
import { CardType, castCardIdAsType } from './ServantCard';

export type ServantNoblePhantasm = {
  version: number,
  internal_id: number,
  quest_id: number,
  card_type: CardType,
};

export type ServantNoblePhantasms = Array<ServantNoblePhantasm>;

export const buildNoblePhantasm = async (treasureDeviceId: number): Promise<ServantNoblePhantasm> => {
  let treasureDevice = await MstTreasureDevice.findByTreasureDevice('jp', treasureDeviceId),
    svtTreasureDevice = await MstSvtTreasureDevice.findByTreasureDevice('jp', treasureDeviceId);

  return {
    version: 1,
    internal_id: treasureDevice.id,
    quest_id: null,
    card_type: castCardIdAsType(svtTreasureDevice.cardId),
  };
};

export const buildNoblePhantasms = async (svtId: number, questIds: Array<number>): Promise<ServantNoblePhantasms> => {
  let noblePhantasms = [],
    svtTreasureDevice,
    noblePhantasm;

  // Default NP
  svtTreasureDevice = await MstSvtTreasureDevice.findByQuest('jp', svtId, 0);
  if (svtTreasureDevice) {
    noblePhantasm = await buildNoblePhantasm(svtTreasureDevice.treasureDeviceId);
    noblePhantasm.version = noblePhantasms.length + 1;
    noblePhantasms.push(noblePhantasm);
  }

  for (let x in questIds) {
    svtTreasureDevice = await MstSvtTreasureDevice.findByQuest('jp', svtId, questIds[x]);
    if (!svtTreasureDevice) {
      continue;
    }

    noblePhantasm = await buildNoblePhantasm(svtTreasureDevice.treasureDeviceId);
    noblePhantasm.version = noblePhantasms.length + 1;
    noblePhantasm.quest_id = questIds[x];
    noblePhantasms.push(noblePhantasm);
  }

  return noblePhantasms;
};

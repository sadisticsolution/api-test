import { MstSvtDocument } from '../models/MstSvt';
import { ServantNoblePhantasms, buildNoblePhantasms } from './ServantNoblePhantasm';
import { ServantAliases, buildAliases } from './ServantAlias';

export type Servant = {
  id: number,
  internal_id: number,
  regions: Array<string>,
  aliases: ServantAliases,
  noblePhantasms: ServantNoblePhantasms,
};

export const buildServant = async (jpMstSvt: MstSvtDocument, naMstSvt: MstSvtDocument): Promise<Servant> => {
  let rankUpQuestIds = jpMstSvt.relateQuestIds.filter(questId => Math.floor(questId/1000000) === 94),
    interludeQuestIds = jpMstSvt.relateQuestIds.filter(questId => Math.floor(questId/1000000) === 91),
    otherQuestIds = jpMstSvt.collectionNo === 1 ? [1000008, 1000631, 3000124] : [],
    questIds = [].concat(rankUpQuestIds, interludeQuestIds, otherQuestIds),
    noblePhantasms = await buildNoblePhantasms(jpMstSvt.id, questIds);
    // versions = await buildVersions(jpMstSvt.id, )

  return {
    id: jpMstSvt.collectionNo,
    internal_id: jpMstSvt.id,
    regions: naMstSvt ? ['jp', 'na'] : ['jp'],
    aliases: await buildAliases(jpMstSvt, naMstSvt),
    noblePhantasms,
  };
};

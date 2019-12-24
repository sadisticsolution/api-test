import { MstSvtDocument } from '../models/MstSvt';

export type ServantAlias = {
  language: string,
  name: string,
};

export type ServantAliases = Array<ServantAlias>;

export const buildAlias = async (mstSvt: MstSvtDocument): Promise<ServantAlias> => {
  return {
    language: mstSvt.region,
    name: mstSvt.ruby,
  };
};

export const buildAliases = async (jpMstSvt: MstSvtDocument, naMstSvt: MstSvtDocument): Promise<ServantAliases> => {
  let aliases = [
    await buildAlias(jpMstSvt)
  ];

  if (naMstSvt) {
    aliases.push(await buildAlias(naMstSvt));
  }

  return aliases;
};

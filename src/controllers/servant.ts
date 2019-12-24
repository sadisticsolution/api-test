import { Response, Request } from 'express';
import { MstSvt } from '../models/MstSvt';
import { buildServant } from '../objects/Servant';

export const getServant = async (req: Request, res: Response) => {
  let servantId = parseInt(req.param('servantId'));
  if (isNaN(servantId)) {
    res.status(404).send('Servant not found.');
    return;
  }

  let jpMstSvt = await MstSvt.findByCollectionNo('jp', servantId),
    naMstSvt = await MstSvt.findByCollectionNo('na', servantId);

  if (!jpMstSvt) {
    res.status(404).send('Servant not found.');
    return;
  }

  let servant = await buildServant(jpMstSvt, naMstSvt);
  res.json(servant);

  return;
};

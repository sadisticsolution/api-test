import { Document, Model, Schema, model } from 'mongoose';

const servantTypes = [1, 2, 5, 9];

export type MstSvtDocument = Document & {
  region: string,
  id: number,
  collectionNo: number,
  relateQuestIds: Array<number>,
  ruby: string,
  type: number,
};

export interface MstSvtModel extends Model<MstSvtDocument> {
  findByCollectionNo(region: string, collectionNo: number): Promise<MstSvtDocument>;
  findBySvtId(region: string, id: number): Promise<MstSvtDocument>;
}

const mstSvtSchema = new Schema({
  region: String,
  id: { type: Number, index: true },
  collectionNo: { type: Number, index: true },
  relateQuestIds: [Number],
  ruby: String,
  type: Number,
});

mstSvtSchema.statics.findByCollectionNo = function(region: string, collectionNo: number) {
  return this.findOne({
    collectionNo,
    region,
    type: { $in: servantTypes },
  });
};

mstSvtSchema.statics.findBySvtId = function(region: string, svtId: number) {
  return this.findOne({
    id: svtId,
    region,
    type: { $in: servantTypes },
  });
};

export const MstSvt = model<MstSvtDocument, MstSvtModel>('mst_svt', mstSvtSchema);

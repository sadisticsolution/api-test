import { Document, Model, Schema, model } from 'mongoose';

export type MstSvtTreasureDeviceDocument = Document & {
  region: string,
  svtId: number,
  treasureDeviceId: number,
  cardId: number,
};

export interface MstSvtTreasureDeviceModel extends Model<MstSvtTreasureDeviceDocument> {
  findByTreasureDevice(region: string, treasureDeviceId: number): Promise<MstSvtTreasureDeviceDocument>;

  findByQuest(region: string, svtId: number, condQuestId: number): Promise<MstSvtTreasureDeviceDocument>;
}

const mstSvtTreasureDeviceSchema = new Schema({
  region: String,
  svtId: Number,
  treasureDeviceId: Number,
  cardId: Number,
});

mstSvtTreasureDeviceSchema.statics.findByTreasureDevice = function(region: string, treasureDeviceId: number) {
  return this.findOne({
    treasureDeviceId,
    region,
  });
};

mstSvtTreasureDeviceSchema.statics.findByQuest = function(region: string, svtId: number, condQuestId: number) {
  return this.findOne({
    svtId,
    condQuestId,
    region,
  }).sort({ treasureDeviceId: -1 });
};

export const MstSvtTreasureDevice = model<MstSvtTreasureDeviceDocument, MstSvtTreasureDeviceModel>('mst_svt_treasure_device', mstSvtTreasureDeviceSchema);

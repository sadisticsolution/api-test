import { Document, Model, Schema, model } from 'mongoose';

export type MstTreasureDeviceDocument = Document & {
  id: number,
  region: string,
};

export interface MstTreasureDeviceModel extends Model<MstTreasureDeviceDocument> {
  findByTreasureDevice(region: string, id: number): Promise<MstTreasureDeviceDocument>;
}

const mstTreasureDeviceSchema = new Schema({
  region: String,
  id: Number,
});

mstTreasureDeviceSchema.statics.findByTreasureDevice = function(region: string, id: number) {
  return this.findOne({
    id,
    region,
  });
};

export const MstTreasureDevice = model<MstTreasureDeviceDocument, MstTreasureDeviceModel>('mst_treasure_device', mstTreasureDeviceSchema);

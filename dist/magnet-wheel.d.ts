import { IWheel, IWheelItem, IPolarCoodinates } from "@elllephant/wheel";
export interface IMagnetWheel extends IWheel {
    magnetPosition?: number;
    strength?: number;
}
export interface IMagnetWheelItem extends IWheelItem {
    resistance?: number;
}
declare function magnetWheel(item: IMagnetWheelItem, magnetWheel: IMagnetWheel): IPolarCoodinates;
export default magnetWheel;

import Address from '@/models/Address';

export const SERVICE_CODE_MAP = {
  1: 'DOMESTIC',
  2: 'INTERNATIONAL'
}

export const SERVICE_CODES = [{
  value: 1,
  text: 'DOMESTIC'
}, {
  value: 2,
  text: 'INTERNATIONAL'
}]

export const STATUS_MAP = {
  '1': 'WAREHOUSE',
  '2': 'DELIVERING',
  '3': 'DELIVERED'
}

export default class Shipment {
  constructor(id, serviceCode, status, createdAt, senderAddress, receiverAddress) {
    this.id = id;
    this.serviceCode = serviceCode;
    this.status = status;
    this.createdAt = createdAt;
    this.senderAddress = Address.parseFromDataObject(senderAddress);
    this.receiverAddress = Address.parseFromDataObject(receiverAddress);
    // props below are for table data
    this.serviceCodeText = SERVICE_CODE_MAP[this.serviceCode];
    this.statusText = STATUS_MAP[this.status];
    this.senderText = this.senderAddress.getNameText();
    this.senderAddressText = this.senderAddress.getAddressText();
    this.receiverText = this.receiverAddress.getNameText();
    this.receiverAddressText = this.receiverAddress.getAddressText();
    this.createdAtText = this.getCreatedDate();
  }

  getCreatedDate() {
    const date = new Date(this.createdAt);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    let hour = date.getHours();
    hour = hour < 10 ? `0${hour}` : hour;
    let min = date.getMinutes();
    min = min < 10 ? `0${min}` : min;
    return `${day}-${month}-${year} ${hour}:${min}`;
  }

  static parseFromDataObject(data) {
    return new Shipment(data.id, data.service_code, data.status, data.created_at, data.sender_address,
      data.receiver_address);
  }
}

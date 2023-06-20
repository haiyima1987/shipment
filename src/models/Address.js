export default class Address {
  constructor(id, firstName, lastName, street, postalCode, city, country) {
    this.id = id;
    this.firstName = firstName ? firstName : '';
    this.lastName = lastName ? lastName : '';
    this.street = street;
    this.postalCode = postalCode ? postalCode : '';
    this.city = city;
    this.country = country;
  }

  getNameText() {
    return `${this.firstName} ${this.lastName}`;
  }

  getAddressText() {
    const postalCode = this.postalCode ? `, ${this.postalCode}` : '';
    return `${this.street}${postalCode}, ${this.city}, ${this.country}`;
  }

  static parseFromDataObject(data) {
    return new Address(data.id, data.first_name, data.last_name, data.street, data.postal_code, data.city,
      data.country);
  }
}

function Reservation(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
}
Reservation.prototype.save = function (cb) {
    cb(this.name);
}

module.exports = Reservation;
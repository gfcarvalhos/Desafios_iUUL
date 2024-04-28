export class OperationStatus {
  static get SUCCESS() {
    return true;
  }
  static get FAILURE() {
    return false;
  }
}

export class OperationError {
  static get CPF_ALREADY_EXISTS() {
    return 1;
  }

  static get CPF_INVALID() {
    return 2;
  }

  static get NAME_LENGTH_BELOW_MINIMUM() {
    return 3;
  }

  static get PATIENT_ALREADY_EXISTS() {
    return 4;
  }

  static get INVALID_DATE() {
    return 5;
  }

  static get UNDERAGE_PATIENT() {
    return 6;
  }

  static get PATIENT_HAS_APPOINTMENT() {
    return 7;
  }

  static get PATIENT_NOT_REGISTERED() {
    return 8;
  }

  static get UNEXPECTED_ERROR(){
    return 403;
  }

  static get INVALID_NAME(){
    return 10;
  }

  static get PATIENT_DOESNT_HAVE_APPOINTMENT(){
    return 11;
  }

  static get PAST_DATE_NOT_ALLOWED(){
    return 12;
  }

  static get OUT_OF_MINUTES_RANGE(){
    return 13;
  }

  static get PAST_HOUR_NOT_ALLOWED(){
    return 14;
  }

  static get OUT_OF_OPENING_HOURS(){
    return 15;
  }

  static get LOWER_THAN_INITIAL_HOUR(){
    return 16;
  }

  static get SCHEDULED_TIME_OVERLAY(){
    return 17;
  }
}

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

  static get NAME_LENGTH_BELOW_MINIMUM(){
    return 3;
  }

  static get PATIENT_ALREADY_EXISTS(){
    return 4;
  }

  static get INVALID_DATE(){
    return 5;
  }

  static get UNDERAGE_PATIENT(){
    return 6;
  }
}

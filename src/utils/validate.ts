export class Validate {
  static email(mail: string) {
    if (/^[\w.-]+@gmail\.com$/.test(mail)) {
      return true;
    }
    return false;
  }
  static password(pass: string) {
    if (pass.length < 8) {
      return false;
    }
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasSpecialChar = /[@#$%^&+=]/.test(pass);

    return hasUpperCase && hasLowerCase && hasSpecialChar;
  }
}

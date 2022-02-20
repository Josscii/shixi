export default class TipManager {
  static MEMORIZE_TIP_KEY = "memorize_tip";
  static RESET_TIP_KEY = "reset_tip";

  static hasShowedMemorizeTip(): boolean {
    return window.localStorage.getItem(TipManager.MEMORIZE_TIP_KEY) != null;
  }

  static showedMemorizeTip() {
    window.localStorage.setItem(TipManager.MEMORIZE_TIP_KEY, "1");
  }

  static hasShowedRestTip(): boolean {
    return window.localStorage.getItem(TipManager.RESET_TIP_KEY) != null;
  }

  static showedRestTip() {
    window.localStorage.setItem(TipManager.RESET_TIP_KEY, "1");
  }

  static clear() {
    window.localStorage.removeItem(TipManager.MEMORIZE_TIP_KEY);
    window.localStorage.removeItem(TipManager.RESET_TIP_KEY);
  }
}

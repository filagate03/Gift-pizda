export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

export type TelegramWebApp = {
  initDataUnsafe: {
    user?: TelegramUser;
  };
  expand: () => void;
  ready: () => void;
};

const demoUser: TelegramUser = {
  id: 0,
  first_name: "Demo",
  last_name: "User",
  username: "demo_user",
  language_code: "ru"
};

const stubWebApp: TelegramWebApp = {
  initDataUnsafe: { user: demoUser },
  expand: () => {},
  ready: () => {}
};

export function getTelegramWebApp(): TelegramWebApp {
  if (typeof window !== "undefined") {
    const maybeWindow = window as typeof window & {
      Telegram?: { WebApp?: TelegramWebApp };
    };
    if (maybeWindow.Telegram?.WebApp) {
      return maybeWindow.Telegram.WebApp;
    }
  }
  return stubWebApp;
}

export function getDemoUser(): TelegramUser {
  return demoUser;
}

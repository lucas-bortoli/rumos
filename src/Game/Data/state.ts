export interface GameState {
  userInfo: {
    name: string;
    email: string;
    allowSendingEmail: boolean;
    gender: string;
    age: number;
    distributionSource: string;
  } | null;
  userGaveFeedback: boolean;
}

export const initialGameState: GameState = {
  userInfo: null,
  userGaveFeedback: false,
};

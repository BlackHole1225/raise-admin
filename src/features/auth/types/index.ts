export type LoginModel = {
  // id:  string;
  email: string;
  password: string;
  // rememberMe: boolean;
};

export type SignupCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  rememberMe: boolean;
};

export type LoginResponse = {
  id: string;
  email: string;
  token: string;
};

export interface TokenModel {
  token: string;
}

export interface WalletModel {
  wallet_id: string;
  wallet_currency: string;
  wallet_balance: number;
}

export interface UserModel {
  id: number;
  slug: string;
  name: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  avatar: string;
  balance: number;
  is_actived: boolean,
  user_invitation_code: number;
  referred_by: UserModel | null;
  wallet: WalletModel;
  unread_notifications_count: number;
  created_at: Date;
  updated_at: Date;
}

export class User {
  data: UserModel;
  avatar: string;

  constructor(user: UserModel) {
    this.data = user;
    this.avatar = this.data.avatar;
  }
}

export interface PublicUserModel {
  user_name: string;
  user_avatar: string;
}

export interface OldApiToken {
  response: {
    token: string;
  };
}

export type ResetPasswordParam = {
  email: string;
};

export interface TeamLimitsModel {
  size_uuid: string;
  first_team_size: number;
  second_team_size: number;
  memo: string;
}
export interface BetsModel {
  bet_uuid: string;
  bet_value: number;
}
export interface RoomModel {
  room_uuid: string;
  room_status: RoomStatus;
  is_joined: boolean;
  game: GameModel;
  bet: BetsModel;
  team_size: TeamLimitsModel;
  host: UserModel;
  teams: RoomTeamModel[];
  me: PlayerModel | null;
  winner: RoomTeamModel;
  match_duration?: number;
}

export interface GameModel {
  game_name: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  id: number;
  uuid: string;
  slug: string;
  name: string;
  description: string;
  cover: string;
  is_active: boolean;
  categories: GameCategory[];
  created_at: string;
}

export interface RoomTeamModel {
  team: TeamModel;
  players: PlayerModel[];
  is_full: boolean;
  is_winner: boolean;
  room_id?: number;
}
export interface PlayerModel {
  player_uuid: string;
  player_status: PlayerStatusType;
  user: UserModel;
  room_team?: RoomTeamModel;
}
export interface TeamModel {
  team_uuid: string;
  team_name: string;
}

export type RoomStatus =
  | 'open'
  | 'players_joined'
  | 'players_ready'
  | 'in_game'
  | 'winner_selection'
  | 'winner_selected'
  | 'finished'
  | 'closed'
  | 'system_closed'
  | 'dispute';

export type GameCategory =
  | 'slider'
  | 'upcoming'
  | 'most_played'
  | 'recent'
  | 'featured';

export type PlayerStatusType =
  | 'joined'
  | 'ready'
  | 'in_game'
  | 'winner_selection'
  | 'winner_selected'
  | 'finished'
  | 'leaved'
  | 'kicked_by_host'
  | 'kicked_by_system';

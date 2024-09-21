export interface IFood {
  id: number
  title: string
}

interface IStatistic extends Pick<IGame, 'score' | 'time'> {}

export interface IUserStatistic {
  user: IUser
  statistic: IStatistic
}

export interface IUser {
  id: number
  name: string
}

import type { IFood } from './type'

export enum GameState {
  NEW = 'NEW',
  START = 'START',
  FINISHED = 'FINISHED',
  MEMORISED = 'MEMORISED'
}

export const FOOD_COOLECTION: IFood[] = [
  {
    id: 1,
    title: 'Сосиски'
  },
  {
    id: 2,
    title: 'Борщ'
  },
  {
    id: 3,
    title: 'Котлеты'
  },
  {
    id: 4,
    title: 'Арбуз'
  },
  {
    id: 5,
    title: 'Киви'
  },
  {
    id: 6,
    title: 'Сок'
  },
  {
    id: 7,
    title: 'Рыба'
  },
  {
    id: 8,
    title: 'Cыр'
  },
  {
    id: 9,
    title: 'Макароны'
  },
  {
    id: 10,
    title: 'Колбаса'
  }
]

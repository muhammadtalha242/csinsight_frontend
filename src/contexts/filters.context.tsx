'use client';

import React, { createContext, useReducer, type ReactNode } from 'react';
import { ACCESS_TYPE_OPEN, metrics } from '@/constants/const';

import { type Filter } from '@/types/filters';

const intialFilter = {
  yearStart: '1960',
  yearEnd: '',
  citationsMin: '',
  citationsMax: '',
  authorIds: [],
  venueIds: [],
  accessType: ACCESS_TYPE_OPEN,
  typesOfPaper: [],
  fieldsOfStudy: [],
  publishers: [],
  metric: metrics[0].value,
};
const initialState = {
  filters: { ...intialFilter },
  oldFilters: { ...intialFilter },
};

const ACTION_TYPES = {
  SET_FILTER: 'SET_FILTER',
  SET_OLD_FILTER: 'SET_OLD_FILTER',
  CLEAR_FILTER: 'CLEAR_FILTER',
};

interface Actions {
  type: string;
  payload: unknown;
}

type IState = typeof initialState;

const filterReducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_FILTER:
      return {
        ...state,
        filters: action.payload as typeof state.filters,
      };
    case ACTION_TYPES.SET_OLD_FILTER:
      return {
        ...state,
        oldFilters: action.payload as typeof state.filters,
      };
    case ACTION_TYPES.CLEAR_FILTER:
      return {
        ...state,
        filters: action.payload as typeof state.filters,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const SetFilteres = (dispatch: React.Dispatch<Actions> | undefined) => (params: { filters: Filter }) => {
  if (dispatch)
    dispatch({
      type: ACTION_TYPES.SET_FILTER,
      payload: params.filters,
    });
};

export const SetOldFilteres = (dispatch: React.Dispatch<Actions> | undefined) => (params: { filters: Filter }) => {
  if (dispatch)
    dispatch({
      type: ACTION_TYPES.SET_OLD_FILTER,
      payload: params.filters,
    });
};

export const ClearFilter = (dispatch: React.Dispatch<Actions> | undefined) => () => {
  if (dispatch)
    dispatch({
      type: ACTION_TYPES.SET_OLD_FILTER,
      payload: { ...intialFilter },
    });
};

const Context = () => {
  const FilterContext = createContext<{
    state: IState;
    dispatch: React.Dispatch<Actions>;
  }>(null!);

  function Provider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    return <FilterContext.Provider value={{ state, dispatch }}>{children}</FilterContext.Provider>;
  }

  return { FilterContext, Provider };
};

export const { FilterContext, Provider } = Context();

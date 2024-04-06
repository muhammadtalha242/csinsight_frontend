'use client';

import React, { createContext, type ReactNode, useReducer } from 'react';

// import { AUTHORS, Dataset, PAPERS, VENUES } from '../constants/dataset.types';
// import { Actions } from '../constants/types';
// import {
//   Tab,
//   VISUALIZATION_TITLE,
//   visualization
// } from '../constants/visualizations/visualizations.types';
// import DistributionOverTime from '../features/search/analytics/visualizations/distributionOverTime/DistributionOverTime';
// import TopResearch from '../features/search/analytics/visualizations/topResearch/TopResearch';

// const VISUALIZATION_TAB: Record<visualization, Tab> = {
//   [visualization.DISTRIBUTIONS_OVERTIME]: {
//     key: visualization.DISTRIBUTIONS_OVERTIME,
//     label: VISUALIZATION_TITLE.distribution_overtime,
//     forceRender: true,
//     destroyInactiveTabPane: true,
//     children: <DistributionOverTime />
//   },
//   [visualization.TOP_RESEARCH]: {
//     key: visualization.TOP_RESEARCH,
//     label: VISUALIZATION_TITLE.top_research,
//     forceRender: true,
//     destroyInactiveTabPane: true,
//     children: <TopResearch />
//   }
// };

// const VISUALIZATION_BY_DATASET: Record<Dataset, Tab[]> = {
//   [PAPERS]: [
//     VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME],
//     VISUALIZATION_TAB[visualization.TOP_RESEARCH]
//   ],
//   [VENUES]: [VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME]],
//   [AUTHORS]: [VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME]]
// };

const initialState = {
  isSideNavOpen: true,
};

const ACTION_TYPES = {
  IS_SIDE_NAV_OPEN: 'IS_SIDE_NAV_OPEN',
};
interface Actions {
  type: string;
  payload: unknown;
}

type IState = typeof initialState;

const applicationReducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case ACTION_TYPES.IS_SIDE_NAV_OPEN:
      return {
        ...state,
        isSideNavOpen: action.payload as boolean,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const SetSideNavCollapsed =
  (dispatch: React.Dispatch<Actions> | undefined) => (params: { isSideNavOpen: boolean }) => {
    if (dispatch)
      dispatch({
        type: ACTION_TYPES.IS_SIDE_NAV_OPEN,
        payload: params.isSideNavOpen,
      });
  };

const Context = () => {
  const ApplicationContext = createContext<{
    state: IState;
    dispatch: React.Dispatch<Actions>;
  }>(null!);

  function Provider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(applicationReducer, initialState);

    return <ApplicationContext.Provider value={{ state, dispatch }}>{children}</ApplicationContext.Provider>;
  }

  return { ApplicationContext, Provider };
};

export const { ApplicationContext, Provider } = Context();

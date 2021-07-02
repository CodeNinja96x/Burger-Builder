import { ACTIONS } from './globalActions';

let list;
let i, iLength;

export const mainReducer = (state, action) => {
     switch (action.type) {
        case ACTIONS.TOGGLE_SIDEBAR: {
            return { ...state, ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed }};
        }
        case ACTIONS.SET_USER: {
            return { ...state, user: action.data };
        }

        // NOTE: It's often good practice to split this into smaller view-specific state and reducers,
        // rather than placing everything at the global level. This is just here as an example.
        case ACTIONS.TABLE_EXAMPLE_LOAD: {
            return { ...state, tableExampleData: action.data };
        }
        case ACTIONS.TABLE_EXAMPLE_ADD: {
            list = [ ...state.tableExampleData, action.data ];
            return { ...state, tableExampleData: list };
        }
        case ACTIONS.TABLE_EXAMPLE_UPDATE: {
            list = [ ...state.tableExampleData ];
            iLength = list.length;
            for (i = 0; i < iLength; i++) {
                if(action.data.id && list[i].id === action.data.id) {
                    list[i] = action.data;
                    break;
                }
            }
            return { ...state, tableExampleData: list };
        }
        case ACTIONS.TABLE_EXAMPLE_REMOVE: {
            list = [ ...state.tableExampleData ];
            i = list.findIndex(x => x.id === action.data);
            if (i > -1) {
                list.splice(i, 1);
            }
            return { ...state, tableExampleData: list };
        }

        default:
            return state
    }
}

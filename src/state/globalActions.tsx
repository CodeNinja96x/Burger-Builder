export interface IGlobalContextAction {
    type: string,
    data?:any
}

export const ACTIONS = {
    TOGGLE_SIDEBAR: 'toggle_sidebar',
    SET_USER: 'set_user',
    
    // NOTE: It's often good practice to split this into smaller view-specific state and reducers,
    // rather than placing everything at the global level. This is just here as an example.
    TABLE_EXAMPLE_LOAD: 'table_example_load',
    TABLE_EXAMPLE_ADD: 'table_example_add',
    TABLE_EXAMPLE_UPDATE: 'table_example_update',
    TABLE_EXAMPLE_REMOVE: 'table_example_remove',
};

// Sample action
export const toggleSidebar = () : IGlobalContextAction => {
    return {
        type: ACTIONS.TOGGLE_SIDEBAR,
        data: null
    }
}

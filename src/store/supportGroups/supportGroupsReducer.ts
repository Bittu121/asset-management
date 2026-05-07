import {
  SUPPORT_GROUPS_LOADING,
  SUPPORT_GROUPS_SUCCESS,
  SUPPORT_GROUPS_ERROR,
  CREATE_SUPPORT_GROUP_LOADING,
  CREATE_SUPPORT_GROUP_SUCCESS,
  UPDATE_SUPPORT_GROUP_LOADING,
  UPDATE_SUPPORT_GROUP_SUCCESS,
  DELETE_SUPPORT_GROUP_LOADING,
  DELETE_SUPPORT_GROUP_SUCCESS,
  SET_SELECTED_SUPPORT_GROUP,
  CLEAR_SUPPORT_GROUPS_ERROR,
  ADD_MEMBER_LOADING,
  ADD_MEMBER_SUCCESS,
  REMOVE_MEMBER_LOADING,
  REMOVE_MEMBER_SUCCESS,
} from "./supportGroupsActions";
import { SupportGroupsState } from "./supportGroupsTypes";

const initialState: SupportGroupsState = {
  supportGroups: [],
  selectedGroup: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  addMemberLoading: false,
  removeMemberLoading: false,
};

type Action = {
  type: string;
  payload?: any;
};

const supportGroupsReducer = (
  state = initialState,
  action: Action,
): SupportGroupsState => {
  switch (action.type) {
    case SUPPORT_GROUPS_LOADING:
      return { ...state, loading: true, error: null };

    case SUPPORT_GROUPS_SUCCESS:
      return { ...state, loading: false, supportGroups: action.payload };

    case SUPPORT_GROUPS_ERROR:
      return {
        ...state,
        loading: false,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        addMemberLoading: false,
        removeMemberLoading: false,
        error: action.payload,
      };

    case CREATE_SUPPORT_GROUP_LOADING:
      return { ...state, createLoading: true, error: null };

    case CREATE_SUPPORT_GROUP_SUCCESS:
      return {
        ...state,
        createLoading: false,
        supportGroups: [action.payload, ...state.supportGroups],
      };

    case UPDATE_SUPPORT_GROUP_LOADING:
      return { ...state, updateLoading: true, error: null };

    case UPDATE_SUPPORT_GROUP_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        supportGroups: state.supportGroups.map((group) =>
          group._id === action.payload._id ? action.payload : group,
        ),
      };

    case DELETE_SUPPORT_GROUP_LOADING:
      return { ...state, deleteLoading: true, error: null };

    case DELETE_SUPPORT_GROUP_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        supportGroups: state.supportGroups.filter(
          (group) => group._id !== action.payload,
        ),
      };

    case ADD_MEMBER_LOADING:
      return { ...state, addMemberLoading: true, error: null };

    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        addMemberLoading: false,
        supportGroups: state.supportGroups.map((g) =>
          g._id === action.payload.groupId
            ? { ...g, members: [...(g.members || []), action.payload.userId] }
            : g,
        ),
      };

    case REMOVE_MEMBER_LOADING:
      return { ...state, removeMemberLoading: true, error: null };

    case REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        removeMemberLoading: false,
        supportGroups: state.supportGroups.map((g) =>
          g._id === action.payload.groupId
            ? {
                ...g,
                members: (g.members || []).filter(
                  (m) => m !== action.payload.userId,
                ),
              }
            : g,
        ),
      };

    case SET_SELECTED_SUPPORT_GROUP:
      return { ...state, selectedGroup: action.payload };

    case CLEAR_SUPPORT_GROUPS_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default supportGroupsReducer;

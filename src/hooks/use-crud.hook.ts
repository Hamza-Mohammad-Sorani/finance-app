import { useState, useCallback } from 'react';

enum ActionType {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

type CrudState<T> =
  | {
      actionType: 'ADD' | '';
      actionId?: never;
      selectedData?: never;
    }
  | {
      actionType: 'DELETE';
      actionId?: string | never;
      selectedData?: T;
    }
  | {
      actionType: 'EDIT';
      actionId?: string | never;
      selectedData?: T;
    };

function useCrud<T>() {
  const [crudState, setCrudState] = useState<CrudState<T>>({ actionType: '' });

  const dispatchAdding = useCallback(
    () => setCrudState({ actionType: ActionType.ADD }),
    [],
  );

  const dispatchEditing = useCallback(
    (editingObject: T) =>
      setCrudState({
        actionType: ActionType.EDIT,
        selectedData: editingObject,
      }),
    [],
  );

  const dispatchDeleting = useCallback((id: string) => {
    setCrudState({
      actionType: ActionType.DELETE,
      actionId: id,
    });
  }, []);

  const dispatchResetCrudState = useCallback(() => {
    setCrudState({ actionType: '' });
  }, []);

  const isAdding = crudState.actionType === ActionType.ADD;

  const isEditing = crudState.actionType === ActionType.EDIT;

  const isDeleting = crudState.actionType === ActionType.DELETE;

  const getActionId = useCallback(() => crudState.actionId ?? '', [crudState]);

  const getSelectedData = useCallback(
    () => crudState.selectedData ?? null,
    [crudState],
  );

  const getCurrentActionType = useCallback(
    () => crudState.actionType,
    [crudState],
  );

  return {
    isAdding,
    isEditing,
    isDeleting,
    getActionId,
    dispatchAdding,
    dispatchEditing,
    getSelectedData,
    dispatchDeleting,
    getCurrentActionType,
    dispatchResetCrudState,
  };
}

export default useCrud;

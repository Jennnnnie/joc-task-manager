export const FoldersReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setFolders': {
      return action.payload;
    }
  }
};

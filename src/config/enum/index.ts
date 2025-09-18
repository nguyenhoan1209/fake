export * from './configuration';
export * from './role';

export enum TypeApi {
  GET_NEW,
  GET_MORE,
}

export enum TypeAction {
  EXPORT,
  DELETE,
}

// export enum TypeSort {
//   ASC,
//   DESC,
// }

export const converTypeActionFromValueToText = (key: TypeAction): string => {
  switch (key) {
    case TypeAction.EXPORT:
      return 'Export';

    case TypeAction.DELETE:
      return 'Xóa';

    default:
      return '';
  }
};

// export const converTypeSortFromValueToName = (key: TypeSort): string => {
//   switch (key) {
//     case TypeSort.ASC:
//       return 'ASC';

//     case TypeSort.DESC:
//       return 'DESC';

//     default:
//       return '';
//   }
// };

export enum Gender {
  MALE,
  FEMALE,
}

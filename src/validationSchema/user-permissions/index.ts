import * as yup from 'yup';

export const userPermissionValidationSchema = yup.object().shape({
  permission: yup.string().required(),
  user_id: yup.string().nullable().required(),
});

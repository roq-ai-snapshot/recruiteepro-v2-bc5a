import * as yup from 'yup';

export const workflowValidationSchema = yup.object().shape({
  name: yup.string().required(),
  steps: yup.string().required(),
  business_organization_id: yup.string().nullable().required(),
});

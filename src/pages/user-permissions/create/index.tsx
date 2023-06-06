import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createUserPermission } from 'apiSdk/user-permissions';
import { Error } from 'components/error';
import { userPermissionValidationSchema } from 'validationSchema/user-permissions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { UserPermissionInterface } from 'interfaces/user-permission';

function UserPermissionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: UserPermissionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createUserPermission(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<UserPermissionInterface>({
    initialValues: {
      permission: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: userPermissionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create User Permission
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="permission" mb="4" isInvalid={!!formik.errors?.permission}>
            <FormLabel>Permission</FormLabel>
            <Input type="text" name="permission" value={formik.values?.permission} onChange={formik.handleChange} />
            {formik.errors.permission && <FormErrorMessage>{formik.errors?.permission}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'user_permission',
  operation: AccessOperationEnum.CREATE,
})(UserPermissionCreatePage);

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').nullable(),
    status: Yup.string().required('Status is required'),
    id: Yup.string(),
    user_id: Yup.number().default(1),
    due_on: Yup.mixed().required('Due Date is required').nullable()
})

const initialValues = {
    title: '',
    status: '',
    id: '',
    user_id: 1,
    due_on: ""
}

export const Schema = {
    validationSchema, initialValues
}
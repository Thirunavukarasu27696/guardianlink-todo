import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').nullable(),
    email: Yup.string().required('Email is required'),
    id: Yup.string(),
    post_id: Yup.number().default(18),
    body: Yup.mixed().required('Comment is required').nullable()
})

const initialValues = {
    name: '',
    email: '',
    id: '',
    post_id: 18,
    body: ""
}

export const Schema = {
    validationSchema, initialValues
}
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').nullable(),
    body: Yup.string().required('Content is required').nullable(),
    id: Yup.string(),
    user_id: Yup.string().nullable()

})

const initialValues = {
    title: '',
    body: '',
    id: '',
    user_id: ""

}

export const Schema = {
    validationSchema, initialValues
}
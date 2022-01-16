import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').nullable(),
    email: Yup.string().email("Invalid characters in email address")
        .required("Email id is required")
        .test(
            "len",
            "Email id should be between 1 to 40",
            (val) => val && val.length <= 40
        )
        .nullable(),
    id: Yup.string(),
    post_id: Yup.number().default(0),
    body: Yup.mixed().required('Comment is required').nullable()
})

const initialValues = {
    name: '',
    email: '',
    id: '',
    post_id: 0,
    body: ""
}

export const Schema = {
    validationSchema, initialValues
}
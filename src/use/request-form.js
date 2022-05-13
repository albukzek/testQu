import { useField, useForm } from 'vee-validate';
import * as yup from 'yup'

export function useRequestForm(fn){
    const {isSubmitting, handleSubmit} = useForm({
        initialValues: {
            status:'active'
        }
    }
    )

    const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
        'title',
        yup.string()
            .trim()
            .required('Заголовое не может быть пустым')
    )
    const {value: string, errorMessage: sError, handleBlur: sBlur} = useField(
        'string',
        yup.string()
            .trim()
            .required('Содержание не может быть пустым')
    )
    const {value:status} = useField('status')

    const onSubmit =  handleSubmit(fn)

    return{
        status,
        isSubmitting,
        onSubmit,
        title,tError,tBlur,
        string,sError,sBlur,
      
    }
}
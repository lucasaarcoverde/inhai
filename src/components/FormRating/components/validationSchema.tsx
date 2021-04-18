import * as Yup from 'yup'

export const validationSchema = Yup.object({
  place: Yup.object().required(),
  rate: Yup.number()
    .required('Este campo é obrigatório.')
    .typeError('Este campo é obrigatório.')
    .min(1, 'Você precisa atribuir uma nota.'),
  comment: Yup.string()
    .trim()
    .when('rate', {
      is: (rate: number) => rate <= 3,
      then: Yup.string()
        .trim()
        .required('Campo obrigatório em caso de nota menor ou igual a 3.'),
    })
    .when('safePlace', {
      is: (safePlace: string) => safePlace === 'false',
      then: Yup.string()
        .trim()
        .required(
          'Campo obrigatório caso você não se sinta seguro nesse local.'
        ),
    }),
  term: Yup.boolean().isTrue('Campo obrigatório.'),
})

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signInSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[A-Z][a-z]+$/, 'Name must start with a capital letter and contain only letters'),
  surname: z
    .string()
    .min(1, 'Surname is required')
    .regex(/^[A-Z][a-z]+$/, 'Surname must start with a capital letter and contain only letters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSubmit: (data: { name: string; surname: string }) => void;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const handleFormSubmit = (data: SignInFormData) => {
    onSubmit({ name: data.name, surname: data.surname });
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <input type="text" placeholder="Your name" className="form__input" {...register('name')} />
      {errors.name && <p className="form__error">{errors.name.message}</p>}

      <input type="text" placeholder="Your surname" className="form__input" {...register('surname')} />
      {errors.surname && <p className="form__error">{errors.surname.message}</p>}

      <input type="email" placeholder="Your email" className="form__input" {...register('email')} />
      {errors.email && <p className="form__error">{errors.email.message}</p>}

      <input type="password" placeholder="Your password" className="form__input" {...register('password')} />
      {errors.password && <p className="form__error">{errors.password.message}</p>}

      <button type="submit" className="form__btn">Sign In</button>
    </form>
  );
}

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/UseForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    const res = await reset().catch(console.error);
    console.log(res);
    resetForm();
  }

  const successfullError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  // The method="POST" attribute is just to ensure password don get posted through the submit function in the url
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Set Your New Password:</h2>
      <DisplayError error={error || successfullError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in.</p>
        )}
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset!</button>
      </fieldset>
    </Form>
  );
}

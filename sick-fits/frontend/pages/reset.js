import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>
          You must have gotten to this page by mistake. If you want to reset
          your password, please, fill in the form:
        </p>
        <RequestReset />
      </>
    );
  }
  return (
    <>
      <p>RESET PASSWORD PAGE {query.token}</p>
      <Reset token={query.token} />
    </>
  );
}

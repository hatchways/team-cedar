import { FormikHelpers } from 'formik';
import register from '../../helpers/APICalls/register';
import loginDemoUser from '../../helpers/APICalls/loginDemoUser';
import DemoUserLogin from '../Login/DemoUserLogin/DemoUserLogin';
import SignUpForm from './SignUpForm/SignUpForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import AuthPageWrapper from '../../components/AuthPageWrapper/AuthPageWrapper';
import PageContainer from '../../components/PageContainer/PageContainer';
import AuthPageFooter from '../../components/AuthPageFooter/AuthPageFooter';

export default function Register(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { name, email, password }: { email: string; password: string; name: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; name: string }>,
  ) => {
    const petSitter = location.search === '?accountType=pet_sitter';
    register(name, email, password, petSitter).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleDemoLogin = () => {
    loginDemoUser().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <PageContainer>
      <AuthPageWrapper header="Sign up">
        <SignUpForm handleSubmit={handleSubmit} />
        <DemoUserLogin handleSubmit={handleDemoLogin} />
        <AuthPageFooter text="Already a member?" anchorText="Login" anchorTo="/login" />
      </AuthPageWrapper>
    </PageContainer>
  );
}
